<template>
    <div class="recorder-state"
         v-bind:visible="!!message">
        <div class="recorder-state__message">
            <span
                v-if="state === 'start'"
                class="recorder-state__recording"></span>

            <p>{{this.message}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message : null,
                state : null
            }
        },

        sockets : {
            recorder(type) {
                this.state = type;

                if (type === 'splash') {
                    this.message = null;
                }

                if (type === 'start') {
                    this.message = 'Iemand is aan het opnemen!';
                }

                if (type === 'swapping') {
                    this.message = 'Opname klaar, aan het swappen...';
                }

                if (type === 'newvideo') {
                    this.message = 'Er is een nieuwe video!';
                }
            }
        }
    }
</script>