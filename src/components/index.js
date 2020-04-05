
const req = require.context('./', true, /\.(vue)$/i)
const Components = []
req.keys().map(key => {
  Components.push(req(key))
})
Components.install = (Vue, options = null) => {
  req.keys().map(key => {
    const name = key.match(/\w+/)[0]
    Vue.component(name, req(key).default)
  })
}
export default Components
