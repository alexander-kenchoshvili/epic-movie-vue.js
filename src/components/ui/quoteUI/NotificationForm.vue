<template>
  <div class="px-5 py-5 mb-4 border border-[#6C757D]">
    <div class="flex w-full">
      <div class="w-14 h-14 rounded-full">
        <img
          class="w-full h-full object-cover rounded-full"
          :src="
            notification.from === null
              ? userInformation.thumbnail
              : notification.from.thumbnail
          "
          alt="author"
        />
      </div>
      <div class="w-full">
        <div class="text-white ml-6 flex justify-between flex-wrap">
          <div class="flex flex-col">
            <span class="text-xs sm:text-base">{{
              notification.from === null ? "user" : notification.from?.username
            }}</span>
            <div class="flex mt-2" v-if="notification.type === 'like'">
              <Heart />
              <span class="text-white ml-3 font-normal text-xs sm:text-base"
                >Reacted to yor quote</span
              >
            </div>
            <div class="flex mt-2" v-if="notification.type === 'comment'">
              <Comment />
              <span class="text-white ml-3 font-normal text-xs sm:text-base"
                >Commented on yor movie quote</span
              >
            </div>
          </div>
          <div
            class="flex flex-row-reverse sm:flex-col mt-2 sm:mt-0 ml-[-70px] sm:ml-0"
          >
            <span class="ml-2 sm:ml-0">{{
              timeAgo(notification.created_at)
            }}</span>
            <span v-if="Unread !== 0" class="ml-2 text-[#198754]">new</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Comment from "@/components/svg/ReactNotification.vue";
import Heart from "@/components/svg/HeartIcon.vue";
import i18n from "@/i18n/index.js";
import { computed, onMounted } from "vue";
import { useNotification } from "@/stores/useNotification.js";
import { useUserInfo } from "@/stores/useUserInfo";

const userdata = useUserInfo();
const userInformation = computed(() => userdata.user);

const notificationStore = useNotification();

const Unread = computed(() => notificationStore.UnreadNotification);

onMounted(() => {
  notificationStore.notifications();
});

defineProps({
  notification: {
    type: Object,
  },
});

function timeAgo(time) {
  switch (typeof time) {
    case "number":
      break;
    case "string":
      time = +new Date(time);
      break;
    case "object":
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  let time_formats = [];
  if (i18n.global.locale === "en") {
    time_formats = [
      [60, "seconds", 1], // 60
      [120, "1 minute ago", "1 minute from now"], // 60*2
      [3600, "minutes", 60], // 60*60, 60
      [7200, "1 hour ago", "1 hour from now"], // 60*60*2
      [86400, "hours", 3600], // 60*60*24, 60*60
      [172800, "Yesterday", "Tomorrow"], // 60*60*24*2
      [604800, "days", 86400], // 60*60*24*7, 60*60*24
      [1209600, "Last week", "Next week"], // 60*60*24*7*4*2
      [2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, "Last month", "Next month"], // 60*60*24*7*4*2
      [29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, "Last year", "Next year"], // 60*60*24*7*4*12*2
      [2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    ];
  } else {
    time_formats = [
      [60, "წამის", 1], // 60
      [120, "1 წუთის წინ", "1 minute from now"], // 60*2
      [3600, "წუთის", 60], // 60*60, 60
      [7200, "1 საათის წინ", "1 hour from now"], // 60*60*2
      [86400, "საათის", 3600], // 60*60*24, 60*60
      [172800, "გუშინ", "Tomorrow"], // 60*60*24*2
      [604800, "დღის", 86400], // 60*60*24*7, 60*60*24
      [1209600, "წინა კვირას", "Next week"], // 60*60*24*7*4*2
      [2419200, "კვირები", 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, "წინა თვეს", "Next month"], // 60*60*24*7*4*2
      [29030400, "თვის", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, "შარშან", "Next year"], // 60*60*24*7*4*12*2
      [2903040000, "წლის", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    ];
  }
  let seconds = (+new Date() - time) / 1000,
    token = i18n.global.locale === "en" ? "ago" : "წინ",
    list_choice = 1;

  if (seconds == 0) {
    return "Just now";
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = "from now";
    list_choice = 2;
  }
  let i = 0,
    format;
  while ((format = time_formats[i++]))
    if (seconds < format[0]) {
      if (typeof format[2] == "string") return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + " " + format[1] + " " + token;
    }
  return time;
}
</script>
