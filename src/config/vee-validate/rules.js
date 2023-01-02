import { defineRule } from "vee-validate";
import {
  required,
  email,
  min,
  max,
  alpha_num,
  confirmed,
} from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("alpha_num", alpha_num);
defineRule("confirmed", confirmed);
defineRule("lowerCase_and_numbers", (value) => {
  if (/^[a-z0-9_.,';?!:"]+$/.test(value)) {
    return true;
  }
});

defineRule("only_latin_characters_and_numbers", (value) => {
  if (/^[A-Za-z0-9_.,';?!:"\s]*$/.test(value)) {
    return true;
  }
});
defineRule("only_georgian_characters_and_numbers", (value) => {
  if (/^[ა-ჰა-ჰ0-9_.,';?!:"\s]*$/.test(value)) {
    return true;
  }
});
defineRule("lowerCase", (value) => {
  if (/^[a-z]+$/.test(value)) {
    return true;
  }
});
