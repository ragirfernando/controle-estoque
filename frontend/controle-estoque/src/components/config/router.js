import Vue from 'vue';
import Router from 'vue-router';
import {isSignedIn} from './auth';

Vue.use(Router);

export default new Router({
    routes: [
        {
            name: 'home',
            path: '/',
            component: () => import('../Home'),
            beforeEnter(_, __, next) { // Impede usuários não assinados
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
            beforeEnter(_, __, next) { // Impede usuários assinados de
                if (!isSignedIn()) {      // acessar a página de login.
                    next();
                    return;
                }
                next('/')
            }
        },
        {
            name: 'produto',
            path: '/produto',
            component: () => import('../Produto'),
            beforeEnter(_, __, next) { // Impede usuários assinados de
                if (isSignedIn()) {      // acessar a página de login.
                    next();
                    return;
                }
                next('/login')
            }
        },
        {
            name: 'entrada',
            path: '/entrada',
            component: () => import('../EntradaProduto'),
            beforeEnter(_, __, next) { // Impede usuários assinados de
                if (isSignedIn()) {      // acessar a página de login.
                    next();
                    return;
                }
                next('/login')
            }
        }
        ,
        {
            name: 'saida',
            path: '/saida',
            component: () => import('../SaidaProduto'),
            beforeEnter(_, __, next) { // Impede usuários assinados de
                if (isSignedIn()) {      // acessar a página de login.
                    next();
                    return;
                }
                next('/login')
            }
        }
        ,
        {
            name: 'cadastrarUsuario',
            path: '/cadastroUsuario',
            component: () => import('../CadastrarUsuario'),
            beforeEnter(_, __, next) { // Impede usuários assinados de
                if (!isSignedIn()) {      // acessar a página de login.
                    next();
                    return;
                }
                next('/login')
            }
        }
    ]
})
