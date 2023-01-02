<template>
  <Quote>
    <div class="w-[400px] sm:w-[600px] lg:w-[960px]">
      <div
        class="pt-6 pb-6 px-8 flex justify-between items-center border-transparent border-b-[#EFEFEF] border"
      >
        <div class="flex items-center bg-[#24222F] rounded-lg py-3 px-4 gap-8">
          <Delete class="cursor-pointer" @click="deleteQuote" />
        </div>
        <h2 class="text-white text-2xl font-normal">
          {{ $t("quotes.edit") }}
        </h2>
        <Close @click="closeEdit" class="cursor-pointer" />
      </div>
      <div class="px-8 pt-4 pb-4">
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
          <div class="mt-10 relative">
            <Field
              as="textarea"
              class="bg-transparent border outline-none border-[#6C757D] w-full text-white pr-16 px-3 pt-3"
              placeholder="Start create new quote"
              name="quote_en"
              rules="min:5|only_latin_characters_and_numbers"
              id=""
              cols="30"
              rows="2"
              v-model="quoteEn"
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
              as="textarea"
              class="bg-transparent border outline-none border-[#6C757D] w-full text-white pr-16 px-3 pt-3"
              placeholder="ახალი ციტატა"
              name="quote_ka"
              id=""
              rules="min:5|only_georgian_characters_and_numbers"
              cols="30"
              rows="2"
              v-model="quoteKa"
            />
            <ErrorMessage
              class="text-red-500 border-rose-600"
              name="quote_ka"
            />
            <span class="text-white absolute right-6 top-3 text-base">{{
              $t("quotes.language_geo")
            }}</span>
          </div>
          <div class="rounded-[10px] relative mt-4">
            <img class="w-full object-cover" :src="quoteImage" alt="" />

            <div
              @dragenter.prevent
              @dragleave.prevent
              @dragover.prevent
              @drop.prevent="drop"
              @change="seletedFile"
              class="absolute bg-[#181623] opacity-80 rounded-lg px-3 py-3 flex flex-col items-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            >
              <PhotoIcon />
              <label
                for="dropzoneFile"
                class="px-3 py-3 text-white cursor-pointer text-base"
                >{{ $t("quotes.choose_file") }} {{ dropzoneFile.name }}
              </label>
              <Field
                type="file"
                class="hidden"
                id="dropzoneFile"
                name="image"
              />
            </div>
          </div>

          <div class="mt-4">
            <base-button class="ml-0 w-full">{{
              $t("quotes.save_changes")
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
import Delete from "@/components/svg/DeleteIcon.vue";
import PhotoIcon from "@/components/svg/UploadPhoto.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import router from "@/router";
import { onMounted, ref } from "vue";
import axiosInstance from "@/config/axios/store";
import { useRoute } from "vue-router";
import { useSingleMovie } from "@/stores/useMovieStore";
import { useUserInfo } from "@/stores/useUserInfo";
import { computed } from "vue";

const userdata = useUserInfo();
const userInformation = computed(() => userdata.user);

const movieStore = useSingleMovie();

const singleQuoteId = useRoute().params.quoteId;
const singleMovieId = useRoute().params.movieId;
console.log(singleQuoteId);

const quote = ref({});
const quoteEn = ref("");
const quoteKa = ref("");
const quoteImage = ref("");

onMounted(async () => {
  try {
    const response = await axiosInstance.get(`/quote/${singleQuoteId}`);
    quote.value = response.data;
    quoteEn.value = quote.value.quote.en;
    quoteKa.value = quote.value.quote.ka;
    quoteImage.value =
      import.meta.env.VITE_BACK_ROOT_URL + quote.value.thumbnail;
  } catch (error) {
    console.log(error);
  }
});

const onSubmit = async (values) => {
  try {
    await axiosInstance.post(`/updatequote/${singleQuoteId}`, {
      quote_en: values.quote_en,
      quote_ka: values.quote_ka,
      thumbnail: values.image,
    });
    movieStore.movie(singleMovieId);
    router.push({ name: "movie-description" });
  } catch (error) {
    console.log(error);
  }
};

let dropzoneFile = ref("");
const drop = (e) => {
  dropzoneFile.value = e.dataTransfer.files[0];
};
const seletedFile = () => {
  dropzoneFile.value = document.querySelector("#dropzoneFile").files[0];
};

const closeEdit = () => {
  router.push({ name: "movie-description" });
};
const deleteQuote = async () => {
  await axiosInstance.post(`/deletequote/${singleQuoteId}`);
  movieStore.movie(singleMovieId);
  router.push({ name: "movie-description" });
};
</script>
