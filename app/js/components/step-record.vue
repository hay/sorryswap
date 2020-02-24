<template>
    <div class="recorder__step">
        <div class="recorder__content">
            <div class="recorder__panels recorder__panels--vertical">
                <section class="recorder__panel recorder__panel--start">
                    <div class="progress"
                         v-bind:running="recording"></div>
                </section>

                <section class="recorder__panel">
                    <video ref="video" autoplay playsinline></video>
                </section>

                <div class="recorder__panel">
                    <section class="recorder__text recorder__text--small">
                        <p v-html="script.text"></p>
                    </section>
                </div>
            </div>

            <div v-if="count > 0" class="counter">
                <span>{{count}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Recorder from '../recorder.js';
    import { timeout } from '../util.js';

    export default {
        computed : {
            script() {
                return this.$store.getters.targetScript;
            }
        },

        data() {
            return {
                count : 0,
                recorder : null,
                recording : false,
                recordTime : this.$store.state.conf.app.record_time * 1000
            }
        },

        destroyed() {
            this.recorder.destroy();
        },

        methods : {
            setupRecorder() {
                this.recorder = new Recorder({
                    videoEl : this.$refs.video
                });

                this.recorder.setupStream();
            },

            start() {
                this.recorder.start(this.$store.getters.recordMeta);
                this.recording = true;
            },

            async startCount() {
                for (let i = 3; i >= 0; i--) {
                    this.count = i;
                    await timeout(1000);
                }
            },

            stop() {
                this.recorder.stop();
            }
        },

        async mounted() {
            this.setupRecorder();
            await this.startCount();
            this.start();
            await timeout(this.recordTime);
            this.stop();
        }
    }
</script>