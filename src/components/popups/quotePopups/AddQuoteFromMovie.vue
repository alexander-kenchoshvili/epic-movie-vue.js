<template>
  <Quote>
    <div class="w-[400px] sm:w-[600px] lg:w-[960px]">
      <div
        class="text-white pt-6 pb-6 relative border-transparent border-b-[#EFEFEF] border text-center text-2xl"
      >
        {{ $t("layout.add_quote") }}
        <Close
          @click="closeQuote"
          class="absolute cursor-pointer top-7 right-9"
        />
      </div>
      <div class="px-6 py-6">
        <div class="grid grid-cols-4 gap-8">
          <div class="col-span-4 lg:col-span-2">
            <img
              :src="backUrl + movie.thumbnail"
              class="object-cover h-full"
              alt="movie"
            />
          </div>
          <div class="col-span-4 lg:col-span-2">
            <div class="flex items-center justify-between">
              <h2 class="text-[#DDCCAA] text-2xl font-normal">
                {{ locale === "en" ? movie.title?.en : movie.title?.ka }}
              </h2>
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
                <span class="text-white text-base"
                  >{{ $t("layout.director") }}:</span
                >
                <h2 class="ml-2 text-white text-base">
                  {{
                    locale === "en" ? movie.director?.en : movie.director?.ka
                  }}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <Form @submit="onSubmit">
          <div class="mt-4 relative">
            <Field
              as="textarea"
              class="bg-transparent border outline-none border-[#6C757D] w-full text-white pr-16 px-3 pt-3"
              :placeholder="$t('quotes.create_quote')"
              name="quote_en"
              id=""
              cols="30"
              rows="3"
              rules="required|min:5|only_latin_characters_and_numbers"
            />
            <ErrorMessage
              class="text-red-500 border-rose-600"
              name="quote_en"
            />

            <span class="text-white absolute right-6 top-3 text-base">{{
              $t("quotes.language_en")
            }}</span>
          </div>
          <div class="mt-4 relative">
            <Field
              rules="required|min:5|only_georgian_characters_and_numbers"
              as="textarea"
              class="bg-transparent border outline-none border-[#6C757D] w-full text-white pr-16 px-3 pt-3"
              :placeholder="$t('quotes.new_quote')"
              name="quote_ka"
              id=""
              cols="30"
              rows="3"
            />
            <ErrorMessage
              class="text-red-500 border-rose-600"
              name="quote_ka"
            />
            <span class="text-white absolute right-6 top-3 text-base">{{
              $t("quotes.language_geo")
            }}</span>
          </div>
          <div
            class="bg-transparent mt-4 border border-[#6C757D] flex flex-wrap items-center w-full text-white px-4 py-4"
          >
            <DropZone
              @drop.prevent="drop"
              rules="required"
              @change="seletedFile"
            />
            <span class="text-white ml-5">
              {{ $t("quotes.file") }}: {{ dropzoneFile.name }}</span
            >
          </div>

          <div class="mt-6">
            <base-button class="ml-0 w-full">{{
              $t("layout.add_quote")
            }}</base-button>
          </div>
        </Form>
      </div>
    </div>
  </Quote>
</template>

<script setup>
import Quote from "@/components/ui/movieUI/DescriptionPopup.vue";
import Close from "@/components/svg/CloseButton.vue";
import DropZone from "@/components/ui/DropZone.vue";
import { onMounted, ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import router from "@/router";
import axiosInstance from "@/config/axios/store";
import { useRoute } from "vue-router";
import { useSingleMovie } from "@/stores/useMovieStore";
import { useQuotes } from "@/stores/useQuoteStore";

import { computed } from "vue";
import i18n from "@/i18n/index.js";

const quotesStore = useQuotes();

const locale = computed(() => {
  return i18n.global.locale;
});

const movieStore = useSingleMovie();
const movie = computed(() => movieStore.singleMovie);
const backUrl = import.meta.env.VITE_BACK_ROOT_URL;

onMounted(() => {
  movieStore.movie(useRoute().params.movieId);
});

let dropzoneFile = ref("");
const drop = (e) => {
  dropzoneFile.value = e.dataTransfer.files[0];
};
const seletedFile = () => {
  dropzoneFile.value = document.querySelector("#dropzoneFile").files[0];
};

const closeQuote = () => {
  router.push({ name: "movie-description" });
};
const singleMovieId = useRoute().params.movieId;

const onSubmit = async (values) => {
  try {
    await axiosInstance.post(`/quotes/${singleMovieId}`, {
      quote_en: values.quote_en,
      quote_ka: values.quote_ka,
      thumbnail: values.image,
    });
    movieStore.movie(singleMovieId);
    quotesStore.definePage = 1;
    quotesStore.allQuotes = [];
    quotesStore.quotes();

    router.push({ name: "movie-description" });
  } catch (error) {
    console.log(error);
  }
};
</script>
