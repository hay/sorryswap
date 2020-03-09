<template>
    <div class="status">
        <recorder-state class="recorder-state--status"></recorder-state>

        <ul class="status__videos">
            <li v-for="v in videos">
                <ul>
                    <li><strong>{{v.id}}</strong></li>

                    <li v-for="prop in props">
                        <strong>{{prop}}</strong>
                        <span>{{v.outputData[prop]}}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    import RecorderState from './recorder-state.vue';

    export default {
        components : {
            RecorderState
        },

        computed : {
            videos() {
                return this.$store.state.videos;
            }
        },

        data() {
            return {
                props : [
                    'recordTime', 'swapDate', 'targetVideo', 'targetScript',
                    'swapTime', 'shortcode'
                ]
            }
        }
    };
</script>