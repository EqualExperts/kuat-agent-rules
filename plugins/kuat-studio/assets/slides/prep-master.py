#!/usr/bin/env python3
"""Template-prep: turn the raw "2026 EE branded master slides" export into the
slimmed, brand-correct master that ships in the kuat-studio asset pack.

We operate **directly on the OOXML package** (zipfile + targeted text edits),
NOT via python-pptx. python-pptx does not model `p:embeddedFontLst`, and a
round-trip can silently drop the embedded fonts — which are the whole point.

What it does (Phase 4S):
  1. SLIM   — drop the 79 example slides + their notesSlides, then prune any
              media no retained part (master/layouts/theme) still references.
  2. FONTS  — theme font Arial -> Lexend; strip off-brand Montserrat; embed the
              full brand set by adding Lora + JetBrains Mono; sweep stray
              Arial/Montserrat run typefaces in retained layouts/master -> Lexend.
  3. CHECK  — assert the output is a valid package with the expected font state,
              report size before/after, and refuse to write a broken file.

Inputs (both stay external to the repo by design — see docs/migration/LOG.md):
  - raw master:  argv[1] or ~/Downloads/2026 EE branded master slides.pptx
  - brand fonts: assets/slides/fonts/*.ttf  (OFL Lora + JetBrains Mono, committed)
Output:
  - assets/slides/ee-master-2026.pptx

Usage:  python3 assets/slides/prep-master.py [path/to/raw-master.pptx]
"""
import os
import re
import sys
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_RAW = os.path.expanduser("~/Downloads/2026 EE branded master slides.pptx")
FONTS_DIR = os.path.join(HERE, "fonts")
OUT_PATH = os.path.join(HERE, "ee-master-2026.pptx")

BRAND_SANS = "Lexend"

# New embedded fonts: typeface name -> {slot: (repo .ttf, packaged .fntdata name)}.
# Mirrors the master's existing Lexend embed structure (regular/bold[/italic/boldItalic]).
NEW_FONTS = {
    "Lora": {
        "regular":    ("Lora-regular.ttf",    "Lora-regular.fntdata"),
        "bold":       ("Lora-bold.ttf",        "Lora-bold.fntdata"),
        "italic":     ("Lora-italic.ttf",      "Lora-italic.fntdata"),
        "boldItalic": ("Lora-boldItalic.ttf",  "Lora-boldItalic.fntdata"),
    },
    "JetBrains Mono": {
        "regular":    ("JetBrainsMono-regular.ttf",    "JetBrainsMono-regular.fntdata"),
        "bold":       ("JetBrainsMono-bold.ttf",        "JetBrainsMono-bold.fntdata"),
        "italic":     ("JetBrainsMono-italic.ttf",      "JetBrainsMono-italic.fntdata"),
        "boldItalic": ("JetBrainsMono-boldItalic.ttf",  "JetBrainsMono-boldItalic.fntdata"),
    },
}
SLOT_TAG = {"regular": "regular", "bold": "bold", "italic": "italic", "boldItalic": "boldItalic"}
FONT_REL_TYPE = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font"


def die(msg):
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(1)


def read_package(path):
    parts = {}
    with zipfile.ZipFile(path) as z:
        for info in z.infolist():
            parts[info.filename] = z.read(info.filename)
    return parts


def is_example_slide(name):
    return re.match(r"ppt/slides/(_rels/)?slide\d+\.xml(\.rels)?$", name) is not None


def is_notes_slide(name):
    return re.match(r"ppt/notesSlides/(_rels/)?notesSlide\d+\.xml(\.rels)?$", name) is not None


def is_montserrat(name):
    return name.startswith("ppt/fonts/") and "Montserrat" in name


