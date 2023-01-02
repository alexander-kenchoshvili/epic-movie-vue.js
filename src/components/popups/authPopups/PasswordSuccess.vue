<template>
  <Popup>
    <div class="w-[360px] flex flex-col items-center">
      <ConfirmIcon />
      <h2 class="sm:text-3xl text-white mt-5">{{ $t("auth.success") }} !</h2>
      <p
        class="text-white text-base mt-7 text-center font-['regular'] font-bold"
      >
        {{ $t("auth.success_message") }}
      </p>
      <base-button
        @click="showLogin"
        class="bg-[#E31221] flex justify-center mt-10 rounded py-2 w-full text-white font-['regular'] font-bold"
        >{{ $t("auth.login") }}</base-button
      >
    </div>
  </Popup>
</template>

<script setup>
import router from "@/router";
import ConfirmIcon from "@/components/svg/ConfirmIcon.vue";
import Popup from "@/components/ui/BasePopup.vue";

const showLogin = () => {
  router.push({ name: "login" });
};
</script>
