<template>
    <div class="step"
         flair="purple">
        <h1 class="step__headline">Kies je thema</h1>

        <img src="/static/img/rabbit.png"
             class="step__rabbit" />

        <ul class="itemgrid itemgrid--buttons">
            <li v-for="(script, index) in scripts"
                class="itemgrid__item">
                <el-button
                    type="small"
                    v-bind:focused="focused === index"
                    v-on:click="selectScript(script.id)"
                    v-bind:text="script.name"></el-button>
            </li>
        </ul>
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
           this.$keys.setupList({
                initialFocus : this.focused,
                size : this.scripts.length
            });

            this.$keys.on('focus', (index) => this.focused = index);
            this.$keys.on('enter', () => this.selectScript(this.scripts[this.focused].name))
        }
    }
</script>