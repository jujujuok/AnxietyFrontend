import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {aliases, mdi} from "vuetify/iconsets/mdi";
import vuetify from "@/plugins/vuetify";

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.mount('#app')
