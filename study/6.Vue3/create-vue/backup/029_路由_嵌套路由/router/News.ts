// xinWen.js

export default {
  name: 'xinWen',
  path: '/news',
  component: () => import('@/pages/News.vue'),
  children: [
    {
      path: 'detail',
      component: () => import('@/pages/Detail.vue')
    }
  ]
}
