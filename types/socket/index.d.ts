declare namespace socket {
  class Socket {
    constructor(dictionary: SocketConstructorParam);
    close(): void;
    read(type: StringConstructor, until?: number | string): string;
    read(type: ArrayBufferConstructor, until?: number | string): ArrayBuffer;
    read(type: NumberConstructor, until?: number): number;
    read(numer: number): void;
    write(): number;
    write(firstPacket: Packet, ...packet: Packet[]): number;
    write(address: string, packet: Packet): number;
    write(address: string, port: number, packet: Packet): number;
    callback(message: number, value?: any): void;
  }
  type Packet = string | ArrayBuffer | number;
  class Listener {
    constructor(dictionary: { port: number });
    callback(): void;
  }
  interface SocketConstructorParam {
    address?: string;
    host?: string;
    port?: number;
    kind?: string;
    listener?: Listener;
  }
}

export = socket;
