import React from "react"
import { cx } from "@linaria/core"
import { Link } from "gatsby"

const Button = ({ to, href, variant, className, children, ...rest }) =>
  to ? (
    <Link to={to} className={cx(`btn btn--${variant}`, className)} {...rest}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cx(`btn btn--${variant}`, className)} {...rest}>
      {children}
    </a>
  )

Button.defaultProps = {
  variant: "accent",
}

export default Button
