export as namespace pins;
export declare class Digital {
  constructor(dictionary: Digital.constructorParam);
  constructor(port: number[], pin: number, mode: Digital.Mode);
  read(): number;
  write(value: number): void;
  mode(mode: Digital.Mode): void;
  static read(pin: number): number;
  static write(pin: number, value: number): void;
}
export namespace Digital {
  interface constructorParam {
    pin: number;
    mode: Mode;
    port?: string | null;
  }
  enum Mode {
    Input,
    Output,
    InputPullUp
  }
  class Monitor {
    constructor(dictionary: Monitor.constructorParam);
    onChanged(callback: () => void): void;
    read(): number;
    close(): void;
    rises: number;
    falls: number;
  }
  namespace Monitor {
    interface constructorParam {
      pin: number;
      port?: string | null;
      mode: Digital.Mode;
      edges: Edge;
    }
    enum Edge {
      Rising,
      Falling
    }
  }
}

export declare class Analog {
  static read(pin: number): number;
}

export declare class PWM {
  constructor(dictionary: PWM.constructorParam);
  write(value: number): void;
  close(): void;
}
export namespace PWM {
  interface constructorParam {
    pin: number;
    port?: string | null;
  }
}

export declare class I2C {
  constructor(dictionary: I2C.constructorParam);
  constructor(port: number[], pin: number, mode: Digital.Mode);
  close(): void;
  read(count: number, buffer?: ArrayBuffer): void;
  write(first: any, ...valuesOrStop: Array<any | boolean>): void;
}
export namespace I2C {
  interface constructorParam {
    scl?: number;
    sda?: number;
    address: number;
    hz?: number;
  }
}

export declare class SMBus {
  constructor(dictionary: SMBus.constructorParam);
  readByte(register: number): number;
  readWord(register: number): number;
  readBlock(register: number, count: number, buffer?: ArrayBuffer): Uint8Array;
  writeByte(register: number, value: number): void;
  writeWord(register: number, value: number): void;
  writeBlock(
    register: number,
    first: any,
    ...valuesOrStop: Array<any | boolean>
  ): void;
}
export namespace SMBus {
  interface constructorParam extends I2C.constructorParam {}
}

export declare class Servo {
  constructor(dictionary: Servo.constructorParam);
  write(degrees: number): void;
  writeMicroseconds(us: number): void;
}
export namespace Servo {
  interface constructorParam {
    pin: number;
    min?: number;
    max?: number;
  }
}

export declare class SPI {
  // There is no JavaScript API to access SPI at this time.
}
