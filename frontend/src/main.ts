import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from '@/services/vue-query'

const app = createApp(App)

app.use(VueQueryPlugin, { queryClient })
app.use(createPinia())
app.use(router)

app.mount('#app')
