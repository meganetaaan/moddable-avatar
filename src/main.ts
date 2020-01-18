import Avatar from 'avatar'
import { Application, Skin } from 'piu/MC'
import MarqueeLabel from 'marquee-label'

const SPEECH_STR =
  'わが輩は猫である。名前はまだ無い。　どこで生れたかとんと見当けんとうがつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。'

const fluid = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}
const ap = new Application(null, {
  displayListLength: 4096,
  ...fluid,
  skin: new Skin({ fill: 'white' }),
  contents: [
    new Avatar({
      width: 320,
      height: 240,
    }),
    /*
    new BalloonLabel({
      bottom: 30,
      right: 40,
      width: 80,
      height: 30,
      string: 'Hello',
    }),
    */
    new MarqueeLabel({
      state: 0,
      bottom: 10,
      right: 10,
      width: 180,
      height: 40,
      string: SPEECH_STR,
    }),
  ],
})
