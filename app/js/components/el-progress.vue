<template>
    <div class="el-progress"
         ref="progress"
         v-bind:running="running">
         <div class="el-progress__bar"
              v-bind:style="style"></div>
</template>

<script>
    export default {
        computed : {
            style() {
                return {
                    'transition-duration' : this.duration + 's'
                }
            }
        },

        props : {
            duration : {
                type : Number
            },

            running : {
                type : Boolean,
                default : false
            }
        }
    }
</script>