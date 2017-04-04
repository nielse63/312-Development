
export default {
  makeid() {
    const text = []
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 5; i += 1) {
      text.push(possible.charAt(Math.floor(Math.random() * possible.length)))
    }
    return text.join('')
  },
}
