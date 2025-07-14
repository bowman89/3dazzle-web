// src/generateStl.js
import { writeFileSync, readFileSync } from 'fs';
import path from 'path';
import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const fontJson = JSON.parse(readFileSync(path.resolve('./src/fonts/DancingScript-Bold.json'), 'utf8'));
const font = new FontLoader().parse(fontJson);

const targetHeight = 30;     // Y-dimension (tekst-højde i mm)
const thickness = 5;         // Z-dimension (tykkelse i mm)
const baseFontSize = 10;

export function generateStl(name, returnString = false) {
  const textGeometry = new TextGeometry(name, {
    font: font,
    size: baseFontSize,
    height: 1, // midlertidigt, vi skalerer Z bagefter!
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
    return stlString; // Returnér STL som string (bruges af Express/server)
  } else {
    writeFileSync(`${name}.stl`, stlString);
    console.log(`STL genereret! (${name}.stl)`);
  }
}

// --- Til manuel test i terminal ---
// Denne blok kører kun, hvis du kører "node src/generateStl.js" direkte i terminalen
// --- Til manuel test i terminal ---
// eslint-disable-next-line no-undef
if (typeof process !== "undefined" && process.argv && import.meta.url.endsWith(process.argv[1])) {
  const names = ['Mille', 'Oliver'];
  names.forEach(name => generateStl(name));
}

