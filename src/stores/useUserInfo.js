import { defineStore } from "pinia";
import axiosInstance from "@/config/axios/index.js";
import { onMounted, ref } from "vue";

export const useUserInfo = defineStore("user", () => {
  const user = ref({});
  const userinfo = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_BASE_URL}me`
      );
      user.value = response.data.user;
    } catch (error) {
      console.log(error);
    }
  };
  onMounted(() => {
    userinfo();
  });

  return { user, userinfo };
});
