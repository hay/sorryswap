<template>
    <div class="recorder__step">
        <div class="recorder__content">
            <h2 class="recorder__headline">
                Kies een script
            </h2>

            <menu class="recorder__list">
                <el-button
                    v-for="(script, index) in scripts"
                    v-bind:focused="focused === index"
                    v-on:click="selectScript(script.name)"
                    v-bind:text="script.name"></el-button>
            </menu>
        </div>
    </div>
</template>

<script>
    export default {
        computed : {
            scripts() {
                return this.$store.state.targetScripts;
            }
        },

        data() {
            return {
                focused : 0
            }
        },

        methods : {
            selectScript(id) {
                this.$sounds.play('bla');
                this.$store.commit('targetScript', id);
                this.$store.commit('step', 'chooseconfirm');
            }
        },

        mounted() {
            this.$keys.setupGrid(this.scripts.length);
            this.$keys.on('focus', (index) => this.focused = index);
            this.$keys.on('enter', () => this.selectScript(this.scripts[this.focused].name))
        }
    }
</script>