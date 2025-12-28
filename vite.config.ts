import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        port: 3003
    },
    define: {
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    },

    build: {
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
            output: {
                manualChunks: {
                    vue: ['vue', 'vue-router', 'vue-i18n'],
                    ckeditor: ['@ckeditor/ckeditor5-build-classic'],
                    ui: ['bootstrap', '@fortawesome/fontawesome-free'],
                    vendor: ['mitt', 'xlsx']
                }
            }
        }
    }
})
