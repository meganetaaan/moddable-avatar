import Request from "http/request";
import { Socket, Listener } from "socket";

let count = 0;
let listener = new Listener({ port: 80 });
listener.callback = function() {
  let socket = new Socket({ listener });
  let message = `Hello, server ${++count}.`;
  socket.write("HTTP/1.1 200 OK\r\n");
  socket.write("Connection: close\r\n");
  socket.write(`Content-Length: ${message.length}\r\n`);
  socket.write("Content-Type: text/plain\r\n");
  socket.write("\r\n");
  socket.write(message);
  socket.close();
};

const req = new Request({
  host: "www.example.com",
  response: String
});

const req2 = new Request({
  host: "www.example.com",
  path: "/info.dat",
  port: 8080,
  response: ArrayBuffer
});

const req3 = new Request({
  address: "192.0.1.15",
  path: "/weather.json",
  response: String
});
const req4 = new Request({
  address: "192.0.1.15",
  path: "/resource/to/delete",
  method: "DELETE"
});
