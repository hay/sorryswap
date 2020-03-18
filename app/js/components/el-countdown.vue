<template>
    <div class="el-countdown"
         v-if="visible">
        <div class="el-countdown__count"
             ref="count">
            <span>{{count}}</span>
        </div>
    </div>
</template>

<script>
    import anime from 'animejs';
    import { timeout } from '../util.js';

    export default {
        data() {
            return {
                count : this.from,
                visible : true
            };
        },

        methods : {
            animate() {
                anime({
                    targets : this.$refs.count,
                    scale : [1, 1.2],
                    rotate : [0, 10],
                    duration : 1000,
                    loop : this.from
                });
            },

            async hide() {
                const anim = anime({
                    targets : this.$refs.count,
                    scale : [1, 0],
                    opacity : [1, 0],
                    rotate : [10, 0],
                    duration : 1000
                });

                return anim.finished;
            },

            async setup() {
                await timeout(1000);

                anime({
                    targets : this.$refs.count,
                    scale : [0, 1],
                    opacity : [0, 1],
                    duration : 1000
                });
            },

            async start() {
                this.animate();

                for (let i = this.from; i >= 1; i--) {
                    this.count = i;
                    this.$sounds.play('beep');
                    await timeout(1000);
                }

                this.$sounds.play('woopwoop');
                await this.hide();
                this.visible = false;
            },
        },

        props : {
            from : {
                type : Number
            }
        }
    }
</script>