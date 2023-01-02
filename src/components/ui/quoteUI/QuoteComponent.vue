<template>
  <div class="mb-6 grid grid-cols-1 2xl:grid-cols-2">
    <div class="bg-[#11101A] col-span-1 px-6 py-8 rounded-lg">
      <div
        class="flex items-left md:items-center pb-6 border-b border-b-[#EFEFEF] flex-col md:flex-row"
      >
        <img
          :src="backUrl + quote.thumbnail"
          class="h-[140px] md:h-auto w-full min-h-[140px] sm:w-[226px] object-cover"
          alt="quote"
        />
        <div class="ml-0 w-full md:ml-8 mt-6 pr-12 relative">
          <p class="text-white font-normal text-base">
            {{ quote.quote[locale] }}
          </p>
          <QuoteDropdown :quote="quote" />
        </div>
      </div>
      <div class="mt-6 flex relative">
        <div class="flex items-center">
          <span class="text-white">{{ quote.comments.length }}</span>
          <Message class="ml-3" />
        </div>
        <div class="flex items-center ml-6">
          <span class="text-white">{{ quote.likes.length }}</span>
          <Like class="ml-3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Message from "@/components/svg/MessageIcon.vue";
import Like from "@/components/svg/LikeIcon.vue";
import QuoteDropdown from "@/components/ui/quoteUI/QuoteDropdown.vue";
import i18n from "@/i18n/index.js";
import { computed } from "vue";

const locale = computed(() => {
  return i18n.global.locale;
});

defineProps({
  quote: Object,
});

const backUrl = import.meta.env.VITE_BACK_ROOT_URL;
</script>
