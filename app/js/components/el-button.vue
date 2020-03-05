<template>
    <button
        v-bind:class="classes"
        v-bind:focused="focused"
        v-on:click="click">
        <span v-if="text"
              class="el-button__text">{{text}}</span>
        <slot></slot>
    </button>
</template>

<script>
    let listener;

    export default {
        computed : {
            classes() {
                const classes = ['el-button'];

                if (this.type) {
                    classes.push('el-button--' + this.type);
                }

                return classes;
            }
        },

        destroyed() {
            window.removeEventListener('keydown', listener);
        },

        methods : {
            click() {
                this.$emit('click');
            }
        },

        mounted() {
            const keycodes = this.$store.state.conf.app.keycodes;

            listener = window.addEventListener('keydown', (e) => {
                if (Object.values(keycodes).includes(e.which)) {
                    const key = Object.keys(keycodes).find(code => keycodes[code] === e.which);

                    if (key === 'enter' && this.focused) {
                        this.$emit('click');
                    }
                }
            });
        },

        props : {
            focused : {
                type : Boolean,
                default : false
            },

            text : {
                type : String
            },

            type : {
                default : 'normal',
                type : String
            }
        }
    }
</script>