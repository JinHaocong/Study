import './assets/main.scss'

import { createApp } from 'vue'
import pinia from './stores/index'

import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Particles from 'vue3-particles'

import App from './App.vue'
import router from './router'

import 'virtual:svg-icons-register'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(Particles)
app.use(router)

app.mount('#app')
