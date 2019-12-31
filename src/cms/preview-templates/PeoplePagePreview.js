import React from 'react'
import PropTypes from 'prop-types'
import { PeopleTemplate } from '../../templates/people-page'

const PeopleTemplatePreview = ({ entry, widgetFor, fieldsMetaData }) => {
  // const blogTitle = entry.getIn(['data', 'blog'], '');
  // const blog = blogTitle && fieldsMetaData.getIn(['blog', 'blog', blogTitle]) && fieldsMetaData.getIn(['blog', 'blog', blogTitle]).toJS();
  // const blogProp = blog && `${blog.title}@@@@${blog.description}`;
  return (<div>
    <PeopleTemplate
      title={entry.getIn(['data', 'title'])}
      // blog={blogProp}
    />
  </div>)
}

PeopleTemplatePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default PeopleTemplatePreview;
