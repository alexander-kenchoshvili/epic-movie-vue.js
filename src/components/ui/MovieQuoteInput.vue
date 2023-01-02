<template>
  <div class="relative">
    <Field :name="name" :rules="rules" v-slot="{ field, meta }">
      <input
        @input="$emit('update:modelValue', $event.target.value)"
        :type="type"
        :placeholder="placeholder"
        v-bind="field"
        class="w-full mt-2 mb-2 font-normal rounded bg-[#11101A] border border-[#CED4DA] text-xs sm:text-base text-white outline-none py-2 pl-4 pr-16"
        :class="[
          !meta.valid && meta.touched ? 'border-[#E31221] border-2' : '',
          meta.valid && meta.touched ? 'border-[#198754] border-2' : '',
        ]"
      />
    </Field>

    <ErrorMessage class="text-red-500 border-rose-600" :name="name" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";

defineProps({
  name: String,
  rules: String,
  placeholder: String,
  type: String,
});
</script>
