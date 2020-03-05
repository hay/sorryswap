<template>
    <div class="recorder__step">
        <div class="recorder__content">
            <h2 class="recorder__headline">
                Bevestig je keuze
            </h2>

            <div class="recorder__list">
                <section class="recorder__panel">
                    <video v-bind:src="video.src"
                          autoplay loop playsinline muted></video>
                    <h3 class="recorder__label">{{video.name}}</h3>
                </section>

                <div class="recorder__panel">
                    <section class="recorder__text">
                        Jouw gekozen script: <strong>{{script.name}}</strong>
                    </section>
                </div>
            </div>

            <menu class="recorder__actions">
                <el-button
                    v-bind:focused="focused === 0"
                    v-on:click="back"
                    text="Pas aan"></el-button>

                <el-button
                    v-bind:focused="focused === 1"
                    v-on:click="ok"
                    text="Neem op"></el-button>
            </menu>
        </div>
    </div>
</template>

<script>
    export default {
        computed : {
            script() {
                return this.$store.getters.targetScript;
            },

            video() {
                return this.$store.getters.targetVideo;
            }
        },

        data() {
            return {
                focused : 1
            };
        },

        methods : {
            back() {
                this.$store.commit('step', 'choosevideo');
                this.$sounds.play('wrong');
            },

            ok() {
                this.$store.commit('step', 'record');
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