<template>
  <div class="grid grid-cols-4 gap-8">
    <div class="col-span-4 lg:col-span-2">
      <img
        :src="backUrl + movie.thumbnail"
        class="object-cover h-[441px]"
        alt="movie"
      />
    </div>
    <div class="col-span-4 lg:col-span-2">
      <div class="flex items-center justify-between">
        <h2 class="text-[#DDCCAA] text-2xl font-normal">
          {{ locale === "en" ? movie.title?.en : movie.title?.ka }}
        </h2>
        <div class="flex items-center bg-[#24222F] rounded-lg py-3 px-4 gap-8">
          <Edit class="cursor-pointer" @click="editMovie" />
          <Line />
          <Delete class="cursor-pointer" @click="deleteMovie" />
        </div>
      </div>
      <div class="flex flex-col">
        <div class="mt-6">
          <span
            v-for="ganre in movie.genre"
            :key="ganre.id"
            class="text-white bg-[#6C757D] first:ml-0 ml-2 px-3 py-2 rounded-md text-base"
            >{{ ganre }}</span
          >
        </div>
        <div class="mt-6 flex items-center">
          <span class="text-white text-base">{{ $t("layout.director") }}:</span>
          <h2 class="ml-2 text-white text-base">
            {{ locale === "en" ? movie.director?.en : movie.director?.ka }}
          </h2>
        </div>

        <div class="text-white text-base mt-6">
          <p>
            {{
              locale === "en" ? movie.description?.en : movie.description?.ka
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Delete from "@/components/svg/DeleteIcon.vue";
import Edit from "@/components/svg/EditIcon.vue";
import Line from "@/components/svg/LineIcon.vue";
import router from "@/router";
import axiosInstance from "@/config/axios/store";
import { useRoute } from "vue-router";
import { useMovies } from "@/stores/useMovieStore";
import i18n from "@/i18n/index.js";
import { computed } from "vue";

const locale = computed(() => {
  return i18n.global.locale;
});

const useAllMovies = useMovies();

const singleMovieId = useRoute().params.movieId;

const backUrl = import.meta.env.VITE_BACK_ROOT_URL;

defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const editMovie = () => {
  router.push({ name: "edit-movie" });
};

const deleteMovie = () => {
  axiosInstance.post(`/delete/${singleMovieId}`);
  useAllMovies.movies();
  router.push({ name: "movie-list" });
};
</script>
