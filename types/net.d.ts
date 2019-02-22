declare class Net {
  static get(property: string): string | number;
  static resolve(
    host: string,
    callback: (name: string, address?: string) => void
  ): void;
}
export = Net;
