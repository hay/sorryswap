import CONF from '../../conf.toml';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import App from './components/app.vue';
import VueSocketIO from 'vue-socket.io'
import { Store } from './store.js';

const vueSocket = new VueSocketIO({
    connection : CONF.app.server,
    debug : CONF.global.debug
})

Vue.use(vueSocket);

(async function() {
    const store = new Store({
        conf : CONF
    });

    new Vue({
        el : "main",

        components : { App },

        methods : {
            go() {
                const hash = window.location.hash.slice(1);

                if (!!hash) {
                    this.$store.commit('screen', hash);
                } else {
                    this.$store.commit('screen', CONF.app.default_screen);
                }
            },

            setupLogger() {
                window.__logger__ = (mutation, state) => {
                    const msg = `${mutation.type}:${mutation.payload}`;
                    this.$socket.emit('clientlog', msg);
                }
            }
        },

        mounted() {
            window.addEventListener('hashchange', this.go.bind(this));
            this.go();
            this.setupLogger();
        },

        render: h => h( App ),

        store : store.getStore()
    });
})();