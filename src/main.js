import { createApp } from 'vue'
import router from './router.js';
import store from './store/index.js';
import App from './App.vue';
import BaseSpinner from './ui/BaseSpinner.vue';
import BaseDialog from './ui/BaseDialog.vue';

import './index.css';

const app = createApp(App)
app.use(router);
app.use(store);

app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');



