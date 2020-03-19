<template>
    <div class="viewer">
        <div class="step"
             v-on:click="playVideo"
             flair="blue-stars">
            <el-image src="rabbit.png"></el-image>

            <el-image src="logo.png"></el-image>

            <div class="step__recorder">
                <video
                    ref="video"
                    v-bind:src="src"
                    v-bind:muted="muted"
                    autoplay></video>
            </div>

            <recorder-state class="recorder-state--viewer"></recorder-state>
        </div>
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
            muted() {
                return this.$store.state.muted;
            },

            src() {
                if (!this.video) return '';

                // We shouldn't construct paths like this
                const conf = this.$store.state.conf;
                const ext = conf.server.output_video_extension;
                return `${conf.server.output_path}/${this.video.id}.${ext}`;
            },

            video() {
                return this.videos[this.videoIndex];
            },

            videos() {
                return this.$store.state.videos;
            }
        },

        data() {
            return {
                videoIndex : 0
            };
        },

        methods : {
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
            this.setupVideo();
        },

        watch : {
            videos() {
                // If we've got new videos, reset video index
                this.videoIndex = 0;
            }
        }
    };
</script>