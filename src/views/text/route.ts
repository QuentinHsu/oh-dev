import URL from './url/route'
import HTML from './html/route'

export default [
  {
    path: 'text',
    meta: { title: '' },
    children: [...URL, ...HTML],
  },
]
