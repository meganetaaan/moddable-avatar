import { Content, Container, Skin, Texture, Behavior } from 'piu/MC'
declare const trace: any

const AVATAR_COLOR_MOUTH = 'white'
const AVATAR_COLOR_SCLERA = 'black'
const AVATAR_COLOR_IRIS = 'white'
const AVATAR_COLOR_SKIN = 'black'

const LEFT_EYE = 'leftEye'
const RIGHT_EYE = 'rightEye'
const MOUTH = 'mouth'
const IRIS = 'iris'
const EYELID = 'eyelid'

const Keys = Object.freeze({
  LEFT_EYE,
  RIGHT_EYE,
  MOUTH,
  IRIS,
  EYELID,
})

function normRand(m: number, s: number): number {
  const a = 1 - Math.random()
  const b = 1 - Math.random()
  const c = Math.sqrt(-2 * Math.log(a))
  if (0.5 - Math.random() > 0) {
    return c * Math.sin(Math.PI * 2 * b) * s + m
  } else {
    return c * Math.cos(Math.PI * 2 * b) * s + m
  }
}

const AvatarIrisSkinTexture = Texture.template({
  path: 'eye-alpha.bmp',
})

const AvatarIrisSkin = Skin.template({
  Texture: AvatarIrisSkinTexture,
  width: 16,
  height: 16,
  variants: 16,
  states: 16,
  color: AVATAR_COLOR_IRIS,
})

const Emotion = Object.freeze({
  NEUTRAL: 'NEUTRAL',
  ANGRY: 'ANGRY',
  SAD: 'SAD',
  HAPPY: 'HAPPY',
  SLEEPY: 'SLEEPY',
  DOUBTFUL: 'DOUBTFUL',
  COLD: 'COLD',
  HOT: 'HOT',
})
type Emotion = typeof Emotion[keyof typeof Emotion]

type EyeOpen = number
type MouthOpen = number
type EyebrowOpen = number
type Gaze = {
  x: number
  y: number
}
type BothSides<T> = {
  left: T
  right: T
}
type FaceContext = {
  gaze: Gaze | BothSides<Gaze>
  eyeOpen: EyeOpen | BothSides<EyeOpen>
  eyebrowOpen: EyebrowOpen | BothSides<EyebrowOpen>
  mouthOpen: MouthOpen
  emotion: Emotion
  breath: number
  autoUpdateGaze: boolean
  autoUpdateBlink: boolean
  autoUpdateBreath: boolean
}
type Intervals = {
  gazeInterval: number
  blinkInterval: number
}

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

const AvatarEyelidSkin = Skin.template({
  Texture: AvatarEyelidSkinTexture,
  width: 24,
  height: 24,
  variants: 24,
  states: 24,
  color: AVATAR_COLOR_SKIN,
})

const AvatarEyelid = Content.template(({ top, right, bottom, left, x, y, name }) => ({
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
  Skin: AvatarEyelidSkin,
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

const AvatarEye = Container.template(({ top, right, bottom, left, x, y, width, height, name }) => ({
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
      name: IRIS,
    }),
    new AvatarEyelid({
      top: 0,
      left: 0,
      name: EYELID,
    }),
  ],
  Behavior: class extends Behavior {
    onDisplaying(container: OffsetContainer) {
      container.originalPosition = new Map()
      // TODO: make smart
      const iris = container.content(IRIS)
      if (iris != null) {
        container.originalPosition.set(iris, {
          top: iris.y,
          left: iris.x,
        })
      }
    }
    onBlink(container: Container) {
      const eyelid = container.content(EYELID)
      eyelid && eyelid.start()
    }
    onGazeChange(container: OffsetContainer, gaze: { x: number; y: number }) {
      const iris = container.content(IRIS)
      if (iris == null) {
        return
      }
      const origPos = container.originalPosition.get(iris)
      if (origPos != null) {
        iris.x = origPos.left + gaze.x * 8
        iris.y = origPos.top + gaze.y * 8
      }
    }
  },
}))

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

type OffsetContainerProps = Intervals & FaceContext
type OffsetContainer = Container & {
  originalPosition: Map<Content, { top: number; left: number }>
  props: OffsetContainerProps
  pressed: boolean
}

