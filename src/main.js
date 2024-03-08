import { createApp } from 'vue'
import router from './routers'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import User from './db/User.js';
import VueHtmlToPaper from 'vue-html-to-paper';

const options = {
    name: '_blank',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
    "styles": [
        "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
        "https://unpkg.com/kidlat-css/css/kidlat.css",
        "public/landscape.css"
    ],
    timeout: 1000, // default timeout before the print window appears
    autoClose: true, // if false, the window will not close after printing
    windowTitle: window.document.title, // override the window title
}

window.User = User

const pinia = createPinia();

createApp(App)
    .use(router)
    .use(pinia)
    .use(VueHtmlToPaper, options)
    .mount('#app')

