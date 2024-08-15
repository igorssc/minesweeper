import './styles/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { longPress } from './directives/longPress'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(longPress, { duration: 500 })
app.use(router)

app.mount('#app')
