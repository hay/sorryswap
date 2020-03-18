<template>
    <div class="el-textbar">
        <div class="el-textbar__textwrapper">
            <div v-bind:style="style"
                 class="el-textbar__text"
                 ref="text">{{text}}</div>
        </div>
    </div>
</template>

<script>
    const LINE_HEIGHT = 43;

    export default {
        data() {
            return {
                style : {
                    'transition-duration' : this.duration + 's',
                    transform : `translateY(${LINE_HEIGHT}px)`
                },

                textHeight : LINE_HEIGHT
            }
        },

        methods : {
            run() {
                const y = this.textHeight + LINE_HEIGHT;
                this.style.transform = `translateY(-${y}px)`;
            }
        },

        mounted() {
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