class AvatarBehavior extends Behavior {
    onCreate(container: OffsetContainer, data: { props?: OffsetContainerProps }) {
      const defaultProps = {
        gaze: {
          x: 0,
          y: 0,
        },
        breath: 3,
        eyeOpen: 0,
        eyebrowOpen: 0,
        mouthOpen: 0,
        gazeInterval: 4000,
        blinkInterval: 4000,
        autoUpdateBlink: true,
        autoUpdateBreath: true,
        autoUpdateGaze: true,
        emotion: Emotion.NEUTRAL,
      }
      container.pressed = false
      container.props = {
        ...defaultProps,
        ...data?.props,
      }
    }
    onDisplaying(container: OffsetContainer) {
      container.originalPosition = new Map()
      // TODO: make smart
      const leftEye = container.content(LEFT_EYE)
      if (leftEye != null) {
        container.originalPosition.set(leftEye, {
          top: leftEye.y,
          left: leftEye.x,
        })
      }
      const rightEye = container.content(RIGHT_EYE)
      if (rightEye != null) {
        container.originalPosition.set(rightEye, {
          top: rightEye.y,
          left: rightEye.x,
        })
      }
      const mouth = container.content(MOUTH)
      if (mouth != null) {
        container.originalPosition.set(mouth, {
          top: mouth.y,
          left: mouth.x,
        })
      }
      // container.props = {
      //   gaze: {
      //     x: 0,
      //     y: 0,
      //   },
      //   breath: 3,
      //   eyeOpen: 0,
      //   eyebrowOpen: 0,
      //   mouthOpen: 0,
      //   gazeInterval: 4000,
      //   blinkInterval: 4000,
      //   autoUpdateBlink: true,
      //   autoUpdateBreath: true,
      //   autoUpdateGaze: true,
      //   emotion: Emotion.NEUTRAL,
      // }
      container.start()
    }
    onBleath(container: OffsetContainer, breath: number) {
      const offsetY = 3 * breath
      for (let i = 0; i < 3; i++) {
        const c = container.content(i)
        if (c == null) {
          continue
        }
        const origPos = container.originalPosition.get(c)
        if (origPos != null) {
          c.y = origPos.top + offsetY
        }
      }
    }
    startSpeech(container: Container) {
      const mouth = container.content(MOUTH)
      mouth && mouth.delegate('startSpeech')
    }
    stopSpeech(container: Container) {
      const mouth = container.content(MOUTH)
      mouth && mouth.delegate('stopSpeech')
    }
    setFocusPoint(container: OffsetContainer, gaze: { x: number; y: number }) {
      const leftEye = container.content(LEFT_EYE)
      const rightEye = container.content(RIGHT_EYE)
      const leftX = Math.max(-1, Math.min(1, (gaze.x - 78) / 40))
      const rightX = Math.max(-1, Math.min(1, (gaze.x - 218) / 40))
      const y = Math.max(-1, Math.min(1, (gaze.y - 81) / 40))
      leftEye &&
        leftEye.delegate('onGazeChange', {
          x: leftX,
          y,
        })
      rightEye &&
        rightEye.delegate('onGazeChange', {
          x: rightX,
          y,
        })
    }
    setGaze(container: OffsetContainer, gaze: { x: number; y: number }) {
      const leftEye = container.content(LEFT_EYE)
      const rightEye = container.content(RIGHT_EYE)
    const x = Math.max(-1, Math.min(1, gaze.x))
    const y = Math.max(-1, Math.min(1, gaze.y))
      container.props.gaze = { x, y }
      leftEye && leftEye.delegate('onGazeChange', container.props.gaze)
      rightEye && rightEye.delegate('onGazeChange', container.props.gaze)
    }
    onTouchBegan(container: OffsetContainer, id: number, x: number, y: number) {
      container.pressed = false
      container.delegate('setFocusPoint', {
        x,
        y,
      })
    }
    onTouchMoved(container: OffsetContainer, id: number, x: number, y: number) {
      container.delegate('setFocusPoint', {
        x,
        y,
      })
    }
    onTouchEnded(container: OffsetContainer) {
      container.pressed = false
    }
    onTimeChanged(container: OffsetContainer) {
      const f = container.fraction

      const leftEye = container.content(LEFT_EYE)
      const rightEye = container.content(RIGHT_EYE)

      if (container.props.autoUpdateGaze && !container.pressed) {
        // update gaze
        container.props.gazeInterval -= container.interval
        if (container.props.gazeInterval < 0) {
          container.delegate('setGaze', {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
          })
          container.props.gazeInterval = normRand(3000, 3000) + 1000
        }
      }
      if (container.props.autoUpdateBlink) {
        // update blink
        container.props.blinkInterval -= container.interval
        if (container.props.blinkInterval < 0) {
          leftEye && leftEye.delegate('onBlink')
          rightEye && rightEye.delegate('onBlink')
          container.props.blinkInterval = normRand(2000, 2000) + 1000
        }
      }
      if (container.props.autoUpdateBreath) {
        // update breath
        const breath = Math.sin(f * 2 * Math.PI)
        this.onBleath(container, breath)
      }
    }
}

const Avatar = Container.template(({ top, right, bottom, left, x, y, width, height, name }) => ({
  top,
  right,
  bottom,
  left,
  x,
  y,
  width,
  height,
  name,
  skin: new Skin({
    fill: AVATAR_COLOR_SKIN,
  }),
  contents: [
    new AvatarEye({
      left: 78,
      top: 81,
      width: 24,
      height: 24,
      name: LEFT_EYE,
    }),
    new AvatarEye({
      left: 218,
      top: 84,
      width: 24,
      height: 24,
      name: RIGHT_EYE,
    }),
    new AvatarMouth({
      left: 120,
      top: 128,
      name: MOUTH,
    }),
  ],
  interval: 33,
  duration: 330 * 9,
  loop: true,
  active: true,
  Behavior: AvatarBehavior,
}))

export default Avatar
export { AvatarBehavior, AvatarIris, FaceContext, Emotion, AvatarEye, AvatarMouth, Keys }
