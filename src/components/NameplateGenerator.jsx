import React, { useState, useEffect } from "react";
import opentype from "opentype.js";
import Flatten from "@flatten-js/core";

import pacificoFont from "../fonts/Pacifico-Regular.ttf";
import dancingScriptFont from "../fonts/DancingScript-bold.ttf";

const FONTS = [
  { name: "Pacifico", path: pacificoFont },
  { name: "Dancing Script", path: dancingScriptFont }
];

export default function NameplateGenerator() {
  const [names, setNames] = useState("Thomas\nMaria\nJakob");
  const [fontIndex, setFontIndex] = useState(0);
  const [fontData, setFontData] = useState(null);

  // hent valgt font
  useEffect(() => {
    opentype.load(FONTS[fontIndex].path, (err, fontObj) => {
      if (!err) setFontData(fontObj);
    });
  }, [fontIndex]);

  const nameList = names.split("\n").map(n => n.trim()).filter(Boolean);

  /* download ZIP med alle STL'er  */
  async function downloadAllStl() {
    const namesArr = names
      .split("\n")
      .map(n => n.trim())
      .filter(Boolean);

    if (!namesArr.length) return;

    const res = await fetch("http://localhost:3001/api/generate-zip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ names: namesArr })
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "navneskilte.zip";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ padding: 24, maxWidth: 1200 }}>
      <h2>Navneskilt Generator</h2>

      <label>
        Indsæt navne (ét pr. linje):<br />
        <textarea
          value={names}
          onChange={e => setNames(e.target.value)}
          rows={6}
          cols={30}
          style={{ marginTop: 8, fontSize: 16 }}
        />
      </label>

      <br />

      <label>
        Vælg font:&nbsp;
        <select value={fontIndex} onChange={e => setFontIndex(+e.target.value)}>
          {FONTS.map((f, i) => (
            <option value={i} key={f.name}>
              {f.name}
            </option>
          ))}
        </select>
      </label>

      {/* knap til ZIP‑download */}
      <div style={{ marginTop: 16 }}>
        <button onClick={downloadAllStl}>Download alle som STL (ZIP)</button>
      </div>

      {/* previews */}
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginTop: 24 }}>
        {nameList.map((name, idx) => (
          <SVGPreview
            key={name + idx}
            name={name}
            fontData={fontData}
            fontName={FONTS[fontIndex].name}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function mergeSvgPaths(arr) {
  let merged = null;
  for (const s of arr) {
    if (!s) continue;
    try {
      const shp = Flatten.Path.parse(s);
      merged = merged ? merged.union(shp) : shp;
    } catch { /* ignore */ }
  }
  return merged ? merged.svg() : "";
}

function SVGPreview({ name, fontData, fontName }) {
  if (!fontData) return <div>Loader font…</div>;

  const fs = 100;
  let x = 20;
  const paths = [];
  for (const c of name) {
    if (!c.trim()) continue;
    const p = fontData.getPath(c, x, fs + 30, fs).toPathData();
    paths.push(p);
    x += fontData.getAdvanceWidth(c, fs);
  }

  let d = mergeSvgPaths(paths);
  if (!d) d = fontData.getPath(name, 20, fs + 30, fs).toPathData();

  return (
    <div style={{ textAlign: "center", border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
      <svg width="300" height="160">
        <path d={d} fill="#000" />
      </svg>
      <br />
      <button onClick={() => downloadSVG(name, d, 300, 160, fontName)}>
        Download SVG
      </button>
      <div>{name}</div>
    </div>
  );
}

function downloadSVG(name, d, w, h, fontName) {
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <path d="${d}" fill="none" stroke="#111" stroke-width="4"/>
    <text x="0" y="20" font-family="${fontName}" font-size="10" fill="gray"/> 
  </svg>`;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.svg`;
  a.click();
  URL.revokeObjectURL(url);
}
