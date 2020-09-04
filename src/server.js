const express = require('express');
const server = express();
const nunjucks = require('nunjucks');
const { urlencoded } = require('express');

const db = require('./database/db');

// Configuração da pasta public
server.use(express.static('public'));

// Habilitar o uso do "req.body"
server.use(express.urlencoded( {extended: true }));

nunjucks.configure('src/pages', {
    express: server,
    noCache: true
});

server.get('/', (req, res) => {
    return res.render('index.html', { title: 'Seu marketplace de coleta de resíduos.' });
});

server.get('/create-point', (req, res) => {
    return res.render('create-point.html');
});

server.post('/savepoint', (req, res) => {
    // INCLUSÃO DE DADOS
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
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err);
            return res.send('Erro no cadastro!')
        }

        return res.render('create-point.html', { saved: true });
    }

    db.run(query, values, afterInsertData);
});

server.get('/search', (req, res) => {
    const search = req.query.search;

    if (search == "") {
        return res.render('search-results.html', { total: 0 });
    }

    db.all(`
        SELECT * FROM places
        WHERE city LIKE '%${search}%'
        OR state LIKE '%${search}%'
    `, function(err, rows) {
        if (err) {
            return console.log(err);
        }

        const total = rows.length;

        return res.render('search-results.html', { places: rows, total: total });
    });    
});

server.listen(3000, () => {
    console.log('Servidor rodando');
})