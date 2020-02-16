<template>
    <div>
        <h1>Sorryswap</h1>
        <h2>Apps</h2>

        <ul>
            <li><a href="#recorder">Recorder</a></li>
            <li><a href="#log">Log</a></li>
        </ul>

        <button v-on:click="echo">echo</button>
    </div>
</template>

<script>
export default {
    methods : {
        echo() {
            this.$socket.emit('clientlog', Date.now());
        }
    }
};
</script>