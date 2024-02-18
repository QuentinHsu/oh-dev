import URL from './url/route'
import HTML from './html/route'
import JSON from './json/route'
import Compared from './compared/route'

export default [
  {
    path: 'text',
    meta: { title: '' },
    children: [...URL, ...HTML, ...JSON, ...Compared],
  },
]
