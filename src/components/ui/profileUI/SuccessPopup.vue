<template>
  <div
    @click="showProfile"
    class="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-black z-10 bg-opacity-30"
  ></div>
  <div
    class="bg-[#D1E7DD] px-4 py-4 rounded flex items-center absolute top-24 left-4"
  >
    <ValidIcon class="mr-4" />
    <span class="text-[#0F5132] text-base mr-4">{{
      $t("profile.success_popup")
    }}</span>
    <Close @click="showProfile" class="stroke-black" />
  </div>
</template>

<script setup>
import ValidIcon from "@/components/svg/CheckCircle.vue";
import Close from "@/components/svg/CloseButton.vue";
import router from "@/router";
import { useUserInfo } from "@/stores/useUserInfo";
import { computed } from "vue";

const userdata = useUserInfo();
const userInformation = computed(() => userdata.user);

const showProfile = () => {
  router.push(
    userInformation.value.email_verified_at === null
      ? { name: "google-profile" }
      : { name: "profile" }
  );
};
</script>
