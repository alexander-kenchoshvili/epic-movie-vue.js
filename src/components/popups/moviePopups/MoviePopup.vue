<template>
  <Movie>
    <div class="w-[400px] sm:w-[600px] lg:w-[960px]">
      <div
        class="text-white pt-4 pb-4 relative border-transparent border-b-[#EFEFEF] border text-center text-xs sm:text-2xl"
      >
        add movie
        <Close
          @click="closeMovie"
          class="absolute cursor-pointer top-6 right-9"
        />
      </div>
      <div class="px-8 pt-4 pb-6">
        <div class="flex items-center">
          <img
            :src="userInformation.thumbnail"
            alt="author"
            class="w-16 h-16 object-cover rounded-full"
          />
          <span class="text-white ml-3 text-base font-normal">{{
            userInformation.username
          }}</span>
        </div>
        <Form @submit="onSubmit">
          <div class="mt-4 relative">
            <movie-quote
              name="movie_en"
              rules="required|only_latin_characters_and_numbers|min:3"
              type="text"
              placeholder="Movie name"
            >
            </movie-quote>
            <span class="text-white absolute right-6 top-4 text-xs sm:text-base"
              >Eng</span
            >
          </div>
          <div class="mt-4 relative">
            <movie-quote
              name="movie_ka"
              rules="required|only_georgian_characters_and_numbers|min:3"
              type="text"
              placeholder="ფილმის სახელი"
            >
            </movie-quote>
            <span class="text-white absolute right-6 top-4 text-xs sm:text-base"
              >ქარ</span
            >
          </div>
          <TagInputs />
          <div class="mt-4 relative">
            <movie-quote
              name="director_en"
              rules="required|only_latin_characters_and_numbers|min:3"
              type="text"
              placeholder="Director"
            >
            </movie-quote>
            <span class="text-white absolute right-6 top-4 text-xs sm:text-base"
              >Eng</span
            >
          </div>
          <div class="mt-4 relative">
            <movie-quote
              name="director_ka"
              rules="required|only_georgian_characters_and_numbers|min:3"
              type="text"
              placeholder="რეჟისორი"
            >
            </movie-quote>
            <span class="text-white absolute right-6 top-4 text-xs sm:text-base"
              >ქარ</span
            >
          </div>
          <div class="mt-4 relative">
            <Field
              rules="required|only_latin_characters_and_numbers|min:5"
              as="textarea"
              class="bg-transparent border outline-none border-[#6C757D] text-xs sm:text-base w-full text-white pr-16 px-3 pt-3"
              placeholder="Movie description"
              name="description_en"
              id=""
              cols="30"
              rows="3"
            />
            <ErrorMessage
              class="text-red-500 border-rose-600"
              name="description_en"
            />
            <span class="text-white absolute right-6 top-3 text-xs sm:text-base"
              >Eng</span
            >
          </div>
          <div class="mt-4 relative">
            <Field
              rules="required|only_georgian_characters_and_numbers|min:5"
              as="textarea"
              class="bg-transparent border outline-none border-[#6C757D] text-xs sm:text-base w-full text-white pr-16 px-3 pt-3"
              placeholder="ფილმის აღწერა"
              name="description_ka"
              id=""
              cols="30"
              rows="3"
            />
            <ErrorMessage
              class="text-red-500 border-rose-600"
              name="description_ka"
            />
            <span class="text-white absolute right-6 top-3 text-xs sm:text-base"
              >ქარ</span
            >
          </div>
          <div
            class="bg-transparent mt-4 border border-[#6C757D] flex flex-wrap items-center w-full text-white px-4 py-4"
          >
            <DropZone
              @drop.prevent="drop"
              rules="required"
              @change="seletedFile"
            />
            <span class="text-white text-xs sm:text-base ml-5">
              file: {{ dropzoneFile.name }}</span
            >
          </div>
          <div class="mt-4">
            <base-button class="ml-0 w-full text-xs sm:text-base"
              >Add movie</base-button
            >
          </div>
        </Form>
      </div>
    </div>
  </Movie>
</template>

<script setup>
import Movie from "@/components/ui/movieUI/MoviePopup.vue";
import Close from "@/components/svg/CloseButton.vue";
import DropZone from "@/components/ui/DropZone.vue";
import TagInputs from "@/components/ui/TagInputs.vue";
import axiosInstance from "@/config/axios/store";
import router from "@/router";
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import { useMovies } from "@/stores/useMovieStore";
import { useUserInfo } from "@/stores/useUserInfo";
import { computed } from "vue";

const userdata = useUserInfo();
const userInformation = computed(() => userdata.user);

let dropzoneFile = ref("");
const drop = (e) => {
  dropzoneFile.value = e.dataTransfer.files[0];
};
const seletedFile = () => {
  dropzoneFile.value = document.querySelector("#dropzoneFile").files[0];
};

const closeMovie = () => {
  router.push({ name: "movie-list" });
};
const allMovies = useMovies();
const onSubmit = async (values) => {
  try {
    await axiosInstance.post(`/movies`, {
      title_en: values.movie_en,
      title_ka: values.movie_ka,
      director_en: values.director_en,
      director_ka: values.director_ka,
      description_en: values.description_en,
      description_ka: values.description_ka,
      genre: JSON.stringify(values.genre),
      thumbnail: values.image,
    });
    allMovies.movies();
    router.push({ name: "movie-list" });
  } catch (error) {
    console.log(error);
  }
};
</script>
