import React from "react"
import Helmet from "react-helmet"

export default ({ children }) => {
  return (
    <>
      <Helmet title="Timeline POC" />

      <main>{children}</main>
    </>
  )
}
