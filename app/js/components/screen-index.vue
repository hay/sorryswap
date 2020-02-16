<template>
    <div>
        <h1>Sorryswap</h1>

        <time>{{time}}</time>

        <h2>Apps</h2>

        <ul>
            <li><a href="#recorder">Recorder</a></li>
        </ul>

        <button v-on:click="echo">echo</button>

        <pre>
            {{log}}
        </pre>
    </div>
</template>

<script>
export default {
    computed : {
        log() {
            return this.logMessages.join('\n');
        }
    },

    data() {
        return {
            logMessages : [],
            time : null
        };
    },

    methods : {
        echo() {
            console.log('echo');

            this.$socket.emit('clientlog', Date.now());
        }
    },

    sockets : {
        connect() {
            this.logMessages.push('Connected');
        },

        log(msg) {
            console.log('log!', msg);
            this.logMessages.push(msg);
        },

        time(time) {
            this.time = time;
        }
    }
};
</script>