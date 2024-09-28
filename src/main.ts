import { createApp } from 'vue'

import router from './router'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import './assets/styles/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/display.css'
import EPZhCN from 'element-plus/es/locale/lang/zh-cn'


const app = createApp(App)

app.use(ElementPlus, {
  locale: EPZhCN
})

app.use(router)

app.mount('#app')
