const express = require('express');
const server = express();

// Configuração da pasta public
server.use(express.static('public'));

server.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/index.html');
});

server.get('/create-point', (req, res) => {
    res.sendFile(__dirname + '/pages/create-point.html');
});

server.get('/search-results', (req, res) => {
    res.sendFile(__dirname + '/pages/search-results.html');
});

server.listen(3000, () => {
    console.log('Servidor rodando');
})