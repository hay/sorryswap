<template>
    <div class="step"
         flair="blue-stars">
        <div class="step__recorder">
            <video ref="video"
                   autoplay
                   playsinline></video>

            <el-countdown
                ref="countdown"
                v-bind:from="3"></el-countdown>
        </div>

        <el-progress
            v-bind:duration="textbarDuration"
            v-bind:running="recording"></el-progress>

        <el-textbar
            ref="textbar"
            v-bind:duration="textbarDuration"
            v-bind:text="script.text"></el-textbar>
    </div>
</template>

<script>
    import ElCountdown from './el-countdown.vue';
    import ElProgress from './el-progress.vue';
    import ElTextbar from './el-textbar.vue';
    import Recorder from '../recorder.js';
    import { timeout } from '../util.js';

    export default {
        components : { ElCountdown, ElProgress, ElTextbar },

        computed : {
            script() {
                return this.$store.getters.targetScript;
            }
        },

        data() {
            return {
                countdown : false,
                recorder : null,
                recording : false,
                recordingTime : this.$store.state.recordingTime,
                textbarDuration : this.$store.state.conf.global.output_video_time
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

            async stop() {
                // This might be disabled for debugging purposes
                if (this.$store.state.uploadVideo) {
                    const id = await this.recorder.stop();
                    this.$store.commit('videoId', id);
                }

                // If the recordingtime is set to zero, never go to the
                // next step
                if (this.recordingTime > 0) {
                    this.$store.commit('step', 'replay');
                }
            }
        },

        async mounted() {
            this.$music.muted = true;
            this.setupRecorder();
            this.$refs.countdown.setup();
            await timeout(2000);
            await this.$refs.countdown.start();
            this.$refs.textbar.run();
            this.start();
            await timeout(this.recordingTime * 1000);
            this.stop();
        }
    }
</script>