import { SocketConstructorParam, Socket } from "socket/index";

declare namespace http {
  class Request {
    constructor(dictionary: RequestConstructorParam);
    close(): void;
    read(type: StringConstructor, until?: number | string): string;
    read(type: ArrayBufferConstructor, until?: number | string): ArrayBuffer;
    read(type: NumberConstructor, until?: number): number;
    read(numer: number): void;
    // TODO
    callback(message: number, value1?: any, value2?: any): any;
  }
  class Server {
    constructor(dictionary: ServerConstructorParam);
    close(): void;
    callback(message: number, value1?: any, value2?: any): any;
  }
  enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
  }
  interface RequestConstructorParam extends SocketConstructorParam {
    port?: number;
    path?: string;
    method?: Method | string;
    headers?: string[];
    body?: ArrayBufferConstructor | StringConstructor | boolean;
    response?: ArrayBufferConstructor | StringConstructor;
  }
  interface ServerConstructorParam extends SocketConstructorParam {
    port?: number;
  }
}

export = http;
