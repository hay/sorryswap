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
                <el-button
                    focused
                    v-on:click="again"
                    text="Nog een keer?"></el-button>
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
                this.$socket.emit('recorder', 'swapping');
                const endpoint = `/process/${this.videoId}`;
                const req = await window.fetch(endpoint);
                this.state = 'ready';
            }
        },

        async mounted() {
            this.swap();
            this.$keys.on('enter', this.again.bind(this));
        }
    }
</script>