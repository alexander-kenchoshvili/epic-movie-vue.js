<template>
  <header
    class="px-9 sm:px-16 py-6 bg-[#222030] flex justify-between items-center"
  >
    <div>
      <h2 class="text-[#DDCCAA] hidden lg:block sm:text-base">
        {{ $t("header.movie_quotes") }}
      </h2>
      <Hamburger @click="toggleHamburger" class="block lg:hidden" />
    </div>
    <div class="flex items-center">
      <div v-if="useRoute().name === 'news-feed'">
        <Search @click="toggleSearch" class="mr-4 block lg:hidden" />
      </div>
      <div v-if="useRoute().name === 'movie-list'">
        <form class="flex items-center">
          <input
            type="search"
            name="search"
            v-model="moviesStore.searchMovie"
            class="bg-transparent outline-none w-24 mr-3 lg:hidden px-1 py-1 text-white"
            placeholder="Search"
          />
        </form>
      </div>
      <div class="relative">
        <div @click="showNotification" class="cursor-pointer">
          <Bell />
          <span
            v-if="Unread !== 0"
            class="w-6 absolute top-[-8px] text-white flex justify-center items-center right-[-10px] h-6 rounded-full bg-[#E33812]"
            >{{ Unread }}</span
          >
        </div>
        <div
          v-if="toggleNotification"
          class="bg-[#000000] max-h-[380px] sm:max-h-[330px] overflow-y-scroll top-[60px] w-[300px] right-[-105px] lg:w-[960px] sm:w-[550px] sm:right-[-90px] sm:top-[60px] absolute lg:top-[64px] lg:right-[-210px] px-8 py-12 z-10"
        >
          <div class="flex justify-between items-center mb-5">
            <h2 class="text-white text-base sm:text-3xl font-normal">
              {{ $t("header.notifications") }}
            </h2>
            <span
              @click="readHandler"
              class="text-base sm:text-xl cursor-pointer text-white underline font-normal"
            >
              {{ $t("header.all_read") }}</span
            >
          </div>
          <Notification
            v-for="notification in notifications"
            :key="notification.id"
            :notification="notification"
          />
        </div>
      </div>
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

      <base-button
        @click="logout"
        mode="py-2 px-6 rounded hidden lg:block border-2 !bg-transparent text-white sm:text-[16px] ml-4 border-white"
      >
        {{ $t("header.logout") }}
      </base-button>
    </div>
    <div
      v-if="showSearch"
      class="bg-[#12101A] w-full block lg:hidden z-20 h-2/6 fixed top-0 left-0"
    >
      <input
        type="search"
        @keyup="handleSearch"
        v-model="quotesStore.search"
        class="w-full h-20 outline-none pl-20 pr-5 placeholder-white text-white bg-[#12101A] border-b border-[#EFEFEF]"
        :placeholder="$t('layout.search')"
      />
      <ArrowBack @click="toggleSearch" class="absolute z-30 top-8 left-8" />
      <div class="flex flex-col ml-20 mt-6">
        <span class="text-white pb-5">{{ $t("layout.find_movie") }} @</span>
        <span class="text-white">{{ $t("layout.find_quote") }} #</span>
      </div>
    </div>
    <div
      v-if="showSearch"
      @click="toggleSearch"
      class="fixed flex lg:hidden justify-center items-center top-0 left-0 right-0 bottom-0 bg-black z-10 bg-opacity-80"
    ></div>
    <div
      v-if="showHamburger"
      class="fixed block lg:hidden z-30 top-20 left-0 bg-[#11101A] w-full h-3/4"
    >
      <div class="pl-10 pt-10">
        <Navbar />
        <base-button
          @click="logout"
          mode="py-2 px-6 rounded  ml-0  border-2 !bg-transparent text-white text-xs sm:text-base border-white"
        >
          {{ $t("header.logout") }}
        </base-button>
      </div>
    </div>
    <div
      v-if="showHamburger"
      @click="toggleHamburger"
      class="fixed flex lg:hidden justify-center items-center top-0 left-0 right-0 bottom-0 z-10 bg-opacity-80"
    ></div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import i18n from "@/i18n/index.js";
import Arrow from "@/components/svg/DropdownArrow.vue";
import { setLocale } from "@vee-validate/i18n";
import router from "@/router";
import Bell from "@/components/svg/BellIcon.vue";
import Notification from "@/components/ui/quoteUI/NotificationForm.vue";
import axiosInstance from "@/config/axios";
import { useAuthStore } from "@/stores/auth";
import Search from "@/components/svg/SearchIcon.vue";
import Hamburger from "@/components/svg/HamburgerMenu.vue";
import ArrowBack from "@/components/svg/ArrowBack.vue";
import Navbar from "@/components/ui/NavBar.vue";
import { useNotification } from "@/stores/useNotification.js";
import { useQuotes } from "@/stores/useQuoteStore";
import { useRoute } from "vue-router";
import { useMovies } from "@/stores/useMovieStore";

const moviesStore = useMovies();

const quotesStore = useQuotes();

const notificationStore = useNotification();
const notifications = computed(() => notificationStore.allNotifications);

const Unread = computed(() => notificationStore.UnreadNotification);

onMounted(() => {
  notificationStore.notifications();
  quotesStore.quotes();
});
const readHandler = async () => {
  try {
    await axiosInstance.post(`/marked`);
    notificationStore.notifications();
  } catch (error) {
    console.log(error);
  }
};
const handleSearch = async () => {
  if (quotesStore.search !== 0) {
    try {
      const response = await axiosInstance.post(`search`, {
        search: quotesStore.search,
      });
      quotesStore.allQuotes = response.data;
    } catch (error) {
      console.log(error);
    }
  }
};

const toggleDropdown = ref(false);
const toggleNotification = ref(false);
const showSearch = ref(false);
const showHamburger = ref(false);

const toggleHamburger = () => {
  showHamburger.value = !showHamburger.value;
};

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
};

const authStore = useAuthStore();

const showDropdown = () => {
  toggleDropdown.value = !toggleDropdown.value;
};
const showNotification = () => {
  toggleNotification.value = !toggleNotification.value;
};

const changeLocale = computed(() => {
  return i18n.global.locale === "en" ? "ka" : "en";
});

const setLocaleLanguage = (value) => {
  i18n.global.locale = value;
  setLocale(value);
  localStorage.setItem("locale", value);
};

const logout = async () => {
  try {
    await axiosInstance.get(`logout`);
    authStore.authenticated = false;
    router.push({ name: "home" });
  } catch (error) {
    console.log(error);
  }
};
</script>
