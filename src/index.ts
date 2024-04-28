
import * as WebSocket from 'ws';
import * as http from 'http';

const server = http.createServer(function (request: any, response: any) {
	console.log(new Date() + ' Received request for ' + request.url);
	response.end('hi there');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(socket) {
	socket.on('error', console.error);

	let user = 0;
	socket.on('message', function message(data, isBinary) {
		wss.clients.forEach(function each(client) {
			if (client.readyState === WebSocket.OPEN) {
				client.send(data, { binary: isBinary });
			}
		});
	});
  console.log("User is connected", ++user);
	socket.send('Hello! Message From Server!!');
});

server.listen(8000, function () {
	console.log(new Date() + ' Server is listening on port 8080');
});
