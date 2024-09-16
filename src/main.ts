import './styles/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { longPress } from './directives/longPress'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { GiSoundOff, GiSoundOn, MdLightmodeOutlined, MdDarkmodeOutlined } from 'oh-vue-icons/icons'
// import { vsDialog } from 'vuesax'
// import 'vuesax/dist/vuesax.css'

addIcons(GiSoundOff, GiSoundOn, MdLightmodeOutlined, MdDarkmodeOutlined)

const app = createApp(App)
app.component('v-icon', OhVueIcon)

const pinia = createPinia()

app.use(pinia)
app.use(longPress, { duration: 500 })
app.use(router)

// app.use(vsDialog)

app.mount('#app')
