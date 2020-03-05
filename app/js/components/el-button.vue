<template>
    <button
        v-bind:class="classes"
        v-on:click="click">
        <span v-if="text"
              class="el-button__text">{{text}}</span>
        <slot></slot>
    </button>
</template>

<script>
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

        methods : {
            click() {
                this.$emit('click');
            }
        },

        props : {
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