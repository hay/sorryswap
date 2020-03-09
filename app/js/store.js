import { find } from 'lodash';
import Vue from 'vue'
import Vuex from 'vuex'

import { getJson } from './util.js';

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
                muted : false,
                recordingTime : opts.conf.app.recording_time,
                screen : opts.conf.app.default_screen,
                step : opts.conf.app.default_step,
                swapVideo : true,
                targetScript : null,
                targetScripts : opts.conf.script,
                targetVideos : opts.conf.target.map((target) => {
                    const file = `${target.id}.mp4`;
                    target.src = `${opts.conf.server.target_path}/${file}`;
                    return target;
                }),
                targetVideo : null,
                videoId : null,
                videoMeta : null,
                videos : []
            };
        }

        this.store = new Vuex.Store({
            plugins : [ logger ],

            state : getInitialState(),

            getters : {
                isScreen(state) {
                    return state.conf.app.screens.includes(state.screen);
                },

                recordMeta(state) {
                    return {
                        recordTime : new Date().toISOString(),
                        targetScript : state.targetScript,
                        targetVideo : state.targetVideo
                    }
                },

                targetScript(state) {
                    if (!state.targetScript) {
                        return null;
                    }

                    return find(state.targetScripts, ['name', state.targetScript]);
                },

                targetVideo(state) {
                    if (!state.targetVideo) {
                        return null;
                    }

                    return find(state.targetVideos, ['id', state.targetVideo]);
                }
            },

            mutations : {
                disableSwap: (state) => state.swapVideo = false,

                muted: (state) => state.muted = true,

                recordingTime: (state, time) => state.recordingTime = parseInt(time),

                screen: (state, screen) => state.screen = screen,

                step(state, step) {
                    if (state.conf.app.steps.includes(step)) {
                        state.step = step;
                    }
                },

                targetScript(state, script) {
                    state.targetScript = script;
                },

                targetVideo(state, id) {
                    state.targetVideo = id;
                },

                videoId(state, id) {
                    state.videoId = id;
                },

                videoMeta(state, meta) {
                    state.videoMeta = meta;
                },

                videos(state, videos) {
                    state.videos = videos;
                }
            },

            actions : {
                async fetchVideos({ state, commit }) {
                    const url = state.conf.app.output_endpoint;
                    let videos = await getJson(url);

                    // Sort: recent videos first
                    videos = videos.sort((a, b) => {
                        return a.outputData.recordTime > b.outputData.recordTime ? -1 : 1;
                    });

                    commit('videos', videos);
                },

                async fetchVideoMeta({ state, commit }) {
                    const endpoint = state.conf.app.info_endpoint;
                    const url = `${endpoint}/${state.videoId}`;
                    const meta = await getJson(url);

                    commit('videoMeta', meta);
                }
            }
        });
    }

    getStore() {
        return this.store;
    }
}