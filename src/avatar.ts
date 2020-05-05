import { Content, Container, Skin, Texture, Behavior } from 'piu/MC'

const AVATAR_COLOR_SKIN = 'black'

const NAME_LEFTEYE = 'leftEye'
const NAME_RIGHTEYE = 'rightEye'
const NAME_MOUTH = 'mouth'

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

enum Emotion {
  NEUTRAL = 'NEUTRAL',
  ANGRY = 'ANGRY',
  SAD = 'SAD',
  HAPPY = 'HAPPY',
  SLEEPY = 'SLEEPY',
  DOUBTFUL = 'DOUBTFUL',
  COLD = 'COLD',
  HOT = 'HOT',
}

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
      name: NAME_LEFTEYE,
    }),
    new AvatarEye({
      left: 218,
      top: 84,
      name: NAME_RIGHTEYE,
    }),
    new AvatarMouth({
      left: 120,
      top: 128,
      name: NAME_MOUTH,
    }),
  ],
  interval: 33,
  duration: 330 * 9,
  loop: true,
  Behavior: class extends Behavior {
    onDisplaying(container: OffsetContainer) {
      container.originalPosition = new Map()
      // TODO: make smart
      const leftEye = container.content(NAME_LEFTEYE)
      if (leftEye != null) {
        container.originalPosition.set(leftEye, {
          top: leftEye.y,
          left: leftEye.x,
        })
      }
      const rightEye = container.content(NAME_RIGHTEYE)
      if (rightEye != null) {
        container.originalPosition.set(rightEye, {
          top: rightEye.y,
          left: rightEye.x,
        })
      }
      const mouth = container.content(NAME_MOUTH)
      if (mouth != null) {
        container.originalPosition.set(mouth, {
          top: mouth.y,
          left: mouth.x,
        })
      }
      container.props = {
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
        emotion: Emotion.NEUTRAL,
      }
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
      const mouth = container.content(NAME_MOUTH)
      mouth && mouth.delegate('startSpeech')
    }
    stopSpeech(container: Container) {
      const mouth = container.content(NAME_MOUTH)
      mouth && mouth.delegate('stopSpeech')
    }
    onTimeChanged(container: OffsetContainer) {
      const f = container.fraction

      const leftEye = container.content(NAME_LEFTEYE)
      const rightEye = container.content(NAME_RIGHTEYE)
      // update gaze
      container.props.gazeInterval -= container.interval
      if (container.props.gazeInterval < 0) {
        container.props.gaze = {
          x: Math.random() * 2 - 1,
          y: Math.random() * 2 - 1,
        }
        leftEye && leftEye.delegate('onGazeChange', container.props.gaze)
        rightEye && rightEye.delegate('onGazeChange', container.props.gaze)
        container.props.gazeInterval = normRand(3000, 3000) + 1000
      }

      // update blink
      container.props.blinkInterval -= container.interval
      if (container.props.blinkInterval < 0) {
        leftEye && leftEye.delegate('onBlink')
        rightEye && rightEye.delegate('onBlink')
        container.props.blinkInterval = normRand(2000, 2000) + 1000
      }

      // update breath
      const breath = Math.sin(f * 2 * Math.PI)
      this.onBleath(container, breath)
    }
  },
}))

export default Avatar
export { AvatarIris, FaceContext, Emotion, AvatarEye, AvatarMouth }
