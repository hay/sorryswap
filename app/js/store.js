import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// Global logger to communicate with the server
function logger(store) {
    store.subscribe((mutation, state) => {
        if (window.__logger__) {
            __logger__(mutation, state);
        }
    });
}

export class Store {
    constructor(opts) {
        function getInitialState() {
            return {
                conf : opts.conf,
                screen : opts.conf.default_screen
            };
        }

        this.store = new Vuex.Store({
            plugins : [ logger ],

            state : getInitialState(),

            getters : {
                isScreen(state) {
                    return state.conf.app.screens.includes(state.screen);
                }
            },

            mutations : {
                screen: (state, screen) => state.screen = screen
            }
        });
    }

    getStore() {
        return this.store;
    }
}