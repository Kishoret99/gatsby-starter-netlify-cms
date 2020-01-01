import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const SongDetailsTemplate = ({
  content,
  contentComponent,
  title,
  movieTitle,
  createdDate,
  updatedDate,
  singers,
  lyricist,
  duration,
  locale,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>Created At: {createdDate && (new Date(createdDate)).toDateString()} | Updated At: {updatedDate && (new Date(updatedDate)).toDateString()} | Duration:{duration}</p>
            <p>Language: {locale}</p>
            <h6>Movie Title</h6>
            <p>{movieTitle}</p>
            <br></br>
            
            <h6>Singers</h6>
            {singers.map(singer => (<p key={singer.frontmatter.title}>{singer.frontmatter.title}</p>))}
            <br></br>

            <h6>Lyricist</h6>
            {lyricist && <p>{lyricist.frontmatter.title}</p>}

            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}

SongDetailsTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  movieTitle: PropTypes.string,
  createdDate: PropTypes.string,
  updatedDate: PropTypes.string,
  singers: PropTypes.arrayOf(PropTypes.shape({frontmatter: PropTypes.shape({title: PropTypes.string})})),
  lyricist: PropTypes.shape({frontmatter: PropTypes.shape({title: PropTypes.string})}),
  duration: PropTypes.string,
  locale: PropTypes.string,
  helmet: PropTypes.object,
}

const SongDetails = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <SongDetailsTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
        createdDate={post.frontmatter.createdDate}
        updatedDate={post.frontmatter.updatedDate}
        singers={post.frontmatter.singers}
        lyricist={post.frontmatter.lyricist}
        duration={post.frontmatter.duration}
        locale={post.frontmatter.locale}
      />
    </Layout>
  )
}

SongDetails.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default SongDetails

export const pageQuery = graphql`
  query SongDetailsByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
        createdDate
        updatedDate
        singers: singers{
          frontmatter {
            title
          }
        }
        lyricist {
          frontmatter {
            title
          }
        }
        duration
        locale
      }
    }
  }
`
