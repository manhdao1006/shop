import type { AppRoute } from './types'

import ResourcesPackage from '../pages/ResourcesPackage.vue'

export const routes: AppRoute[] = [
    {
        path: '/',
        name: 'ResourcesPackage',
        component: ResourcesPackage,
        meta: {
            title: 'Seto Kanna Vietsub'
        }
    }
]
