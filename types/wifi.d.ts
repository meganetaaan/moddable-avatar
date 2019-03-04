declare class WiFi {
  constructor(dictionary: WiFi.WiFiParam, callback: (message: string) => void);
  close(): void;
  static scan(
    dictionary: { hidden?: boolean; channel?: number },
    callback: (item: WiFi.WiFiParam | null) => void
  ): void;
  readonly status: number;
  readonly mode: number;
  static connect(dictionary: WiFi.WiFiParam): void;
  static accessPoint(dictionary: {
    ssid: string;
    password?: string;
    channel?: number;
    hidden?: boolean;
    interval?: number;
    max?: number;
  }): void;
}
declare namespace WiFi {
  interface WiFiParam {
    ssid?: string;
    password?: string;
    bssid?: string;
  }
}
export = WiFi;
