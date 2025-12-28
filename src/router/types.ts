export interface RouteMeta {
    title?: string
    requiresAuth?: boolean
    layout?: string
}

import type { RouteRecordRaw } from 'vue-router'

export interface RouteMeta {
    title?: string
    requiresAuth?: boolean
    layout?: string
}

export type AppRoute = RouteRecordRaw
