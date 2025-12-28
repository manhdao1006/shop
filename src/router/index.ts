import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuards } from './guards'
import { routes } from './routes'

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(_to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

router.beforeEach((to, _from, next) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')

    if (to.path.startsWith('/quan-tri')) {
        if (!user) {
            return next('/noPermission')
        }

        if (user.vaiTro !== 'admin') {
            return next('/noPermission')
        }
    }

    next()
})

setupRouterGuards(router)

export default router
