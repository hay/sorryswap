import 'regenerator-runtime/runtime';
import Vue from 'vue';
import App from './components/app.vue';
import VueSocketIO from 'vue-socket.io'
import { Store } from './store.js';

const vueSocket = new VueSocketIO({
    connection : 'http://localhost:3000',
    debug : true
})

const DEFAULT_SCREEN = 'index';

Vue.use(vueSocket);

(async function() {
    const store = new Store({});

    new Vue({
        el : "main",

        components : { App },

        methods : {
            go() {
                const hash = window.location.hash.slice(1);

                if (!!hash) {
                    this.$store.commit('screen', hash);
                } else {
                    this.$store.commit('screen', DEFAULT_SCREEN);
                }
            },

            setupLogger() {
                window.__logger__ = function(mutation, state) {
                    console.log('logger', mutation);

                    this.$socket.emit('clientlog', mutation);
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