declare class Resource {
  constructor(path: string);
  static exists(path: string): boolean;
  slice(begin: number, end?: number): ArrayBuffer;
}
export = Resource;
