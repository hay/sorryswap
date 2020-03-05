<template>
    <div class="recorder__step">
        <div class="recorder__content">
            <h2 class="recorder__headline">
                Kies een beroemdheid
            </h2>

            <ul class="mediagrid">
                <li v-for="(video, index) in videos">
                    <el-button
                        v-bind:focused="focused === index"
                        type="video"
                        v-on:click="selectVideo(video.id)">
                        <video class="mediagrid__video"
                               v-bind:data-id="video.id"
                               v-on:mouseenter="playVideo(video.id)"
                               muted playsinline
                               v-bind:src="video.src"></video>
                    </el-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        computed : {
            videos() {
                return this.$store.state.targetVideos;
            }
        },

        data() {
            return {
                focused : 0
            };
        },

        methods : {
            playVideo(id) {
                Array.from(this.$el.querySelectorAll('video')).forEach((video) => {
                    if (video.dataset.id === id && video.paused) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            },

            selectVideo(id) {
                this.$store.commit('targetVideo', id);
                this.$sounds.play('woopwoop');
                this.$store.commit('step', 'choosescript');
            },

            setFocus(delta) {
                let focus = this.focused + delta;

                if (focus < 0) {
                    focus = this.videos.length - 1;
                } else if (focus > this.videos.length - 1) {
                    focus = 0;
                }

                this.focused = focus;
            }
        },

        mounted() {
            this.$keys.on('left', () => this.setFocus(-1));
            this.$keys.on('right', () => this.setFocus(1));
            this.$keys.on('up', () => this.setFocus(-1));
            this.$keys.on('down', () => this.setFocus(1));
            this.$keys.on('enter', () => this.selectVideo(this.focused));
        },

        watch : {
            focused() {
                this.playVideo(this.videos[this.focused].id);
            }
        }
    }
</script>