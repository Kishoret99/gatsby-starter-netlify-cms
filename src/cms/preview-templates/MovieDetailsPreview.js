import React from 'react'
import PropTypes from 'prop-types'
import { MovieDetailsTemplate } from '../../templates/movie-details'

const MovieDetailsPreview = ({ entry, widgetFor, fieldsMetaData }) => {
  console.log(fieldsMetaData.toJS());
  return (<MovieDetailsTemplate
    title={entry.getIn(['data', 'title'])}
  />)
}

MovieDetailsPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default MovieDetailsPreview
