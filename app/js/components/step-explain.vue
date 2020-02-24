<template>
    <div class="recorder__step">
        <div class="recorder__content">
            <img class="recorder__logo" src="../../static/img/logo.svg" />

            <section class="recorder__text">
                <img src="../../static/img/friends.gif" />

                <p>Maak je welgemeende excuses zonder het te menen! Leg met 1 druk op de knop jouw ‘het spijt me’ in de mond van een beroemdheid die ooit al eens écht spijt had.</p>

                <p>Spreek jouw eigen ‘welgemeende’ sorry bij in en hark vergeving op vergeving binnen voor al je zonden!</p>
            </section>

            <button
                class="recorder__btn recorder__btn--big"
                v-on:click="start">
                Kies een beroemdheid!
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        methods : {
            start() {
                this.$sounds.play('beep');
                this.$store.commit('step', 'choosevideo');
            }
        }
    }
</script>