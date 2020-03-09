<template>
    <div class="recorder__step">
        <div class="recorder__content">
            <h2 class="recorder__headline">
                Download je video
            </h2>

            <div class="recorder__text">
                <p>Je video wordt klaargemaakt. Dit kan een paar minuten tot
                een uur duren. Op het grote scherm zie je wanneer je video
                klaar is.</p>

                <p>Met de QR-code hieronder krijg je een linkje wat vanaf dan
                de video laat zien. Je kan ook de shortcode hieronder noteren
                om later de video op te halen.</p>

                <el-qrcode
                    v-if="url"
                    v-bind:text="url"></el-qrcode>

                <pre
                    v-if="shortcode"
                    class="recorder__code">{{shortcode}}</pre>

                <p v-if="!shortcode">
                    <strong>
                        Er ging iets mis met het ophalen van je code. Vraag om hulp.
                    </strong>
                </p>
            </div>

            <menu class="recorder__actions">
                <el-button
                    focused
                    v-on:click="again"
                    text="Klaar"></el-button>
            </menu>
        </div>
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