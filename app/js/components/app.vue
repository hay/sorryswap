<template>
    <div>
        <h1>Hello, world!!!</h1>

        <h2>{{index}}</h2>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                index : 0
            };
        },

        sockets : {
            connect() {
                console.log('connect');
            },

            index(index) {
                this.index = index;
            }
        }
    }
</script>