<template>
  <div class="bg-feed min-h-screen">
    <Header></Header>
    <div
      class="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 px-3 sm:px-16 mt-8"
    >
      <NavBar class="sm:col-span-1 hidden xl:block" />
      <div class="pb-10 col-span-3 lg:col-span-2">
        <h2 class="text-white text-2xl">{{ $t("profile.my_profile") }}</h2>
        <Form @submit="onSubmit">
          <div class="bg-[#11101A] mt-32 pb-14 rounded-lg">
            <div class="flex justify-center">
              <div class="mt-[-90px]">
                <label
                  for="dropzoneFile"
                  @click="editImage"
                  class="flex flex-col items-center"
                >
                  <div class="w-[188px] h-[188px] rounded-full">
                    <img
                      :src="userInformation.thumbnail"
                      class="w-full h-full rounded-full object-cover"
                      alt=""
                      id="output"
                    />
                  </div>
                  <span class="text-white text-xl mt-2">{{
                    $t("profile.upload_photo")
                  }}</span>
                </label>
                <Field
                  @input="loadFile"
                  type="file"
                  class="hidden"
                  id="dropzoneFile"
                  name="thumbnail"
                />
              </div>
            </div>
            <div class="ml-20 mt-10">
              <div class="">
                <div class="mt-10">
                  <div class="flex">
                    <div class="w-[450px] pb-12 border-b border-[#CED4DA]">
                      <div>
                        <label class="text-white text-xl">{{
                          $t("profile.username")
                        }}</label>
                        <Field
                          disabled
                          type="text"
                          name="user"
                          v-model="userInformation.username"
                          class="w-full h-12 mt-2 pl-3 rounded bg-[#CED4DA]"
                        />
                      </div>
                      <div v-if="editUsername">
                        <div class="flex items-center mt-5">
                          <div class="w-[450px] relative">
                            <Field
                              type="text"
                              rules="required|min:4"
                              name="username"
                              class="w-full h-12 mt-2 pl-3 rounded bg-[#CED4DA]"
                            />
                            <ErrorMessage
                              class="text-red-500 border-rose-600"
                              name="username"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <span
                      @click="editUser"
                      class="text-white ml-8 cursor-pointer text-xl mt-10"
                      >{{ $t("profile.edit") }}</span
                    >
                  </div>
                </div>
              </div>
              <div>
                <div class="flex flex-col mt-12">
                  <div class="flex items-center">
                    <div class="w-[450px] relative">
                      <label class="text-white text-xl">{{
                        $t("profile.email")
                      }}</label>
                      <Field
                        disabled
                        type="email"
                        name="email"
                        v-model="userInformation.email"
                        class="w-[450px] h-12 mt-2 bg-[#CED4DA] rounded pl-3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="editCrudential"
            class="mt-10 flex justify-end items-center"
          >
            <span
              @click="cancell"
              class="text-white cursor-pointer text-xl mr-5"
              >{{ $t("profile.cancell") }}</span
            >
            <base-button>{{ $t("profile.save_changes") }}</base-button>
          </div>
        </Form>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import Header from "@/components/ui/The-Header.vue";
import NavBar from "@/components/ui/NavBar.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import axiosInstance from "@/config/axios/store";
import { useUserInfo } from "@/stores/useUserInfo";
import { computed } from "vue";
import i18n from "@/i18n/index.js";

const locale = computed(() => {
  return i18n.global.locale;
});

const userdata = useUserInfo();
const userInformation = computed(() => userdata.user);

const editCrudential = ref(false);
const editUsername = ref(false);
const editThumbnail = ref(false);

const loadFile = function (event) {
  var output = document.getElementById("output");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src);
  };
};
const onSubmit = async (values, actions) => {
  try {
    await axiosInstance.post(`updatecruds`, values);

    editCrudential.value = false;
    userdata.userinfo();
  } catch (error) {
    console.log(error);
    if (locale.value === "ka") {
      actions.setFieldError("username", "სახელი უკვე არსებობს");
    } else {
      actions.setFieldError("username", error.response.data.errors.username);
    }
  }
};

const editUser = () => {
  editUsername.value = true;
  editCrudential.value = true;
};

const editImage = () => {
  editCrudential.value = true;
  editThumbnail.value = true;
};
const cancell = () => {
  editCrudential.value = false;
  editUsername.value = false;
};
</script>
