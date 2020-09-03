const express = require('express');
const server = express();
const nunjucks = require('nunjucks');
const { urlencoded } = require('express');

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
    return res.render('search-results.html');
});

server.listen(3000, () => {
    console.log('Servidor rodando');
})