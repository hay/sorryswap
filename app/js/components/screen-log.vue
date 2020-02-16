<template>
    <div>
        <a href="#">Back</a>

        <pre>
            {{log}}
        </pre>
    </div>
</template>

<script>
export default {
    computed : {
        log() {
            return this.logMessages.reverse().join('\n');
        }
    },

    data() {
        return {
            logMessages : []
        };
    },

    sockets : {
        connect() {
            this.logMessages.push('Connected');
        },

        log(msg) {
            this.logMessages.push(msg);
        }
    }
};
</script>