import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        meta: { layout: 'main', auth: true },
        component: () =>
            import ('../views/Home')
    },
    {
        path: '/Register',
        name: 'Register',
        meta: { layout: 'register' },
        component: () =>
            import ('../views/Register')
    },
    {
        path: '/Vacancies',
        name: 'Vacancies',
        meta: { layout: 'main', auth: true },
        component: () =>
            import ('../views/vacancies')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router