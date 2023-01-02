<template>
  <div class="bg-feed min-h-screen">
    <Header></Header>
    <div
      class="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 px-3 sm:px-16 mt-8"
    >
      <NavBar class="sm:col-span-1 hidden lg:block" />
      <div class="pb-10 col-span-3 lg:col-span-2">
        <div>
          <div class="flex justify-between">
            <base-button
              @click="showQuote"
              class="!bg-[#24222F] w-auto xl:w-[80%] whitespace-nowrap ml-0 text-sm font-normal sm:text-xl flex items-center px-4 py-3"
              :class="[toggleSearch ? '!w-auto' : '']"
            >
              <Pencil class="mr-3" />{{ $t("layout.write_quote") }}</base-button
            >
            <div v-if="toggleSearch" class="ml-8 w-full relative">
              <form action="">
                <input
                  @keyup="handleSearch"
                  type="search"
                  v-model="quotesStore.search"
                  class="bg-transparent w-full outline-none pl-10 hidden text-white lg:block border-[#efefef] border-b pb-3 pt-2"
                  placeholder="Enter @ to search movies, Enter # to search quotes "
                />
                <Search class="absolute top-3 hidden lg:block" />
              </form>
            </div>
            <div
              @click="showSearchBar"
              v-if="!toggleSearch"
              class="xl:flex items-center hidden"
            >
              <Search class="mr-3" />
              <span class="text-white text-base"
                >{{ $t("header.search") }}
              </span>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <FeedCard v-for="quote in quotes" :key="quote.id" :quote="quote" />
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import Header from "@/components/ui/The-Header.vue";
import NavBar from "@/components/ui/NavBar.vue";
import Pencil from "@/components/svg/PencilIcon.vue";
import Search from "@/components/svg/SearchIcon.vue";
import FeedCard from "@/components/ui/quoteUI/FeedCard.vue";
import router from "@/router";
import { computed, ref } from "vue";
import { useQuotes } from "@/stores/useQuoteStore";
import { useUserInfo } from "@/stores/useUserInfo";
import { useNotification } from "@/stores/useNotification.js";
import axiosInstance from "@/config/axios/store";

const notificationStore = useNotification();
const toggleSearch = ref(false);
const showSearchBar = () => {
  toggleSearch.value = !toggleSearch.value;
};

const userInfo = useUserInfo();

const quotesStore = useQuotes();
const quotes = computed(() => quotesStore.allQuotes);

const handleSearch = async () => {
  if (quotesStore.search.length !== 0) {
    try {
      const response = await axiosInstance.post(`search`, {
        search: quotesStore.search,
      });
      quotesStore.allQuotes = response.data;
    } catch (error) {
      quotesStore.allQuotes = quotesStore.savedQuotes;
      console.log(error);
    }
  }
};

const showQuote = () => {
  router.push({ name: "quote-popup" });
};
window.Echo.channel("comment-channel").listen(".new-comment", () => {
  if (quotesStore.search) {
    quotesStore.getQuoteLength(quotesStore.search);
  } else {
    quotesStore.getQuoteLength();
  }
});
window.Echo.channel("like-channel").listen(".like", () => {
  if (quotesStore.search) {
    quotesStore.getQuoteLength(quotesStore.search);
  } else {
    quotesStore.getQuoteLength();
  }
});
setTimeout(() => {
  window.Echo.private("notification-channel." + userInfo.user.id).listen(
    ".notification",
    () => {
      notificationStore.notifications();
    }
  );
}, 1000);

window.onscroll = function () {
  if (quotesStore.search === "") {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      Math.round(document.body.clientHeight)
    ) {
      quotesStore.quotes();
    }
  }
};
</script>
