import React from "react"

const CoreGalleryBlock = props => {
  const { className, align } = props.attributes
  const { originalContent } = props.block
  const classes = ["core-gallery-block"]
  if (className) {
    classes.push(className)
  }
  if (align) {
    const alignClass = `align${align}`
    classes.push(alignClass)
  }

  return (
    <div
      className={classes.join(" ")}
      dangerouslySetInnerHTML={{ __html: originalContent }}
    />
  )
}

export default CoreGalleryBlock
