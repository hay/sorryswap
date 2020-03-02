<template>
    <div class="viewer" v-on:click="playVideo">
        <img class="viewer__logo" src="../../static/img/logo.svg" />

        <video
            class="viewer__video"
            ref="video"
            v-bind:src="src"
            autoplay></video>

        <recorder-state></recorder-state>
    </div>
</template>

<script>
    import Vue from 'vue';
    import RecorderState from './recorder-state.vue';

    export default {
        components : {
            RecorderState
        },

        computed : {
            src() {
                if (!this.video) return '';

                // We shouldn't construct paths like this
                const conf = this.$store.state.conf;
                const ext = conf.server.output_video_extension;
                return `${conf.server.output_path}/${this.video.id}.${ext}`;
            },

            video() {
                return this.videos[this.videoIndex];
            }
        },

        data() {
            return {
                videoIndex : 0,
                videos : []
            };
        },

        methods : {
            async getVideos() {
                const url = this.$store.state.conf.app.output_endpoint;
                const req = await window.fetch(url);
                const videos = await req.json();

                // Sort: recent videos first
                this.videos = videos.sort((a, b) => {
                    return a.outputData.recordTime > b.outputData.recordTime ? -1 : 1;
                });
            },

            nextVideo() {
                this.videoIndex = (this.videoIndex + 1) % this.videos.length;
            },

            playVideo() {
                this.$refs.video.play();
            },

            setupVideo() {
                this.$refs.video.addEventListener('ended', () => {
                    this.nextVideo();
                });
            }
        },

        mounted() {
            this.getVideos();
            this.setupVideo();
        },

        sockets : {
            recorder(type) {
                if (type === 'newvideo') {
                    this.getVideos();
                    this.videoIndex = 0;
                }
            }
        }
    };
</script>