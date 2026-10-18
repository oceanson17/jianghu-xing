#!/usr/bin/env python3
"""Regenerate scripts/_assets_snippet.js from game.js ASSETS paths + assets/* files."""
from pathlib import Path
import re, base64, mimetypes, subprocess, sys

ROOT = Path(__file__).resolve().parents[1]
game = (ROOT / "game.js").read_text(encoding="utf-8")
m = re.search(r"const ASSETS = window\.__JH_ASSETS \|\| \{([^}]+)\}", game, re.S)
if not m:
    sys.exit("ASSETS fallback block not found in game.js")
pairs = re.findall(r'([A-Za-z0-9_]+):\s*"([^"]+)"', m.group(1))
if not pairs:
    sys.exit("no ASSETS pairs")

lines = ["window.__JH_ASSETS = {"]
for i, (key, rel) in enumerate(pairs):
    path = ROOT / rel
    if not path.exists():
        sys.exit(f"missing asset file: {rel}")
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    suf = path.suffix.lower()
    if suf == ".png":
        mime = "image/png"
    elif suf in (".jpg", ".jpeg"):
        mime = "image/jpeg"
    elif suf == ".webp":
        mime = "image/webp"
    b64 = base64.b64encode(path.read_bytes()).decode("ascii")
    if '"' in b64:
        sys.exit(f"unexpected quote in base64 for {key}")
    comma = "," if i < len(pairs) - 1 else ""
    lines.append(f'  {key}: "data:{mime};base64,{b64}"{comma}')
lines.append("};")
lines.append("")
out = "\n".join(lines)
snip = ROOT / "scripts" / "_assets_snippet.js"
snip.write_text(out, encoding="utf-8")
# syntax check
r = subprocess.run(["node", "--check", str(snip)], capture_output=True, text=True)
if r.returncode != 0:
    sys.exit(r.stderr[:500] or "node --check failed")
print(f"wrote {snip} bytes={snip.stat().st_size} keys={len(pairs)}")
