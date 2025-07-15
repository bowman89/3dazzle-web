// src/generateStl.js

import { writeFileSync, readFileSync } from 'fs';
import path from 'path';
import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// Load din konverterede JSON font
const fontJson = JSON.parse(readFileSync(path.resolve('./src/fonts/Pacifico_Regular.json'), 'utf8'));
const font = new FontLoader().parse(fontJson);

const targetHeight = 30;     // Højde på teksten (mm)
const thickness = 5;         // Tykkelse (mm)
const baseFontSize = 10;     // Base font size for skalering

export function generateStl(name, returnString = false, outputPath = null) {
  const textGeometry = new TextGeometry(name, {
    font: font,
    size: baseFontSize,
    height: 1, // Skalér z bagefter!
    curveSegments: 12,
    bevelEnabled: false
  });

  textGeometry.computeBoundingBox();
  const bbox = textGeometry.boundingBox;
  const currentHeight = bbox.max.y - bbox.min.y;
  const scaleFactor = targetHeight / currentHeight;
  textGeometry.scale(scaleFactor, scaleFactor, 1);

  const currentThickness = bbox.max.z - bbox.min.z || 1;
  const zScale = thickness / currentThickness;
  textGeometry.scale(1, 1, zScale);

  textGeometry.computeBoundingBox();
  const newBbox = textGeometry.boundingBox;
  const offsetX = -(newBbox.max.x + newBbox.min.x) / 2;
  const offsetY = -(newBbox.max.y + newBbox.min.y) / 2;
  textGeometry.translate(offsetX, offsetY, 0);

  const mesh = new THREE.Mesh(textGeometry, new THREE.MeshNormalMaterial());
  const exporter = new STLExporter();
  const stlString = exporter.parse(mesh);

  if (returnString) {
    return stlString; // Returnér STL som string
  } else {
    const fileName = outputPath || `${name}.stl`;
    writeFileSync(outputPath || fileName, stlString);
    console.log(`STL genereret! (${fileName})`);
  }
}


// --- Kør scriptet direkte i terminalen (batch)
// Eksportér STL for alle navne herunder
if (typeof process !== "undefined" && typeof process.argv !== "undefined") {
  const names = ['Thomas', 'Maria', 'Jakob']; // Skriv alle navne her
  names.forEach(name => generateStl(name));
}

