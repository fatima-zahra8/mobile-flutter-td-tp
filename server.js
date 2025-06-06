const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Charger les données depuis le fichier JSON
const loadData = () => {
  const data = fs.readFileSync('data.json', 'utf8');
  return JSON.parse(data);
};

// Sauvegarder les données dans le fichier JSON
const saveData = (data) => {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
};

// Tester si le serveur fonctionne
app.get('/', (req, res) => {
  res.send('API Backend fonctionne!');
});

// Route GET pour obtenir tous les produits
app.get('/products', (req, res) => {
  const data = loadData();
  res.json(data.products);
});

// Route POST pour ajouter un produit
app.post('/products', (req, res) => {
  const data = loadData();
  const newProduct = req.body;
  data.products.push(newProduct);
  saveData(data);
  res.status(201).send('Produit ajouté');
});

// Route GET pour obtenir toutes les commandes
app.get('/orders', (req, res) => {
  const data = loadData();
  res.json(data.orders);
});

// Route POST pour ajouter une commande
app.post('/orders', (req, res) => {
  const data = loadData();
  const newOrder = req.body;
  data.orders.push(newOrder);
  saveData(data);
  res.status(201).send('Commande créée');
});

app.listen(port, () => {
  console.log(`Serveur API démarré sur http://localhost:${port}`);
});
