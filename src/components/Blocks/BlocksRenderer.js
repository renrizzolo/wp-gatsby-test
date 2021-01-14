import React from "react"
import { cx } from "@linaria/core"
import { Link } from "gatsby"
import { CoreBlock } from "./"
import Button from "../Button"

const widths = {
  25: "col-12 col-6@xs col-3@sm",
  33: "col-12 col-6@xs col-4@sm",
  50: "col-12 col-6@xs col-6@sm",
  66: "col-12 col-6@xs col-8@sm",

  null: "col-12 col@sm",
}
// thse appear to be being used for
// core gallery block columns
const cols = {
  1: "col-12",
  2: "col-12 col-6@xs col-6@sm",
  3: "col-12 col-6@xs col-4@sm",
  4: "col-12 col-6@xs col-3@sm",
  null: "col",
}

const getFlexAlign = align => {
  switch (align) {
    case "center":
      return "justify-center"
      break
    case "left":
      return "justify-start"
      break
    case "right":
      return "justify-end"
    default:
      break
  }
}
// just testing out displaying the columns
const BlocksRenderer = ({
  block,
  colWidth,
  isColumnChild,
  colCount,
  colNumber,
  children,
}) => {
  const { __typename, attributes, innerBlocks, originalContent } = block
  console.log("block", block)

  if (
    __typename.endsWith("CoreButtonsBlock") &&
    attributes &&
    innerBlocks.length > 0
  ) {
    const { align } = attributes
    const alignment = getFlexAlign(align)
    return (
      <div className={cx(alignment, "grid gap-md")}>
        {innerBlocks.map(({ attributes }, i) => (
          <div key={`cbb-${i}`} className="col-content">
            <Link
              to={attributes.url}
              className={cx(
                `btn btn--${attributes.backgroundColor || "primary"}`,
                attributes.className
              )}
              dangerouslySetInnerHTML={{ __html: attributes.text }}
            ></Link>
          </div>
        ))}
      </div>
    )
  }

  // if (__typename.endsWith('CoreEmbedBlock')) {
  //   // idk how2
  //   if (originalContent && originalContent.includes('youtu')) {
  //     const c = originalContent.split('<figcaption>');
  //     const caption = c && c[1] && c[1].split('</figcaption>');

  //     return (
  //       <YoutubeEmbed caption={caption && caption[0]} url={originalContent} />
  //     );
  //   }
  //   return originalContent && <GenericEmbed content={originalContent} />;
  // }
  // if (__typename.endsWith('CoreEmbedInstagramBlock')) {
  //   const parts = originalContent.split('https://www.instagram.com/p/');
  //   let postId;
  //   if (parts.length > 0) {
  //     postId = parts[1].split('/')[0];
  //   } else {
  //     return null;
  //   }

  //   const url = `https://instagram.com/p/${postId}/embed`;
  //   return (
  //     <div className="max-width-xs media-wrapper media-wrapper--9:16 margin-bottom-md">
  //       <iframe
  //         src={url}
  //         frameBorder="0"
  //         allow="autoplay; encrypted-media"
  //         allowFullScreen
  //         title="instagram"
  //       />
  //     </div>
  //   );
  // }
  // if (__typename.endsWith('CoreEmbedFacebookBlock')) {
  //   // console.log(attributes);
  //   const c = originalContent && originalContent.split('<figcaption>');
  //   const caption = c && c[1] && c[1].split('</figcaption>');
  //   return originalContent ? (
  //     <FacebookEmbed
  //       caption={caption && caption[0]}
  //       originalContent={originalContent}
  //     />
  //   ) : null;
  // }
  // if (__typename.endsWith('CoreEmbedYoutubeBlock')) {
  //   // make this a function
  //   const c = originalContent && originalContent.split('<figcaption>');
  //   const caption = c && c[1] && c[1].split('</figcaption>');

  //   return (
  //     <YoutubeEmbed caption={caption && caption[0]} url={originalContent} />
  //   );
  // }

  if (__typename.endsWith("CoreGroupBlock")) {
    return (
      <div className={attributes && attributes.className}>
        {block.innerBlocks &&
          block.innerBlocks.map((innerBlock, i) => (
            <BlocksRenderer key={`cgb-${i}`} index={i} block={innerBlock} />
          ))}
      </div>
    )
  }
  if (attributes && __typename.endsWith("CoreColumnsBlock")) {
    const { className } = attributes
    return (
      <div
        className={cx(
          !isColumnChild
            ? "grid gap-normal@md gap-md divider-bottom"
            : "grid gap-md",

          className
        )}
      >
        {block.innerBlocks &&
          block.innerBlocks.map((innerBlock, i) => (
            <BlocksRenderer
              colNumber={i + 1}
              colCount={block.innerBlocks.length}
              key={`ccsb-${i}`}
              block={innerBlock}
            />
          ))}
      </div>
    )
  }
  if (attributes && __typename.endsWith("CoreColumnBlock")) {
    // when a gutenberg column
    // is set to auto, the width is null
    // using cols[colCount] will work for
    // even cols like auto | auto or auto | 50
    // but it doesn't account for auto | 33n
    return (
      <div
        className={cx(
          !attributes.width
            ? cols[colCount]
            : widths[Math.trunc(attributes.width)],
          attributes.className,
          colCount % 3 === 0 && (colNumber - 1) % 3 === 0 && "col-12@xs"
        )}
      >
        {block.innerBlocks &&
          block.innerBlocks.map((block, i) => (
            <BlocksRenderer
              key={`ccb-${i}`}
              colWidth={attributes.width}
              isColumnChild
              block={block}
            />
          ))}
      </div>
    )
  }

  return <CoreBlock block={block} />
}

export default BlocksRenderer
