<template>
    <div class="step splash"
         flair="blue">

        <video class="splash__gif"
               autoplay
               loop
               muted
               playsinline
               ref="gif"
               v-bind:src="splashGif"></video>

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
    import anime from 'animejs';
    import { timeout } from '../util.js';

    const GIF_WIDTH = 496;
    const GIF_HEIGHT = 288;
    let gifX = '100vw';

    export default {
        data() {
            return {
                'splashGif' : 'img/gif-1.mp4'
            }
        },

        methods : {
            async moveSplashGif() {
                anime({
                    targets : this.$refs.gif,
                    translateX : gifX,
                    translateY : 'calc(50vh - 144px)',
                    rotate : ['0deg', '20deg', '-20deg', '0deg'],
                    scale : [1, 1.5, 1],
                    duration : 10000,
                    easing : 'linear',
                    complete: () => {
                        this.splashGif = `img/gif-${anime.random(1, 5)}.mp4`;
                        gifX = gifX === '-50vw' ? '100vw' : '-50vw';
                        timeout(2000);
                        this.moveSplashGif();
                    }
                });
            },

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
            this.moveSplashGif();
        }
    }
</script>