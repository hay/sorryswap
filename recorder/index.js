import Recorder from './recorder.js';

let $ = document.querySelector.bind(document);

function setup() {
    const recorder = new Recorder({
        videoEl : $('#video')
    });

    recorder.setupStream();

    $('#start').addEventListener('click', () => recorder.start());
    $('#stop').addEventListener('click', () => recorder.stop());
}

setup();