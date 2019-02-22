import NeoPixel from "./neopixel";
import { Color } from "commodetto/index";
// FIXME
// import Timeline from "../piu/timeline"
type Timeline = any;
declare class NeoStrand extends NeoPixel {
  start(delay: number): void;
  stop(): void;
  setScheme(schemes: NeoStrandEffect[]): void;
  set(idx: number, color: Color, start?: number, end?: number): void;
  add(idx: number, color: Color, start?: number, end?: number): void;
  sub(idx: number, color: Color, start?: number, end?: number): void;
  hsvToRgb(h: number, s: number, v: number): Color;
  rgbToHsv(r: number, g: number, b: number): Color;
  op(
    idx: number,
    rgb: Color,
    mode?: number,
    start?: number,
    end?: number
  ): void;
}
declare class NeoStrandEffect {
  constructor(dictionary: NeoStrand.NeoStrandEffectConstructorParam);
  timeline: Timeline;
  reset(effect: NeoStrandEffect): void;
  loopPrepare(effect: NeoStrandEffect): void;
  activate(effect: NeoStrandEffect): void;
  idle(effect: NeoStrandEffect, ticks: number): void;
}

declare namespace NeoStrand {
  interface NeoStrandEffectConstructorParam {
    strand: NeoStrand;
    start?: number;
    end?: number;
    reverse?: number;
    duration?: number;
    position?: number | string;
    speed?: number;
    size?: number;
    loop?: number;
    tickle?: number;
    onComplete?: () => void;
  }
  interface HueSpanConstructorParam extends NeoStrandEffectConstructorParam {
    saturation?: number;
    value?: number;
  }
  interface SineConstructorParam extends NeoStrandEffectConstructorParam {
    amptitude?: number;
    offset?: number;
    vary?: number;
  }
  interface MarqeeConstructorParam extends NeoStrandEffectConstructorParam {
    sizeA?: number;
    sizeB?: number;
    rgbA?: number;
    rgbB?: number;
  }
  interface PulseConstructorParam extends NeoStrandEffectConstructorParam {
    mode?: number;
    fade?: number;
    rgb?: {
      r: number;
      g: number;
      b: number;
    };
    position?: number;
  }
  interface PatternConstructorParam extends NeoStrandEffectConstructorParam {
    pattern?: number[];
    mode?: number;
  }
  interface DimConstructorParam extends NeoStrandEffectConstructorParam {
    amount: number;
  }
  interface EaseConstructorParam extends NeoStrandEffectConstructorParam {
    // FIXME
    easing: any;
    mode?: number;
  }
  class HueSpan extends NeoStrandEffect {
    constructor(dictionary: HueSpanConstructorParam);
    hue: number;
  }
  class Sine extends NeoStrandEffect {
    constructor(dictionary: SineConstructorParam);
    effectValue: number;
  }
  class Marqee extends NeoStrandEffect {
    constructor(dictionary: MarqeeConstructorParam);
    step: number;
  }
  class Pulse extends NeoStrandEffect {
    constructor(dictionary: PulseConstructorParam);
    pulseLoc: number;
    effectValue: number;
  }
  class Pattern extends NeoStrandEffect {
    constructor(dictionary: PatternConstructorParam);
    effectValue: number;
  }
  class Dim extends NeoStrandEffect {
    constructor(dictionary: DimConstructorParam);
    effectValue: number;
  }
  class Ease extends NeoStrandEffect {
    constructor(dictionary: EaseConstructorParam);
    step: number;
  }
}
// FIXME
type Scheme = any;

export = NeoPixel;
