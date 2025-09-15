const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data.json');

let characters = [
  { id: 1, name: 'Hello Kitty', alias: 'Kitty White', description: 'Gatinha amigável que adora laços e amigos.' },
  { id: 2, name: 'My Melody', alias: 'My Melody', description: 'Coelhinha doce e gentil.' },
  { id: 3, name: 'Keroppi', alias: 'Keroppi', description: 'Sapo animado que adora aventuras.' },
  { id: 4, name: 'Badtz-Maru', alias: 'Badtz-Maru', description: 'Pinguim travesso e sarcástico.' }
];

if (fs.existsSync(DATA_FILE)) {
  try {
    characters = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (err) {
    console.warn('Erro lendo data.json, usando dados padrão.');
  }
}

function saveData() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(characters, null, 2));
}

// Rotas
app.get('/api/characters', (req, res) => {
  res.json(characters);
});

app.get('/api/characters/:id', (req, res) => {
  const char = characters.find(c => c.id === Number(req.params.id));
  if (!char) return res.status(404).json({ error: 'Personagem não encontrado' });
  res.json(char);
});

app.post('/api/characters', (req, res) => {
  const { name, alias, description } = req.body;
  const id = characters.length ? Math.max(...characters.map(c => c.id)) + 1 : 1;
  const newChar = { id, name, alias, description };
  characters.push(newChar);
  saveData();
  res.status(201).json(newChar);
});

app.put('/api/characters/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = characters.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Personagem não encontrado' });
  characters[idx] = { ...characters[idx], ...req.body, id };
  saveData();
  res.json(characters[idx]);
});

app.delete('/api/characters/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = characters.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Personagem não encontrado' });
  const removed = characters.splice(idx, 1)[0];
  saveData();
  res.json(removed);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ API rodando em http://localhost:${PORT}`));
