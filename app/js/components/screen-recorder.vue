<template>
    <div>
        <video ref="video" controls autoplay playsinline></video>

        <button v-on:click="start">start</button>
        <button v-on:click="stop">stop</button>
    </div>
</template>

<script>
    import Recorder from '../recorder.js';

    export default {
        data() {
            return {
                recorder : null
            }
        },

        methods : {
            setupRecorder() {
                this.recorder = new Recorder({
                    videoEl : this.$refs.video
                });

                this.recorder.setupStream();
            },

            start() {
                this.recorder.start();
            },

            stop() {
                this.recorder.stop();
            }
        },

        mounted( ){
            this.setupRecorder();
        }
    }
</script>