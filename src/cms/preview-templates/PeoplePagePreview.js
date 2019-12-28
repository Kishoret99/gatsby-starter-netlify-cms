import React from 'react'
import PropTypes from 'prop-types'
import { PeopleTemplate } from '../../templates/people-page'

const PeopleTemplatePreview = ({ entry, widgetFor }) => (
  <div>
    <PeopleTemplate
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
