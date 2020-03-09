<template>
    <div class="share">
        <img
            v-show="!video"
            class="share__logo"
            src="../../static/img/logo.svg" />

        <section
            class="share__section"
            v-show="!video">
            <div class="share__text">
                Haal hier je sorryvideo op.
                Vul beneden je code in van vier karakters.
            </div>

            <div class="share__input">
                <input
                    class="share__inputcode"
                    type="text"
                    v-model="shortcode"
                    placeholder="abc1"
                    pattern="[a-z0-9]{4}"
                    minlength="4"
                    v-on:keydown="codeInput"
                    maxlength="4" />

                <button
                    v-bind:disabled="!shortcodeValid"
                    v-on:click="fetch"
                    class="share__inputbtn">
                    OK
                </button>
            </div>

            <div
                v-show="error"
                class="share__text">
                Deze video is nog niet klaar of bestaat niet.
                Probeer het later nog eens.
            </div>
        </section>

        <section
            v-if="video"
            class="share__section">
            <video v-bind:src="videoSrc"
                   class="share__video"
                   autoplay
                   loop
                   controls
                   playsinline></video>

            <a v-bind:href="videoSrc"
               download
               class="el-button el-button--download">
                Download je video</a>
        </section>
    </div>
</template>

<script>
    import { getJson } from '../util.js';

    const SHORTCODE_REGEX = /[a-z0-9]{4}/
    const URL_PARAM_REGEX = /\?code=([a-z0-9]{4})/

    export default {
        computed : {
            endpoint() {
                const endpoint = this.$store.state.conf.app.shortcode_endpoint;
                return `${endpoint}/${this.shortcode}`;
            },

            shortcodeValid() {
                return this.shortcode &&
                       SHORTCODE_REGEX.test(this.shortcode);
            },

            videoSrc() {
                if (!this.video) return null;

                // TODO: add an API method for getting back the URL
                return `files/output/${this.video.id}.mp4`;
            },

            videos() {
                return this.$store.state.videos;
            }
        },

        data() {
            return {
                error : false,
                shortcode : this.getShortcodeFromUrl(),
                video : null
            };
        },

        methods : {
            codeInput(e) {
                if (e.code === 'Enter' && this.shortcode.length === 4) {
                    this.fetch();
                }

                if (this.error) {
                    this.error = false;
                }
            },

            async fetch() {
                if (!this.shortcodeValid) return;

                const data = await getJson(this.endpoint);

                if (data.error) {
                    this.error = data.error;
                } else {
                    this.video = data;
                }
            },

            getShortcodeFromUrl() {
                const url = window.location.href.toLowerCase();
                const shortcode = url.match(URL_PARAM_REGEX);

                return shortcode ? shortcode[1] : null;
            }
        },

        watch : {
            videos() {
                // If there are new videos, refresh the thing to check
                // if there is a new video
                this.fetch();
            }
        }
    };
</script>