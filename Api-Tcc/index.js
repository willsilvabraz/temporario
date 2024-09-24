const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const port = 8080;

const ColectionsController = require('./app/controllers/ColectionsController');
const pacientesController = new ColectionsController('paciente');
const filaController = new ColectionsController('fila');

const cors = require('cors');
app.use(cors());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!!');
});

app.use(express.json());

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Novo cliente WebSocket conectado');

    ws.on('message', (message) => {
        console.log(`Mensagem recebida: ${message}`);
        // Aqui você pode processar a mensagem e responder se necessário
        ws.send('Resposta do servidor WebSocket');
    });

    ws.on('close', () => {
        console.log('Cliente WebSocket desconectado');
    });
});

app.post('/fila/cadastrar', (req, res) => filaController.cadastrar(req, res));

app.get('/fila/listar', (req, res) => filaController.listar(req, res));
app.get('/fila/listar/:status', (req, res) => filaController.listar(req, res));

app.get('/fila/obter/:id', (req, res) => filaController.obter(req, res));

app.put('/fila/atualizar', (req, res) => filaController.atualizar(req, res));

app.delete('/fila/deletar/:id', (req, res) => filaController.deletar(req, res));

app.get('/fila/tamanho', (req, res) => filaController.tamanho(req, res));

app.get('/fila/buscar/:nome', (req, res) => filaController.buscarPorNome(req, res));

app.get('/fila/atual/:status', (req, res) => filaController.atual(req, res));

app.post('/pacientes/cadastrar', (req, res) => pacientesController.cadastrar(req, res));

app.get('/pacientes/listar', (req, res) => pacientesController.listar(req, res));

app.get('/pacientes/obter/:id', (req, res) => pacientesController.obter(req, res));

app.put('/pacientes/atualizar', (req, res) => pacientesController.atualizar(req, res));

app.delete('/pacientes/deletar/:id', (req, res) => pacientesController.deletar(req, res));

app.get('/pacientes/tamanho', (req, res) => pacientesController.tamanho(req, res));

app.get('/pacientes/buscar/:nome', (req, res) => pacientesController.buscarPorNome(req, res));

app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.get('/documentation', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port} \n` + new Date());
});
