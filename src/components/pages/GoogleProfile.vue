<template>
  <div class="hidden md:block">
    <ProfileForGoogle />
  </div>
  <div class="md:hidden">
    <ProfileForGoogleMobile />
  </div>
</template>

<script setup>
import ProfileForGoogle from "@/components/pages/profileComponents/ProfileGoogleForPc.vue";
import ProfileForGoogleMobile from "@/components/pages/profileComponents/ProfileGoogleForMobile.vue";
</script>
