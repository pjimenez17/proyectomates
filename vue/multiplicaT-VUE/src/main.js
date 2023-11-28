import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import  piniaPluginPersistedState  from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app.use(pinia).mount('#app')