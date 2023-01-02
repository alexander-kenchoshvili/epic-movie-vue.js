import { createApp, watchEffect } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseInput from "./components/ui/BaseInput.vue";
import MovieQuote from "./components/ui/MovieQuoteInput.vue";
import "@/config/vee-validate/rules";
import "@/config/vee-validate/messages";
import { setLocale } from "@vee-validate/i18n";
import i18n from "@/i18n/index.js";
import "@/assets/style.css";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const app = createApp(App);

watchEffect(() => {
  Pusher.Runtime.createXHR = function () {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    return xhr;
  };

  window.Echo = new Echo({
    broadcaster: "pusher",
    authEndpoint: "http://127.0.0.1:8000/api/broadcasting/auth",
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    secret: import.meta.env.VITE_PUSHER_APP_SECRET,
    forceTLS: true,
    withCredentials: true,
  });
});

app.use(createPinia());
app.use(router);
app.use(setLocale("en"));
app.use(i18n);

app.component("base-button", BaseButton);
app.component("base-input", BaseInput);
app.component("movie-quote", MovieQuote);

app.mount("#app");
