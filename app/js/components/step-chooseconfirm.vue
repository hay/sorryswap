<template>
    <div class="step"
         flair="blue-stars">
        <div class="step__recorder">
            <video v-bind:src="video.src"
                   autoplay
                   loop
                   playsinline
                   muted></video>
        </div>

        <div class="step__note">
            Jouw gekozen script: <strong>{{script.name}}</strong>
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
                text="Neem op"></el-button>
        </menu>

        <img src="/static/img/rabbit-side.png"
             class="step__rabbit" />
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