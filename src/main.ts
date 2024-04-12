import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const lightTheme = {
    dark: false,
    colors: {
        background: '#F7FFF7',
        surface: '#F7FFF7',
        'surface-bright': '#F7FFF7',
        'surface-light': '#EEEEEE',
        'surface-variant': '#424242',
        'on-surface-variant': '#EEEEEE',
        primary: '#1A535C',
        'primary-darken-1': '#1F5592',
        secondary: '#48A9A6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    },
    variables: {
        'border-color': '#000000',
        'border-opacity': 0.12,
        'high-emphasis-opacity': 0.87,
        'medium-emphasis-opacity': 0.60,
        'disabled-opacity': 0.38,
        'idle-opacity': 0.04,
        'hover-opacity': 0.04,
        'focus-opacity': 0.12,
        'selected-opacity': 0.08,
        'activated-opacity': 0.12,
        'pressed-opacity': 0.12,
        'dragged-opacity': 0.08,
        'theme-kbd': '#212529',
        'theme-on-kbd': '#F7FFF7',
        'theme-code': '#F5F5F5',
        'theme-on-code': '#000000',
    }
}

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'lightTheme',
        themes: {
            lightTheme,
        }
    }
});

//Oh-Vue-Icons
import {OhVueIcon, addIcons} from 'oh-vue-icons'
import {CoHome, CoMap, RiDashboard2Line, IoLocation} from 'oh-vue-icons/icons'

addIcons(CoMap)
addIcons(RiDashboard2Line)
addIcons(CoHome)
addIcons(IoLocation)

const app = createApp(App)

app.component('VIcon', OhVueIcon)

app.use(router)
app.use(vuetify)
app.mount('#app')
