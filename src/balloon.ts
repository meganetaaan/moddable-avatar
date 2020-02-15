import { Skin, Texture, Style, Text, Label } from 'piu/MC'

const BalloonSkinTexture = Texture.template({
  path: 'balloon.png',
})

const BalloonSkin = Skin.template({
  Texture: BalloonSkinTexture,
  x: 0,
  y: 0,
  width: 80,
  height: 40,
  tiles: { left: 8, right: 8, top: 8, bottom: 8 },
})

const BalloonStyle = Style.template({
  font: 'Cica-Regular',
  color: 'black',
  horizontal: 'center',
  vertical: 'middle',
})

const BalloonText = Text.template(({ top, right, bottom, left, width, height, x, y, blocks, string }) => {
  const ret = {
    top,
    right,
    bottom,
    left,
    width,
    height,
    x,
    y,
    blocks,
    string,
    Style: BalloonStyle,
    Skin: BalloonSkin,
  }
  if (blocks == null) {
    delete ret.blocks
  }
  return ret
})

const BalloonLabel = Label.template(({ top, right, bottom, left, width, height, x, y, string }) => ({
  top,
  right,
  bottom,
  left,
  width,
  height,
  x,
  y,
  string,
  Style: BalloonStyle,
  Skin: BalloonSkin,
}))

export default BalloonText
export { BalloonText, BalloonLabel, BalloonSkin }
