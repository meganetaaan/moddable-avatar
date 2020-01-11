import Avatar from 'avatar'
import { BalloonLabel } from 'balloon'
import { Application, Skin } from 'piu/MC'

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
    new BalloonLabel({
      bottom: 30,
      right: 40,
      width: 80,
      height: 30,
      string: 'Hello',
    }),
  ],
})
