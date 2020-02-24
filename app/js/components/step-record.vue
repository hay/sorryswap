<template>
    <div class="recorder__step">
        <div class="recorder__content">
            <div class="recorder__panels recorder__panels--vertical">
                <section class="recorder__panel">
                    <div class="progress"
                         ref="progress"
                         v-bind:running="recording"></div>
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
                recordingTime : this.$store.state.recordingTime
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

                    if (i === 0) {
                        this.$sounds.play('woopwoop');
                    } else {
                        this.$sounds.play('beep');
                    }

                    await timeout(1000);
                }

                await timeout(1000);
            },

            async stop() {
                const id = await this.recorder.stop();
                this.$store.commit('videoId', id);
                this.$store.commit('step', 'replay');
            }
        },

        async mounted() {
            this.$refs.progress.style.transitionDuration = this.recordingTime + 's';
            this.setupRecorder();
            await this.startCount();
            this.start();
            await timeout(this.recordingTime * 1000);
            this.stop();
        }
    }
</script>