<template>
  <div class="bg-feed min-h-screen">
    <Header></Header>
    <div class="grid-cols-1">
      <NavBar class="sm:col-span-1 hidden xl:block" />

      <Form @submit="onSubmit">
        <div class="bg-[#24222F] mt-16 pb-24">
          <div class="pt-10">
            <label
              @click="editImage"
              for="dropzone"
              class="flex flex-col items-center"
            >
              <div class="w-[188px] h-[188px] rounded-full">
                <img
                  :src="userInformation.thumbnail"
                  class="w-full h-full rounded-full object-cover"
                  alt=""
                  id="outputImage"
                />
              </div>
              <span class="text-white text-xl mt-2">
                {{ $t("profile.upload_photo") }}</span
              >
            </label>
            <Field
              type="file"
              class="hidden"
              @input="loadFile"
              id="dropzone"
              name="thumbnail"
            />
            <ErrorMessage
              class="text-red-500 border-rose-600"
              name="thumbnail"
            />
          </div>
          <div class="px-10">
            <div class="mt-16 flex flex-col relative">
              <label class="text-white text-base">{{
                $t("profile.username")
              }}</label>
              <Field
                type="text"
                name="user"
                disabled
                :placeholder="$t('profile.username')"
                class="mt-2 bg-transparent outline-none border-b pb-3 border-[#CED4DA] text-white pr-10"
              />
              <span
                @click="editUser"
                class="text-white text-base absolute right-0 top-6"
                >{{ $t("profile.edit") }}</span
              >
            </div>
            <div class="mt-8 flex flex-col relative">
              <label class="text-white text-base">{{
                $t("profile.password")
              }}</label>
              <Field
                type="password"
                name="pass"
                disabled
                :placeholder="$t('profile.password')"
                class="mt-2 bg-transparent outline-none border-b pb-3 border-[#CED4DA] text-white pr-10"
              />
              <span
                @click="editPassword"
                class="text-white text-base absolute right-0 top-6"
                >{{ $t("profile.edit") }}</span
              >
            </div>
            <div class="mt-8 flex justify-between items-center">
              <span class="text-white text-base">{{
                $t("profile.email")
              }}</span>
              <RightArrow @click="editEmail" />
            </div>
          </div>
        </div>
        <div
          v-if="editCrudential"
          class="mt-10 flex justify-between px-8 pb-8 items-center"
        >
          <span
            @click="cancellButton"
            class="text-white cursor-pointer text-base sm:text-xl mr-5"
            >{{ $t("profile.cancell") }}</span
          >
          <base-button class="text-base sm:text-xl">{{
            $t("profile.save_changes")
          }}</base-button>
        </div>
      </Form>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import Header from "@/components/ui/The-Header.vue";
import NavBar from "@/components/ui/NavBar.vue";
import RightArrow from "@/components/svg/RightArrow.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import axiosInstance from "@/config/axios/store";
import router from "@/router";
import { ref } from "vue";
import { useUserInfo } from "@/stores/useUserInfo";
import { computed } from "vue";

const userdata = useUserInfo();
const userInformation = computed(() => userdata.user);
const editCrudential = ref(false);
const editImage = () => {
  editCrudential.value = true;
};
const cancellButton = () => {
  editCrudential.value = false;
};
const loadFile = function (event) {
  var output = document.getElementById("outputImage");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src);
  };
};
const onSubmit = async (values) => {
  try {
    await axiosInstance.post(`updatecruds`, {
      thumbnail: values.thumbnail,
    });
    userdata.userinfo();
    editCrudential.value = false;
  } catch (error) {
    console.log(error);
  }
};

const editUser = () => {
  router.push({ name: "edit-user" });
};
const editPassword = () => {
  router.push({ name: "edit-password" });
};
const editEmail = () => {
  router.push({ name: "edit-email" });
};
</script>
