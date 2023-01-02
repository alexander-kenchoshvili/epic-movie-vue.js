<template>
  <Quote>
    <div class="w-[400px] sm:w-[600px] lg:w-[960px]">
      <div
        class="text-white pt-10 pb-6 relative border-transparent border-b-[#EFEFEF] border text-center text-2xl"
      >
        {{ $t("quotes.write_new_quote") }}
        <Close
          @click="closeQuote"
          class="absolute cursor-pointer top-11 right-9"
        />
      </div>
      <div class="px-8 pt-8 pb-10">
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
          <div class="mt-10 relative">
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
            class="bg-transparent mt-10 border border-[#6C757D] flex items-center flex-wrap w-full text-white px-4 py-4"
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
          <div class="mt-7 w-full">
            <BaseDropdown @getSelectedDropdown="getSelectedmovie" />
          </div>
          <div class="mt-4">
            <base-button class="ml-0 w-full">{{
              $t("quotes.post")
            }}</base-button>
          </div>
        </Form>
      </div>
    </div>
  </Quote>
</template>

<script setup>
import Quote from "@/components/ui/quoteUI/QuotePopup.vue";
import Close from "@/components/svg/CloseButton.vue";
import DropZone from "@/components/ui/DropZone.vue";
import BaseDropdown from "@/components/ui/BaseDropdown.vue";
import { ref } from "vue";
import router from "@/router";
import { Form, Field, ErrorMessage } from "vee-validate";
import axiosInstance from "@/config/axios/store";
import { useQuotes } from "@/stores/useQuoteStore";
import { useUserInfo } from "@/stores/useUserInfo";
import { computed } from "vue";

const userdata = useUserInfo();
const userInformation = computed(() => userdata.user);

const quotesStore = useQuotes();

const id = ref("");
const getSelectedmovie = (item) => {
  id.value = item;
};
getSelectedmovie();
let dropzoneFile = ref("");
const drop = (e) => {
  dropzoneFile.value = e.dataTransfer.files[0];
};
const seletedFile = () => {
  dropzoneFile.value = document.querySelector("#dropzoneFile").files[0];
};

const closeQuote = () => {
  router.push({ name: "news-feed" });
};

const onSubmit = async (values) => {
  try {
    await axiosInstance.post(`/quotes/${id.value}`, {
      quote_en: values.quote_en,
      quote_ka: values.quote_ka,
      thumbnail: values.image,
    });
    quotesStore.definePage = 1;
    quotesStore.allQuotes = [];
    quotesStore.quotes();
    router.push({ name: "news-feed" });
  } catch (error) {
    console.log(error);
  }
};
</script>
