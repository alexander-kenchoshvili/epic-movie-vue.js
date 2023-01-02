import { defineStore } from "pinia";
import axiosInstance from "@/config/axios/store.js";
import { ref } from "vue";

export const useNotification = defineStore("notification", () => {
  const allNotifications = ref([]);
  const UnreadNotification = ref(0);
  const notifications = async () => {
    try {
      const response = await axiosInstance.get(`/notification`);
      allNotifications.value = response.data;
      UnreadNotification.value = 0;
      allNotifications.value.forEach((notification) => {
        if (notification.read === 0) {
          UnreadNotification.value++;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { notifications, allNotifications, UnreadNotification };
});
