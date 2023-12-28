/* eslint perfectionist/sort-imports: "error" */
const URL = [
  {
    path: 'url',
    meta: { title: '' },
    children: [
      {
        path: 'analyze',
        meta: { title: '' },
        component: () => import('./analyze/index.vue'),
      },
    ],
  },
]
export default URL
