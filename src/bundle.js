const req = require.context('./components', true, /\.(vue)$/i)
const Bundle = []
req.keys().map(key => {
  Bundle.push(req(key))
})
Bundle.install = (Vue, options = null) => {
  req.keys().map(key => {
    const name = key.match(/\w+/)[0]
    Vue.component(name, req(key))
  })
}
export default Bundle
