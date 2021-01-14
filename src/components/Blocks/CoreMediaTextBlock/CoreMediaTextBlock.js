import React from "react"
import PropTypes from "prop-types"
import BlocksRenderer from "../BlocksRenderer"
import { cx } from "@linaria/core"

const CoreMediaTextBlock = ({ attributes, innerBlocks }) => {
  const {
    mediaAlign,
    className,
    customBackgroundColor,
    linkClass,
    linkTarget,
    linkDestination,
    isStackedOnMobile,
    backgroundColor,
    mediaType,
    mediaId,
    mediaAlt,
    mediaUrl,
    mediaWidth,
    mediaPosition,
    rel,
    imageFill,
    verticalAlignment,
    href,
  } = attributes
  const blockClass = "wp-block-media-text"
  const classes = []
  const styles = {}
  // console.log('cmb', attributes);
  classes.push("margin-y-lg")
  if (className) {
    classes.push(className)
  }
  if (isStackedOnMobile) {
    classes.push("is-stacked-on-mobile")
  }
  if (backgroundColor) {
    classes.push(`has-${backgroundColor}-background-color`)
  }

  if (customBackgroundColor) {
    styles.backgroundColor = customBackgroundColor
  }
  if (mediaWidth) {
    styles.gridTemplateColumns = `${mediaWidth}% 1fr`
  }
  if (mediaAlign) {
    classes.push(`align${mediaAlign}`)
  }
  const hasBlockWrapper =
    "left" === mediaAlign || "center" === mediaAlign || "right" === mediaAlign

  const img = (
    <>
      <img
        alt={mediaAlt}
        src={mediaUrl}
        // width={mediaWidth} //issa percentage
        className={"img-block height-100%"}
      />
      {/* {caption && <figcaption dangerouslySetInnerHTML={{ __html: caption }} />} */}
    </>
  )
  const Fig = () => (
    <figure className="height-100%">
      {href ? (
        <a
          href={href}
          className={cx(linkClass, "height-100%")}
          target={linkTarget}
          rel={rel}
        >
          {img}
        </a>
      ) : (
        img
      )}
    </figure>
  )
  const Text = () => (
    <div className={"media-text"}>
      {innerBlocks &&
        innerBlocks.map((block, i) => <BlocksRenderer key={i} block={block} />)}
    </div>
  )
  return (
    <div
      style={styles}
      className={cx(
        blockClass,

        classes.length > 0 && classes.join(" ")
      )}
    >
      {mediaPosition !== "right" ? (
        <>
          <Fig /> <Text />
        </>
      ) : (
        <>
          <Text /> <Fig />
        </>
      )}
    </div>
  )
}

CoreMediaTextBlock.propTypes = {
  attributes: PropTypes.shape({
    mediaAlign: PropTypes.string,
    mediaAlt: PropTypes.string,
    className: PropTypes.string,
    href: PropTypes.string,
    linkClass: PropTypes.string,
    linkDestination: PropTypes.string,
    linkTarget: PropTypes.string,
    rel: PropTypes.string,
    mediaUrl: PropTypes.string,
    mediaWidth: PropTypes.string,
  }),
}
CoreMediaTextBlock.defaultProps = {
  attributes: {
    mediaAlign: null,
    mediaAlt: null,
    className: null,
    href: null,
    linkClass: null,
    linkDestination: null,
    linkTarget: null,
    rel: null,
    mediaUrl: null,
    mediaWidth: null,
  },
}
export default CoreMediaTextBlock
