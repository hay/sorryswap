<template>
    <picture
        v-bind:image="image"
        class="el-image__wrap">
        <img v-bind:src="imageSrc"
             class="el-image__img" />
    </picture>
</template>

<script>
    export default {
        computed : {
            image() {
                return this.src.split('.')[0];
            },

            imageSrc() {
                return `img/${this.src}`;
            }
        },

        props : {
            src : {
                type : String
            }
        }
    }
</script>