import URL from './url/route'
import HTML from './html/route'
import JSON from './json/route'

export default [
  {
    path: 'text',
    meta: { title: '' },
    children: [...URL, ...HTML, ...JSON],
  },
]
