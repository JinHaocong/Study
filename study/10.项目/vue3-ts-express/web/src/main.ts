import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Particles from 'vue3-particles'

import App from './App.vue'
import router from './router'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(createPinia())
app.use(Particles)

app.mount('#app')
