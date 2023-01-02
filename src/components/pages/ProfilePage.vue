<template>
  <div class="hidden md:block">
    <ProfilePc />
  </div>
  <div class="md:hidden">
    <ProfileMobile />
  </div>
</template>

<script setup>
import ProfilePc from "@/components/pages/profileComponents/ProfilePc.vue";
import ProfileMobile from "@/components/pages/profileComponents/ProfileMobile.vue";
</script>
