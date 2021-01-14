import React from "react"
import PropTypes from "prop-types"
import Zoom from "react-medium-image-zoom"
import Image from "../../Image"

const CoreImageBlock = props => {
  const {
    align,
    alt,
    caption,
    className,
    height,
    href,
    id,
    linkClass,
    linkDestination,
    linkTarget,
    rel,
    url,
    imgWidth: width,
  } = props.attributes || {}
  const { img } = props.block

  // if (!img)
  //   return (
  //     <div dangerouslySetInnerHTML={{ __html: props.block?.originalContent }} />
  //   )
  let blockClass = "core-block-image margin-bottom-md"

  const classes = []

  if (className) {
    classes.push(className)
  }

  if (align) {
    classes.push(`align${align} margin-bottom-md`)
    if (align === "center") {
      // aligncenter uses align-self
      blockClass = `${blockClass} flex`
    }
  }

  const image = (
    <Image
      {...(alt && { alt: alt })}
      // {...(url && { src: url })}
      {...(img
        ? { props: { featuredImage: { node: img } } }
        : url
        ? { src: url }
        : {})}
      {...(width && { width: width })}
      {...(height && { height: height })}
    />
  )

  const figure = (
    <>
      {href ? (
        <a
          {...(linkClass && { className: linkClass })}
          {...(href && { href: href })}
          {...(linkTarget && { target: linkTarget })}
          {...(rel && { rel: rel })}
        >
          {image}
        </a>
      ) : (
        <Zoom wrapStyle={{ display: "block" }}>
          <div className="flex flex-column text-component">
            {image} <div className="margin-bottom-md" />
          </div>
        </Zoom>
      )}
      {caption ? (
        <figcaption
          className="text-component text-center margin-x-sm text-sm"
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      ) : null}
    </>
  )

  if ("left" === align || "center" === align || "right" === align) {
    return (
      <div className={blockClass}>
        <figure
          {...(classes.length > 0 && { className: classes.join(" ") })}
          style={{
            width: width,
            // width: '100%'
          }}
        >
          {figure}
        </figure>
      </div>
    )
  }

  classes.push(blockClass)

  return (
    <figure {...(classes.length > 0 && { className: classes.join(" ") })}>
      {figure}
    </figure>
  )
}

CoreImageBlock.propTypes = {
  attributes: PropTypes.shape({
    align: PropTypes.string,
    alt: PropTypes.string,
    caption: PropTypes.string,
    className: PropTypes.string,
    height: PropTypes.number,
    imgWidth: PropTypes.number,
    href: PropTypes.string,
    linkClass: PropTypes.string,
    linkDestination: PropTypes.string,
    linkTarget: PropTypes.string,
    rel: PropTypes.string,
    url: PropTypes.string,
  }),
}

CoreImageBlock.defaultProps = {
  attributes: {
    align: null,
    alt: null,
    caption: null,
    className: null,
    height: null,
    href: null,
    linkClass: null,
    linkDestination: null,
    linkTarget: null,
    rel: null,
    url: null,
    width: null,
  },
}

export default CoreImageBlock
