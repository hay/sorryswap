<template>
    <div class="index">
        <el-image src="logo.png"></el-image>

        <ul class="index__list">
            <li v-for="screen in screens">
                <button
                    v-on:click="go(screen)">
                    {{screen}}
                </button>
            </li>
        </ul>
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