export default {
  bind(el, {value}) {
    // eslint-disable-next-line no-undef
    M.Tooltip.init(el, {html: value.text, position: value.position})
  },
  unbind(el) {
    // eslint-disable-next-line no-undef
    const tooltip = M.Tooltip.getInstance(el)
    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}
