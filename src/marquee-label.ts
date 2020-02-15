import { Container, Label, Skin, Style, Behavior, Texture } from 'piu/MC'
import { BalloonSkin } from './balloon'
import Timeline from 'piu/Timeline'

const LabelStyle = Style.template({
  font: 'Cica-Regular',
  color: 'black',
  horizontal: 'left',
  vertical: 'middle',
  left: 4,
})

type MarqueeContainer = Container & {
  timeline: Timeline
}

class MarqueeBehavior extends Behavior {
  startScroll(it: MarqueeContainer) {
    let label = it.first
    if (label == null || !(label instanceof Label)) {
      return
    }
    if (label.width < it.width - 4) {
      return
    }
    let duration = label.string.length * 200
    let timeline
    if (it.timeline == null) {
      timeline = it.timeline = new Timeline()
      timeline.to(
        label,
        {
          x: -label.width,
        },
        duration,
        undefined,
        1000
      )
      it.duration = timeline.duration
    } else {
      timeline = it.timeline
    }
    timeline.seekTo(0)
    it.time = 0
    it.start()
  }
  onDisplaying(it: MarqueeContainer) {
    it.delegate('startScroll')
  }
  onFinished(it: MarqueeContainer) {
    it.bubble('onScrolled')
    it.delegate('startScroll')
  }
  onTimeChanged(it: MarqueeContainer) {
    it.timeline.seekTo(it.time)
  }
}

const MarqueeLabel = Container.template(({ left, right, top, bottom, width, height, x, y, name, state, string }) => ({
  left,
  right,
  top,
  bottom,
  width,
  height,
  x,
  y,
  name,
  state,
  Skin: BalloonSkin,
  clip: true,
  Behavior: MarqueeBehavior,
  contents: [
    new Label(null, {
      top: 0,
      bottom: 0,
      left: 0,
      Style: LabelStyle,
      string,
    }),
  ],
}))

export default MarqueeLabel
