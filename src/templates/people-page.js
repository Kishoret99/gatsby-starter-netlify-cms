import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

export const PeopleTemplate = ({
  title
}) => {

  return (
    <section className="section">
      <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
        {title}
      </h1>
    </section>
  )
}

PeopleTemplate.propTypes = {
  title: PropTypes.string
}

const PeoplePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <PeopleTemplate
      title={post.frontmatter.title}
    />
  )
}

PeoplePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default PeoplePage;

export const pageQuery = graphql`
  query PeoplePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`
