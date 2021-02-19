import Vue from 'vue';
import Router from 'vue-router';
import { isSignedIn } from './auth';

Vue.use(Router);

export default new Router({
    routes: [
        {
            name: 'home',
            path: '/home',
            component: () => import('../Home'),
            beforeEnter (_, __, next) { // Impede usuários não assinados
                if (isSignedIn()) {       // de acessar a página Home.
                    next();
                    return;
                }
                next('/login')
            }
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('../Login'),
            beforeEnter (_, __, next) { // Impede usuários assinados de
                if (!isSignedIn()) {      // acessar a página de login.
                    next();
                    return;
                }
                next('/home')
            }
        },
        {
            name: 'produto',
            path: '/produto',
            component: () => import('../Produto'),
            beforeEnter (_, __, next) { // Impede usuários assinados de
                if (isSignedIn()) {      // acessar a página de login.
                    next();
                    return;
                }
                next('/login')
            }
        }
    ]
})
