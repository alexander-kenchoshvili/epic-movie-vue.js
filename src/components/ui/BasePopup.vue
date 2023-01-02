<template>
  <div
    @click="closePopup"
    class="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-black z-10 bg-opacity-80"
  ></div>
  <div
    class="bg-[#222030] px-8 py-14 sm:px-28 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 sm:py-12 rounded-[10px]"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import router from "@/router";

const closePopup = () => {
  router.push({ name: "home" });
};
</script>
