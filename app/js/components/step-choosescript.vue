<template>
    <div class="recorder__step">
        <div class="recorder__content">
            <h2 class="recorder__headline">
                Kies een script
            </h2>

            <ul class="mediagrid">
                <li v-for="script in scripts">
                    <button
                        class="mediagrid__textbutton"
                        v-on:click="selectScript(script.name)">
                        {{script.name}}
                    </button>
                </li>
            </ul>
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

        methods : {
            selectScript(id) {
                this.$sounds.play('bla');
                this.$store.commit('targetScript', id);
                this.$store.commit('step', 'chooseconfirm');
            }
        }
    }
</script>