const HTML = [
  {
    path: 'html',
    meta: { title: '' },
    children: [
      {
        path: 'entity',
        meta: { title: '' },
        component: () => import('./entity/index.vue'),
      },
    ],
  },
]
export default HTML
