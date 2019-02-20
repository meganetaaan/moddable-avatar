declare class GAP {}
// import GAP from './gap'

declare namespace BTUtils {
  class Bytes extends ArrayBuffer {
    constructor(bytes: ArrayBuffer, littleEndian: boolean);
    set(bytes: ArrayBuffer, littleEndian: boolean): void;
    equals(bytes: Bytes): boolean;
  }
  function uuid(strings: string[]): Bytes;
  function address(strings: string[]): Bytes;
  class AdvertisementSerializer {
    static incompleteUUID16List(
      data: ArrayBuffer
    ): {
      type: number;
      data: Uint8Array;
    };
    static completeUUID16List(
      data: ArrayBuffer
    ): {
      type: number;
      data: Uint8Array;
    };
    static incompleteUUID128List(
      data: ArrayBuffer
    ): {
      type: number;
      data: Uint8Array;
    };
    static completeUUID128List(
      data: ArrayBuffer
    ): {
      type: number;
      data: Uint8Array;
    };
    static shortName(
      data: string
    ): {
      type: number;
      data: Uint8Array;
    };
    static completeName(
      data: string
    ): {
      type: number;
      data: Uint8Array;
    };
    static flags(
      data: number
    ): {
      type: number;
      data: Uint8Array;
    };
    static manufacturerSpecific(data: {
      identifier: number;
      data: ArrayBuffer;
    }): {
      type: number;
      data: Uint8Array;
    };
    static txPowerLevel(
      data: number
    ): {
      type: number;
      data: Uint8Array;
    };
    static connectionInterval(param: {
      intervalMin: number;
      intervalMax: number;
    }): {
      type: number;
      data: DataView;
    };
    static solicitationUUID16List(
      param: ArrayBuffer
    ): {
      type: number;
      data: Uint8Array;
    };
    static solicitationUUID128List(
      param: ArrayBuffer
    ): {
      type: number;
      data: Uint8Array;
    };
    static serviceDataUUID16(param: {
      uuid: number;
      data?: ArrayBuffer;
    }): {
      type: number;
      data: Uint8Array;
    };
    static serviceDataUUID128(param: {
      uuid: number;
      data?: ArrayBuffer;
    }): {
      type: number;
      data: Uint8Array;
    };
    static appearance(
      param: number
    ): {
      type: number;
      data: Uint8Array;
    };
    static publicAddress(
      param: string
    ): {
      type: number;
      data: Uint8Array;
    };
    static randomAddress(
      param: string
    ): {
      type: number;
      data: Uint8Array;
    };
    static advertisingInterval(
      param: number
    ): {
      type: number;
      data: Uint8Array;
    };
    //static deviceAddress(param) {}
    static role(
      param: number
    ): {
      type: number;
      data: Uint8Array;
    };
    static uri(
      param: string
    ): {
      type: number;
      data: Uint8Array;
    };
  }
}

export = BTUtils;
