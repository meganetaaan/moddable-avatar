import { Content, Container, Skin, Texture, Behavior } from 'piu/MC'

const AVATAR_COLOR_IRIS = 'white'
const AVATAR_COLOR_SCLERA = 'black'
const NAME_IRIS = 'iris'
const NAME_EYELID = 'eyelid'

const AvatarIrisSkinTexture = Texture.template({
  path: 'iris-alpha.bmp',
})

const AvatarIrisSkin = Skin.template({
  Texture: AvatarIrisSkinTexture,
  width: 16,
  height: 16,
  variants: 16,
  states: 16,
  color: AVATAR_COLOR_IRIS,
})

const AvatarIris = Content.template(({ top, right, bottom, left, x, y, name }) => ({
  top,
  right,
  bottom,
  left,
  x,
  y,
  name,
  width: 16,
  height: 16,
  Skin: AvatarIrisSkin,
}))

const AvatarEyelidSkinTexture = Texture.template({
  path: 'eyelid-alpha.bmp',
})

const AvatarEyelid = Content.template(({ top, right, bottom, left, x, y, name, skinColor }) => ({
  top,
  right,
  bottom,
  left,
  x,
  y,
  name,
  width: 24,
  height: 24,
  interval: 40,
  duration: 40 * 7,
  skin: new Skin({
    Texture: AvatarEyelidSkinTexture,
    width: 24,
    height: 24,
    variants: 24,
    states: 24,
    color: skinColor,
  }),
  // Skin: AvatarEyelidSkin,
  Behavior: class extends Behavior {
    onTimeChanged(content: Content) {
      let v = Math.floor(content.fraction * 6)
      content.variant = v
    }
    onFinished(content: Content) {
      content.time = 0
    }
    onUpdate(content: OffsetContainer) {
      const ctx = content.props
    }
  },
}))

const AvatarEye = Container.template(({ top, right, bottom, left, x, y, width, height, name, skinColor }) => ({
  top,
  right,
  bottom,
  left,
  x,
  y,
  width,
  height,

  name,
  clip: true,
  skin: new Skin({
    fill: AVATAR_COLOR_SCLERA,
  }),
  contents: [
    new AvatarIris({
      top: 4,
      left: 4,
      name: NAME_IRIS,
    }),
    new AvatarEyelid({
      top: 0,
      left: 0,
      name: NAME_EYELID,
      skinColor,
    }),
  ],
  Behavior: class extends Behavior {
    onDisplaying(container: OffsetContainer) {
      container.originalPosition = new Map()
      // TODO: make smart
      const iris = container.content(NAME_IRIS)
      if (iris != null) {
        container.originalPosition.set(iris, {
          top: iris.y,
          left: iris.x,
        })
      }
    }
    onBlink(container: Container) {
      const eyelid = container.content(NAME_EYELID)
      eyelid && eyelid.start()
    }
    onGazeChange(container: OffsetContainer, gaze: { x: number; y: number }) {
      const iris = container.content(NAME_IRIS)
      if (iris == null) {
        return
      }
      const origPos = container.originalPosition.get(iris)
      if (origPos != null) {
        iris.x = origPos.left + gaze.x * 3
        iris.y = origPos.top + gaze.y * 3
      }
    }
  },
}))
