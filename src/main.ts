import Avatar from 'avatar'
import { Application, Skin } from 'piu/MC'
import MarqueeLabel from 'marquee-label'

declare const global: any

const SPEECH_STR =
  'わが輩は猫である。名前はまだ無い。どこで生れたかとんと見当けんとうがつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。'

const fluid = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

const balloon = new MarqueeLabel({
  state: 0,
  bottom: 10,
  right: 10,
  width: 180,
  height: 40,
  name: 'balloon',
  string: SPEECH_STR,
})

const ap = new Application(null, {
  displayListLength: 4096,
  ...fluid,
  skin: new Skin({ fill: 'white' }),
  contents: [
    new Avatar({
      width: 320,
      height: 240,
      name: 'avatar',
    }),
  ],
})

function startSpeech() {
  if (ap.content('balloon') == null) {
    ap.add(balloon)
    const avatar = ap.content('avatar')
    avatar && avatar.delegate('startSpeech')
  }
}

function stopSpeech() {
  if (ap.content('balloon') != null) {
    ap.remove(balloon)
    const avatar = ap.content('avatar')
    avatar && avatar.delegate('stopSpeech')
  }
}

if (global.button != null) {
  global.button.a.onChanged = function() {
    if (this.read()) {
      startSpeech()
    }
  }
  global.button.b.onChanged = function() {
    if (this.read()) {
      stopSpeech()
    }
  }
}
