<template>
  <div class="bg-feed min-h-screen">
    <Header></Header>
    <div>
      <div class="px-7 mt-6">
        <Arrow @click="showProfile" />
      </div>
      <Form @submit="onSubmit">
        <div>
          <div
            class="bg-[#24222F] flex flex-col px-8 pt-8 pb-12 mt-6 rounded-md"
          >
            <label class="text-white text-base">{{
              $t("profile.add_new_email")
            }}</label>
            <Field
              name="email"
              rules="required"
              type="email"
              class="mt-2 px-2 py-3 rounded outline-none"
            />
            <ErrorMessage class="text-red-500 border-rose-600" name="email" />
          </div>
          <div class="flex justify-between px-8 mt-24 items-center">
            <span @click="showProfile" class="text-white text-base">{{
              $t("profile.cancell")
            }}</span>
            <base-button>{{ $t("profile.add") }}</base-button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/ui/The-Header.vue";
import Arrow from "@/components/svg/WhiteArrow.vue";
import axiosInstance from "@/config/axios/store";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useUserInfo } from "@/stores/useUserInfo";
import router from "@/router";

const userdata = useUserInfo();

const onSubmit = async (values) => {
  try {
    await axiosInstance.post(`/email/store`, {
      email: values.email,
    });
    userdata.userinfo();
    router.push({ name: "new-email-popup" });
  } catch (error) {
    console.log(error);
  }
};

const showProfile = () => {
  router.push({ name: "profile" });
};
</script>
