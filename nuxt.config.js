export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'entreprise_project_front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vuelidate.js",
    '~/plugins/bootstrap-vue',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "bootstrap-vue/nuxt",
    '@nuxtjs/auth-next', 
    '@nuxtjs/axios',
    'nuxt-sweetalert2',
  ],
  axios: {
    baseURL: 'http://127.0.0.1:8000/api/',
},

auth: {
  redirect: {
      login: '/auth/login',
      logout: '/auth/login',
  },
  strategies: {
      laravelSanctum: {
          provider: 'laravel/sanctum',
          url: "http://127.0.0.1:8000",
          token: {
              name: 'X-Auth-Token'
          },
          user: {
            property: false,
            autoFetch: true
          },
          endpoints: {
              login: {
                  url: '/api/login'
              },
              user: {
                  url: '/api/user',
              },
              logout: {
                  url: '/api/logout'
              },
          }
      },
  }
},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
