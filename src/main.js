import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import VueDiff from "vue-diff";

import "vue-diff/dist/index.css";

import "primevue/resources/themes/saga-blue/theme.css";
import "@/style.css";
import "primevue/resources/primevue.css";
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(PrimeVue);
app.use(VueDiff);
app.mount("#app");
