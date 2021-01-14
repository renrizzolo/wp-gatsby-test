import React, { useState } from "react"
import { cx } from "@linaria/core"
import { Helmet } from "react-helmet"

const CoreEmdbedBlock = ({ attributes }) => {
  const { className, align, url, providerNameSlug } = attributes

  const classes = getBlockClassString(
    { className, align },
    `core-embed-block__${providerNameSlug} margin-bottom-lg`
  )

  return (
    <div className={classes}>
      <div className="responsive-iframe margin-bottom-md">
        <iframe
          src={url}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
        />
      </div>
      {caption && <p dangerouslySetInnerHTML={{ __html: caption }} />}
    </div>
  )
}
export default CoreEmdbedBlock
