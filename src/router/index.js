import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/pages/DashboardPage.vue'),
    meta: { title: 'Dashboard' },
  },
  {
    path: '/errands',
    name: 'Errands',
    component: () => import('@/pages/ErrandsPage.vue'),
    meta: { title: 'Errands' },
  },
  {
    path: '/completed',
    name: 'Completed',
    component: () => import('@/pages/CompletedPage.vue'),
    meta: { title: 'Completed' },
  },
  {
    path: '/planner',
    redirect: '/errands',
  },
  {
    path: '/history',
    redirect: '/completed',
  },
  {
    path: '/settings',
    redirect: '/',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  document.title = `${to.meta.title ?? 'Errand'} - Errand Planner`
})

export default router
