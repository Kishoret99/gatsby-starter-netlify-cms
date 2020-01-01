const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = [
    "type MarkdownRemark implements Node { frontmatter: Frontmatter }",
    schema.buildObjectType({
      name: "Frontmatter",
      fields: {
        director: {
          type: "MarkdownRemark",
          resolve: (source, args, context, info) => {
            return context.nodeModel
              .getAllNodes({ type: "MarkdownRemark" })
              .find(people => {
                return people.frontmatter.uid === source.director
              })
          },
        },
        artists: {
          type: "[MarkdownRemark]",
          resolve: (source, args, context, info) => {
            const markdownNodes =  context.nodeModel.getAllNodes({ type: "MarkdownRemark" });
            let artistsMarkdownNodes = [];
            source.artists && Array.isArray(source.artists) && source.artists.forEach(artistObj => {
              const node = markdownNodes.find(markdownNode => markdownNode.frontmatter.uid === artistObj.artist);
              if(node) {
                artistsMarkdownNodes.push(node);
              }
            })
            return artistsMarkdownNodes;
          },
        },
        singers: {
          type: "[MarkdownRemark]",
          resolve: (source, args, context, info) => {
            const markdownNodes =  context.nodeModel.getAllNodes({ type: "MarkdownRemark" });
            let artistsMarkdownNodes = [];
            source.singers && Array.isArray(source.singers) && source.singers.forEach(singerId => {
              const node = markdownNodes.find(markdownNode => markdownNode.frontmatter.uid === singerId);
              if(node) {
                artistsMarkdownNodes.push(node);
              }
            })
            return artistsMarkdownNodes;
          },
        },
        lyricist: {
          type: "MarkdownRemark",
          resolve: (source, args, context, info) => {
            return context.nodeModel
              .getAllNodes({ type: "MarkdownRemark" })
              .find(people => {
                return people.frontmatter.uid === source.lyricist
              })
          },
        },
      },
    }),
  ]
  createTypes(typeDefs)
}
