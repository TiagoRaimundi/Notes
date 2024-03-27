const { MongoClient } = require("mongodb");
const url = "mongodb://.................../notesDb";

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("O banco de dados já está inicializado!");
    return callback(null, _db);
  }

  MongoClient.connect(url)
    .then((client) => {
      _db = client.db();
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
