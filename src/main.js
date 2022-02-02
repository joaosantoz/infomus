import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'

const app = createApp(App)

const pinia = createPinia();
pinia.use(createPersistedStatePlugin());

app.use(pinia)
app.use(router)

app.mount('#app')
