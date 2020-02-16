import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const SCREENS = ['index', 'recorder'];

export class Store {
    constructor(data) {
        function getInitialState() {
            return {
                screen : 'index'
            };
        }

        this.store = new Vuex.Store({
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