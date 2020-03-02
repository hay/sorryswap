<template>
    <div>
        <screen-index v-if="screen === 'index'"></screen-index>
        <screen-log v-if="screen === 'log'"></screen-log>
        <screen-recorder v-if="screen === 'recorder'"></screen-recorder>
        <screen-viewer v-if="screen === 'viewer'"></screen-viewer>
        <pre v-if="!isScreen">Invalid screen</pre>
    </div>
</template>

<script>
    import ScreenIndex from './screen-index.vue';
    import ScreenLog from './screen-log.vue';
    import ScreenRecorder from './screen-recorder.vue';
    import ScreenViewer from './screen-viewer.vue';

    export default {
        components : {
            ScreenIndex,
            ScreenLog,
            ScreenRecorder,
            ScreenViewer
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