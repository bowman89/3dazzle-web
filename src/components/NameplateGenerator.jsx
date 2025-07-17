import React, { useState, useEffect } from "react";
import opentype from "opentype.js";
import Flatten from "@flatten-js/core";

// ---- IMPORTER ALLE DINE FONTE ----
import type1Font from "../fonts/Type-1.ttf";
import type2Font from "../fonts/Type-2.ttf";
import type3Font from "../fonts/Type-3.ttf";
import type4Font from "../fonts/Type-4.ttf";
import type5Font from "../fonts/Type-5.ttf";
import type6Font from "../fonts/Type-6.ttf";
import type7Font from "../fonts/Type-7.ttf";
import type8Font from "../fonts/Type-8.ttf";
import type9Font from "../fonts/Type-9.otf";
import type10Font from "../fonts/Type-10.ttf";
import type11Font from "../fonts/Type-11.ttf";
import type12Font from "../fonts/Type-12.ttf";
import type13Font from "../fonts/Type-13.ttf";
import type14Font from "../fonts/Type-14.ttf";
import type15Font from "../fonts/Type-15.ttf";
import type16Font from "../fonts/Type-16.ttf";
import type17Font from "../fonts/Type-17.ttf";
import type18Font from "../fonts/Type-18.ttf";
import type19Font from "../fonts/Type-19.ttf";
import type20Font from "../fonts/Type-20.ttf";

// ---- OPDATER DIT FONTS ARRAY ----
const FONTS = [
  { name: "Type 1", path: type1Font },
  { name: "Type 2", path: type2Font },
  { name: "Type 3", path: type3Font },
  { name: "Type 4", path: type4Font },
  { name: "Type 5", path: type5Font },
  { name: "Type 6", path: type6Font },
  { name: "Type 7", path: type7Font },
  { name: "Type 8", path: type8Font },
  { name: "Type 9", path: type9Font },
  { name: "Type 10", path: type10Font },
  { name: "Type 11", path: type11Font },
  { name: "Type 12", path: type12Font },
  { name: "Type 13", path: type13Font },
  { name: "Type 14", path: type14Font },
  { name: "Type 15", path: type15Font },
  { name: "Type 16", path: type16Font },
  { name: "Type 17", path: type17Font },
  { name: "Type 18", path: type18Font },
  { name: "Type 19", path: type19Font },
  { name: "Type 20", path: type20Font }
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

function SVGPreview({ name, fontData, fontName }) {
  if (!fontData) return <div>Loader font…</div>;

  const fs = 100;           // Fontstørrelse
  const padding = 40;       // Luft til siderne/top/bund

  // Automatisk bredde baseret på navnet
  const nameWidth = fontData.getAdvanceWidth(name, fs);
  const svgWidth = nameWidth + padding * 2;
  const svgHeight = 180; // Fast højde – ret hvis du vil

  // Brug ét samlet path for hele navnet
  const d = fontData.getPath(name, padding, fs + 30, fs).toPathData();

  return (
    <div style={{
      textAlign: "center",
      border: "1px solid #eee",
      padding: 12,
      borderRadius: 8,
      minWidth: 200
    }}>
      {/* Her retter du størrelsen på SVG'en */}
      <svg width={svgWidth} height={svgHeight}>
        <path d={d} fill="#000" />
      </svg>
      <br />
      <button onClick={() => downloadSVG(name, d, svgWidth, svgHeight, fontName)}>
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
