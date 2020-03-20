<template>
    <div class="step explain"
         flair="textbox">

        <h1 class="step__headline">Welkom</h1>

        <section class="step__text">
            <p>Maak je welgemeende excuses zonder het te menen! Leg met één druk op de knop jouw ‘het spijt me’ in de mond van een beroemdheid die ooit al eens écht spijt had.</p>

            <p>Spreek jouw eigen ‘welgemeende’ sorry in en hark vergeving binnen voor al je zonden!</p>
        </section>

        <el-image src="rabbit.png"></el-image>

        <el-button
            focused
            v-on:click="start"
            type="big"
            text="Kies een beroemdheid"></el-button>
    </div>
</template>

<script>
    export default {
        methods : {
            start() {
                this.$sounds.play('beep');
                this.$store.commit('step', 'choosevideo');
            }
        },

        mounted() {
            this.$keys.on('enter', this.start.bind(this));
        }
    }
</script>