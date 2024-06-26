/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./**/*.{html, js}",
  ],
  theme: {
    extend: {
      colors : {
        "primary-purple" : "hsl(259, 100%, 65%)",
        "primary-light-red" : "hsl(0, 100%, 67%)",

        "neutral-white" : "hsl(0, 0%, 100%)",
        "neutral-off-white" : "hsl(0, 0%, 94%)",
        "neutral-light-grey" : "hsl(0, 0%, 86%)",
        "neutral-smokey-grey" : "hsl(0, 1%, 44%)",
        "neutral-off-black" : "hsl(0, 0%, 8%)"
      },
      fontFamily : {
        "poppins" : ["Poppins", "sans-serif"]
      },
      borderRadius : {
        "4xl" : "8rem",
      }
    },
  },
  plugins: [],
}

