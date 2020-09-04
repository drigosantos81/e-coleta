const express = require('express');
const server = express();
const nunjucks = require('nunjucks');
const { urlencoded } = require('express');

const db = require('./database/db');

// Configuração da pasta public
server.use(express.static('public'));

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

server.get('/search-results', (req, res) => {
    db.all(`SELECT * FROM places`, function(err, rows) {
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