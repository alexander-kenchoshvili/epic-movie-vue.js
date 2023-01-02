<template>
  <Popup>
    <div class="w-[360px]">
      <h2
        class="text-white font-['regular'] font-bold text-2xl sm:text-3xl flex justify-center"
      >
        {{ $t("auth.create_account") }}
      </h2>
      <span
        class="text-[#6C757D] font-['regular'] font-bold flex justify-center text-base pt-3"
        >{{ $t("auth.start_journey") }} !</span
      >
      <div class="mt-6">
        <Form @submit="onSubmit">
          <base-input
            name="username"
            rules="required|lowerCase_and_numbers|min:3|max:15"
            type="text"
            :label="$t('auth.name')"
            :placeholder="$t('auth.register_user_placeholder')"
          ></base-input>
          <base-input
            name="email"
            rules="required|email"
            :label="$t('auth.email')"
            type="email"
            :placeholder="$t('auth.register_email_placeholder')"
          ></base-input>

          <div class="mt-4 relative">
            <label
              class="text-white font-['regular'] font-bold text-base"
              for=""
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
                  !meta.valid && meta.touched
                    ? 'border-[#E31221] border-2'
                    : '',
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
              name="password"
            />

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
            <label
              class="text-white font-['regular'] font-bold text-base"
              for=""
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
                  !meta.valid && meta.touched
                    ? 'border-[#E31221] border-2'
                    : '',
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
          <base-button class="mt-6 font-['regular'] font-bold w-full ml-0">{{
            $t("auth.get_started")
          }}</base-button>
        </Form>
        <form :action="googleUrl">
          <base-button
            class="mt-4 w-full font-['regular'] font-bold ml-0 !bg-transparent border border-white flex items-center justify-center"
          >
            <GoogleIcon class="mr-4" />
            {{ $t("auth.google_sign_up") }}</base-button
          >
        </form>
        <h3 class="mt-8 text-[#6C757D] font-['regular'] font-bold text-base">
          {{ $t("auth.Already_have_account") }} ?
          <span
            @click="showLogin"
            class="text-[#0D6EFD] cursor-pointer font-['regular'] font-bold text-base"
            >{{ $t("auth.login") }}</span
          >
        </h3>
      </div>
    </div>
  </Popup>
</template>

<script setup>
import Popup from "@/components/ui/BasePopup.vue";
import GoogleIcon from "@/components/svg/GoogleIcon.vue";
import HidePassword from "@/components/svg/HidePassword.vue";
import ShowPassword from "@/components/svg/ShowPassword.vue";
import ValidIcon from "@/components/svg/ValidIcon.vue";
import InvalidIcon from "@/components/svg/InvalidIcon.vue";
import axios from "@/config/axios/index.js";

import { Form, Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";

import router from "@/router";

const registerPassword = ref("");
const confirmPassword = ref("");

const registerPasswordType = ref("password");
const confirmPasswordType = ref("password");

const googleUrl = import.meta.env.VITE_API_GOOGLE_URL;

const switchRegisterPassword = () =>
  (registerPasswordType.value =
    registerPasswordType.value === "password" ? "text" : "password");

const switchConfirmPassword = () =>
  (confirmPasswordType.value =
    confirmPasswordType.value === "password" ? "text" : "password");

const showLogin = () => {
  router.push({ name: "login" });
};
const onSubmit = (values, actions) => {
  axios
    .post("register", {
      username: values.username,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    })
    .then(() => {
      router.push({ name: "email-verify" });
    })
    .catch((error) => {
      actions.setFieldError("username", error.response.data.errors.username);
      actions.setFieldError("email", error.response.data.errors.email);
    });
};
</script>
