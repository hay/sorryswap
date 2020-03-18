import CONF from '../../conf.toml';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import VueSocketIO from 'vue-socket.io'

import App from './components/app.vue';
import ElButton from './components/el-button.vue';
import ElImage from './components/el-image.vue';
import { Keys } from './keys.js';
import { parseHash } from './router.js';
import { SoundManager } from './sound-manager.js';
import { Store } from './store.js';

const vueSocket = new VueSocketIO({
    connection : CONF.app.server,
    debug : CONF.global.debug
})

Vue.use(vueSocket);

Vue.component('el-button', ElButton);
Vue.component('el-image', ElImage);

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

            setupKeys() {
                Vue.prototype.$keys = new Keys({
                    keycodes : this.$store.state.conf.app.keycodes
                });
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
            this.setupKeys();
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