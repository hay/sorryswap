<template>
    <div class="recorder__step">
        <div class="recorder__content">
            <h2 class="recorder__headline">
                Kies een beroemdheid
            </h2>

            <ul class="mediagrid">
                <li v-for="video in videos">
                    <button v-on:click="selectVideo(video.id)">
                        <video class="mediagrid__video"
                               v-bind:data-id="video.id"
                               v-on:mouseenter="playVideo(video.id)"
                               muted playsinline
                               v-bind:src="video.src"></video>
                    </button>
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
            }
        }
    }
</script>