<template>
  <Popup>
    <div class="w-[360px] flex flex-col items-center">
      <SendEmail />
      <h2 class="sm:text-3xl text-white mt-5">{{ $t("auth.check_email") }}</h2>
      <p
        class="text-white text-base mt-7 text-center font-['regular'] font-bold"
      >
        {{ $t("auth.password_recover_message") }}
      </p>
      <a
        target="_blank"
        class="bg-[#E31221] flex justify-center mt-10 rounded py-2 w-full text-white font-['regular'] font-bold"
        href="https://mail.google.com"
        >{{ $t("auth.go_email") }}</a
      >
      <span
        @click="showLanding"
        class="text-[#6C757D] flex items-center text-lg mt-8"
        >{{ $t("auth.skip") }}</span
      >
    </div>
  </Popup>
</template>

<script setup>
import router from "@/router";
import SendEmail from "@/components/svg/SendEmail.vue";
import Popup from "@/components/ui/BasePopup.vue";

const showLanding = () => {
  router.push({ name: "home" });
};
</script>
