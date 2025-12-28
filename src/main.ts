import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { createApp, watch } from 'vue'
import { createI18n } from 'vue-i18n'

import CKEditor from '@ckeditor/ckeditor5-vue'
import App from './App.vue'
import router from './router'

import Toast, { type PluginOptions, POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import en from './locales/en'
import vi from './locales/vi'
import preventDevTools from './utils/preventDevTools'

const i18n = createI18n({
    legacy: false,
    locale: 'vi',
    fallbackLocale: 'en',
    messages: { vi, en }
})

const options: PluginOptions = {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
}

const app = createApp(App)
app.use(CKEditor)
app.use(router)
app.use(i18n)
app.use(Toast, options)

if (import.meta.env.PROD) {
    preventDevTools()
}

router.afterEach((to) => {
    if (to.meta.title) {
        document.title = i18n.global.t(to.meta.title as string) as string
    }
})

watch(
    () => i18n.global.locale.value,
    () => {
        const currentRoute = router.currentRoute.value
        if (currentRoute.meta.title) {
            document.title = i18n.global.t(currentRoute.meta.title as string) as string
        }
    }
)

app.mount('#app')
