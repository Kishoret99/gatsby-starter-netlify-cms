import React from 'react'
import PropTypes from 'prop-types'
import { SongDetailsTemplate } from '../../templates/song-details'

const SongDetailsPreview = ({ entry, widgetFor, fieldsMetaData }) => {
  const movieId = entry.getIn(['data', 'movieTitle']);
  const movieMeta = (fieldsMetaData && fieldsMetaData.getIn(['movieTitle', 'movies']) && fieldsMetaData.getIn(['movieTitle', 'movies']).toJS()) || {};
  let movieMetaForId = movieMeta[movieId] || {};

  const singersIds = (entry.getIn(['data', 'singers']) && entry.getIn(['data', 'singers']).toJS()) || [];
  const singersMeta = (fieldsMetaData && fieldsMetaData.getIn(['singers', 'people']) && fieldsMetaData.getIn(['singers', 'people']).toJS()) || {};
  
  const singersMetaForIds = [];
  singersIds && Array.isArray(singersIds) && singersIds.forEach(singerId => {
    const meta = singersMeta[singerId];
    if(meta) singersMetaForIds.push(meta);
  })

  const singerMetaWithFrontmatter = singersMetaForIds.map(singerMeta => {
    return {
      frontmatter: {
        ...singerMeta
      }
    }
  })

  const lyricistId = entry.getIn(['data', 'lyricist']);
  const lyricistMeta = (fieldsMetaData && fieldsMetaData.getIn(['lyricist', 'people']) && fieldsMetaData.getIn(['lyricist', 'people']).toJS()) || {};
  let lyricistMetaForId = lyricistMeta[lyricistId] || {};
  const lyricistWithFrontmatter = {
      frontmatter: {
        ...lyricistMetaForId
      }
    }
  
  const entryCreatedDate = entry.getIn(['data', 'createdDate']);
  const createdDate = entryCreatedDate && entryCreatedDate.toISOString();

  const entryUpdatedDate = entry.getIn(['data', 'updatedDate']);
  const updatedDate = entryUpdatedDate && entryUpdatedDate.toISOString();

  return (<SongDetailsTemplate
    title={entry.getIn(['data', 'title'])}
    description={entry.getIn(['data', 'description'])}
    movieTitle={movieMetaForId.title}
    createdDate={createdDate}
    updatedDate={updatedDate}
    singers={singerMetaWithFrontmatter}
    lyricist={lyricistWithFrontmatter}
    duration={entry.getIn(['data', 'duration'])}
    locale={entry.getIn(['data', 'locale'])}
    content={widgetFor('body')}
  />)
}

SongDetailsPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func
}

export default SongDetailsPreview
