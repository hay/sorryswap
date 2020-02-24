<template>
    <div class="recorder__step">
        <div class="recorder__content">
            <h2 class="recorder__headline">
                Bevestig je keuze
            </h2>

            <div class="recorder__panels">
                <section class="recorder__panel">
                    <video v-bind:src="video.src"
                          autoplay loop playsinline muted></video>
                    <h3 class="recorder__label">{{video.name}}</h3>
                </section>

                <div class="recorder__panel">
                    <section class="recorder__text recorder__text--small">
                        <p v-html="script.text"></p>
                    </section>
                </div>
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
                    Neem op
                </button>
            </menu>
        </div>
    </div>
</template>

<script>
    export default {
        computed : {
            script() {
                return this.$store.getters.targetScript;
            },

            video() {
                return this.$store.getters.targetVideo;
            }
        },

        methods : {
            back() {
                this.$store.commit('step', 'choosevideo');
            },

            ok() {
                this.$store.commit('step', 'record');
            }
        }
    }
</script>