const routes = [
  {
    path: '/',
    redirect: '/landing-page'
  },
  {
    name: 'DivePlannerLayout',
    path: '/dive-planner',
    component: () => import('layouts/DiveplannerLayout.vue'),
    children: [
      {

        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/auth',
        component: () => import('pages/PageAuth.vue')
      },
      {
        name: 'DivePlan',
        path: '/dive-plan',
        component: () => import('pages/DivePlan.vue')
      }

    ]
  },
  {
    path: '/landing-page',
    component: () => import('pages/LandingPage.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
