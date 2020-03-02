<template>
    <div class="recorder__step">
        <div class="recorder__animation">
            <img src="../../static/img/bg-star.svg" />
        </div>

        <div class="recorder__content">
            <img class="recorder__logo recorder__logo--splash" src="../../static/img/logo.svg" />

            <button
                class="recorder__btn recorder__btn--big"
                v-on:click="start">
                Druk op A om te starten!
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        methods : {
            start() {
                this.$sounds.play('transform');
                this.$socket.emit('recorder', 'start');
                this.$store.commit('step', 'explain');
            }
        },

        mounted( ){
            this.$socket.emit('recorder', 'splash');
        }
    }
</script>