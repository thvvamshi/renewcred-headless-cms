export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#282828",
        muted: "#6f7073",
        line: "#e4e4e4",
        brand: "#d51f32",
        shell: "#f7f7f6"
      },
      boxShadow: {
        panel: "0 18px 50px rgba(24, 24, 24, 0.08)"
      }
    }
  },
  plugins: []
};
