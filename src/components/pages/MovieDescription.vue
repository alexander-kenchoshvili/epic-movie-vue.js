<template>
  <div class="bg-feed min-h-screen">
    <Header></Header>
    <div class="grid lg:grid-cols-4 grid-cols-1 px-3 sm:px-16 mt-8">
      <NavBar class="sm:col-span-1 hidden lg:block" />
      <div class="pb-10 col-span-3">
        <div>
          <div>
            <h2 class="text-white text-xs sm:text-base lg:text-2xl font-normal">
              {{ $t("layout.movie_description") }}
            </h2>
          </div>
        </div>
        <div class="mt-10">
          <DescriptionComponent :movie="movie" />
        </div>
        <div>
          <div
            class="mt-12 flex items-baseline flex-col-reverse lg:flex-row lg:items-center gap-4"
          >
            <h2
              class="text-2xl font-normal w-full lg:w-fit pt-14 border-t border-t-[#54535A] lg:border-none lg:pt-0 text-white"
            >
              {{ $t("layout.quotes") }} ({{ $t("layout.total") }}
              {{ quotes.length }}
              )
            </h2>
            <Line class="hidden lg:block" />
            <base-button
              @click="addQuote"
              class="flex items-center text-xs ml-0 mb-10 lg:mb-0 sm:text-base font-normal whitespace-nowrap px-2 sm:!px-4 sm:!py-2"
            >
              <AddMovieIcon class="mr-2" />{{
                $t("layout.add_quote")
              }}</base-button
            >
          </div>
        </div>
        <div class="mt-14">
          <QuoteComponent
            v-for="quote in quotes"
            :key="quote.id"
            :quote="quote"
          />
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import Header from "@/components/ui/The-Header.vue";
import NavBar from "@/components/ui/NavBar.vue";
import Line from "@/components/svg/LineIcon.vue";
import AddMovieIcon from "@/components/svg/AddMovieIcon.vue";
import DescriptionComponent from "@/components/ui/movieUI/DescriptionComponent.vue";
import QuoteComponent from "@/components/ui/quoteUI/QuoteComponent.vue";
import router from "@/router";
import { computed, onMounted } from "vue";
import { useSingleMovie } from "@/stores/useMovieStore";
import { useRoute } from "vue-router";

const movieStore = useSingleMovie();
const quotes = computed(() => movieStore.quotes);
const movie = computed(() => movieStore.singleMovie);

onMounted(() => {
  movieStore.movie(useRoute().params.movieId);
});

const addQuote = () => {
  router.push({ name: "add-quote" });
};
</script>
