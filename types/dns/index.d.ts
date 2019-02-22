declare namespace DNS {
  enum PR {
    PTR
  }
  enum OPCODE {
    QUERY,
    UPDATE
  }
  enum CLASS {
    IN,
    NONE,
    ANY
  }
  enum SECTION {
    QUESTION,
    ANSWER
  }
  class Parser {
    constructor(buffer: ArrayBuffer);
    questions(index: number): Record;
    answers(index: number): Record;
    authorities(index: number): Record;
    additionarls(index: number): Record;
  }
  // FIXME
  type Record = any;
  class Serializer {
    constructor(dictionary: {
      opcode: number;
      query: boolean;
      authoritative: boolean;
      id: number;
    });
    add(
      section: number,
      name: string,
      type: number,
      clss: number,
      ttl: number,
      ...extras: any[]
    ): void;
    build(): ArrayBuffer;
  }
  class Server {
    constructor(callback: (message: number, value: any) => void);
    close(): void;
  }
}
export = DNS;
