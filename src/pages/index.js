import React from "react"
import Helmet from "react-helmet"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import TimeLine from "../components/Timeline"

export default ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <section
        className="text-center px-3 py-5 mx-auto"
        style={{ maxWidth: 600 }}
      >
        <h1 className="mb-4">The Springdale Timeline</h1>
        <p className="mb-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>

      <TimeLine
        events={data.events.edges.map((event) => event.node.frontmatter)}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    events: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "event" } } }
      sort: { fields: frontmatter___timestamp }
    ) {
      edges {
        node {
          frontmatter {
            date
            text
            title
            image {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
