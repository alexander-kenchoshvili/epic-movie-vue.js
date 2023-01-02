<template>
  <header class="px-9 sm:px-16 py-6 flex justify-between items-center">
    <div>
      <h2 class="text-[#DDCCAA] sm:text-base">
        {{ $t("header.movie_quotes") }}
      </h2>
    </div>
    <div class="flex">
      <ul
        @click="showDropdown"
        class="text-white cursor-pointer px-5 py-2 flex flex-col"
      >
        <li class="flex items-center">
          {{ changeLocale !== "en" ? "Eng" : "ქარ" }}
          <Arrow class="ml-4" />
        </li>
        <li
          @click="setLocaleLanguage(changeLocale)"
          v-if="toggleDropdown"
          class="flex items-center cursor-pointer absolute top-[60px]"
        >
          {{ changeLocale === "ka" ? "Geo" : "ინგ" }}
        </li>
      </ul>
      <base-button @click="showRegister" class="hidden sm:block">
        {{ $t("header.registration") }}
      </base-button>
      <router-view></router-view>

      <base-button
        @click="showLogin"
        mode="py-2 px-6 rounded border-2 !bg-transparent text-white sm:text-[16px] ml-4 border-white"
      >
        {{ $t("header.login") }}
      </base-button>
    </div>
  </header>

  <div class="absolute top-0 w-full -z-10">
    <div class="bg-black h-[808px] flex items-center justify-center">
      <div class="flex flex-col items-center">
        <h2
          class="text-2xl sm:text-6xl w-[280px] sm:w-[750px] font-bold sm:leading-[75px] text-center text-[#DDCCAA]"
        >
          {{ $t("landing.find_quotes") }}
        </h2>
        <base-button @click="showRegister" class="mt-4">{{
          $t("landing.get_started")
        }}</base-button>
      </div>
    </div>
    <div
      style="background-image: url('/images/interstellar.png')"
      class="h-screen bg-center bg-no-repeat bg-cover relative flex flex-col justify-center"
    >
      <div class="pl-14 sm:pl-60">
        <p
          class="text-white font-bold text-xl sm:text-5xl sm:leading-[75px] relative before:absolute before:w-[17px] before:h-[2px] before:top-[12px] before:left-[-25px] before:bg-white sm:before:w-[57px] sm:before:top-[34px] sm:before:left-[-80px]"
        >
          “ {{ $t("landing.interstellar_first_line") }}
          <br />
          {{ $t("landing.interstellar_second_line") }} ”
        </p>
        <span class="text-white text-base sm:text-3xl"
          >{{ $t("landing.interstellar") }}, 2014</span
        >
      </div>
    </div>
    <div
      style="background-image: url('/images/movie2.png')"
      class="h-screen flex flex-col justify-center bg-fixed bg-center bg-no-repeat bg-cover relative"
    >
      <div
        class="pl-14 sm:pl-60 text-white font-bold text-xl sm:text-5xl sm:leading-[75px]"
      >
        <p
          class="relative before:absolute before:w-[17px] before:h-[2px] before:top-[12px] before:left-[-25px] before:bg-white sm:before:w-[57px] sm:before:top-[34px] sm:before:left-[-80px]"
        >
          {{ $t("landing.movie_quote_example_one") }}
        </p>
        <p>{{ $t("landing.movie_quote_example_two") }}</p>
        <p>{{ $t("landing.movie_quote_example_three") }}</p>
      </div>
    </div>
    <div
      style="background-image: url('/images/lotr.png')"
      class="h-screen flex flex-col justify-center bg-center bg-no-repeat bg-cover relative"
    >
      <div
        class="pl-14 sm:pl-60 text-white font-bold text-xl sm:text-5xl sm:leading-[75px]"
      >
        <p
          class="relative before:absolute before:w-[17px] before:h-[2px] before:top-[12px] before:left-[-25px] before:bg-white sm:before:w-[57px] sm:before:top-[34px] sm:before:left-[-80px]"
        >
          {{ $t("landing.movie_quote_example_one") }}
        </p>
        <p>{{ $t("landing.movie_quote_example_two") }}</p>
        <p>{{ $t("landing.movie_quote_example_three") }}</p>
      </div>
    </div>
    <div class="bg-[#181623] text-[#DDCCAA] py-[15px]">
      <p class="text-[#DDCCAA] text-sm pl-9 text-[8px] sm:text-xs sm:pl-16">
        © 2022 {{ $t("landing.rights") }}
      </p>
    </div>
  </div>
</template>

<script setup>
import Arrow from "@/components/svg/DropdownArrow.vue";
import { setLocale } from "@vee-validate/i18n";
import { ref, computed, onBeforeMount } from "vue";
import i18n from "@/i18n/index.js";
import router from "@/router";
import { useRoute } from "vue-router";
import axios from "@/config/axios/index.js";
import { useAuthStore } from "@/stores/auth";

axios.defaults.withCredentials = true;
const authStore = useAuthStore();

onBeforeMount(() => {
  if (useRoute().query.verification_token) {
    axios
      .post("email-verify", {
        token: useRoute().query.verification_token,
      })
      .then((response) => {
        console.log(response);
        authStore.authenticated = true;

        router.push("confirm-email");
      });
  }
  if (localStorage.getItem("locale")) {
    i18n.global.locale = localStorage.locale;
  }

  if (useRoute().query.email_token) {
    axios
      .post("email/verified", {
        token: useRoute().query.email_token,
      })
      .then(() => {
        alert("hello");
        router.push({ name: "profile" });
      });
  }
});

const toggleDropdown = ref(false);

const showDropdown = () => {
  toggleDropdown.value = !toggleDropdown.value;
};

const changeLocale = computed(() => {
  return i18n.global.locale === "en" ? "ka" : "en";
});

const setLocaleLanguage = (value) => {
  i18n.global.locale = value;
  setLocale(value);
  localStorage.setItem("locale", value);
};

const showRegister = () => {
  router.push({ name: "register" });
};

const showLogin = () => {
  router.push({ name: "login" });
};
</script>
