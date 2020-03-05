import Vue from 'vue';

export class Keys {
    constructor(opts) {
        this.keycodes = opts.keycodes;
        this.bus = new Vue();
        this.listener = window.addEventListener('keydown', (e) => this.getHandler(e));
    }

    destroy() {
        window.removeEventListener('keydown', this.listener);
    }

    getKey(code) {
        return Object.keys(this.keycodes).find(key => this.keycodes[key] === code);
    }

    getHandler(e) {
        if (!this.hasKey(e.which)) return;

        const key = this.getKey(e.which);

        if (key === 'enter') {
            this.bus.$emit('enter');
        }

        if (key === 'left') {
            this.bus.$emit('keyleft');
        }

        if (key === 'right') {
            this.bus.$emit('keyright');
        }

        if (key === 'up') {
            this.bus.$emit('keyup');
        }

        if (key === 'down') {
            this.bus.$emit('keydown');
        }
    }

    hasKey(code) {
        return Object.values(this.keycodes).includes(code);
    }

    on(type, handler) {
        this.bus.$on(type, handler);
    }

    removeListeners() {
        this.bus.$off();
    }
}