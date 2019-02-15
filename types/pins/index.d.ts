declare namespace pins {
  class AudioIn {
    constructor();
    close(): void;
    read(samples: number): number;
    readonly sampleRate: number;
    readonly bitsPerSample: number;
    readonly numChannels: number;
  }
  namespace AudioIn {}
  class Digital {
    constructor(dictionary: Digital.constructorParam);
    constructor(pin: number, mode: number);
    constructor(port: string, pin: number, mode: number);
    read(): number;
    write(value: number): void;
    mode(mode: number): void;
    static read(pin: number): number;
    static write(pin: number, value: number): void;
    static readonly Input: number;
    static readonly InputPullUp: number;
    static readonly InputPullDown: number;
    static readonly InputPullUpDown: number;
    static readonly Output: number;
    static readonly OutputOpenDrain: number;
  }
  namespace Digital {
    interface constructorParam {
      pin: number;
      mode: number;
      port?: string;
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
        port?: string;
        mode: number;
        edges: Edge;
      }
      enum Edge {
        Rising,
        Falling
      }
    }
  }
  class Analog {
    static read(pin: number): number;
  }

  class PWM {
    constructor(dictionary: PWM.constructorParam);
    write(value: number): void;
    close(): void;
  }
  namespace PWM {
    interface constructorParam {
      pin: number;
      mode?: string;
    }
  }

  class I2C {
    constructor(dictionary: I2C.constructorParam);
    constructor(port: number[], pin: number, mode: number);
    close(): void;
    read(count: number, buffer?: ArrayBuffer): void;
    write(first: any, ...valuesOrStop: Array<any | boolean>): void;
  }
  namespace I2C {
    interface constructorParam {
      scl?: number;
      sda?: number;
      address: number;
      hz?: number;
    }
  }

  class SMBus {
    constructor(dictionary: SMBus.constructorParam);
    readByte(register: number): number;
    readWord(register: number): number;
    readBlock(
      register: number,
      count: number,
      buffer?: ArrayBuffer
    ): Uint8Array;
    writeByte(register: number, value: number): void;
    writeWord(register: number, value: number): void;
    writeBlock(
      register: number,
      first: any,
      ...valuesOrStop: Array<any | boolean>
    ): void;
  }
  namespace SMBus {
    interface constructorParam extends I2C.constructorParam {}
  }

  class Servo {
    constructor(dictionary: Servo.constructorParam);
    write(degrees: number): void;
    writeMicroseconds(us: number): void;
  }
  namespace Servo {
    interface constructorParam {
      pin: number;
      min?: number;
      max?: number;
    }
  }

  class SPI {
    // There is no JavaScript API to access SPI at this time.
  }
}

export = pins;
