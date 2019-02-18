declare function qrCode(params: {
  input: string | ArrayBuffer | any;
  maxVersion?: number;
}): ArrayBuffer;

export = qrCode;
