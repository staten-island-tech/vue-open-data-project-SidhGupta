import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import About from '../views/About.vue';
import CardsOfData from '../views/CardsOfData.vue';  // Import the new view

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/cards-of-data',  // New route
      name: 'cards-of-data',
      component: CardsOfData,  // New view
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log(`Navigating to: ${to.path}`);
  next();
});

export default router;
