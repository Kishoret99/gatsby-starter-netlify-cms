import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'
import { Widget as IdWidget } from '@ncwidgets/id'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import MovieDetailsPreview from './preview-templates/MovieDetailsPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import PeoplePagePreview from './preview-templates/PeoplePagePreview'
import SongDetailsPreview from './preview-templates/SongDetailsPreview'

import '../components/all.sass'


CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)
CMS.registerWidget(IdWidget)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('movies', MovieDetailsPreview)
CMS.registerPreviewTemplate('songs', SongDetailsPreview)
CMS.registerPreviewTemplate('people', PeoplePagePreview)
