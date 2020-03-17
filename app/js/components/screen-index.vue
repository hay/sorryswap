<template>
    <div class="recorder">
        <div class="recorder__content">
            <img class="recorder__logo recorder__logo--splash"
                 src="../../static/img/logo.png" />

            <menu class="recorder__list">
                <el-button
                    v-for="screen in screens"
                    v-on:click="go(screen)"
                    v-bind:text="screen"></el-button>
            </menu>
        </div>
    </div>
</template>

<script>
    export default {
        computed : {
            screens() {
                return this.$store.state.conf.app.screens;
            }
        },

        methods : {
            go(screen) {
                this.$store.commit('screen', screen);
            },

            mounted() {
                this.$socket.emit('index', Date.now());
            }
        }
    };
</script>