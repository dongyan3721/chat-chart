import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
import router from '@/router/index'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import $ from 'jquery'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'vue-cropper/dist/index.css'


const app = createApp(App)
// 全局挂载element-plus图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 集成element-plus
app.use(ElementPlus)
// 集成vue-router
app.use(router)
// 集成jQuery
app.use($)
app.mount('#app')
