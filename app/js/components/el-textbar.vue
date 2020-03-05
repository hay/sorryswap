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
    export default {
        data() {
            return {
                style : {
                    'transition-duration' : this.duration + 's',
                    transform : ''
                },
                textHeight : 0
            }
        },

        methods : {
            run() {
                const transform = 'translateY(-' + this.textHeight + 'px)';
                this.style.transform = transform;
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