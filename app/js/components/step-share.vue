<template>
    <div class="step explain"
         flair="textbox">

        <h1 class="step__headline">Klaar!</h1>

        <section class="step__text step__text--2col">
            <div class="step__textcol">
                <p>Je video wordt klaargemaakt. Dit kan even duren. Op het grote scherm zie je wanneer je video klaar is.</p>

                <p>Met de QR-code krijg je een linkje wat vanaf dan de video laat zien.
                Je kan ook de shortcode hieronder noteren om later de video op te halen.</p>
            </div>

            <div class="step__textcol">
                <el-qrcode
                    v-if="url"
                    v-bind:text="url"></el-qrcode>

                <pre v-if="shortcode">{{shortcode}}</pre>

                <p v-if="!shortcode"
                   class="step__error">
                    Er ging iets mis met het ophalen van je code. Vraag om hulp.
                </p>
            </div>
        </section>

        <el-image src="rabbit.png"></el-image>

        <el-button
            focused
            type="small"
            v-on:click="again"
            text="OK"></el-button>
    </div>
</template>

<script>
    import ElQrcode from './el-qrcode.vue';

    export default {
        components : { ElQrcode },

        computed : {
            shortcode() {
                const meta = this.$store.state.videoMeta;
                if (!meta || !meta.uploadData) return null;

                return meta.uploadData.shortcode;
            },

            url() {
                if (!this.shortcode) return null;

                const endpoint = this.$store.state.conf.app.share_link;
                return `${endpoint}${this.shortcode}`
            }
        },

        methods : {
            again() {
                this.$store.commit('step', 'splash');
            }
        },

        async mounted() {
            this.$keys.on('enter', this.again.bind(this));
        }
    }
</script>