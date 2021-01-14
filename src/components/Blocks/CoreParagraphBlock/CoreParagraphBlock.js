import React from "react"
import PropTypes from "prop-types"
import { cx } from "@linaria/core"

// make inline images inline
// const paraStyles = css`
//   .gatsby-image-wrapper {
//     margin: var(--space-xs);
//     /* display: inline-flex; */
//     float: left;
//   }
// `;
const CoreParagraphBlock = props => {
  const {
    align,
    backgroundColor,
    className,
    content,
    customBackgroundColor,
    customFontSize,
    customTextColor,
    direction,
    dropCap,
    fontSize,
    textColor,
  } = props.attributes
  const styles = {}
  const classes = ["core-block-paragraph"]

  if (className) {
    classes.push(className)
  }

  if (align) {
    styles.textAlign = align
  }

  if (backgroundColor) {
    classes.push(`has-${backgroundColor}-background-color`)
  }

  if (customBackgroundColor) {
    styles.backgroundColor = customBackgroundColor
  }

  if (customTextColor) {
    styles.color = customTextColor
  }

  if (customFontSize) {
    styles.fontSize = customFontSize + "px"
  }

  if (direction) {
    styles.direction = direction
  }

  if (dropCap) {
    classes.push(`has-drop-cap`)
  }

  if (fontSize) {
    classes.push(`has-${fontSize}-font-size`)
  }

  if (textColor) {
    classes.push(`has-${textColor}-color`)
  }

  return (
    <p
      className={cx(classes.join(" "))}
      style={styles}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  )
}

CoreParagraphBlock.propTypes = {
  attributes: PropTypes.shape({
    align: PropTypes.string,
    backgroundColor: PropTypes.string,
    className: PropTypes.string,
    content: PropTypes.string,
    customBackgroundColor: PropTypes.string,
    customFontSize: PropTypes.string,
    customTextColor: PropTypes.string,
    direction: PropTypes.string,
    dropCap: PropTypes.bool,
    fontSize: PropTypes.string,
    textColor: PropTypes.string,
  }),
}

CoreParagraphBlock.defaultProps = {
  attributes: {
    align: null,
    backgroundColor: null,
    className: null,
    content: "",
    customBackgroundColor: null,
    customFontSize: null,
    customTextColor: null,
    direction: null,
    dropCap: false,
    fontSize: null,
    textColor: null,
  },
}

export default CoreParagraphBlock
