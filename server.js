import express from 'express';
import archiver from 'archiver';
import { generateStl } from './src/generateStl.js';

const app = express();
app.use(express.json());

app.post('/api/generate-stl', async (req, res) => {
  const { names } = req.body;

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename=navneskilte.zip');

  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(res);

  names.forEach(name => {
    const stl = generateStl(name, true); // Få STL-string retur
    archive.append(stl, { name: `${name}.stl` });
  });

  await archive.finalize();
});

app.listen(3001, () => console.log('Server kører på http://localhost:3001'));
