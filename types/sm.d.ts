declare class SM {
  deleteAllBondings(): void;
  onSecurityParameters(params: any): void;
  onAuthenticated(): void;
  onPasskeyConfirm(params: {
    address: ArrayBuffer;
    passKey: SM.PassKey;
  }): boolean;
  onPassKeyDisplay(params: { address: ArrayBuffer; passKey: SM.PassKey }): void;
  onPassKeyRequested(params: { address: ArrayBuffer }): SM.PassKey;
}
declare namespace SM {
  type PassKey = number;
  class IOCapability {
    static readonly NoInputNoOutput: number;
    static readonly DisplayOnly: number;
    static readonly KeyboardOnly: number;
    static readonly KeyboardDisplay: number;
    static readonly DisplayYesNo: number;
  }
}

export = SM;
