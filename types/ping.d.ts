declare class Ping {
  constructor(
    dictionary: {
      host: string;
      id: string;
      interval?: number;
    },
    callback: (message: number, value: any, etc?: any) => void
  );
  close(): void;
}
export = Ping;
