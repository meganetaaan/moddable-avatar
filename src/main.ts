import Avatar from 'avatar'
import { Application, Skin } from 'piu/MC'

const fluid = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}
const ap = new Application(null, {
  ...fluid,
  skin: new Skin({ fill: 'black' }),
  contents: [
    new Avatar({
      width: 320,
      height: 240,
    }),
  ],
})
