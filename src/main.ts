import './styles/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { longPress } from './directives/longPress'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { GiSoundOff, GiSoundOn, MdLightmodeOutlined, MdDarkmodeOutlined } from 'oh-vue-icons/icons'
import VueModalityV3 from 'vue-modality-v3'
import 'vue-modality-v3/dist/style.css'

addIcons(GiSoundOff, GiSoundOn, MdLightmodeOutlined, MdDarkmodeOutlined)

const app = createApp(App)
app.component('v-icon', OhVueIcon)

const pinia = createPinia()

app.use(pinia)
app.use(longPress, { duration: 500 })
app.use(router)

app.component('VueModalityV3', VueModalityV3)

app.mount('#app')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('ServiceWorker registrado com sucesso:', registration)
      })
      .catch((error) => {
        console.log('Falha ao registrar o ServiceWorker:', error)
      })
  })
}
