<template>
    <div>
        <screen-index v-if="screen === 'index'"></screen-index>
        <screen-recorder v-if="screen === 'recorder'"></screen-recorder>
        <pre v-if="!isScreen">Invalid screen</pre>
    </div>
</template>

<script>
    import ScreenIndex from './screen-index.vue';
    import ScreenRecorder from './screen-recorder.vue';

    export default {
        components : {
            ScreenIndex,
            ScreenRecorder
        },

        computed : {
            isScreen() {
                return this.$store.getters.isScreen;
            },

            screen() {
                return this.$store.state.screen;
            }
        }
    }
</script>