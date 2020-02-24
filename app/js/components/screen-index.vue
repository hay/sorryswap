<template>
    <div>
        <h1>Sorryswap</h1>

        <ul>
            <li v-for="screen in screens">
                <a v-bind:href="'#screen=' + screen">{{screen}}</a>
            </li>
        </ul>

        <button v-on:click="echo">echo</button>
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
        echo() {
            this.$socket.emit('clientlog', Date.now());
        }
    }
};
</script>