<template>
    <div class="step step--splash"
         background="blue">

        <img src="/static/img/face.png"
             class="step__face" />

        <img src="/static/img/logo.png"
             class="step__logo" />

        <el-button
            class="step__start"
            focused
            v-on:click="start"
            text="Start!"
            type="small"></el-button>
    </div>
</template>

<script>
    export default {
        methods : {
            start() {
                this.$sounds.play('transform');
                this.$music.play('placeholder');
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