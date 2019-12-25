import React from 'react'
import PropTypes from 'prop-types'
import { SongDetailsTemplate } from '../../templates/song-details'

const SongDetailsPreview = ({ entry, widgetFor }) => (
  <SongDetailsTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

SongDetailsPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default SongDetailsPreview
