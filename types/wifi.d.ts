declare class WiFi {
  constructor(dictionary: WiFiParam, callback: (message: string) => void);
  close(): void;
  static scan(
    dictionary: { hidden?: boolean; channel?: number },
    callback: (item: WiFi | null) => void
  ): void;
  readonly status: number;
  readonly mode: number;
  static connect(dictionary: WiFiParam): void;
  static accessPoint(dictionary: {
    ssid: string;
    password?: string;
    channel?: number;
    hidden?: boolean;
    interval?: number;
    max?: number;
  }): void;
}
type WiFiParam =
  | {
      ssid: string;
      password?: string;
    }
  | {
      bssid: string;
      password?: string;
    };
export = WiFi;
