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
    measure(string: string): Size;
  }
  class Texture {
    constructor(path: string);
    constructor(dictionary: TextureConstructorParam);
    readonly height: number;
    readonly width: number;
    static template(dictionary: TextureConstructorParam): TextureConstructor;
  }
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
  class Transition {
    constructor(duration: number);
    onBegin(container: Container, ...extras: any[]): void;
    onEnd(container: Container, ...extras: any[]): void;
    onStep(fraction: number): void;
  }
  class Container extends Content {
    constructor(behaviorData: any, dictionary: ContainerConstructorParam);
    clip: boolean;
    readonly first: Content | null;
    readonly last: Content | null;
    readonly length: number;
    readonly transitioning: boolean;
    add(content: Content): void;
    content(at: number | string): Content;
    empty(start?: number, stop?: number): void;
    firstThat(id: string, ...extras: any[]): void;
    insert(content: Content, before: Content): void;
    lastThat(id: string, ...extras: any[]): void;
    remove(content: Content): void;
    replace(content: Content, by: Content): void;
    run(transition: Transition, ...extras: any[]): void;
    swap(content0: Content, content1: Content): void;
    onTransitionBeginning(container: Container): void;
    onTransitionEnded(container: Container): void;
  }
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
  class Text extends Content {
    constructor(begaviorData: any, dictionary: TextConstructorParam);
    blocks: {
      behavior: object | null;
      style: Style | null;
      spans: string | string[];
    }[];
    string: string;
    begin(): void;
    beginBlock(style?: Style, behavior?: object): void;
    beginSpan(style: Style, behavior?: object): void;
    concat(string: string): void;
    end(): void;
    endBlock(): void;
    endSpan(): void;
  }
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
  class Timeline {
    constructor();
    duration: number;
    fraction: number;
    time: number;
    from(
      target: object,
      fromProperties: object,
      duration: number,
      easing?: string,
      delay?: number
    ): Timeline;
    seekTo(time: number): void;
    to(
      target: object,
      fromProperties: object,
      duration: number,
      easing?: string,
      delay?: number
    ): Timeline;
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
  interface TextConstructorParam extends ContentConstructorParam {
    blocks?: {
      behavior: object | null;
      style: Style | null;
      spans: string | string[];
    }[];
    string: string;
  }
  interface ImageConstructorParam extends ContentConstructorParam {
    path: string;
  }
  interface LabelConstructorParam extends ContentConstructorParam {
    string: string;
  }
  interface ContainerConstructorParam extends ContentConstructorParam {
    clip: boolean;
  }
  interface ScrollerConstructorParam extends ContainerConstructorParam {
    loop: boolean;
  }
  interface TextureConstructorParam {
    path: string;
  }
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
