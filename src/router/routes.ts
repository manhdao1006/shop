import type { AppRoute } from './types'

import Buy from '../pages/Buy.vue'
import EventsPackage from '../pages/EventsPackage.vue'
import ResourcesPackage from '../pages/ResourcesPackage.vue'
import Shop from '../pages/Shop.vue'
import ShopDetail from '../pages/ShopDetail.vue'
import Home from '../views/Home.vue'

export const routes: AppRoute[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Hữu Hưng DLS'
        }
    },
    {
        path: '/cua-hang',
        name: 'Shop',
        component: Shop,
        meta: {
            title: 'Hữu Hưng DLS'
        }
    },
    {
        path: '/chi-tiet/:maAcc',
        name: 'ShopDetail',
        component: ShopDetail,
        meta: {
            title: 'Hữu Hưng DLS'
        }
    },
    {
        path: '/thu-mua',
        name: 'Buy',
        component: Buy,
        meta: {
            title: 'Hữu Hưng DLS'
        }
    },
    {
        path: '/tai-nguyen',
        name: 'ResourcesPackage',
        component: ResourcesPackage,
        meta: {
            title: 'Hữu Hưng DLS'
        }
    },
    {
        path: '/su-kien',
        name: 'EventsPackage',
        component: EventsPackage,
        meta: {
            title: 'Hữu Hưng DLS'
        }
    }
]
