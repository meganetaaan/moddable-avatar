import { SocketConstructorParam, ListenerConstructorParam } from "socket/index";

declare namespace websocket {
  class Client {
    constructor(dictionary: WebSocketClientConstructorParam);
    close(): void;
    write(message: string | ArrayBuffer): void;
    callback(message: number, value: any): void;
  }

  class Server {
    constructor(dictionary: WebSocketServerConstructorParam);
    close(): void;
    write(message: string | ArrayBuffer): void;
    callback(message: number, value: any): void;
  }

  interface WebSocketServerConstructorParam extends ListenerConstructorParam {}
  interface WebSocketClientConstructorParam extends SocketConstructorParam {
    port: number;
    path: string;
  }
}

export = websocket;
