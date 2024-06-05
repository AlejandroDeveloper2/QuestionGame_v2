import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@assets", replacement: "/src/assets" },
      { find: "@pages", replacement: "/src/pages" },
      // { find: "@modules", replacement: "/src/modules" },
      { find: "@core", replacement: "/src/modules/core" },
      { find: "@admin", replacement: "/src/modules/admin" },
      { find: "@auth", replacement: "/src/modules/auth" },
      { find: "@game", replacement: "/src/modules/game" },
      { find: "@routes", replacement: "/src/routes" },
      { find: "@config", replacement: "/src/config" },
      { find: "@layout", replacement: "/src/layout" },
    ],
  },
});
