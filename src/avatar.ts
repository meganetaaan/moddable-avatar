import { Content, Container, Skin, Texture, Behavior } from 'piu/MC'
import Timer from 'timer'

const AVATAR_COLOR_FG = 'white'

const AvatarEyeSkinTexture = Texture.template({
  path: 'eyes-alpha.bmp',
})

const AvatarEyeSkin = Skin.template({
  Texture: AvatarEyeSkinTexture,
  width: 16,
  height: 16,
  variants: 16,
  states: 16,
  color: AVATAR_COLOR_FG,
})

interface FaceContext {
  gaze: {
    x: number
    y: number
  }
  eyeOpen: number
  mouthOpen: number
  breath: number
}

interface Intervals {
  gazeInterval: number
}

const AvatarEye = Content.template(({ top, right, bottom, left, x, y, name }) => ({
  top,
  right,
  bottom,
  left,
  x,
  y,
  name,
  width: 16,
  height: 16,
  interval: 40,
  duration: 40 * 7,
  skin: new AvatarEyeSkin(),
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

const AvatarMouth = Content.template(({ top, right, bottom, left, x, y, name }) => ({
  top,
  right,
  bottom,
  left,
  x,
  y,
  name,
  width: 90,
  height: 4,
  skin: new Skin({
    fill: AVATAR_COLOR_FG,
  }),
}))

interface OffsetContainerProps extends Intervals, FaceContext {}
interface OffsetContainer extends Container {
  originalPosition: Map<Content, { top: number; left: number }>
  props: OffsetContainerProps
}

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
      left: 82,
      top: 85,
      name: 'leftEye',
    }),
    new AvatarEye({
      left: 222,
      top: 88,
      name: 'rightEye',
    }),
    new AvatarMouth({
      left: 118,
      top: 148,
      name: 'mouth',
    }),
  ],
  interval: 33,
  duration: 330 * 9,
  loop: true,
  Behavior: class extends Behavior {
    onDisplaying(content: OffsetContainer) {
      content.originalPosition = new Map()
      // TODO: make smart
      const leftEye = content.content(0)
      if (leftEye != null) {
        content.originalPosition.set(leftEye, {
          top: leftEye.y,
          left: leftEye.x,
        })
      }
      const rightEye = content.content(1)
      if (rightEye != null) {
        content.originalPosition.set(rightEye, {
          top: rightEye.y,
          left: rightEye.x,
        })
      }
      const mouth = content.content(2)
      if (mouth != null) {
        content.originalPosition.set(mouth, {
          top: mouth.y,
          left: mouth.x,
        })
      }
      content.props = {
        gaze: {
          x: 0,
          y: 0,
        },
        breath: 3,
        eyeOpen: 0,
        mouthOpen: 0,
        gazeInterval: 4000,
      }
      content.start()
    }
    onTimeChanged(content: OffsetContainer) {
      const f = content.fraction
      const offsetY = 3 * Math.sin(f * 2 * Math.PI)
      content.props.gazeInterval -= content.interval
      if (content.props.gazeInterval < 0) {
        content.props.gaze.x = Math.random() * 6 - 3
        content.props.gaze.y = Math.random() * 6 - 3
        content.props.gazeInterval = 2000 * Math.random() + 500
      }
      const gazeX = content.props.gaze.x
      const gazeY = content.props.gaze.y
      for (let i = 0; i < 3; i++) {
        const c = content.content(i)
        const origPos = content.originalPosition.get(c)
        if (origPos != null) {
          if (c.name.indexOf('Eye') >= 0) {
            c.x = origPos.left + gazeX
            c.y = origPos.top + offsetY + gazeY
          } else {
            c.y = origPos.top + offsetY
          }
        }
      }
    }
  },
}))

export default Avatar
