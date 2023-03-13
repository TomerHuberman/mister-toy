import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import ToyIndex from '../pages/ToyIndex.vue'
import ToyEdit from '../pages/ToyEdit.vue'
import ToyDetails from '../pages/ToyDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/toy',
      name: 'toy',
      component: ToyIndex
    },
    {
      path: '/toy/edit/:toyId?',
      name: 'edit',
      component: ToyEdit
    },
    {
      path: '/toy/details/:toyId',
      name: 'details',
      component: ToyDetails
    },
  ]
})

export default router
