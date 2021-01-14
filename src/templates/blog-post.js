import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
import "@wordpress/block-library/build-style/style.css"
import "@wordpress/block-library/build-style/theme.css"
import "react-medium-image-zoom/dist/styles.css"
import "../css/blog-post.css"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlocksRenderer from "../components/Blocks/BlocksRenderer"

const BlogPostTemplate = ({ data: { previous, next, post } }) => {
  const featuredImage = {
    fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: post.featuredImage?.node?.alt || ``,
  }
  return (
    <Layout>
      <SEO title={post.title} description={post.excerpt} />

      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{parse(post.title)}</h1>

          <p>{post.date}</p>

          {/* if we have a featured image for this post let's display it */}
          {featuredImage?.fluid && (
            <Image
              fluid={featuredImage.fluid}
              alt={featuredImage.alt}
              style={{ marginBottom: 50 }}
            />
          )}
        </header>
        {!!post.blocks && post.blocks.length > 0 ? (
          <section className="post-blocks" itemProp="articleBody">
            {post.blocks.map((block, i) => (
              <BlocksRenderer key={i} block={block} />
            ))}
          </section>
        ) : !!post.content ? (
          <section itemProp="articleBody">{parse(post.content)}</section>
        ) : null}

        <hr />

        <footer>
          <Bio />
        </footer>
      </article>

      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.uri} rel="prev">
                ← {parse(previous.title)}
              </Link>
            )}
          </li>

          <li>
            {next && (
              <Link to={next.uri} rel="next">
                {parse(next.title)} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    # selecting the current post by id
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "MMMM DD, YYYY")

      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }

      blocks {
        __typename
        ...CoreHtmlBlock
        ...CoreHeadingBlock
        ...CoreImageBlock
        ...CoreListBlock
        ...CoreQuoteBlock
        ...CoreMediaTextBlock
        ...CoreSpacerBlock
        ...CoreParagraphBlock
        ...CoreSeparatorBlock
        ...CoreGalleryBlock
        ...CoreCoverBlock
        ...CoreButtonsBlock
        ...Columns
        ...CoreEmbedBlock
        # ...CoreEmbedYoutubeBlock
        # ...CoreEmbedFacebookBlock
        ...Groups
      }
    }

    # this gets us the previous post by id (if it exists)
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }

    # this gets us the next post by id (if it exists)
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`

export const CoreImageBlockFragment = graphql`
  fragment CoreImageBlock on WpCoreImageBlock {
    name
    __typename
    originalContent
    #img {
    #  localFile {
    #    childImageSharp {
    #      fluid(maxWidth: 1000) {
    #        ...GatsbyImageSharpFluid
    #      }
    #    }
    #  }
    #}
    attributes {
      ... on WpCoreImageBlockAttributes {
        align
        alt
        caption
        className
        height
        href
        linkClass
        linkDestination
        linkTarget
        rel
        url
        imgWidth: width
      }
    }
  }
`

export const CoreHeadingBlockFragment = graphql`
  fragment CoreHeadingBlock on WpCoreHeadingBlock {
    name
    attributes {
      __typename
      ... on WpCoreHeadingBlockAttributes {
        align
        anchor
        className
        # customTextColor
        textColor
        content
        level
      }
    }
  }
`
export const CoreSeparatorBlock = graphql`
  fragment CoreSeparatorBlock on WpCoreSeparatorBlock {
    __typename
    attributes {
      __typename
      ... on WpCoreSeparatorBlockAttributes {
        className
        color
      }
    }
  }
`

export const CoreColumnsBlock = graphql`
  fragment CoreColumnsBlock on WpCoreColumnsBlock {
    name
    attributes {
      __typename
      ... on WpCoreColumnsBlockAttributes {
        align
        className
        backgroundColor
        textColor
        verticalAlignment
      }
    }
  }
`
export const CoreColumnBlock = graphql`
  fragment CoreColumnBlock on WpCoreColumnBlock {
    name
    attributes {
      __typename
      ... on WpCoreColumnBlockAttributes {
        className
        verticalAlignment
        width
      }
    }
    innerBlocks {
      __typename
      ... on WpCoreColumnBlock {
        name
        attributes {
          ... on WpCoreColumnBlockAttributes {
            className
            verticalAlignment
            width
            className
          }
        }
      }
    }
  }
