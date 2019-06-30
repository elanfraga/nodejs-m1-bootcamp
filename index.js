const express = require("express");

const server = express();

server.use(express.json());

// Query parans
server.get("/teste", (req, res) => {
  const nome = req.query.nome;

  return res.json({ message: `Hello ${nome}` });
});

const users = ["Diego", "Robson", "Victor"];

// CRUD - Create, Read, Update, Delete

server.get("/users", (req, res) => {
  return res.json(users);
});

// Route params
server.get("/users/:index", (req, res) => {
  // desestruturação
  const { index } = req.params;

  return res.json(users[index]);
});

server.post("/users", (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
