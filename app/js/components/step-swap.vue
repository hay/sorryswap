<template>
    <div class="recorder__step">
        <div class="recorder__content">
            <h2 class="recorder__headline">
                Swappen...
            </h2>

            <section v-if="state === 'swapping'" class="recorder__text">
                <p>Nu aan het swappen, dit kan even duren!</p>
            </section>

            <section v-if="state === 'ready'">
                <video v-bind:src="src"
                       autoplay loop playsinline></video>
            </section>

            <menu class="recorder__actions">
                <button
                    class="recorder__btn recorder__btn--normal"
                    v-on:click="again">
                    Nog een keer?
                </button>
            </menu>
        </div>
    </div>
</template>

<script>
    export default {
        computed : {
            src() {
                // TODO: add an API method for getting back the URL
                return `files/output/${this.videoId}.mp4`;
            },

            videoId() {
                return this.$store.state.videoId;
            }
        },

        data() {
            return {
                'state' : 'mounted'
            };
        },

        methods : {
            again() {
                this.$store.commit('step', 'splash');
            },

            async swap() {
                this.state = 'swapping';
                const endpoint = `/process/${this.videoId}`;
                const req = await window.fetch(endpoint);
                this.state = 'ready';
            }
        },

        async mounted() {
            this.swap();
        }
    }
</script>