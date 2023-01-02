import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json ";
import ka from "@vee-validate/i18n/dist/locale/ka.json ";

// If we want to write Custom Error Messages then we have to overwrite some properties like this:
configure({
  generateMessage: localize({
    en: {
      ...en,
      messages: {
        required: "This field is required",
        email: "This input is not in email format",
        min: "{field} must have at least 0:{min} symbols",
        lowerCase_and_numbers: "use only lowercase letters without spaces",
        only_latin_characters_and_numbers:
          "use only latin characters and numbers",
        only_georgian_characters_and_numbers:
          "use only georgian characters and numbers",
      },
      names: {
        quote_ka: "quote",
        quote_en: "quote",
        password_confirmation: "password confirmation",
        movie_ka: "movie",
        movie_en: "movie",
        director_en: "director",
        director_ka: "director",
        description_en: "description",
        description_ka: "description",

        // For English version, This will be auto generated according to the keys.
        // so best practice would be to write correct names in rules from the start.
        // no need to write custom names property for english version.
      },
    },
    ka: {
      ...ka,
      messages: {
        required: "გთხოვთ შეავსოთ მოცემული ველი",
        email: "თქვენს მიერ შეყვანილი ტექსტი არ აკმაყოფილებს მეილის ფორმატს",
        min: "{field} უნდა შეიცავდეს მინიმუმ 0:{min} სიმბოლოს",
        confirmed: "პაროლის დადასტურება არასწორია",
        lowerCase_and_numbers:
          "შეიყვანეთ მხოლოდ დაბალი რეგისტრის ასოები გამოტოვების გარეშე",
        only_latin_characters_and_numbers:
          "გამოიყენეთ მხოლოდ ლათინური სიმბოლოები და რიცხვები",
        only_georgian_characters_and_numbers:
          "გამოიყენეთ მხოლოდ ქართული სიმბოლოები და რიცხვები",
      },
      names: {
        password: "პაროლი",
        username: "მომხმარებლის სახელი",
        email: "მეილი",
        password_confirmation: "პაროლის დადასტურება",
        quote_ka: "ციტატა",
        quote_en: "ციტატა",
        movie_ka: "ფილმი",
        movie_en: "ფილმი",
        director_en: "რეჟისორი",
        director_ka: "რეჟისორი",
        description_en: "აღწერა",
        description_ka: "აღწერა",
      },
    },
  }),
});

// setLocale("ka"); // with this function we can change the locale
