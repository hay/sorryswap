<template>
    <div class="step splash"
         flair="blue">

        <el-image src="face.png"></el-image>

        <el-image src="logo.png"></el-image>

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