import { createApp } from 'vue'
import App from './App.vue'
import Hello from './Hello.vue'

// 创建应用
const app = createApp(App)

// sign 全局组件
app.component('Hello', Hello)

// sign 全局对象
// 不推荐
// app.config.globalProperties.x = 99

app.mixin({
  data() {
    return {
      x: 98
    }
  }
})

// sign 全局指令
app.directive('beauty', (element, { value }) => {
  element.innerText += value
  element.style.color = 'green'
  element.style.backgroundColor = 'yellow'
})

// 挂载应用
app.mount('#app')

// setTimeout(() => {
//     app.unmount()
// }, 2000);
