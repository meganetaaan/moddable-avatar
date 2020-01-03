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
    }),
  ],
})

Timer.repeat(() => {
  // debugger
  const content = ap.first
  if (content != null) {
    const danger: any | Container = content
    danger.content(0).start()
    danger.content(1).start()
  }
}, 4000)
