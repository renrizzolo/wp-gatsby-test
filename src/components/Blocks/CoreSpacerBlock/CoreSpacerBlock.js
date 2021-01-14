import React from 'react';
import PropTypes from 'prop-types';

const CoreSpacerBlock = (props) => {
  // console.log('spacer', props.attributes);
  const { className, spacerHeight } = props.attributes;
  const classes = ['core-block-spacer'];

  if (className) {
    classes.push(className);
  }

  return (
    <div
      {...(classes.length > 0 && { className: classes.join(' ') })}
      style={{ height: spacerHeight }}
      // dangerouslySetInnerHTML={{ __html: values }}
    />
  );
};

CoreSpacerBlock.propTypes = {
  attributes: PropTypes.shape({
    className: PropTypes.string,
  }),
};

CoreSpacerBlock.defaultProps = {
  attributes: {
    spacerHeight: 0,
    className: null,
  },
};

export default CoreSpacerBlock;
