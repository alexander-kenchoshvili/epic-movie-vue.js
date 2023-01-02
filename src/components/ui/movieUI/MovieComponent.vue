<template>
  <div>
    <router-link
      :to="{ name: 'movie-description', params: { movieId: movie.id } }"
    >
      <div class="text-white">
        <img
          :src="backUrl + movie.thumbnail"
          class="w-full object-cover h-[371px]"
          alt="movie"
        />
      </div>
      <h2 class="text-white text-base sm:text-2xl font-normal mt-4">
        {{ movie.title[locale] }}
      </h2>
      <div class="flex items-center mt-4">
        <span class="text-white text-base font-normal">{{
          movie.quotes.length
        }}</span>
        <ChatQuote class="ml-4" />
      </div>
    </router-link>
  </div>
</template>

<script setup>
import ChatQuote from "@/components/svg/ChatQuote.vue";
import i18n from "@/i18n/index.js";
import { computed } from "vue";

const locale = computed(() => {
  return i18n.global.locale;
});

const backUrl = import.meta.env.VITE_BACK_ROOT_URL;

defineProps(["movie"]);
</script>
