<template>
    <div>
        Name: <input v-model="name" /><br />

        <video ref="video" controls autoplay playsinline></video>

        <button v-on:click="start">start</button>
        <button v-on:click="stop">stop</button>
    </div>
</template>

<script>
    import Recorder from '../recorder.js';

    let index = 1;

    export default {
        data() {
            return {
                name : null,
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
                this.recorder.start({
                    index,
                    name : this.name,
                    startTime : new Date().toISOString()
                });

                index = index + 1;
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