import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/galerie',
      name: 'gallery',
        component: () => import('@/views/GalleryView.vue')
    },
    {
      path: '/artistes',
      name: 'artists',
      component: () => import('@/views/ArtistsView.vue')
    }
  ]
})

export default router
