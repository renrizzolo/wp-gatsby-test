import React from 'react';
import PropTypes from 'prop-types';

const CoreHeadingBlock = (props) => {
  const {
    align,
    textColor,
    customBackgroundColor,
    customTextColor,
    anchor,
    className,
    content,
    level,
  } = props.attributes;
  const Heading = 'h' + level;
  const styles = {};
  const classes = ['core-block-heading'];
  // console.log('heading', props.attributes);
  if (className) {
    classes.push(className);
  }

  if (align) {
    styles.textAlign = align;
  }
  if (textColor) {
    classes.push(`has-${textColor}-color`);
  }

  if (customBackgroundColor) {
    styles.backgroundColor = customBackgroundColor;
  }

  if (customTextColor) {
    styles.color = customTextColor;
  }

  return (
    <Heading
      {...(anchor && { id: anchor })}
      {...(classes.length > 0 && { className: classes.join(' ') })}
      style={styles}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

CoreHeadingBlock.propTypes = {
  attributes: PropTypes.shape({
    textColor: PropTypes.string,
    align: PropTypes.string,
    anchor: PropTypes.string,
    className: PropTypes.string,
    content: PropTypes.string,
    level: PropTypes.number,
  }),
};

CoreHeadingBlock.defaultProps = {
  attributes: {
    textColor: null,
    align: null,
    anchor: null,
    className: null,
    content: null,
    level: 2,
  },
};

export default CoreHeadingBlock;
