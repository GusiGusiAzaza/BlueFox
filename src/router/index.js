import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '*',
            component: NotFound
        }
        // ,
        // {
        //     path: '/event/:id',
        //     name: 'eventSingle',
        //     component: () => import('../views/EventSingle.vue'),
        //     beforeEnter: authGuard
        // }
    ]
});
