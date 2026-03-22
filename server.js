
// Import des modules
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // ton fichier swagger.json

// Initialisation de l'application Express
const app = express();
const PORT = 3000;

// Middleware pour lire le JSON
app.use(express.json());

// Connexion à la base SQLite
const db = new sqlite3.Database('./blog.db');

// Création de la table "articles" si elle n'existe pas
db.run(`CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titre TEXT NOT NULL,
  contenu TEXT,
  auteur TEXT NOT NULL,
  date TEXT,
  categorie TEXT,
  tags TEXT
)`);

// --- ENDPOINTS ---

// Créer un article
app.post('/api/articles', (req, res) => {
  const { titre, contenu, auteur, date, categorie, tags } = req.body;
  if (!titre || !auteur) {
    return res.status(400).json({ error: "Titre et auteur obligatoires" });
  }
  db.run(
    `INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [titre, contenu, auteur, date, categorie, tags],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Lire tous les articles
app.get('/api/articles', (req, res) => {
  db.all(`SELECT * FROM articles`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ articles: rows });
  });
});

// Lire un article par ID
app.get('/api/articles/:id', (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM articles WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Article non trouvé" });
    res.json(row);
  });
});

// Modifier un article
app.put('/api/articles/:id', (req, res) => {
  const id = req.params.id;
  const { titre, contenu, categorie, tags } = req.body;
  db.run(
    `UPDATE articles SET titre=?, contenu=?, categorie=?, tags=? WHERE id=?`,
    [titre, contenu, categorie, tags, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "Article non trouvé" });
      res.json({ message: "Article mis à jour" });
    }
  );
});

// Supprimer un article
app.delete('/api/articles/:id', (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM articles WHERE id=?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Article non trouvé" });
    res.json({ message: "Article supprimé" });
  });
});

// Rechercher un article
app.get('/api/articles/search', (req, res) => {
  const query = `%${req.query.query}%`;
  db.all(
    `SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ?`,
    [query, query],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ articles: rows });
    }
  );
});

// Swagger (doc API)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
