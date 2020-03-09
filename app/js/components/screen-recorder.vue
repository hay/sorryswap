<template>
    <div class="recorder">
        <step-chooseconfirm v-if="step === 'chooseconfirm'"></step-chooseconfirm>
        <step-choosescript v-if="step === 'choosescript'"></step-choosescript>
        <step-choosevideo v-if="step === 'choosevideo'"></step-choosevideo>
        <step-explain v-if="step === 'explain'"></step-explain>
        <step-record v-if="step === 'record'"></step-record>
        <step-replay v-if="step === 'replay'"></step-replay>
        <step-share v-if="step === 'share'"></step-share>
        <step-splash v-if="step === 'splash'"></step-splash>
        <step-swap v-if="step === 'swap'"></step-swap>
    </div>
</template>

<script>
    import StepChooseconfirm from './step-chooseconfirm.vue';
    import StepChoosescript from './step-choosescript.vue';
    import StepChoosevideo from './step-choosevideo.vue';
    import StepExplain from './step-explain.vue';
    import StepRecord from './step-record.vue';
    import StepReplay from './step-replay.vue';
    import StepShare from './step-share.vue';
    import StepSplash from './step-splash.vue';
    import StepSwap from './step-swap.vue';

    export default {
        components : {
            StepChooseconfirm,
            StepChoosescript,
            StepChoosevideo,
            StepExplain,
            StepRecord,
            StepReplay,
            StepShare,
            StepSplash,
            StepSwap
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

        watch : {
            step() {
                // Remove all key events on every step
                this.$keys.removeListeners();
            }
        }
    };
</script>