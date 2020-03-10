<template>
    <div class="recorder__step">
        <div class="recorder__content">
            <div class="el-recorder">
                <div class="el-recorder__progress"
                     ref="progress"
                     v-bind:running="recording"></div>

                <video
                    class="el-recorder__video"
                    ref="video" autoplay playsinline></video>

                <el-textbar
                    ref="textbar"
                    v-bind:duration="textbarDuration"
                    v-bind:text="script.text"></el-textbar>
            </div>

            <div v-if="count > 0" class="counter">
                <span>{{count}}</span>
            </div>
    </div>
</template>

<script>
    import ElTextbar from './el-textbar.vue';
    import Recorder from '../recorder.js';
    import { timeout } from '../util.js';

    export default {
        components : {
            ElTextbar
        },

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
                // This might be disabled for debugging purposes
                if (this.$store.state.uploadVideo) {
                    const id = await this.recorder.stop();
                    this.$store.commit('videoId', id);
                }

                this.$store.commit('step', 'replay');
            }
        },

        async mounted() {
            this.$music.muted = true;
            this.$refs.progress.style.transitionDuration = this.recordingTime + 's';
            this.setupRecorder();
            await timeout(2000);
            await this.startCount();
            this.$refs.textbar.run();
            this.start();
            await timeout(this.recordingTime * 1000);
            this.stop();
        }
    }
</script>