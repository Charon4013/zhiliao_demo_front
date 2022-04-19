import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from '../src/router/index.js'
import { CaretTop, ChatSquare, Edit } from '@element-plus/icons-vue'


const app = createApp(App)

app.config.globalProperties.$axios = axios
axios.defaults.baseURL = "http://localhost:8080"
axios.interceptors.request.use(config => {
    if (config.method === 'get') {
        config.data = true
    }
    config.headers['Content-Type'] = 'application/text'
      return config
})
axios.defaults.headers.common['Token'] = localStorage.getItem('token')

app.component("caretTop", CaretTop)
    .component("chatSquare", ChatSquare)
    .component("edit", Edit)
app.use(router)
app.mount('#app')
