<template>
  <Popup>
    <div class="w-[360px] flex flex-col items-center">
      <h2 class="sm:text-3xl text-white mt-5">
        {{ $t("auth.password_reset") }} ?
      </h2>
      <p
        class="text-white text-base mt-7 text-center font-['regular'] font-bold"
      >
        {{ $t("auth.email_for_reset_password") }}
      </p>
      <Form @submit="onSubmit" class="w-full mt-6">
        <base-input
          name="email"
          rules="required|email"
          :label="$t('auth.email')"
          type="email"
          :placeholder="$t('auth.register_email_placeholder')"
        ></base-input>

        <base-button
          class="bg-[#E31221] flex justify-center mt-6 ml-0 rounded py-2 w-full text-white font-['regular'] font-bold"
          >{{ $t("auth.send_instructions") }}</base-button
        >
      </Form>
      <span
        @click="getLogin"
        class="text-[#6C757D] flex items-center text-lg mt-8"
      >
        <LeftArrow class="mr-3" /> {{ $t("auth.login_back") }}</span
      >
    </div>
  </Popup>
</template>

<script setup>
import { Form } from "vee-validate";

import Popup from "@/components/ui/BasePopup.vue";
import LeftArrow from "@/components/svg/LeftArrow.vue";
import router from "@/router";
import axios from "@/config/axios/index.js";
import i18n from "@/i18n/index.js";
import { computed } from "vue";

const locale = computed(() => {
  return i18n.global.locale;
});

const onSubmit = (values, actions) => {
  axios
    .post("forgot-password", {
      email: values.email,
    })
    .then(() => {
      router.push({ name: "password-check" });
    })
    .catch((error) => {
      console.log(error);
      if (locale.value === "ka") {
        actions.setFieldError("email", "იმეილი არ არსებობს");
      } else {
        actions.setFieldError("email", error.response.data.errors.email);
      }
    });
};
const getLogin = () => {
  router.push({ name: "login" });
};
</script>
