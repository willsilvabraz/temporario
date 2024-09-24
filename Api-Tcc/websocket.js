const WebSocket = require('ws');

let clients = [];

function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        clients.push(ws);
        notifyClients('testando')
        console.log('Novo cliente conectado. Total de clientes:', clients.length);

        ws.on('close', () => {
            clients = clients.filter(client => client !== ws);
            console.log('Cliente desconectado. Total de clientes:', clients.length);
        });
    });
}

function notifyClients(message) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

module.exports = { setupWebSocket, notifyClients };
