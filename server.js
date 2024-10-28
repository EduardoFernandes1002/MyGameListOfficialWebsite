const express = require('express');
const app = express();
const path = require('path');

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','templates', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','templates', 'login.html'));
});

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','templates', 'registro.html'));
});
app.get('/infoJogos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','templates', 'infoJogos.html'));
});
app.get('/rank', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','templates', 'rank.html'));
});

app.get('/perfil', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','templates', 'perfil.html'));
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
