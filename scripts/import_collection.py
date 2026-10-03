"""Import the museum collection export (data/pushkin-collection.json) into the app.

Writes src/entities/exhibit/model/exhibits.js: one normalized record per exhibit
(name, author, year, country, type, material, the museum's building and hall ids)
plus `hall` — the hall on the app's schematic plan, and `hallSource`:
  museum — mapped from the museum's own hall id;
  author — the Gallery export has no hall, so the hall is chosen by the artist;
  guess  — by period only; check on site.
Exhibits with no building (coins, prints, drawings) are not on permanent display: onDisplay = false.
photo — path on the museum website (arts-museum.ru), cast — a plaster cast (its `material` is
the original's, as the export gives it).

Run from the project folder: python3 scripts/import_collection.py
"""
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "data" / "pushkin-collection.json"
TARGET = ROOT / "src" / "entities" / "exhibit" / "model" / "exhibits.js"

# Museum building ids in the export.
BUILDINGS = {"116": "main", "117": "gallery", "121": "private-collections"}

# Museum hall id -> app hall id (Main building). Derived from what hangs together in the export.
MUSEUM_HALLS = {
    "186": "main-1", "191": "main-1",          # Ancient Egypt, Fayum portraits
    "192": "main-italy-1",                     # Italy XIII-XVI, Byzantium
    "193": "main-germany",
    "194": "main-flanders",
    "195": "main-holland", "196": "main-holland",
    "198": "main-15",                          # Italian Courtyard (casts)
    "201": "main-italy-3",
    "202": "main-spain",                       # Zurbaran and Strozzi hang together
    "205": "main-france", "206": "main-france", "207": "main-france",
    "150": "gallery-14",                       # Monet
}

# Gallery: no hall in the export -> by artist (surname as it appears in the author field).
GALLERY_ARTISTS = [
    ("Моне", "gallery-14"), ("Ренуар", "gallery-renoir"), ("Писсарро", "gallery-renoir"),
    ("Дега", "gallery-10"), ("ван Гог", "gallery-16"), ("Гоген", "gallery-gauguin"),
    ("Матисс", "gallery-20"), ("Пикассо", "gallery-21"), ("Сезанн", "gallery-cezanne"),
    ("Курбе", "gallery-landscape"), ("Коро", "gallery-landscape"), ("Фридрих", "gallery-landscape"),
    ("Милле", "gallery-romanticism"), ("Домье", "gallery-romanticism"),
]


def text(value):
    if not isinstance(value, dict):
        return ""
    raw = value.get("ru") or ""
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", raw))).strip()


def text_en(value):
    if not isinstance(value, dict):
        return ""
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", value.get("en") or ""))).strip()


def authors(record):
    a = record.get("authors")
    if isinstance(a, dict):
        return "; ".join(x.get("ru", "").strip() for x in a.values() if x.get("ru"))
    return ""


def first_photo(record):
    """Path of the first photo on the museum website (gallery → lowest key → id01)."""
    gallery = record.get("gallery")
    if not isinstance(gallery, dict) or not gallery:
        return None
    first = gallery[sorted(gallery, key=lambda k: int(k) if str(k).isdigit() else 0)[0]]
    return first.get("id01") if isinstance(first, dict) else None


def app_hall(building, museum_hall, author, year):
    if museum_hall in MUSEUM_HALLS:
        return MUSEUM_HALLS[museum_hall], "museum"
    if building == "gallery":
        for name, hall in GALLERY_ARTISTS:
            if name in author:
                return hall, "author"
        return ("gallery-20th-century" if (year or 0) >= 1900 else "gallery-salon"), "guess"
    return None, None


def main():
    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    out = []
    for museum_id, r in data.items():
        building = BUILDINGS.get(str(r.get("building") or ""))
        museum_hall = str(r.get("hall") or "")
        author = authors(r)
        year = r.get("year")
        hall, source = app_hall(building, museum_hall, author, year)
        out.append({
            "id": museum_id,
            "name": text(r.get("name")),
            "nameEn": text_en(r.get("name")),
            "author": author,
            "year": year,
            "period": text((r.get("period") or {}).get("text")),
            "country": text(r.get("country")),
            "type": text(r.get("type")),
            "material": text(r.get("material")),
            "size": text(r.get("size")),
            "photo": first_photo(r),
            "cast": str(r.get("cast")) == "1",
            "masterpiece": str(r.get("masterpiece")) == "1",
            "building": building,
            "museumHall": museum_hall or None,
            "hall": hall,
            "hallSource": source,
            "onDisplay": building is not None,
        })
    out.sort(key=lambda e: int(e["id"]))
    body = ",\n".join("  " + json.dumps(e, ensure_ascii=False) for e in out)
    TARGET.write_text(
        "/* Generated by scripts/import_collection.py from data/pushkin-collection.json — do not edit by hand.\n"
        "   hall — hall on the app's schematic plan; hallSource: museum | author | guess (see the script). */\n"
        "export const EXHIBITS = [\n" + body + "\n];\n",
        encoding="utf-8",
    )
    shown = sum(e["onDisplay"] for e in out)
    print(f"{TARGET.relative_to(ROOT)}: {len(out)} exhibits, on display {shown}, "
          f"hall by museum id {sum(e['hallSource'] == 'museum' for e in out)}, "
          f"by artist {sum(e['hallSource'] == 'author' for e in out)}, guessed {sum(e['hallSource'] == 'guess' for e in out)}")


if __name__ == "__main__":
    main()
