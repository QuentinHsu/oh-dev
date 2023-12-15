import { createApp } from "vue";
import "tdesign-vue-next/dist/reset.css";
import "tdesign-vue-next/es/style/index.css";
import Router from "@/router/index.ts";
import App from "./App.vue";

const app = createApp(App);
app.use(Router).mount("#app");
