import { Content, Skin, Texture, Behavior } from 'piu/MC'
const AVATAR_COLOR_MOUTH = 'white'

const AvatarMouthSkinTexture = Texture.template({
  path: 'mouth-alpha.bmp',
})

const AvatarMouthSkin = Skin.template({
  Texture: AvatarMouthSkinTexture,
  width: 80,
  height: 40,
  variants: 80,
  states: 40,
  color: AVATAR_COLOR_MOUTH,
})

const AvatarMouth = Content.template(({ top, right, bottom, left, x, y, name }) => ({
  top,
  right,
  bottom,
  left,
  x,
  y,
  name,
  width: 80,
  height: 40,
  duration: 60 * 6,
  interval: 60,
  Skin: AvatarMouthSkin,
  Behavior: class extends Behavior {
    onTimeChanged(content: Content) {
      let v = Math.floor(content.fraction * 10)
      if (v > 5) {
        v = 10 - v
      }
      content.variant = v
    }
    onFinished(content: Content) {
      content.bubble('onOpenFinished')
      content.time = 0
    }
    onUpdate(content: OffsetContainer) {
      const ctx = content.props
    }
    startSpeech(content: Content) {
      content.loop = true
      content.start()
    }
    stopSpeech(content: Content) {
      content.stop()
      content.loop = false
      content.variant = 0
    }
  },
}))

export AvatarMouth
