// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
  ],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    // Server-only (NUXT_*)
    awsSecretAccessKey: '',
    appsyncApiKey: '',
    tablePrefix: 'gc-dev',

    // Client-accessible (NUXT_PUBLIC_*)
    public: {
      awsRegion: '',
      cognitoUserPoolId: '',
      cognitoClientId: '',
      cognitoIdentityPoolId: '',
      appsyncEndpoint: '',
      s3BucketUploads: '',
      s3BucketAssets: '',
    },
  },

  typescript: {
    strict: true,
    typeCheck: false, // Use `yarn typecheck` instead — vite-plugin-checker has issues with vue-tsc
  },

  devtools: { enabled: true },
})
