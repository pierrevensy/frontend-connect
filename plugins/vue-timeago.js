import Vue from 'vue'
import VueTimeago from 'vue-timeago'

export default function (ctx) {
  Vue.use(VueTimeago, {
    name: 'Timeago', // Component name, `Timeago` by default
    locale: ctx.app.i18n.locale, // Default locale
    locales: {
      en: require('date-fns/locale/en'),
      fr: require('date-fns/locale/fr'),
      es: require('date-fns/locale/es')
    }
  })
}
