"use strict";

let WebSocketServer = require('websocket').server; // подключаем встроенный модуль 'websocket'
let http = require('http'); // подключаем встроенный модуль 'http'

let server = http.createServer(function(request, response) { // запускаем сервер
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end();
});

server.listen(8888, function() { }); // задаем порт для сервера

let wsServer = new WebSocketServer( // объект для websocket
{
	httpServer: server
}
);

let clients = []; // массив для подключенных клиентов

wsServer.on('request', function(request) {
	let connection = request.accept(null, request.origin); 
	clients.push(connection); // добавляем в массив подключенных клиентов

	connection.on('message', function(message) { // отправка сообщения (всем клиентам кроме себя)

		for(let client of clients) {
				client.sendUTF(message.utf8Data);
		}
	});


	connection.on('close', function(connection) { // закрываем соединение
		console.log('соединение закрыто');
	});
});