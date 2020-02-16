import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const SCREENS = ['index', 'recorder'];

// FIXME
function logger(store) {
    store.subscribe((mutation, state) => {
        if (window.__logger__) {
            __logger__(mutation, state);
        }
    });
}

export class Store {
    constructor(data) {
        function getInitialState() {
            return {
                screen : 'index'
            };
        }

        this.store = new Vuex.Store({
            plugins : [ logger ],

            state : getInitialState(),

            getters : {
                isScreen(state) {
                    return SCREENS.includes(state.screen);
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