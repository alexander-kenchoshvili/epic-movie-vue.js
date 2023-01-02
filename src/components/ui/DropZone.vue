<template>
  <div
    @dragenter.prevent
    @dragleave.prevent
    @dragover.prevent
    @drop.prevent
    class="flex items-center relative"
  >
    <PhotoIcon />
    <span class="text-white text-xs sm:text-base ml-2">{{
      $t("quotes.drag_drop")
    }}</span>
    <label
      for="dropzoneFile"
      class="px-3 py-3 text-white cursor-pointer ml-3 text-xs sm:text-base bg-[#9747FF]"
      >{{ $t("quotes.choose_file") }}</label
    >
    <Field
      type="file"
      :rules="rules"
      class="hidden"
      id="dropzoneFile"
      name="image"
    />
    <ErrorMessage
      class="text-red-500 absolute top-16 left-[-17px] border-rose-600"
      name="image"
    />
  </div>
</template>

<script setup>
import PhotoIcon from "@/components/svg/UploadPhoto.vue";
import { Field, ErrorMessage } from "vee-validate";
defineProps({
  rules: String,
});
</script>
