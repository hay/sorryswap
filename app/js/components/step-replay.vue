<template>
    <div class="step"
         flair="blue-stars">
        <div class="step__recorder">
            <video v-bind:src="src"
                   autoplay
                   loop
                   playsinline></video>
        </div>

        <div class="step__note">
            Ben je tevreden?
        </div>

        <menu class="step__actions">
            <el-button
                type="small"
                v-bind:focused="focused === 0"
                v-on:click="back"
                text="Pas aan"></el-button>

            <el-button
                type="small"
                v-bind:focused="focused === 1"
                v-on:click="ok"
                text="Ga verder"></el-button>
        </menu>
    </div>
</template>

<script>
    export default {
        computed : {
            src() {
                const id = this.$store.state.videoId;

                // TODO: add an API method for getting back the URL
                return `files/uploads/${id}.webm`;
            }
        },

        data() {
            return {
                focused : 1
            };
        },

        methods : {
            back() {
                this.$store.commit('step', 'record');
                this.$sounds.play('wrong');
            },

            ok() {
                this.$store.commit('step', 'swap');
                this.$sounds.play('woopwoop');
            }
        },

        mounted() {
            this.$keys.setupList({
                initialFocus : this.focused,
                size : 2
            });

            this.$keys.on('focus', (index) => this.focused = index);

            this.$keys.on('enter', () => {
                if (this.focused === 0) {
                    this.back();
                } else if (this.focused === 1) {
                    this.ok();
                }
            });
        }
    }
</script>