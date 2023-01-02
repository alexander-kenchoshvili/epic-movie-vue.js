<template>
  <Movie>
    <div class="w-[400px] sm:w-[600px] lg:w-[960px]">
      <div
        class="text-white pt-4 pb-4 relative border-transparent border-b-[#EFEFEF] border text-center text-2xl"
      >
        {{ $t("movies.edit_movie") }}
        <Close
          @click="closePopup"
          class="absolute cursor-pointer top-6 right-9"
        />
      </div>
      <div class="px-8 pt-4 pb-6">
        <div class="flex items-center">
          <img
            :src="userInformation.thumbnail"
            class="w-16 h-16 object-cover rounded-full"
            alt="author"
          />
          <span class="text-white ml-3 text-base font-normal">{{
            userInformation.username
          }}</span>
        </div>
        <Form @submit="onSubmit">
          <div class="mt-4 relative">
            <Field
              type="text"
              name="movie_en"
              rules="only_latin_characters_and_numbers"
              placeholder="Movie name"
              v-model="movieEn"
              class="w-full mt-2 mb-2 font-normal rounded bg-[#11101A] border border-[#CED4DA] text-base text-white outline-none py-2 pl-4 pr-16"
            />
            <span class="text-white absolute right-6 top-4 text-base">{{
              $t("quotes.language_en")
            }}</span>
            <ErrorMessage
              class="text-red-500 border-rose-600"
              name="movie_en"
            />
          </div>
          <div class="mt-4 relative">
            <Field
              type="text"
              name="movie_ka"
              rules="only_georgian_characters_and_numbers"
              placeholder="ფილმის სახელი"
              v-model="movieKa"
              class="w-full mt-2 mb-2 font-normal rounded bg-[#11101A] border border-[#CED4DA] text-base text-white outline-none py-2 pl-4 pr-16"
            />
            <span class="text-white absolute right-6 top-4 text-base">{{
              $t("quotes.language_geo")
            }}</span>
            <ErrorMessage
              class="text-red-500 border-rose-600"
              name="movie_ka"
            />
          </div>
          <div class="mt-4">
            <Field v-model="tags" name="genre">
              <div
                class="w-full flex gap-2 mt-2 mb-2 font-normal rounded bg-[#11101A] border border-[#CED4DA] text-base text-white outline-none py-2 pl-4 pr-16"
              >
                <div
                  class="flex bg-[#6C757D] text-white px-2 py-2 items-center flex-wrap"
                  v-for="(tag, index) in tags"
                  :key="'tag' + index"
                >
                  {{ tag }}
                  <Delete
                    @click="removeTag(index)"
                    class="ml-2 cursor-pointer"
                  />
                </div>

                <input
                  @keydown.enter.prevent="addTag"
                  v-model="tagValue"
                  type="text"
                  :placeholder="$t('movies.type_genre')"
                  class="bg-transparent outline-none"
                />
              </div>
            </Field>
            <ErrorMessage class="text-red-500 border-rose-600" name="genre" />
          </div>
          <div class="mt-4 relative">
            <Field
              class="w-full mt-2 mb-2 font-normal rounded bg-[#11101A] border border-[#CED4DA] text-base text-white outline-none py-2 pl-4 pr-16"
              name="director_en"
              rules="only_latin_characters_and_numbers"
              type="text"
              placeholder="Director"
              v-model="directorEn"
            />
            <ErrorMessage
              class="text-red-500 border-rose-600"
              name="director_en"
            />

            <span class="text-white absolute right-6 top-4 text-base">{{
              $t("quotes.language_en")
            }}</span>
          </div>
          <div class="mt-4 relative">
            <Field
              class="w-full mt-2 mb-2 font-normal rounded bg-[#11101A] border border-[#CED4DA] text-base text-white outline-none py-2 pl-4 pr-16"
              name="director_ka"
              type="text"
              rules="only_georgian_characters_and_numbers"
              placeholder="რეჟისორი"
              v-model="directorKa"
            />
            <span class="text-white absolute right-6 top-4 text-base">{{
              $t("quotes.language_geo")
            }}</span>
          </div>
          <div class="mt-4 relative">
            <Field
              as="textarea"
              class="bg-transparent border outline-none border-[#6C757D] w-full text-white pr-16 px-3 pt-3"
              placeholder="Movie description"
              name="description_en"
              rules="only_latin_characters_and_numbers"
              id=""
              cols="30"
              rows="3"
              v-model="descriptionEn"
            />
            <ErrorMessage
              class="text-red-500 border-rose-600"
              name="description_en"
            />
            <span class="text-white absolute right-6 top-3 text-base">{{
              $t("quotes.language_en")
            }}</span>
          </div>
          <div class="mt-4 relative">
            <Field
              as="textarea"
              class="bg-transparent border outline-none border-[#6C757D] w-full text-white pr-16 px-3 pt-3"
              placeholder="ფილმის აღწერა"
              name="description_ka"
              rules="only_georgian_characters_and_numbers"
              id=""
              cols="30"
              rows="3"
              v-model="descriptionKa"
            />
            <ErrorMessage
              class="text-red-500 border-rose-600"
              name="description_ka"
            />
            <span class="text-white absolute right-6 top-3 text-base">{{
              $t("quotes.language_geo")
            }}</span>
          </div>
          <div
            class="bg-transparent mt-4 border border-[#6C757D] flex items-center w-full text-white px-4 py-4"
          >
            <DropZone @drop.prevent="drop" @change="seletedFile" />
            <span class="text-white ml-5">
              {{ $t("quotes.file") }}: {{ dropzoneFile.name }}</span
            >
          </div>
          <div class="mt-4">
            <base-button class="ml-0 w-full">{{
              $t("quotes.save_changes")
            }}</base-button>
          </div>
        </Form>
      </div>
    </div>
  </Movie>
