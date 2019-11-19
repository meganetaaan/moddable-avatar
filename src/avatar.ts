import { Content, Container, Skin, Texture, Behavior } from 'piu/MC'

const AVATAR_COLOR_FG = 'white'

const AvatarEyeSkinTexture = Texture.template({
  path: 'eye-alpha.bmp',
})

const AvatarEyeSkin = Skin.template({
  Texture: AvatarEyeSkinTexture,
  width: 16,
  height: 16,
  color: AVATAR_COLOR_FG,
})

const AvatarEye = Content.template(({ top, right, bottom, left, x, y }) => ({
  top,
  right,
  bottom,
  left,
  x,
  y,
  width: 16,
  height: 16,
  skin: new AvatarEyeSkin(),
  Behavior: class extends Behavior {
    onCreated() {}
  },
}))

const AvatarMouth = Content.template(({ top, right, bottom, left, x, y }) => ({
  top,
  right,
  bottom,
  left,
  x,
  y,
  width: 60,
  height: 4,
  skin: new Skin({
    fill: AVATAR_COLOR_FG,
  }),
}))

const Avatar = Container.template(({ top, right, bottom, left, x, y, width, height }) => ({
  top,
  right,
  bottom,
  left,
  x,
  y,
  width,
  height,
  skin: new Skin({
    fill: 'black',
  }),
  contents: [
    new AvatarEye({
      left: 72,
      top: 85,
    }),
    new AvatarEye({
      left: 222,
      top: 88,
    }),
    new AvatarMouth({
      left: 130,
      top: 148,
    }),
  ],
}))

export default Avatar
