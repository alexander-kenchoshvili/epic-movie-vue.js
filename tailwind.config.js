/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // interstellar:
        //   "linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%), url('images/interstellar.png')",
        // lotr: "linear-gradient(to left bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url('images/lotr.png')",
        // royal:
        //   "linear-gradient(180deg, rgba(17, 16, 26, 0.95) 0%, rgba(8, 8, 13, 0.13) 50%, rgba(0, 0, 0, 0) 100%), url('images/movie2.png')",
        feed: "linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)",
        popup:
          "linear-gradient(112.94deg, rgba(239, 239, 239, 0.3) -1.81%, rgba(239, 239, 239, 0.00514528) 102.5%, rgba(1, 1, 1, 0.00260417) 102.51%, rgba(239, 239, 239, 0.05) 102.52%);",
      },
    },
  },
  plugins: [],
};
