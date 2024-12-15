import { createApp } from 'vue'

import router from './router'
import store from './store'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import './assets/styles/main.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/display.css'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
