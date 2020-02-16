import 'regenerator-runtime/runtime';
import Vue from 'vue';
import App from './components/app.vue';
import VueSocketIO from 'vue-socket.io'
import { Store } from './store.js';

const vueSocket = new VueSocketIO({
    connection : 'http://localhost:3000',
    debug : true
})

Vue.use(vueSocket);

(async function() {
    const store = new Store({});

    new Vue({
        el : "main",

        components : { App },

        render: h => h( App ),

        store : store.getStore()
    });
})();