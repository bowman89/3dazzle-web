import express from 'express';
import cors from 'cors';
import fs from 'fs';
import archiver from 'archiver';
import { generateStl } from './src/generateStl.js';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

// ---------- nyt endpoint -----------------
app.post('/api/generate-zip', async (req, res) => {
  const names = (req.body.names || []).map(n => n.trim()).filter(Boolean);
  if (!names.length) return res.status(400).json({ error: 'No names' });

  const tmpDir = './tmp_stl';
  fs.mkdirSync(tmpDir, { recursive: true });
  const files = [];

  names.forEach(name => {
    const filePath = path.join(tmpDir, `${name}.stl`);
    generateStl(name, false, filePath);
    files.push({ name, path: filePath });
  });

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename=navneskilte.zip');

  const zip = archiver('zip');
  zip.pipe(res);
  files.forEach(f => zip.file(f.path, { name: `${f.name}.stl` }));
  zip.finalize();

  zip.on('end', () => {
    files.forEach(f => fs.unlinkSync(f.path));
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });
});
// -----------------------------------------

app.listen(3001, () => console.log('STL‑backend kører på http://localhost:3001'));
