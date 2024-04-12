import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

//Oh-Vue-Icons
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { CoHome, CoMap, RiDashboard2Line, IoLocation } from 'oh-vue-icons/icons'

addIcons(CoMap)
addIcons(RiDashboard2Line)
addIcons(CoHome)
addIcons(IoLocation)

const app = createApp(App)

app.component('VIcon', OhVueIcon)

app.use(router)
app.use(vuetify)
app.mount('#app')