`

export const Columns = graphql`
  fragment Columns on WpCoreColumnsBlock {
    name
    attributes {
      __typename
      ... on WpCoreColumnsBlockAttributes {
        align
        className
        verticalAlignment
      }
    }
    innerBlocks {
      __typename
      ... on WpCoreColumnBlock {
        name
        attributes {
          ... on WpCoreColumnBlockAttributes {
            className
            verticalAlignment
            width
            className
          }
        }
        innerBlocks {
          __typename
          ...CoreHeadingBlock
          ...CoreHtmlBlock
          ...CoreEmbedBlock
          # ...CoreEmbedFacebookBlock
          # ...CoreEmbedYoutubeBlock
          ...CoreImageBlock
          ...CoreListBlock
          ...CoreSpacerBlock
          ...CoreParagraphBlock
          ...CoreGalleryBlock
          ...CoreCoverBlock
          ...CoreButtonsBlock
          ...CoreQuoteBlock
          ...Groups

          ... on WpCoreColumnsBlock {
            __typename
            innerBlocks {
              __typename
              ... on WpCoreColumnBlock {
                name
                attributes {
                  ... on WpCoreColumnBlockAttributes {
                    className
                    verticalAlignment
                    width
                    className
                  }
                }
                innerBlocks {
                  __typename
                  ...CoreButtonsBlock
                  ...CoreHeadingBlock
                  ...CoreHtmlBlock
                  ...CoreImageBlock
                  ...CoreEmbedBlock
                  # ...CoreEmbedFacebookBlock
                  # ...CoreEmbedYoutubeBlock
                  innerBlocks {
                    ...CoreButtonsBlock
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const CoreMediaTextBlockFragment = graphql`
  fragment CoreMediaTextBlock on WpCoreMediaTextBlock {
    name
    innerBlocks {
      ... on WpCoreParagraphBlock {
        ...CoreParagraphBlock
      }
      ... on WpCoreListBlock {
        ...CoreListBlock
      }
      ... on WpCoreHeadingBlock {
        ...CoreHeadingBlock
      }
    }
    attributes {
      __typename

      ... on WpCoreMediaTextBlockAttributes {
        mediaAlign: align
        className
        backgroundColor
        # customBackgroundColor
        linkClass
        linkTarget
        mediaLinkDestination: linkDestination
        isStackedOnMobile
        mediaType
        mediaId
        mediaAlt
        mediaUrl
        mediaWidth
        mediaPosition
        rel
        imageFill
        verticalAlignment
        href
      }
    }
  }
`
export const CoreQuoteBlockFragment = graphql`
  fragment CoreQuoteBlock on WpCoreQuoteBlock {
    name
    attributes {
      __typename
      ... on WpCoreQuoteBlockAttributes {
        className
        align
        value
        citation
      }
    }
  }
`

// embed attributes aren't working:
// Abstract type WpCoreEmbedBlockAttributesUnion must resolve to an Object type at runtime for field WpCoreEmbedBlock.attributes with value { ... }, received "undefined". Either the WpCoreEmbedBlockAttributesUnion type
// should provide a "resolveType" function or each possible type should provide an "isTypeOf" function.
export const CoreEmbedBlock = graphql`
  fragment CoreEmbedBlock on WpCoreEmbedBlock {
    __typename
    originalContent
    attributes {
      ... on WpCoreEmbedBlockAttributes {
        url
        providerNameSlug
        caption
        className
        align
      }
    }
  }
`
// current wp version uses CoreEmbedBlock instead of these
// export const CoreEmbedFacebookBlock = graphql`
//   fragment CoreEmbedFacebookBlock on WpCoreEmbedFacebookBlock {
//     __typename
//     originalContent
//   }
// `
// export const CoreEmbedYoutubeBlock = graphql`
//   fragment CoreEmbedYoutubeBlock on WpCoreEmbedYoutubeBlock {
//     __typename
//     originalContent
//   }
// `

export const CoreHtmlBlock = graphql`
  fragment CoreHtmlBlock on WpCoreHtmlBlock {
    __typename
    attributes {
      htmlContent: content
    }
  }
`

export const CoreGroupsBlock = graphql`
  fragment Groups on WpCoreGroupBlock {
    name
    __typename
    attributes {
      __typename
      ... on WpCoreGroupBlockAttributes {
        className
      }
    }
    innerBlocks {
      __typename
      ...CoreHtmlBlock
      ...CoreHeadingBlock
      ...CoreImageBlock
      ...CoreListBlock
      ...CoreSpacerBlock
      ...CoreParagraphBlock
      ...CoreGalleryBlock
      ...CoreCoverBlock
      ...CoreButtonsBlock
      ...CoreEmbedBlock
    }
  }
`
export const CoreListBlockFragment = graphql`
  fragment CoreListBlock on WpCoreListBlock {
    name
    attributes {
      __typename
      className
      ordered
      values
    }
  }
`
export const CoreSpacerBlockFragment = graphql`
  fragment CoreSpacerBlock on WpCoreSpacerBlock {
    name
    attributes {
      ... on WpCoreSpacerBlockAttributes {
        __typename
        className
        spacerHeight: height
      }
    }
  }
`
export const CoreParagraphBlockFragment = graphql`
  fragment CoreParagraphBlock on WpCoreParagraphBlock {
    name
    attributes {
      __typename
      ... on WpCoreParagraphBlockAttributes {
        align
        backgroundColor
        className
        content
        # customBackgroundColor
        # customFontSize
        # customTextColor
        direction
        dropCap
        fontSize
        textColor
      }
    }
  }
`

export const CoreGalleryBlockFragment = graphql`
  fragment CoreGalleryBlock on WpCoreGalleryBlock {
    name
    originalContent
    attributes {
      __typename
      ... on WpCoreGalleryBlockAttributes {
        align
        className
        ids
        linkTo
        columns
        ids
        imageCrop
      }
    }
  }
`
export const CoreCoverBlockFragment = graphql`
  fragment CoreCoverBlock on WpCoreCoverBlock {
    name
    attributes {
      __typename
      ... on WpCoreCoverBlockAttributes {
        align
        backgroundType
        className
        customOverlayColor
        dimRatio
        hasParallax
        id
        overlayColor
        url
      }
    }
  }
`

export const CoreButtonsBlockFragment = graphql`
  fragment CoreButtonsBlock on WpCoreButtonsBlock {
    name
    __typename
    attributes {
      ... on WpCoreButtonsBlockAttributes {
        align
        className
      }
    }
    innerBlocks {
      ... on WpCoreButtonBlock {
        __typename
        attributes {
          ... on WpCoreButtonBlockAttributes {
            __typename
            align
            borderRadius
            backgroundColor
            className
            text
            textColor
            title
            url
            # customBackgroundColor
            # customGradient
            # customTextColor
            rel
            linkTarget
          }
        }
      }
    }
  }
`
