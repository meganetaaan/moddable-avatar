declare class Timer {
  static set(
    callback: TimerCallback,
    interval?: number,
    repeat?: boolean
  ): TimerId;
  static repeat(callback: TimerCallback, interval: number): TimerId;
  static schedule(id: TimerId, interval: number, repeat?: boolean): TimerId;
  static clear(id: TimerId): void;
  static delay(ms: number): void;
}

type TimerCallback = (id: TimerId) => void;
type TimerId = number;

export = Timer;
