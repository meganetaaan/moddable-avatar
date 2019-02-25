declare namespace piu {
  class Behavior {}
  class Content {
    constructor(name: string, dictionary: ContentConstructorParam);
    adjust(x: number, y: number): void;
    bubble(id: string, ...extras: any[]): void;
    captureTouch(id: string, x: number, y: number, ticks: number): void;
    defer(id: string, ...extras: any[]): void;
    delegate(id: string, ...extras: any[]): void;
    distribute(id: string, ...extras: any[]): void;
    focus(): void;
    hit(x: number, y: number): Content | undefined;
    measure(): Size;
    moveBy(x: number, y: number): void;
    render(): void;
    sizeBy(width: number, height: number): void;
    start(): void;
    stop(): void;
    onCreate(content: Content, data: object, context: object): void;
    onDisplaying(content: Content): void;
    onFinished(content: Content): void;
    onTimeChanged(content: Content): void;
    onTouchBegan(
      content: Content,
      id: string,
      x: number,
      y: number,
      ticks: number
    ): void;
    onTouchCancelled(content: Content, id: string): void;
    onTouchended(
      content: Content,
      id: string,
      x: number,
      y: number,
      ticks: number
    ): void;
    onTouchMoved(
      content: Content,
      id: string,
      x: number,
      y: number,
      ticks: number
    ): void;
    static template(
      anonymous: () => ContentConstructorParam
    ): () => ContentConstructor;

    readonly previous: Content | null;
    readonly next: Content | null;
    readonly application: Application;
    readonly container: Container | null;
    readonly index: number;
    name: string;
    active: boolean;
    anchor: string;
    behavior: object;
    coordinates: Coordinates;
    bounds: Bounds;
    backgroundTouch: boolean;
    exclusiveTouch: boolean;
    multipleTouch: boolean;

    time: number;
    duration: number;
    fraction: number;
    interval: number;
    loop: boolean;

    offset: undefined | Position;
    position: undefined | Position;
    size: Size;
    state: number;
    variant: number;
    skin: Skin | null;
    style: Style | null;
    visible: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
  }
  type Skin = TextureSkin | ColorSkin;
  class Style {
    constructor(dictionary: StyleConstructorParam);
  }
  class Texture {}
  class ColorSkin {
    constructor(dictionary: ColorSkinConstructorParam);
    borders: Coordinates;
    fill: Color | Color[];
    stroke: Color | Color[];
  }
  class TextureSkin {
    constructor(dictionary: TextureSkinConstructorParam);
    texture: Texture;
    color: Color;
    bounds: Bounds;
    height: number;
    width: number;
    states?: number;
    variants?: number;
    tiles?: Coordinates;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }
  class Transition {}
  class Container extends Content {}
  class Label extends Content {
    constructor(behaviorData: any, dictionary: LabelConstructorParam);
    string: string;
  }
  class Port extends Content {
    drawContent(x: number, y: number, width: number, height: number): void;
    drawLabel(
      string: string,
      x: number,
      y: number,
      width: number,
      height: number
    ): void;
    drawSkin(
      skin: Skin,
      x: number,
      y: number,
      width: number,
      height: number,
      variant?: number,
      state?: number
    ): void;
    drawString(
      string: string,
      style: Style,
      color: Color,
      x: number,
      y: number,
      width: number,
      height: number
    ): void;
    drawStyle(
      string: string,
      style: Style,
      x: number,
      y: number,
      width: number,
      height: number,
      ellipsis?: boolean,
      state?: number
    ): void;
    drawTexture(
      texture: Texture,
      color: Color,
      x: number,
      y: number,
      sx: number,
      sy: number,
      sw: number,
      sh: number
    ): void;
    fillColor(
      color: Color,
      x: number,
      y: number,
      width: number,
      height: number
    ): void;
    fillTexture(
      texture: Texture,
      color: Color,
      x: number,
      y: number,
      width: number,
      height: number,
      sx?: number,
      sy?: number,
      sw?: number,
      sh?: number
    ): void;
    invalidate(x?: number, y?: number, width?: number, height?: number): void;
    measureString(string: string, style: Style): Size;
    popClip(): void;
    pushClip(x?: number, y?: number, width?: number, height?: number): void;
    onDraw(
      port: Port,
      x: number,
      y: number,
      width: number,
      height: number
    ): void;
  }
  class Text extends Content {}
  class Application extends Container {}
  class Column extends Container {}
  class Layout extends Container {
    onFitHorizontally(layout: Layout, width: number): void;
    onFitVertically(layout: Layout, height: number): void;
    onMeasureHorizontally(layout: Layout, width: number): void;
    onMeasureVertically(layout: Layout, height: number): void;
  }
  class Image extends Content {
    constructor(behaviorData: any, dictionary: ImageConstructorParam);
    readonly frameCount: never;
    frameIndex: number;
  }
  class Die extends Layout {
    constructor(behaviorData: any, dictionary: ContentConstructorParam);
    set(x: number, y: number, width: number, height: number): Die;
    sub(x: number, y: number, width: number, height: number): Die;
    and(x: number, y: number, width: number, height: number): Die;
    or(x: number, y: number, width: number, height: number): Die;
    xor(x: number, y: number, width: number, height: number): Die;
    fill(): Die;
    empty(): Die;
    cut(): void;
    attach(content: Content): void;
    detach(): void;
  }
  class Row extends Container {}
  class Scroller extends Container {
    constructor(behaviorData: any, dictionary: ScrollerConstructorParam);
    readonly constraint: Position;
    loop: boolean;
    scroll: Position;
    tracking: boolean;
    reveal(bounds: Bounds): void;
    scrollBy(dx: number, dy: number): void;
    scrollTo(x: number, y: number): void;
    onScrolled(scroller: Scroller): void;
  }
  interface ContentConstructorParam
    extends Position,
      Bounds,
      ContentState,
      TimeProperty,
      TouchProperty {
    name?: string;
    anchor?: string;
    Behavior?: () => Behavior;
    skin?: Skin;
    Skin?: () => Skin;
    style?: Style;
    Style?: () => Style;
    visible: boolean;
  }
  interface TimeProperty {
    time?: number;
    duration?: number;
    fraction?: number;
    interval?: number;
    loop?: boolean;
  }
  interface ContentState {
    state?: number;
    variant?: number;
  }
  interface TouchProperty {
    active?: boolean;
    backgroundTouch?: boolean;
    exclusiveTouch?: boolean;
    multipleTouch?: boolean;
  }
  interface Coordinates {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }
  interface Position {
    x?: number;
    y?: number;
  }
  interface Size {
    width?: number;
    height?: number;
  }
  interface Bounds extends Position, Size {}
  interface ImageConstructorParam extends ContentConstructorParam {
    path: string;
  }
  interface LabelConstructorParam extends ContentConstructorParam {
    string: string;
  }
  interface ContainerConstructorParam extends ContentConstructorParam {}
  interface ScrollerConstructorParam extends ContainerConstructorParam {
    loop: boolean;
  }
  interface TextureConstructorParam {}
  interface TextureSkinConstructorParam extends Coordinates, Bounds {
    texture?: Texture;
    Texture: TextureConstructor;
    color?: Color;
    states?: number;
    variants?: number;
    tiles?: Coordinates;
  }
  interface ColorSkinConstructorParam {
    borders: Coordinates;
    fill: Color | Color[];
    stroke: Color | Color[];
  }
  type StyleConstructorParam =
    | LabelStyleConstructorParam
    | TextStyleConstructorParam;
  interface ContentConstructor {
    new (name: string, dictionary: ContentConstructorParam): Content;
  }
  interface TextureConstructor {
    new (dictionary: TextureConstructorParam): Texture;
  }
  interface TextStyleConstructorParam extends StyleConstructorParamBase {
    leading: number;
    right: number;
    bottom: number;
    left: number;
  }
  interface LabelStyleConstructorParam extends StyleConstructorParamBase {
    vertical: string;
  }
  interface StyleConstructorParamBase {
    color: Color | Color[];
    font: string;
    horizontal: string;
    top: number;
  }
  type Color = string;
}
export = piu;
