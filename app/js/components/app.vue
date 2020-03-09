<template>
    <div>
        <screen-index v-if="screen === 'index'"></screen-index>
        <screen-recorder v-if="screen === 'recorder'"></screen-recorder>
        <screen-share v-if="screen === 'share'"></screen-share>
        <screen-status v-if="screen === 'status'"></screen-status>
        <screen-viewer v-if="screen === 'viewer'"></screen-viewer>
        <pre v-if="!isScreen">Invalid screen</pre>
    </div>
</template>

<script>
    import ScreenIndex from './screen-index.vue';
    import ScreenRecorder from './screen-recorder.vue';
    import ScreenShare from './screen-share.vue';
    import ScreenStatus from './screen-status.vue';
    import ScreenViewer from './screen-viewer.vue';

    export default {
        components : {
            ScreenIndex,
            ScreenRecorder,
            ScreenShare,
            ScreenStatus,
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