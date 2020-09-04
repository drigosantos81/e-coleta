const sqlite3 = require('sqlite3').verbose();

// Criação do objeto que faz as operações SQL
const db = new sqlite3.Database('./src/database/database.db');

// Utilização do objeto de Banco de Dados
db.serialize(() => {
    // Criação das tabelas
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `);

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?
        );
    `

    const values = [
        'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60',
        'Colectoria',
        'Guilherme Gemballa, jardim América',
        'Nº 260',
        'Santa Catarina',
        'Rio do Sul',
        'Resíduos Eletrônicos, Lâmpadas'
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err);
        }

        console.log('Cadastrado com sucesso');
        console.log(this);
    }

    db.run(query, values, afterInsertData);
});