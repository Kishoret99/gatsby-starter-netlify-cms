import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export const MovieDetailsTemplate = ({
  title, 
}) => {

  return (
    <section className="section">
      <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
        {title}
      </h1>
    </section>
  )
}

MovieDetailsTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const MovieDetails = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <MovieDetailsTemplate
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

MovieDetails.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default MovieDetails

export const pageQuery = graphql`
  query MovieDetailsByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        updatedDate(formatString: "MMMM DD, YYYY")
        releasedDate(formatString: "MMMM DD, YYYY")
        director {
          frontmatter {
            title
          }
        }
        artists {
          frontmatter {
            title
          }
        }
      }
    }
  }
`
