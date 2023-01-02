<template>
  <Popup>
    <div class="w-[360px] flex flex-col items-center">
      <SendEmail />
      <h2
        class="sm:text-3xl text-white text-center font-['regular'] font-bold mt-5"
      >
        {{ $t("auth.create_new_password") }}
      </h2>
      <p
        class="text-white text-base mt-7 text-center font-['regular'] font-bold"
      >
        {{ $t("auth.new_password_message") }}
      </p>
      <Form @submit="onSubmit" class="w-full mt-6">
        <div class="mt-4 relative">
          <label class="text-white font-['regular'] font-bold text-base" for=""
            >{{ $t("auth.password") }}<span class="text-red-500">*</span>
          </label>
          <Field
            name="password"
            rules="required|min:8|max:15|lowerCase_and_numbers"
            v-slot="{ field, meta }"
          >
            <input
              :type="registerPasswordType"
              v-bind="field"
              v-model="registerPassword"
              :placeholder="$t('auth.register_password_placeholder')"
              class="w-full mt-2 rounded bg-[#CED4DA] font-['regular'] font-bold border border-[#CED4DA] text-base text-[#6C757D] outline-none py-2 pl-3"
              :class="[
                !meta.valid && meta.touched ? 'border-[#E31221] border-2' : '',
                meta.valid && meta.touched ? 'border-[#198754] border-2' : '',
              ]"
            />
            <ValidIcon
              v-if="meta.valid && meta.touched"
              class="absolute top-11 right-8"
            />
            <InvalidIcon
              v-if="!meta.valid && meta.touched"
              class="absolute top-11 right-8"
            />
          </Field>
          <ErrorMessage class="text-red-500 border-rose-600" name="password" />

          <HidePassword
            v-if="registerPasswordType === 'password'"
            @click="switchRegisterPassword"
            class="absolute cursor-pointer top-12 right-4"
          />
          <ShowPassword
            v-else
            @click="switchRegisterPassword"
            class="absolute cursor-pointer w-[15px] top-10 right-4"
          />
        </div>
        <div class="mt-4 relative">
          <label class="text-white font-['regular'] font-bold text-base"
            >{{ $t("auth.confirm_password")
            }}<span class="text-red-500">*</span>
          </label>
          <Field
            name="password_confirmation"
            rules="required|confirmed:@password"
            v-slot="{ field, meta }"
          >
            <input
              :type="confirmPasswordType"
              v-bind="field"
              v-model="confirmPassword"
              :placeholder="$t('auth.confirm_password')"
              class="w-full mt-2 rounded bg-[#CED4DA] font-['regular'] font-bold border border-[#CED4DA] text-base text-[#6C757D] outline-none py-2 pl-3"
              :class="[
                !meta.valid && meta.touched ? 'border-[#E31221] border-2' : '',
                meta.valid && meta.touched ? 'border-[#198754] border-2' : '',
              ]"
            />
            <ValidIcon
              v-if="meta.valid && meta.touched"
              class="absolute top-11 right-8"
            />
            <InvalidIcon
              v-if="!meta.valid && meta.touched"
              class="absolute top-11 right-8"
            />
          </Field>
          <ErrorMessage
            class="text-red-500 border-rose-600"
            name="password_confirmation"
          />
          <HidePassword
            v-if="confirmPasswordType === 'password'"
            @click="switchConfirmPassword"
            class="absolute cursor-pointer top-12 right-4"
          />
          <ShowPassword
            v-else
            @click="switchConfirmPassword"
            class="absolute cursor-pointer w-4 top-10 right-4"
          />
        </div>
        <base-button
          class="bg-[#E31221] flex justify-center mt-6 ml-0 rounded py-2 w-full text-white font-['regular'] font-bold"
          >{{ $t("auth.forget_password") }}</base-button
        >
      </Form>
      <span
        @click="getLogin"
        class="text-[#6C757D] flex items-center text-lg mt-8"
      >
        <LeftArrow class="mr-3" /> {{ $t("auth.login") }}</span
      >
    </div>
  </Popup>
</template>

<script setup>
import HidePassword from "@/components/svg/HidePassword.vue";
import ShowPassword from "@/components/svg/ShowPassword.vue";
import ValidIcon from "@/components/svg/ValidIcon.vue";
import InvalidIcon from "@/components/svg/InvalidIcon.vue";
import SendEmail from "@/components/svg/SendEmail.vue";
import Popup from "@/components/ui/BasePopup.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { onBeforeMount, ref } from "vue";

import LeftArrow from "@/components/svg/LeftArrow.vue";
import router from "@/router";
import axios from "@/config/axios/index.js";
import { useRoute } from "vue-router";

const registerPassword = ref("");
const confirmPassword = ref("");
const email = ref("");
const token = ref("");

onBeforeMount(() => {
  const route = useRoute();
  email.value = route.query.email;
  token.value = route.query.token;
});

const registerPasswordType = ref("password");
const confirmPasswordType = ref("password");

const switchRegisterPassword = () =>
  (registerPasswordType.value =
    registerPasswordType.value === "password" ? "text" : "password");

const switchConfirmPassword = () =>
  (confirmPasswordType.value =
    confirmPasswordType.value === "password" ? "text" : "password");

const onSubmit = (values) => {
  axios
    .post("reset-password", {
      password: values.password,
      password_confirmation: values.password_confirmation,
      email: email.value,
      token: token.value,
    })
    .then(() => {
      router.push({ name: "confirm-password" });
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
