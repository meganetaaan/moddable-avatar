import Avatar from 'avatar'
import { Application, Skin, Container } from 'piu/MC'
import Timer from 'timer'

const fluid = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}
const ap = new Application(null, {
  ...fluid,
  contents: [
    new Avatar({
      ...fluid,
      width: 320,
      height: 240,
    }),
  ],
})
