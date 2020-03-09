<template>
    <div class="el-qrcode"
         v-if="text">

        <canvas
            class="el-qrcode__canvas"
            ref="canvas"></canvas>

        <output class="el-qrcode__text">
            <a v-bind:href="text"
               target="_blank">{{text}}</a>
        </output>
    </div>
</template>

<script>
    import qrcode from 'qrcode';

    export default {
        mounted() {
            qrcode.toCanvas(this.$refs.canvas, this.text, (err) => {
                console.log(err);
            });
        },

        props : {
            text : {
                type : String
            }
        }
    }
</script>