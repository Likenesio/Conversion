import { createRouter, createWebHistory } from 'vue-router';
import Conversion from './views/Conversion.vue'; // Import your components
import Login from './views/IniciarSesion.vue';
import Historial from './views/HistorialConversion.vue';
import Home from './views/Home.vue';

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/conversion',
    component: Conversion,
  },
  {
    path: '/historialconversion',
    component: Historial,
  },  

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;