// to use .env variables on nuxt.config.js
require('dotenv').config()

export default {
  server: {
    port: process.env.APP_PORT || 3000
    // host: '0.0.0.0'
    // default: localhost
  },
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.APP_NAME || process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/flexboxgrid@6.3.1/dist/flexboxgrid.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css' }
    ],

    //script: [{src:"/leaflet/leaflet-side.min.js"}]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#ffffff' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/sass/app.scss',
    'node_modules/leaflet/dist/leaflet.css',
    'node_modules/leaflet-draw/dist/leaflet.draw.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    '@/plugins/services',
    '@/plugins/api',
    { src: '@/plugins/leafLet', ssr: false }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://auth.nuxtjs.org
    '@nuxtjs/auth',
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources'
  ],
  /**
   * Nuxt Style Resources
   */
  styleResources: {
    scss: [
      './assets/sass/_variables.scss', // use underscore "_" & also file extension ".scss"
      './assets/sass/mixins/mixins.scss',
      './assets/sass/_global.scss'
    ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL:
      process.env.NODE_ENV === 'production'
        ? process.env.API_URL_PROD
        : process.env.API_URL_DEV
  },
  /**
   ** Global middleware from auth module
   */
  router: {
    middleware: ['auth']
  },
  /**
   ** Schemes define authentication logic
   */
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
      callback: '/login'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            url: 'user/logout/',
            method: 'post'
          },
          user: {
            url: 'user/info/',
            method: 'get',
            propertyName: 'user'
          }
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
