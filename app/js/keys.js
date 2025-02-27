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
            this.bus.$emit('left');
        }

        if (key === 'right') {
            this.bus.$emit('right');
        }

        if (key === 'up') {
            this.bus.$emit('up');
        }

        if (key === 'down') {
            this.bus.$emit('down');
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

    setupList(opts) {
        let focus = opts.initialFocus;

        function setFocus(delta) {
            let nextFocus = focus + delta;

            if (nextFocus < 0) {
                nextFocus = opts.size - 1;
            } else if (nextFocus > opts.size - 1) {
                nextFocus = 0;
            }

            focus = nextFocus;

            this.bus.$emit('focus', focus);
        }

        this.on('left', () => setFocus.call(this, -1));
        this.on('right', () => setFocus.call(this, 1));
        this.on('up', () => setFocus.call(this, -1));
        this.on('down', () => setFocus.call(this, 1));
    }
}