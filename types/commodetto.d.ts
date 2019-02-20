declare namespace Commodetto {
  enum CommodettoBitmapFormat {
    kCommodettoBitmapDefault = 1,
    kCommodettoBitmapMonochrome = 3,
    kCommodettoBitmapGray16,
    kCommodettoBitmapGray256,
    kCommodettoBitmapRGB332,
    kCommodettoBitmapRGB565LE,
    kCommodettoBitmapRGB565BE,
    kCommodettoBitmap24RGB,
    kCommodettoBitmap32RGBA,
    kCommodettoBitmapCLUT16,
    kCommodettoBitmapPacked = 0x80
  }
  class Bitmap {
    constructor(
      width: number,
      height: number,
      format: number,
      buffer: ArrayBuffer,
      offset: number
    );
    width: number;
    height: number;
    format: number;
    static depth(pixelFormat: number): number;
    static readonly Default: number;
    static readonly RLE: number;
    static readonly Monochrome: number;
    static readonly Gray16: number;
    static readonly Gray256: number;
    static readonly RGB332: number;
    static readonly RGB565LE: number;
    static readonly RGB565BE: number;
    static readonly RGB24: number;
    static readonly RGBA32: number;
    static readonly CLUT16: number;
  }
  abstract class PixelsOut {
    constructor(params: { width: number; height: number; pixelFormat: number });
    begin(x: number, y: number, width: number, height: number): void;
    end(): void;
    continue(x: number, y: number, width: number, height: number): void;
    send(pixels: ArrayBuffer, offset: number, count: number): void;
    adaptInvalid(r: Rectangle): void;
    pixelsToBytes(count: number): void;
    readonly width: number;
    readonly height: number;
    readonly pixelFormat: number;
    readonly async: boolean;
    readonly c_dispatch?: HostBuffer;
    // clut: any;
  }
  class HostBuffer extends ArrayBuffer {}
  class SPIOut extends PixelsOut {}
  class BufferOut extends PixelsOut {
    readonly bitmap: Bitmap;
  }
  class BMPOut extends PixelsOut {}
  class RLE4Out extends PixelsOut {}
  class ColorCellOut extends PixelsOut {}

  function loadJPEG(image: ArrayBuffer): Bitmap;
  class JPEG {
    constructor();
    constructor(jpegData: ArrayBuffer);
    read(): Bitmap;
    push(buffer?: ArrayBuffer): void;
    readonly ready: boolean;
    readonly width: number;
    readonly height: number;
  }

  class PNG {
    static decompress(pngData: ArrayBuffer, hasAlpha?: boolean): Bitmap;
    read(): ArrayBuffer;
    readonly width: number;
    readonly height: number;
    readonly depth: number;
    readonly channels: number;
    readonly bpp: number;
  }

  function parseBMF(): BMFont;
  function parseBMP(): Bitmap;

  abstract class Render {
    constructor(pixelsOut: PixelsOut, dictionary: any);
    begin(x: number, y: number, width: number, height: number): void;
    begin(x: number, y: number): void;
    begin(): void;
    end(): void;
    continue(x: number, y: number, width: number, height: number): void;
    adaptInvalid(r: Rectangle): void;
  }
  type Rectangle = any;

  class Convert {
    constructor(src: Bitmap, dst: Bitmap);
    convert(src: ArrayBuffer | HostBuffer, dst: ArrayBuffer): void;
  }

  class Poco extends Render {
    readonly height: number;
    readonly width: number;
    constructor(
      pixelsOut: PixelsOut,
      dictionary: {
        displaylistLength: number;
        clip(x: number, y: number, width: number, height: number): void;
        clip(): void;
        origin(x: number, y: number): void;
        makeColor(r: number, g: number, b: number): Color;
        fillRectangle(
          color: ColorCellOut,
          x: number,
          y: number,
          width: number,
          height: number
        ): void;
        blendRectangle(
          color: ColorCellOut,
          blend: number,
          x: number,
          y: number,
          width: number,
          height: number
        ): void;
        drawPixel(color: ColorCellOut, x: number, y: number): void;
        drawBitmap(
          bits: Bitmap,
          x: number,
          y: number,
          sx?: number,
          sy?: number,
          sw?: number,
          sh?: number
        ): void;
        drawMonochrome(
          monochrome: Bitmap,
          fore: number,
          back: number,
          x: number,
          y: number,
          sx?: number,
          sy?: number,
          sw?: number,
          sh?: number
        ): void;
        drawGray(
          bits: Bitmap,
          color: number,
          x: number,
          y: number,
          sx?: number,
          sy?: number,
          sw?: number,
          sh?: number,
          blend?: number
        ): void;
        drawMasked(
          bits: Bitmap,
          x: number,
          y: number,
          sx?: number,
          sy?: number,
          sw?: number,
          sh?: number,
          mask?: number,
          mask_sx?: number,
          mask_sy?: number,
          blend?: number
        ): void;
        fillPattern(
          bits: Bitmap,
          x: number,
          y: number,
          w: number,
          h: number,
          sx?: number,
          sy?: number,
          sw?: number,
          sh?: number,
          mask?: number,
          mask_sx?: number,
          mask_sy?: number,
          blend?: number
        ): void;
        drawText(
          text: string,
          font: BMFont,
          color: Color,
          x: number,
          y: number,
          width?: number
        ): void;
        getTextWidth(text: string, font: BMFont): number;
        drawFrame(
          frame: ColorCell,
          dictionary: {
            width: number;
            height: number;
          },
          x: number,
          y: number
        ): void;
      }
    );
  }
  // TODO
  type BMFont = any;
  type Color = number;
  type ColorCell = any;
}
