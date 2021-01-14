import React from 'react';
import PropTypes from 'prop-types';

const CoreQuoteBlock = (props) => {
  const { className, value, citation, align } = props.attributes;
  const classes = ['core-block-quote'];

  if (className) {
    classes.push(className);
  }

  return (
    <blockquote
      style={{ textAlign: align || 'left' }}
      {...(classes.length > 0 && { className: classes.join(' ') })}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};

CoreQuoteBlock.propTypes = {
  attributes: PropTypes.shape({
    className: PropTypes.string,
    content: PropTypes.string,
  }),
};

CoreQuoteBlock.defaultProps = {
  attributes: {
    className: null,
    align: null,
    value: null,
    citation: null,
  },
};

export default CoreQuoteBlock;
