<template>
    <div class="recorder">
        <step-chooseconfirm v-if="step === 'chooseconfirm'"></step-chooseconfirm>
        <step-choosescript v-if="step === 'choosescript'"></step-choosescript>
        <step-choosevideo v-if="step === 'choosevideo'"></step-choosevideo>
        <step-explain v-if="step === 'explain'"></step-explain>
        <step-record v-if="step === 'record'"></step-record>
        <step-splash v-if="step === 'splash'"></step-splash>
    </div>
</template>

<script>
    import StepChooseconfirm from './step-chooseconfirm.vue';
    import StepChoosescript from './step-choosescript.vue';
    import StepChoosevideo from './step-choosevideo.vue';
    import StepExplain from './step-explain.vue';
    import StepRecord from './step-record.vue';
    import StepSplash from './step-splash.vue';

    export default {
        components : {
            StepChooseconfirm,
            StepChoosescript,
            StepChoosevideo,
            StepExplain,
            StepRecord,
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