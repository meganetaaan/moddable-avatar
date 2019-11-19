import Avatar from 'avatar'
import { Application, Skin } from 'piu/MC'

const fluid = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}
new Application(null, {
  ...fluid,
  contents: [
    new Avatar({
      ...fluid,
    }),
  ],
})
