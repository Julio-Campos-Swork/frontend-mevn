/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify  } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

export default createVuetify({
  defaults: {
    global: {
      rounded: 'lg',
      // color: 'indigo',
    },
    VAppBar: {
      flat: true,
    },
    VSheet: {
      color: 'blue',
      elevation: 4,
    },
    VCard: {
      color: 'white'
    },
    VToolbar: {
      color: 'white'
    },
    VTextField:{
      color: 'white',

    },
    VMain:{
      color: 'blue'
    }

  },
  theme: {
    defaultTheme: 'light',
    themes: {
      myCustomLightTheme,
      light: {
        colors: {
          primary: '#EDE7F6',
          secondary: '#90CAF9',

        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
})
