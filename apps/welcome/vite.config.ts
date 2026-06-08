import { defineConfig } from "vite";

// @stellar/stellar-sdk's browser build is self-contained except for `unenv/*`
// polyfills, which are provided by the `unenv` dev dependency (v2.x export layout).
export default defineConfig({
  define: { global: "globalThis" },
});
