<template>
    <div class="recorder__step">
        <div class="recorder__content">
            <h2 class="recorder__headline">
                Ben je tevreden?
            </h2>

            <div class="recorder__singlepane">
                <video v-bind:src="src"
                       autoplay loop playsinline></video>
            </div>

            <menu class="recorder__actions">
                <button
                    class="recorder__btn recorder__btn--normal"
                    v-on:click="back">
                    Pas aan
                </button>

                <button
                    class="recorder__btn recorder__btn--normal"
                    v-on:click="ok">
                    Ga verder
                </button>
            </menu>
        </div>
    </div>
</template>

<script>
    export default {
        computed : {
            src() {
                const id = this.$store.state.videoId;
                // TODO: add an API method for getting back the URL
                return `files/uploads/${id}.webm`;
            }
        },

        methods : {
            back() {
                this.$store.commit('step', 'record');
                this.$sounds.play('wrong');
            },

            ok() {
                this.$store.commit('step', 'swap');
                this.$sounds.play('woopwoop');
            }
        }
    }
</script>