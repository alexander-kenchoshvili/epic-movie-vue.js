<template>
  <div class="relative flex flex-col">
    <label class="text-white font-['regular'] font-bold text-base"
      >{{ label }}
    </label>
    <Field
      :name="name"
      :label="labelName"
      :rules="rules"
      v-slot="{ field, meta }"
    >
      <input
        :type="type"
        :placeholder="placeholder"
        v-bind="field"
        class="w-[450px] h-12 rounded mt-2 mb-2 font-['regular'] font-bold bg-[#CED4DA] border border-[#CED4DA] text-base text-[#6C757D] outline-none py-2 pl-3"
        :class="[
          !meta.valid && meta.touched ? 'border-[#E31221] border-2' : '',
          meta.valid && meta.touched
            ? 'border-[#198754] border-2 bg-[#198754] text-white'
            : '',
        ]"
      />
      <ValidIcon
        v-if="meta.valid && meta.touched"
        class="absolute top-11 right-8"
      />
      <InvalidIcon
        v-if="!meta.valid && meta.touched"
        class="absolute top-11 right-8"
      />
    </Field>

    <ErrorMessage class="text-red-500 border-rose-600" :name="name" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import ValidIcon from "@/components/svg/ValidIcon.vue";
import InvalidIcon from "@/components/svg/InvalidIcon.vue";
defineProps({
  name: String,
  rules: String,
  label: String,
  placeholder: String,
  type: String,
  labelName: String,
});
</script>
