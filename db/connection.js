const { MongoClient } = require("mongodb");
// Importa variáveis de ambiente de um arquivo .env para process.env
require("dotenv").config();

// Usa as variáveis de ambiente para a URL e o nome do banco de dados
const url = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("O banco de dados já está inicializado!");
    return callback(null, _db);
  }

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
      _db = client.db(dbName); // Especifica o nome do banco de dados
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("O banco de dados não foi inicializado");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
