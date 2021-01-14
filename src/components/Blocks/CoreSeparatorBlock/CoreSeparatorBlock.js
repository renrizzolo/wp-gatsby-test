import React from 'react';
import PropTypes from 'prop-types';

const CoreSeparatorBlock = (props) => {
  const { className } = props.attributes;
  const classes = ['core-block-separator'];

  if (className) {
    classes.push(className);
  }

  return <hr {...(classes.length > 0 && { className: classes.join(' ') })} />;
};

CoreSeparatorBlock.propTypes = {
  attributes: PropTypes.shape({
    className: PropTypes.string,
  }),
};

CoreSeparatorBlock.defaultProps = {
  attributes: {
    className: null,
  },
};

export default CoreSeparatorBlock;
