<template>
    <div>
        <h1>Sorryswap</h1>

        <time>{{time}}</time>

        <h2>Apps</h2>

        <ul>
            <li><a href="#recorder">Recorder</a></li>
        </ul>

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

    sockets : {
        connect() {
            this.logMessages.push('Connected');
        },

        time(time) {
            this.time = time;
        }
    }
};
</script>