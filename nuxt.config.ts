import vuetify from "vite-plugin-vuetify";

const title = "Zumra Test";
const description = "Zumra Test";
const image = "https://zumrahub.com/images/zumrahub-en.png";
const url = "https://zumrahub.com";

export default defineNuxtConfig({
  ssr: true,
  target: 'static',
  css: ["@/assets/main.scss", "@mdi/font/css/materialdesignicons.min.css"],

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
    define: {
      "process.env.DEBUG": false,
    },
  },

  plugins: ["~/plugins/axios", "~/plugins/apexchart"],
  buildModules: ["@pinia/nuxt"],

  modules: [
    "nuxt-icon",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    // this adds the vuetify vite plugin
    // also produces type errors in the current beta release
    async (options, nuxt) => {
      // @ts-ignore
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        config.plugins.push(vuetify())
      );
    },
  ],

  router: {
    middleware: ["auth", "profile"], // Use the name of your middleware without the `.global` suffix
  },

  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.js",
      },
      {
        code: "ar",
        name: "Arabic",
        file: "ar.js",
      },
    ],
    langDir: "",
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title,
      titleTemplate: `${title} | %s`,
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
        {
          rel: "canonical",
          href: url,
        },
      ],
      meta: [
        {
          hid: "description",
          name: "description",
          content: description,
        },
        { property: "og:site_name", content: title },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: url,
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: image,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: image,
        },
      ],
    },
  },

  compatibilityDate: "2025-01-17",
});
