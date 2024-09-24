const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const { setupWebSocket } = require('./websocket.js');
const routes = require('./app/routes/routes');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!!');
});


const server = http.createServer(app);
setupWebSocket(server);

app.use(routes);

app.get('/documentation', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port} \n` + new Date());
});
