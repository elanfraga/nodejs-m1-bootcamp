const express = require("express");

const server = express();
// Query parans
server.get("/teste", (req, res) => {
  const nome = req.query.nome;

  return res.json({ message: `Hello ${nome}` });
});

// Route params
server.get("/users/:id", (req, res) => {
  // desestruturação
  const { id } = req.params;

  return res.json({ message: `Buscando o usuário ${id}` });
});

server.listen(3000);
