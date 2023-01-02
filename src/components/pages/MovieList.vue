<template>
  <div class="bg-feed min-h-screen">
    <Header></Header>
    <div class="grid lg:grid-cols-4 grid-cols-1 px-3 sm:px-16 mt-8">
      <NavBar class="sm:col-span-1 hidden lg:block" />
      <div class="pb-10 col-span-3">
        <div>
          <div class="flex justify-between items-center">
            <h2 class="text-white text-xs sm:text-base lg:text-2xl font-normal">
              {{ $t("layout.my_movies") }} ({{ $t("layout.total") }}
              {{ movies.length }}
              )
            </h2>
            <div class="flex items-center">
              <div class="hidden lg:block">
                <form class="flex items-center">
                  <Search class="mr-4" />
                  <input
                    type="search"
                    name="search"
                    v-model="moviesStore.searchMovie"
                    class="bg-transparent outline-none px-2 py-2 text-white"
                    :placeholder="$t('layout.search')"
                  />
                </form>
              </div>
              <base-button
                @click="showMovie"
                class="flex items-center text-xs sm:text-base font-normal whitespace-nowrap px-2 sm:!px-4 sm:!py-2"
              >
                <AddMovieIcon class="mr-2" />{{
                  $t("layout.add_movie")
                }}</base-button
              >
            </div>
          </div>
        </div>
        <div
          class="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          <MovieComponent
            v-for="movie in movies"
            :key="movie.id"
            :movie="movie"
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
import AddMovieIcon from "@/components/svg/AddMovieIcon.vue";
import Search from "@/components/svg/SearchIcon.vue";
import MovieComponent from "@/components/ui/movieUI/MovieComponent.vue";
import router from "@/router";
import { computed, onMounted } from "vue";
import { useMovies } from "@/stores/useMovieStore";

const moviesStore = useMovies();
const movies = computed(() =>
  moviesStore.allMovies.filter((movie) => {
    if (
      movie.title.en.includes(moviesStore.searchMovie) ||
      movie.title.ka.includes(moviesStore.searchMovie)
    ) {
      return movie;
    } else if (moviesStore.searchMovie === "") {
      return movie;
    }
  })
);

onMounted(() => {
  moviesStore.movies();
});

const showMovie = () => {
  router.push({ name: "movie-popup" });
};
</script>
