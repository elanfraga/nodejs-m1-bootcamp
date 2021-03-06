const express = require("express");

const server = express();

server.use(express.json());

// Query parans
server.get("/teste", (req, res) => {
  const nome = req.query.nome;

  return res.json({ message: `Hello ${nome}` });
});

// CRUD - Create, Read, Update, Delete

const users = ["Diego", "Robson", "Victor"];

server.use((req, res, next) => {
  console.time("Request");
  console.log(`Médoto: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd("Request");
});

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }

  req.user = user;

  return next();
}

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ erro: "User name is required" });
  }

  return next();
}

server.get("/users", (req, res) => {
  return res.json(users);
});

// Route params
server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

server.post("/users", checkUserExists, (req, res) => {
  // desestruturação
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
