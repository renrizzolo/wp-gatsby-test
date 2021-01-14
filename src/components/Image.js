import React, { useState } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

const Image = ({
  props,
  src,
  aspectRatio = 16 / 9,
  alt,
  showCaption,
  showLoading,
  ...rest
}) => {
  const [loading, setLoading] = useState(true)

  // No featured image? Bail...
  if (!props?.featuredImage?.node?.localFile?.childImageSharp && !src) {
    return null
  }

  const onStartLoad = () => {
    // setLoading(true)
  }
  const onLoad = () => {
    setLoading(false)
  }

  const imgProps = src
    ? {}
    : {
        fluid: props.featuredImage.node.localFile.childImageSharp.fluid,
        alt: props.altText,
        onStartLoad,
        onLoad,
      }
  // Otherwise display featured image.
  return src ? (
    <>
      <Img
        fluid={{
          aspectRatio,
          src,
          srcSet: "",
          sizes: "",
          // aspectRatio: number
          // src: string
          // srcSet: string
          // sizes: string
          // base64?: string
          // tracedSVG?: string
          // srcWebp?: string
          // srcSetWebp?: string
          // media?: string
        }}
        alt={alt}
        {...imgProps}
        {...rest}
      />
      {loading && showLoading && "...loading"}
    </>
  ) : (
    <>
      <Img {...imgProps} {...rest} />
      {loading && showLoading && "...loading"}
      {props.featuredImage.node.caption && showCaption && (
        <figcaption
          itemProp="description"
          className="text-center margin-x-sm"
          dangerouslySetInnerHTML={{ __html: props.featuredImage.node.caption }}
        />
      )}
    </>
  )
}

export default Image

export const query = graphql`
  fragment FeaturedImageQuery on WpPost {
    featuredImage {
      node {
        altText
        sourceUrl
        caption
        id
        localFile {
          childImageSharp {
            fluid(
              maxWidth: 1200
              maxHeight: 720
              quality: 70
              webpQuality: 75
            ) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  }
`
