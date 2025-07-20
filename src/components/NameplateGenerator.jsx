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

// ---------- Letter-spacing helper med uppercase og space support ----------
function buildCustomSpacedPath(
  text,
  font,
  fontSize,
  startX,
  startY,
  generalSpacing = 0,
  uppercaseSpacing = 0,
  spaceSpacing = -20
) {
  let x = startX;
  let pathData = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const glyph = font.charToGlyph(char);
    const charPath = glyph.getPath(x, startY, fontSize).toPathData();
    pathData += charPath;

    // Ekstra spacing logik
    let extraSpacing = 0;
    if (char === char.toUpperCase() && /[A-ZÆØÅ]/.test(char)) {
      extraSpacing = uppercaseSpacing;
    }
    if (char === " ") {
      extraSpacing = spaceSpacing;
    }
    x += glyph.advanceWidth * (fontSize / font.unitsPerEm) + generalSpacing + extraSpacing;
  }
  return pathData;
}

export default function NameplateGenerator() {
  const [names, setNames] = useState("Thomas\nMaria\nJens Peder");
  const [fontIndex, setFontIndex] = useState(0);
  const [fontData, setFontData] = useState(null);

  // hent valgt font
  useEffect(() => {
    opentype.load(FONTS[fontIndex].path, (err, fontObj) => {
      if (!err) setFontData(fontObj);
    });
  }, [fontIndex]);

  const nameList = names.split("\n").map(n => n.trim()).filter(Boolean);

  // download ZIP med alle STL'er (samme som før)
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
    <div style={{ padding: 24, maxWidth: 1300 }}>
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
      <div style={{
        display: "flex",
        gap: 32,
        flexWrap: "wrap",
        marginTop: 24,
        alignItems: "flex-start"
      }}>
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

// ----------- SVGPreview med reset-knap til hver slider -----------
function SVGPreview({ name, fontData, fontName }) {
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [uppercaseSpacing, setUppercaseSpacing] = useState(0);
  const [spaceSpacing, setSpaceSpacing] = useState(-20);

  if (!fontData) return <div>Loader font…</div>;

  const fs = 100;
  const padding = 40;

  // Udregn bredde: bogstav for bogstav inkl. alle spacings
  let x = 0;
  for (let i = 0; i < name.length; i++) {
    const char = name[i];
    const glyph = fontData.charToGlyph(char);
    let extraSpacing = 0;
    if (char === char.toUpperCase() && /[A-ZÆØÅ]/.test(char)) {
      extraSpacing = uppercaseSpacing;
    }
    if (char === " ") {
      extraSpacing = spaceSpacing;
    }
    x += glyph.advanceWidth * (fs / fontData.unitsPerEm) + letterSpacing + extraSpacing;
  }
  const nameWidth = x - letterSpacing;
  const svgWidth = nameWidth + padding * 2;
  const svgHeight = 180;

  // Brug custom path generation med alle spacings
  const d = buildCustomSpacedPath(
    name,
    fontData,
    fs,
    padding,
    fs + 30,
    letterSpacing,
    uppercaseSpacing,
    spaceSpacing
  );

  return (
    <div
      style={{
        textAlign: "center",
        border: "1px solid #eee",
        padding: 16,
        borderRadius: 10,
        width: "100%",
        maxWidth: 700,
        minWidth: 320,
        overflowX: "auto",
        marginBottom: 16,
        background: "#fff",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg
          width={svgWidth}
          height={svgHeight}
          style={{
            display: "block",
            margin: "0 auto"
          }}
        >
          <path d={d} fill="#000" />
        </svg>
      </div>
      <div style={{ marginTop: 8, width: "100%" }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          Bogstavafstand (alle):&nbsp;
          <input
            type="range"
            min={-30}
            max={50}
            value={letterSpacing}
            onChange={e => setLetterSpacing(Number(e.target.value))}
            style={{ width: 140, verticalAlign: "middle" }}
          />
          <span>{letterSpacing} px</span>
          <button
            type="button"
            style={{
              marginLeft: 8,
              padding: "0 10px",
              height: 28,
              fontSize: 13,
              background: "#f2f2f2",
              border: "1px solid #ccc",
              borderRadius: 4,
              cursor: "pointer"
            }}
            onClick={() => setLetterSpacing(0)}
            title="Reset"
          >
            Nulstil
          </button>
        </label>
        <br />
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          Ekstra på store bogstaver:&nbsp;
          <input
            type="range"
            min={-30}
            max={50}
            value={uppercaseSpacing}
            onChange={e => setUppercaseSpacing(Number(e.target.value))}
            style={{ width: 140, verticalAlign: "middle" }}
          />
          <span>{uppercaseSpacing} px</span>
          <button
            type="button"
            style={{
              marginLeft: 8,
              padding: "0 10px",
              height: 28,
              fontSize: 13,
              background: "#f2f2f2",
              border: "1px solid #ccc",
              borderRadius: 4,
              cursor: "pointer"
            }}
            onClick={() => setUppercaseSpacing(0)}
            title="Reset"
          >
            Nulstil
          </button>
        </label>
        <br />
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          Ekstra på mellemrum:&nbsp;
          <input
            type="range"
            min={-60}
            max={50}
            value={spaceSpacing}
            onChange={e => setSpaceSpacing(Number(e.target.value))}
            style={{ width: 140, verticalAlign: "middle" }}
          />
          <span>{spaceSpacing} px</span>
          <button
            type="button"
            style={{
              marginLeft: 8,
              padding: "0 10px",
              height: 28,
              fontSize: 13,
              background: "#f2f2f2",
              border: "1px solid #ccc",
              borderRadius: 4,
              cursor: "pointer"
            }}
            onClick={() => setSpaceSpacing(-20)}
            title="Reset"
          >
            Nulstil
          </button>
        </label>
      </div>
      <button
        style={{ marginTop: 8 }}
        onClick={() => downloadSVG(name, d, svgWidth, svgHeight, fontName)}
      >
        Download SVG
      </button>
      <div style={{ marginTop: 6, wordBreak: "break-all" }}>{name}</div>
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
