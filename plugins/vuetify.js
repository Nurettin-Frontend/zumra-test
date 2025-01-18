import { createVuetify } from "vuetify";
import { Light_Theme, Dark_Theme } from "@/helpers/themes";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    // add theme
    locale: {
      locale: "en",
      fallback: "en",
      rtl: { ar: true },
    },

    theme: {
      defaultTheme: "light",
      themes: {
        lightTheme: Light_Theme,
        darkTheme: Dark_Theme,
      },
      // add color variations
      variations: {
        colors: ["primary", "secondary"],
        lighten: 3,
        darken: 3,
      },
    },
  });

  app.vueApp.use(vuetify);
});
