import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/index';
import Login from '../components/Login.vue';
import Search from '../components/Search.vue';

const routes = [
    { path: '/login', component: Login },
    { path: '/search', component: Search, meta: { auth: true }},
    { path: '/',  redirect: '/login'}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    console.log(to);
    if (to.meta.auth && store.getters.login_status != 'login_success') {
        next('/login');
    } else {
        next();
    }
});

export default router;