</template>

<script setup>
import Movie from "@/components/ui/movieUI/EditMoviePopup.vue";
import Close from "@/components/svg/CloseButton.vue";
import DropZone from "@/components/ui/DropZone.vue";
import router from "@/router";
import { useRoute } from "vue-router";
import axiosInstance from "@/config/axios/store";
import { onMounted, ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import Delete from "@/components/svg/RemoveTag.vue";
import { useSingleMovie } from "@/stores/useMovieStore";
import { useUserInfo } from "@/stores/useUserInfo";
import { computed } from "vue";

const userdata = useUserInfo();
const userInformation = computed(() => userdata.user);

const movieStore = useSingleMovie();

const tagValue = ref("");
const tags = ref([]);
const singleMovie = useRoute().params.movieId;

const addTag = () => {
  if (!tagValue.value == "") {
    tags.value.push(tagValue.value);
  }
  tagValue.value = "";
};
const removeTag = (index) => {
  tags.value.splice(index, 1);
};

let dropzoneFile = ref("");

const drop = (e) => {
  dropzoneFile.value = e.dataTransfer.files[0];
};
const seletedFile = () => {
  dropzoneFile.value = document.querySelector("#dropzoneFile").files[0];
};

const closePopup = () => {
  router.push({ name: "movie-description" });
};

const onSubmit = async (values) => {
  try {
    await axiosInstance.post(`/updatemovie/${singleMovie}`, {
      title_en: values.movie_en,
      title_ka: values.movie_ka,
      director_en: values.director_en,
      director_ka: values.director_ka,
      description_en: values.description_en,
      description_ka: values.description_ka,
      genre: JSON.stringify(values.genre),
      thumbnail: values.image,
    });
    movieStore.movie(singleMovie);
    router.push({ name: "movie-description" });
  } catch (error) {
    console.log(error);
  }
};

const movie = ref({});
const descriptionEn = ref("");
const descriptionKa = ref("");
const movieEn = ref("");
const movieKa = ref("");
const directorEn = ref("");
const directorKa = ref("");

onMounted(async () => {
  try {
    const response = await axiosInstance.get(`/singlemovie/${singleMovie}`);
    movie.value = response.data[0];
    descriptionEn.value = movie.value.description.en;
    descriptionKa.value = movie.value.description.ka;
    movieEn.value = movie.value.title.en;
    movieKa.value = movie.value.title.ka;
    directorEn.value = movie.value.director.en;
    directorKa.value = movie.value.director.ka;
    tags.value = movie.value.genre;
  } catch (error) {
    console.log(error);
  }
});
</script>
