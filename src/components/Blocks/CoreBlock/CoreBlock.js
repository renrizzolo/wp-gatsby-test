import React from 'react';
import PropTypes from 'prop-types';

import CoreHeadingBlock from '../CoreHeadingBlock/CoreHeadingBlock';
import CoreImageBlock from '../CoreImageBlock/CoreImageBlock';
import CoreListBlock from '../CoreListBlock/CoreListBlock';
import CoreSpacerBlock from '../CoreSpacerBlock/CoreSpacerBlock';
import CoreQuoteBlock from '../CoreQuoteBlock/CoreQuoteBlock';
import CoreMediaTextBlock from '../CoreMediaTextBlock/CoreMediaTextBlock';
import CoreSeparatorBlock from '../CoreSeparatorBlock/CoreSeparatorBlock';
import CoreGalleryBlock from '../CoreGalleryBlock/CoreGalleryBlock';

import CoreParagraphBlock from '../CoreParagraphBlock/CoreParagraphBlock';

const CoreBlock = (props) => {
  const { __typename, attributes, innerBlocks } = props.block;

  if (__typename.endsWith('CoreHeadingBlock')) {
    return <CoreHeadingBlock attributes={attributes} />;
  }
  if (__typename.endsWith('CoreSeparatorBlock')) {
    return <CoreSeparatorBlock attributes={attributes} />;
  }
  if (__typename.endsWith('CoreImageBlock')) {
    return <CoreImageBlock attributes={attributes} block={props.block} />;
  }
  if (__typename.endsWith('CoreMediaTextBlock')) {
    return (
      <CoreMediaTextBlock attributes={attributes} innerBlocks={innerBlocks} />
    );
  }
  if (__typename.endsWith('CoreQuoteBlock')) {
    return <CoreQuoteBlock attributes={attributes} />;
  }
  if (__typename.endsWith('CoreListBlock')) {
    return <CoreListBlock attributes={attributes} />;
  }
  if (__typename.endsWith('CoreSpacerBlock')) {
    return <CoreSpacerBlock attributes={attributes} />;
  }
  if (__typename.endsWith('CoreParagraphBlock')) {
    return <CoreParagraphBlock attributes={attributes} />;
  }
  if (__typename.endsWith('CoreGalleryBlock')) {
    return <CoreGalleryBlock attributes={attributes} block={props.block} />;
  }
  return null;
};

CoreBlock.propTypes = {
  block: PropTypes.shape({
    __typename: PropTypes.string.isRequired,
    attributes: PropTypes.object.isRequired,
  }).isRequired,
};

CoreBlock.defaultProps = {
  block: {
    __typename: null,
    attributes: null,
  },
};

export default CoreBlock;
