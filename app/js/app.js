import CONF from '../../conf.toml';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import App from './components/app.vue';
import VueSocketIO from 'vue-socket.io'
import { parseHash } from './router.js';
import { SoundManager } from './sound-manager.js';
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
            },

            setupSound() {
                let soundFiles = {};

                CONF.app.sounds.forEach((id) => {
                    soundFiles[id] = `audio/${id}.mp3`;
                });

                Vue.prototype.$sounds = new SoundManager({
                    loop : false,
                    muted : this.$store.state.muted,
                    players : soundFiles,
                    playFromStart : true,
                    single : true
                });

                Vue.prototype.$music = new SoundManager({
                    loop : true,
                    muted : this.$store.state.muted,
                    players : soundFiles,
                    playFromStart : true,
                    single : true
                });
            }
        },

        mounted() {
            window.addEventListener('hashchange', parseHash.bind(this));
            parseHash.call(this);
            this.setupLogger();
            this.setupSound();
            this.$store.dispatch('fetchVideos');
        },

        render: h => h( App ),

        sockets : {
            recorder(type) {
                if (type === 'newvideo') {
                    this.$store.dispatch('fetchVideos');
                }
            }
        },

        store : store.getStore()
    });
})();