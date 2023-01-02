<template>
  <div class="relative w-full">
    <Field
      type="text"
      rules="required"
      name="movies"
      class="bg-[#000000] w-full cursor-pointer text-sm block pl-16 pt-7 pb-6 pr-6 text-white appearance-none outline-none border-none"
      :placeholder="$t('quotes.choose_movie')"
      @click="handleDropdown"
      @blur="clickOutside"
      v-model="dropdownValue.title"
      readonly
    />
    <div v-if="showDropdown" class="bg-[#000000] absolute w-full top-[70px]">
      <ul
        v-for="movie in movies"
        :key="movie.id"
        class="text-white pl-16 cursor-pointer"
      >
        <li @mousedown="changeValue(movie)" class="mb-2">
          {{ movie.title[locale] }}
        </li>
      </ul>
    </div>
    <ErrorMessage class="text-red-500 border-rose-600" name="movies" />
    <Camera class="absolute top-4 left-4" />
    <Arrow class="absolute top-9 right-4" />
  </div>
</template>

<script setup>
import Camera from "@/components/svg/CameraIcon.vue";
import Arrow from "@/components/svg/DropdownArrow.vue";
import { Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import { computed } from "vue";
import { useMovies } from "@/stores/useMovieStore";
import i18n from "@/i18n/index.js";

const locale = computed(() => {
  return i18n.global.locale;
});

const emit = defineEmits(["getSelectedDropdown"]);

const moviesStore = useMovies();
const movies = computed(() => moviesStore.allMovies);

const showDropdown = ref(false);
const dropdownValue = ref({});

const changeValue = (movie) => {
  dropdownValue.value.id = movie.id;
  dropdownValue.value.title =
    locale.value === "en" ? movie.title.en : movie.title.ka;
  emit("getSelectedDropdown", dropdownValue.value.id);
};

const clickOutside = () => {
  showDropdown.value = false;
};

const handleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
</script>
