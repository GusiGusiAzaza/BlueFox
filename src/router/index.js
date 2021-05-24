import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/views/Home.vue';
import NotFound from '../components/views/NotFound.vue';
import Register from '../components/views/Register.vue';
import Login from '../components/views/Login.vue';
import Profile from '../components/views/Profile.vue';
import Tests from '../components/views/Tests.vue';
import Admin from '../components/views/Admin.vue';
import Results from '../components/views/Results.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {
                requiresAuth: true
            },
            component: Home
        },
        {
            path: '/tests',
            name: 'tests',
            meta: {
                requiresAuth: true
            },
            component: Tests
        },
        {
            path: '/results',
            name: 'results',
            meta: {
                requiresAuth: true
            },
            component: Results
        },
        {
            path: '/register',
            name: 'register',
            meta: {
                guest: true
            },
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                guest: true
            },
            component: Login
        },
        {
            path: '/profile',
            name: 'profile',
            meta: {
                requiresAuth: true
            },
            component: Profile
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            meta: {
                requiresAuth: true,
                isAdmin: true
            }
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

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            });
        } else {
            const user = JSON.parse(localStorage.getItem('user'));
            if (to.matched.some((record) => record.meta.isAdmin)) {
                if (user.isAdmin) {
                    next();
                } else {
                    next({ name: 'profile' });
                }
            } else {
                next();
            }
        }
    } else if (to.matched.some((record) => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next();
        } else {
            next({ name: 'profile' });
        }
    } else {
        next();
    }
});

export default router;
