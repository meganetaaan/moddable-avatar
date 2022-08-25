import { Content, Skin, Texture, Behavior } from 'piu/MC'
import Timeline from 'piu/Timeline'
import { Emotion } from 'avatar'

const StateEmotionMap = new Map<Emotion, number>()
StateEmotionMap.set(Emotion.HAPPY, 0)
StateEmotionMap.set(Emotion.ANGRY, 1)
StateEmotionMap.set(Emotion.SAD, 2)
StateEmotionMap.set(Emotion.SLEEPY, 3)
StateEmotionMap.set(Emotion.HOT, 4)
StateEmotionMap.set(Emotion.COLD, 5)
StateEmotionMap.set(Emotion.DOUBTFUL, 6)

type Emoticon = Content
const EmoticonTexture = Texture.template({
  path: 'emoticon-alpha.bmp',
})
const EmoticonSkin = Skin.template({
  Texture: EmoticonTexture,
  color: ['red', 'red', 'blue', 'blue'],
  height: 32,
  width: 32,
  states: 32,
  variants: 32,
})

const Emoticon = Content.template(
  ({ top, right, bottom, left, x, y, width = 32, height = 32, name, emotion = Emotion.SAD }) => {
    const state = StateEmotionMap.get(emotion)
    return {
      top,
      right,
      bottom,
      left,
      x,
      y,
      width,
      height,
      name,
      state,
      Skin: EmoticonSkin,
      Behavior: class extends Behavior {
        public timeline?: Timeline
        public reverse: boolean = false
        onDisplaying(icon: Emoticon) {
          this.startAnimation(icon)
        }
        startAnimation(icon: Emoticon) {
          const timeline = (this.timeline = new Timeline())
          timeline.on(icon, { variant: [0, 1, 2, 3, 3] }, 600)
          icon.duration = timeline.duration
          timeline.seekTo(0)
          icon.time = 0
          icon.start()
        }
        onTimeChanged(icon: Emoticon) {
          let time = icon.time
          if (this.reverse) time = icon.duration - time
          this.timeline && this.timeline.seekTo(time)
        }
        onFinished(icon: Emoticon) {
          this.reverse = !this.reverse
          this.startAnimation(icon)
        }
      },
    }
  }
)

export default Emoticon
