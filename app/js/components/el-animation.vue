<template>
    <div class="el-animation">
        <img
            v-if="animation === 'furby'"
            v-bind:style="style"
            v-bind:align="align"
            class="el-animation__image"
            src="/static/img/furby.png" />

        <video
            v-if="animation === 'laura'"
            v-bind:style="style"
            v-bind:align="align"
            loop
            muted
            autoplay
            playsinline
            class="el-animation__image el-animation__video"
            src="/static/img/laura.mp4" />
    </div>
</template>

<script>
    import { random, sample } from 'lodash';

    export default {
        data() {
            return {
                align : 'top',
                animation : 'laura',
                style : {}
            }
        },

        methods : {
            cycleStyle() {
                this.align = Math.random() < 0.5 ? 'top' : 'bottom';
                this.animation = sample(['furby', 'laura']);

                this.style = {
                    'left' : random(0, 90) + 'vw'
                }
            }
        },

        mounted() {
            this.cycleStyle();

            window.setInterval(() => {
                this.cycleStyle();
            }, 10000);
        }
    }
</script>