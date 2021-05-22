import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: 'http://localhost:8083/',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/notfound',
            name: 'notfound',
            component: NotFound
        },
        {
            path: '/signup',
            name: 'signup',
            component: NotFound
        },
        {
            path: '/login',
            name: 'login',
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
