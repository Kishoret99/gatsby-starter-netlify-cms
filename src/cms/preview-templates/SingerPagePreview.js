import React from 'react'
import PropTypes from 'prop-types'
import { SingerTemplate } from '../../templates/singer-page'

const SingerTemplatePreview = ({ entry, widgetFor }) => (
  <div>
    <h1>HELLO</h1>
    <SingerTemplate
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      tags={entry.getIn(['data', 'tags'])}
      title={entry.getIn(['data', 'title'])}
    />
  </div>
)

SingerTemplatePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default SingerTemplatePreview;
