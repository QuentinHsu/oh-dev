/* eslint perfectionist/sort-imports: "error" */
const JSON = [
  {
    path: 'json',
    meta: { title: '' },
    children: [
      {
        path: '',
        meta: { title: '' },
        component: () => import('./index.vue'),
      },
    ],
  },
]
export default JSON
