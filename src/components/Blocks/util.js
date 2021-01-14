export function getBlockClassString(props, customClass) {
  const { className, align } = props

  const classes = customClass ? [customClass] : []
  if (className) {
    classes.push(className)
  }
  if (align) {
    const alignClass = `align${align}`
    classes.push(alignClass)
  }
  return classes
}
