import React from 'react'
import PropTypes from 'prop-types'
import { PeopleTemplate } from '../../templates/people-page'

const PeopleTemplatePreview = ({ entry, widgetFor }) => (
  <div>
    <h1>HELLO</h1>
    <PeopleTemplate
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      tags={entry.getIn(['data', 'tags'])}
      title={entry.getIn(['data', 'title'])}
    />
  </div>
)

PeopleTemplatePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default PeopleTemplatePreview;
