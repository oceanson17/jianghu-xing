#!/usr/bin/env python3
"""Rebuild single-file Safari HTML + zip from game.js / style.css / assets snippet."""
from pathlib import Path
import zipfile
import re

ROOT = Path("/workspace/wuxia-heroes")
style = (ROOT / "style.css").read_text(encoding="utf-8")
game = (ROOT / "game.js").read_text(encoding="utf-8")
assets = (ROOT / "scripts" / "_assets_snippet.js").read_text(encoding="utf-8").strip()
if not assets.startswith("window.__JH_ASSETS"):
    raise SystemExit("bad assets snippet")

# Strip outer IIFE wrapper? game.js already is IIFE - keep as-is
# Ensure game uses __JH_ASSETS - check
if "__JH_ASSETS" not in game and "JH_ASSETS" not in game:
    # game may read window.__JH_ASSETS via ASSETS
    pass

html = f'''<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="theme-color" content="#1a120c" />
<title>江湖行 · 像素Q版</title>
<style>
{style}
</style>
</head>
<body>
  <div id="app"></div>
  <div id="toast" class="toast"></div>
  <div id="modal-bg" class="modal-bg" onclick="if(event.target===this)closeModal()">
    <div class="modal" id="modal-body"></div>
  </div>
<script>
{assets}
</script>
<script>
{game}
</script>
</body>
</html>
'''

out1 = ROOT / "jianghu-safari.html"
out2 = Path("/workspace/jianghu-safari.html")
out1.write_text(html, encoding="utf-8")
out2.write_text(html, encoding="utf-8")
print("safari bytes", len(html.encode("utf-8")))
print("wrote", out1)
print("wrote", out2)

# zip
zip_path = Path("/workspace/jianghu-pixel.zip")
# also copy into project
zip_proj = ROOT / "jianghu-pixel.zip" if False else None

# Build zip with project files + safari at root
files = []
# mirror previous structure
for rel in [
    "style.css", "index.html", "game.js", "README.md", "jianghu-safari.html",
]:
    files.append((ROOT / rel, rel))
for img in sorted((ROOT / "assets").glob("*")):
    files.append((img, f"assets/{img.name}"))
for scr in sorted((ROOT / "scripts").glob("*")):
    files.append((scr, f"scripts/{scr.name}"))

with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as z:
    for path, name in files:
        if path.exists():
            z.write(path, name)
    # also put safari at nested path used before (duplicate name in listing was odd)
print("zip", zip_path, "size", zip_path.stat().st_size)
print("zip entries", len(files))
