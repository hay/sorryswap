<template>
    <div class="recorder__step">
        <div class="recorder__animation">
            <img src="../../static/img/bg-star.svg" />
        </div>

        <div class="recorder__content">
            <img class="recorder__logo recorder__logo--splash" src="../../static/img/logo.svg" />

            <el-button
                focused
                v-on:click="start"
                text="Druk op de knop om te starten!"
                type="big"></el-button>
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