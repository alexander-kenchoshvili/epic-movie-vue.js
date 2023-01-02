<template>
  <div
    v-if="dropdown"
    @click="closePopup"
    class="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 z-10"
  ></div>
  <div>
    <div class="cursor-pointer absolute z-20 right-0 top-28 sm:top-[-65px]">
      <Dots @click="openDropdown" />
    </div>
    <div
      v-if="dropdown"
      class="bg-[#222030] px-8 py-8 absolute top-0 right-0 sm:top-[-50px] z-20 sm:right-[-180px] rounded-md"
    >
      <ul>
        <li @click="view" class="flex mb-5 cursor-pointer text-white">
          <Eye class="mr-6" /> {{ $t("quotes.view_quote") }}
        </li>
        <li @click="edit" class="flex mb-5 cursor-pointer text-white">
          <Edit class="mr-6" /> {{ $t("quotes.edit") }}
        </li>
        <li @click="deleteQuote" class="flex cursor-pointer text-white">
          <Delete class="mr-6" /> {{ $t("quotes.delete") }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import Dots from "@/components/svg/DotsIcon.vue";
import Eye from "@/components/svg/PopupEye.vue";
import Edit from "@/components/svg/EditIcon.vue";
import Delete from "@/components/svg/DeleteIcon.vue";
import router from "@/router";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useQuotes } from "@/stores/useQuoteStore";
import axiosInstance from "@/config/axios/store";
import { useSingleMovie } from "@/stores/useMovieStore";

const props = defineProps({
  quote: {
    type: Object,
    required: true,
  },
});
const movieStore = useSingleMovie();
const quotesStore = useQuotes();
const singleMovieId = useRoute().params.movieId;

const dropdown = ref(false);

const openDropdown = () => {
  dropdown.value = true;
};

const closePopup = () => {
  dropdown.value = false;
};

const view = () => {
  router.push({ name: "view-quote", params: { quoteId: props.quote.id } });
  dropdown.value = false;
};

const edit = () => {
  router.push({ name: "edit-quote", params: { quoteId: props.quote.id } });
  dropdown.value = false;
};

const deleteQuote = async () => {
  await axiosInstance.post(`/deletequote/${props.quote.id}`);
  movieStore.movie(singleMovieId);
  quotesStore.definePage = 1;
  quotesStore.allQuotes = [];
  quotesStore.quotes();
  router.push({ name: "movie-description" });
  dropdown.value = false;
};
</script>
