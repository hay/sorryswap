<template>
    <div class="recorder__step">
        <div class="recorder__content">
            <h2 class="recorder__headline">
                Deepfake maken...
            </h2>

            <section v-if="state === 'swapping'"
                     class="swapping">
                <img class="swapping__image"
                     src="/static/img/facescan.gif" alt="" />

                <div class="swapping__text">
                    <h3 class="swapping__time">
                        Nog 46 uur, {{time.minutes}} minuten, {{time.seconds}} seconden
                    </h3>

                    <p class="swapping__time">
                        {{swaptext.text}}
                    </p>
                </div>
            </section>

            <menu class="recorder__actions recorder__actions--column">
                <el-button
                    v-bind:focused="focused === 1"
                    v-on:click="share"
                    text="Ok, ga voor de goedkope optie"></el-button>

                <el-button
                    v-bind:focused="focused === 0"
                    v-on:click="nextSwapText"
                    v-bind:text="swaptext.btn"></el-button>
            </menu>
        </div>
    </div>
</template>

<script>
    import { timeout } from '../util.js';

    export default {
        computed : {
            swaptext() {
                return this.allSwapTexts[this.textIndex];
            },

            videoId() {
                return this.$store.state.videoId;
            }
        },

        data() {
            return {
                allSwapTexts : this.$store.state.conf.app.swaptext,

                focused : 0,

                state : 'mounted',

                textIndex : 0,

                time : {
                    minutes : 49,
                    seconds : 7
                }
            };
        },

        methods : {
            async countdown() {
                this.time.seconds = this.time.seconds - 1;

                if (this.time.seconds === 0) {
                    this.time.minutes = this.time.minutes - 1;
                    this.time.seconds = 59;
                }

                await timeout(1000);
                this.countdown();
            },

            nextSwapText() {
                this.textIndex = (this.textIndex + 1) % this.allSwapTexts.length;
                this.$sounds.play('wrong');
            },

            setupKeys() {
               this.$keys.setupList({
                    initialFocus : this.focused,
                    size : 2
                });

                this.$keys.on('focus', (index) => this.focused = index);

                this.$keys.on('enter', () => {
                    if (this.focused === 0) {
                        this.nextSwapText();
                    } else if (this.focused === 1) {
                        this.share();
                    }
                });
            },

            share() {
                this.$store.commit('step', 'share');
                this.$sounds.play('woopwoop');
            },

            async swap() {
                this.state = 'swapping';
                this.$socket.emit('recorder', 'swapping');

                // If we want: disableSwap=1 can be added to disable swapping
                if (this.$store.state.swapVideo) {
                    const endpoint = `/process/${this.videoId}`;
                    window.fetch(endpoint);

                    // Also get the meta
                    this.$store.dispatch('fetchVideoMeta');
                }
            }
        },

        async mounted() {
            this.$music.muted = false;
            this.swap();
            this.countdown();
            this.setupKeys();
        }
    }
</script>