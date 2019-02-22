import { HostBuffer } from "commodetto/index";

declare class NeoPixel extends HostBuffer {
  constructor();
  constructor(dictionary: {
    length: number;
    pin: number;
    order?: string;
    timing?: Timing;
  });
  makeRGB(r: number, g: number, b: number, w?: number): Color;
  makeHSB(h: number, s: number, b: number, w?: number): Color;
  close(): void;
  update(): void;
  setPixel(index: number, color: Color): void;
  fill(color: Color): void;
  fill(color: Color, index: number): void;
  fill(color: Color, index: number, count: number): void;
  brightness: number;
  readonly length: number;
}
type Color = number;
type Timing = {
  mark: Level;
  space: Level;
  reset: Level;
};
type Level = {
  level0: number;
  duration0: number;
  level1: number;
  duration1: number;
};
export = NeoPixel;
