<template>
  <Popup>
    <div class="w-[360px] flex flex-col items-center">
      <SendEmail />
      <h2 class="sm:text-3xl text-white mt-5">{{ $t("auth.thank_you") }}!</h2>
      <p
        class="text-white text-[16px] mt-7 text-center font-['regular'] font-bold"
      >
        {{ $t("auth.check_email_verify_message") }}
      </p>
      <a
        target="_blank"
        class="bg-[#E31221] flex justify-center mt-10 rounded py-2 w-full text-white font-['regular'] font-bold"
        href="https://mail.google.com"
        >{{ $t("auth.go_email") }}</a
      >
    </div>
  </Popup>
</template>

<script setup>
import SendEmail from "@/components/svg/SendEmail.vue";
import Popup from "@/components/ui/BasePopup.vue";
</script>
