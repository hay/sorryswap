<template>
    <button
        v-bind:class="classes"
        v-bind:focused="focused"
        v-on:click="click">
        <div class="el-button__wrapper">
            <span class="el-button__text">{{text}}</span>
        </div>
    </button>
</template>

<script>
    let listener;

    export default {
        computed : {
            classes() {
                const classes = ['el-button'];
                classes.push('el-button--' + this.type);
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

        props : {
            focused : {
                type : Boolean,
                default : false
            },

            text : {
                type : String
            },

            type : {
                type : String
            }
        }
    }
</script>