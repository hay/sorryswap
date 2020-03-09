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
    export default {
        data() {
            return {
            };
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