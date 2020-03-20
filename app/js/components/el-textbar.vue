<template>
    <div class="el-textbar">
        <div class="el-textbar__textwrapper">
            <div v-bind:style="style"
                 class="el-textbar__text"
                 ref="text">
                 <p>{{text}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { timeout } from '../util.js';

    export default {
        data() {
            return {
                style : {
                    'transition-duration' : this.duration + 's',
                    transform : `translateY(0px)`
                },

                textHeight : 0
            }
        },

        methods : {
            run() {
                const y = this.textHeight;
                this.style.transform = `translateY(-${y}px)`;
            }
        },

        async mounted() {
            // FIXME: for some reason it doesn't pick up the height without
            // this timeout
            await timeout(1000);
            const box = this.$refs.text.getBoundingClientRect();
            this.textHeight = box.height;
        },

        props : {
            duration : {
                type : Number
            },

            text : {
                type : String
            }
        }
    }
</script>