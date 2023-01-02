<template>
  <div
    @click="showEmail"
    class="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-black z-10 bg-opacity-30"
  ></div>
  <div
    class="bg-[#D1E7DD] px-4 py-4 rounded flex flex-col absolute top-24 left-10"
  >
    <div class="flex items-center">
      <ValidIcon class="mr-4" />
      <span class="text-[#0F5132] text-base mr-4">{{
        $t("profile.new_email_success")
      }}</span>
      <Close @click="showEmail" class="stroke-black" />
    </div>

    <div class="mt-5">{{ $t("profile.please_check_email") }}</div>
  </div>
</template>

<script setup>
import ValidIcon from "@/components/svg/CheckCircle.vue";
import Close from "@/components/svg/CloseButton.vue";
import router from "@/router";

const showEmail = () => {
  router.push({ name: "edit-email" });
};
</script>
