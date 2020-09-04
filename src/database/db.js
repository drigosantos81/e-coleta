const sqlite3 = require('sqlite3').verbose();

// Criação do objeto que faz as operações SQL
const db = new sqlite3.Database('./src/database/database.db');

module.exports = db;