def main():
    raw = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_RAW
    if not os.path.exists(raw):
        die(f"raw master not found: {raw}\n  (provide the path as argv[1]; the 51MB export stays out of git)")
    for spec in NEW_FONTS.values():
        for ttf, _ in spec.values():
            if not os.path.exists(os.path.join(FONTS_DIR, ttf)):
                die(f"brand font missing: {os.path.join(FONTS_DIR, ttf)}")

    size_before = os.path.getsize(raw)
    parts = read_package(raw)

    # --- 1. SLIM: drop example slides + notesSlides + Montserrat font parts ---
    dropped_slides = [n for n in parts if is_example_slide(n)]
    dropped_notes = [n for n in parts if is_notes_slide(n)]
    dropped_mont = [n for n in parts if is_montserrat(n)]
    for n in dropped_slides + dropped_notes + dropped_mont:
        del parts[n]

    # --- 2a. presentation.xml: empty sldIdLst, swap Montserrat embed for Lora+JBM ---
    pres = parts["ppt/presentation.xml"].decode("utf-8")
    pres = re.sub(r"<p:sldIdLst>.*?</p:sldIdLst>", "<p:sldIdLst/>", pres, flags=re.S)
    pres = re.sub(r"<p:embeddedFont>(?:(?!</p:embeddedFont>).)*?Montserrat.*?</p:embeddedFont>", "", pres, flags=re.S)

    # --- 2b. presentation rels: drop slide rels + Montserrat font rels; add new font rels ---
    rels = parts["ppt/_rels/presentation.xml.rels"].decode("utf-8")
    rels = re.sub(r'<Relationship\b[^>]*/relationships/slide"[^>]*/>', "", rels)  # slide rels
    rels = re.sub(r'<Relationship\b[^>]*Target="fonts/Montserrat[^"]*"[^>]*/>', "", rels)

    existing_ids = [int(m) for m in re.findall(r'Id="rId(\d+)"', rels)]
    next_id = max(existing_ids) + 1 if existing_ids else 1
    next_id = max(next_id, 200)  # leave a clear gap; rIds need not be contiguous

    new_rel_lines, embed_blocks, new_font_parts = [], [], {}
    for typeface, slots in NEW_FONTS.items():
        slot_attrs = []
        for slot in ("regular", "bold", "italic", "boldItalic"):
            ttf, fnt = slots[slot]
            rid = f"rId{next_id}"; next_id += 1
            new_rel_lines.append(
                f'<Relationship Id="{rid}" Type="{FONT_REL_TYPE}" Target="fonts/{fnt}"/>'
            )
            new_font_parts[f"ppt/fonts/{fnt}"] = open(os.path.join(FONTS_DIR, ttf), "rb").read()
            slot_attrs.append(f'<p:{SLOT_TAG[slot]} r:id="{rid}"/>')
        embed_blocks.append(f'<p:embeddedFont><p:font typeface="{typeface}"/>{"".join(slot_attrs)}</p:embeddedFont>')

    rels = rels.replace("</Relationships>", "".join(new_rel_lines) + "</Relationships>")
    pres = pres.replace("</p:embeddedFontLst>", "".join(embed_blocks) + "</p:embeddedFontLst>")
    parts["ppt/presentation.xml"] = pres.encode("utf-8")
    parts["ppt/_rels/presentation.xml.rels"] = rels.encode("utf-8")
    parts.update(new_font_parts)

    # --- 2c. theme: major/minor latin Arial -> Lexend (deck theme + notes theme) ---
    for tname in [n for n in parts if re.match(r"ppt/theme/theme\d+\.xml$", n)]:
        t = parts[tname].decode("utf-8")
        for tag in ("majorFont", "minorFont"):
            t = re.sub(
                r'(<a:' + tag + r'>\s*<a:latin typeface=")[^"]*(")',
                r"\1" + BRAND_SANS + r"\2", t, count=1,
            )
        parts[tname] = t.encode("utf-8")

    # --- 2d. sweep stray run typefaces in retained layouts + master ---
    for n in [x for x in parts if re.match(r"ppt/slide(Layouts|Masters)/[^/]+\.xml$", x)]:
        b = parts[n].decode("utf-8")
        b = b.replace('typeface="Arial"', f'typeface="{BRAND_SANS}"')
        b = re.sub(r'typeface="Montserrat[^"]*"', f'typeface="{BRAND_SANS}"', b)
        parts[n] = b.encode("utf-8")

    # --- 2e. [Content_Types].xml: drop Overrides for removed slide/notesSlide parts ---
    ct = parts["[Content_Types].xml"].decode("utf-8")
    ct = re.sub(r'<Override\b[^>]*PartName="/ppt/(slides/slide|notesSlides/notesSlide)\d+\.xml"[^>]*/>', "", ct)
    parts["[Content_Types].xml"] = ct.encode("utf-8")

    # --- 1b. prune orphan media (anything no retained .rels still targets) ---
    reachable = set()
    for n, data in parts.items():
        if n.endswith(".rels"):
            for tgt in re.findall(r'Target="([^"]*media/[^"]+)"', data.decode("utf-8", "ignore")):
                reachable.add("ppt/media/" + os.path.basename(tgt))
    dropped_media = [n for n in list(parts) if n.startswith("ppt/media/") and n not in reachable]
    for n in dropped_media:
        del parts[n]

    # --- write output ---
    with zipfile.ZipFile(OUT_PATH, "w", zipfile.ZIP_DEFLATED) as z:
        # Content types first is conventional; order otherwise irrelevant.
        for name in ["[Content_Types].xml"] + [p for p in parts if p != "[Content_Types].xml"]:
            z.writestr(name, parts[name])
    size_after = os.path.getsize(OUT_PATH)

    # --- 3. self-check ---
    out = read_package(OUT_PATH)
    pres = out["ppt/presentation.xml"].decode("utf-8")
    theme1 = out["ppt/theme/theme1.xml"].decode("utf-8")
    rels = out["ppt/_rels/presentation.xml.rels"].decode("utf-8")
    errors = []

    if re.search(r"<p:sldId\b", pres):
        errors.append("sldIdLst not empty")
    for tag in ("majorFont", "minorFont"):
        m = re.search(r"<a:" + tag + r">\s*<a:latin typeface=\"([^\"]*)\"", theme1)
        if not m or m.group(1) != BRAND_SANS:
            errors.append(f"theme1 {tag} = {m.group(1) if m else '?'} (want {BRAND_SANS})")
    embedded = set(re.findall(r'<p:font typeface="([^"]+)"', pres))
    for want in ("Lexend", "Lora", "JetBrains Mono"):
        if want not in embedded:
            errors.append(f"missing embedded font: {want}")
    if any("Montserrat" in e for e in embedded):
        errors.append("Montserrat still embedded")
    if "Montserrat" in pres:
        errors.append("Montserrat still referenced in presentation.xml")
    # every font rel target must exist as a part
    for tgt in re.findall(r'Target="(fonts/[^"]+)"', rels):
        if "ppt/" + tgt not in out:
            errors.append(f"dangling font rel -> {tgt}")
    # no media rel may dangle
    for n, data in out.items():
        if n.endswith(".rels"):
            for tgt in re.findall(r'Target="([^"]*media/[^"]+)"', data.decode("utf-8", "ignore")):
                if "ppt/media/" + os.path.basename(tgt) not in out:
                    errors.append(f"dangling media rel in {n} -> {tgt}")

    n_layouts = len([p for p in out if re.match(r"ppt/slideLayouts/slideLayout\d+\.xml$", p)])
    n_media = len([p for p in out if p.startswith("ppt/media/")])
    print("Template-prep — ee-master-2026.pptx")
    print(f"  size:    {size_before/1048576:.1f} MB -> {size_after/1048576:.1f} MB")
    print(f"  slides:  79 -> 0   (layouts kept: {n_layouts})")
    print(f"  media:   {len(dropped_media)} orphan dropped -> {n_media} kept")
    print(f"  fonts:   -Montserrat(4)  +Lora(4) +JetBrains Mono(4)   embedded: {sorted(embedded)}")
    if errors:
        os.remove(OUT_PATH)
        die("self-check failed:\n  - " + "\n  - ".join(errors))
    print(f"  self-check: OK -> {OUT_PATH}")


if __name__ == "__main__":
    main()
