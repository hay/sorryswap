<template>
    <div class="recorder">
        <step-explain v-if="step === 'explain'"></step-explain>
        <step-splash v-if="step === 'splash'"></step-splash>
    </div>
</template>

<script>
    import StepSplash from './step-splash.vue';
    import StepExplain from './step-explain.vue';

    export default {
        components : {
            StepExplain,
            StepSplash
        },

        computed : {
            step() {
                return this.$store.state.step;
            }
        },

        destroyed() {
            this.$music.pause();
            this.$sounds.pause();
        },

        mounted() {
        }
    };
</script>