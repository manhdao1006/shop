import type { Router } from 'vue-router'

export function setupRouterGuards(router: Router) {
    // Navigation guard để cập nhật title
    router.beforeEach((to, _from, next) => {
        if (to.meta.title) {
            document.title = to.meta.title as string
        }
        next()
    })

    // Navigation guard để log navigation
    router.afterEach((to, from) => {
        console.log(`Navigated from ${from.path} to ${to.path}`)
    })

    // Error handler
    router.onError((error) => {
        console.error('Router error:', error)
    })
}
