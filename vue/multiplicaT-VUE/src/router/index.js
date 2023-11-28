// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/LoginScreen.vue')   
  },
  {
    path: '/welcome',
    component: () => import('@/views/WelcomeScreen.vue')   
  },
  {
    path: '/profile',
    component: () => import('@/views/ProfileScreen.vue')   
  },
  {
    path: '/ranking',
    component: () => import('@/views/RankingScreen.vue')   
  },
  {
    path: '/play',
    component: () => import('@/views/PlayScreen.vue')   
  },
  {
    path: '/create-game',  
    component: () => import('@/views/CreateGameScreen.vue'),
    //meta: { requiresAdmin: true } // Puedes agregar metadatos para verificar si se requieren permisos de administrador
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
