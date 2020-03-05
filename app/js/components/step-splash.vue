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

        <el-animation></el-animation>
        <el-animation></el-animation>
        <el-animation></el-animation>
    </div>
</template>

<script>
    import ElAnimation from './el-animation.vue';

    export default {
        components : {
            ElAnimation
        },

        methods : {
            start() {
                this.$sounds.play('transform');
                this.$socket.emit('recorder', 'start');
                this.$store.commit('step', 'explain');
            }
        },

        mounted() {
            this.$socket.emit('recorder', 'splash');
            this.$keys.on('enter', this.start.bind(this));
        }
    }
</script>