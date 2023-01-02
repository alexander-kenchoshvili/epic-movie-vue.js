<template>
  <Quote>
    <div class="w-[400px] sm:w-[600px] lg:w-[960px]">
      <div
        class="pt-6 pb-6 px-8 flex justify-between items-center border-transparent border-b-[#EFEFEF] border"
      >
        <div class="flex items-center bg-[#24222F] rounded-lg py-3 px-4 gap-8">
          <Edit class="cursor-pointer" @click="edit" />
          <Line />
          <Delete class="cursor-pointer" />
        </div>
        <h2 class="text-white text-2xl font-normal">
          {{ $t("quotes.view_quote") }}
        </h2>
        <Close @click="closeView" class="cursor-pointer" />
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

        <div class="mt-10 relative">
          <div
            class="bg-transparent border outline-none border-[#6C757D] w-full text-white pr-16 pl-3 py-3"
          >
            {{ quoteEn }}
          </div>
          <span class="text-white absolute right-6 top-3 text-base">{{
            $t("quotes.language_en")
          }}</span>
        </div>
        <div class="mt-4 relative">
          <div
            class="bg-transparent border outline-none border-[#6C757D] w-full text-white pr-16 pl-3 py-3"
          >
            {{ quoteKa }}
          </div>

          <span class="text-white absolute right-6 top-3 text-base">{{
            $t("quotes.language_geo")
          }}</span>
        </div>
        <div class="rounded-[10px] mt-5">
          <img class="w-full object-cover" :src="quoteImage" alt="quote" />
        </div>
        <div class="mt-6 flex border-[#efefef] border-b pb-6">
          <div class="flex items-center">
            <span class="text-white">{{ quote.comments?.length }}</span>
            <Message class="ml-3" />
          </div>
          <div class="flex items-center ml-6">
            <span class="text-white">{{ quote.likes?.length }}</span>
            <Like class="ml-3" />
          </div>
        </div>
        <div class="mt-6" v-for="comment in quote.comments" :key="comment.id">
          <div class="flex items-center">
            <img :src="userInformation.thumbnail" alt="avatar" />
            <span class="text-white font-normal text-base sm:text-xl ml-6">{{
              comment.user.username
            }}</span>
          </div>
          <div class="pl-0 sm:pl-[75px]">
            <p
              class="text-white text-base sm:text-xl mt-2 font-normal border-b border-[#EFEFEF] pb-6"
            >
              {{ comment.body }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Quote>
</template>

<script setup>
import Quote from "@/components/ui/movieUI/DescriptionPopup.vue";
import Close from "@/components/svg/CloseButton.vue";
import Delete from "@/components/svg/DeleteIcon.vue";
import Edit from "@/components/svg/EditIcon.vue";
import Line from "@/components/svg/LineIcon.vue";
import Message from "@/components/svg/MessageIcon.vue";
import Like from "@/components/svg/LikeIcon.vue";
import router from "@/router";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/config/axios/store";
import { useUserInfo } from "@/stores/useUserInfo";
import { computed } from "vue";

const userdata = useUserInfo();
const userInformation = computed(() => userdata.user);

const singleQuoteId = useRoute().params.quoteId;
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

const edit = () => {
  router.push({ name: "edit-quote", params: { quoteId: quote.value.id } });
};

const closeView = () => {
  router.push({ name: "movie-description" });
};
</script>
