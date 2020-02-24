import CONF from '../../conf.toml';
import { RecordRTCPromisesHandler } from 'recordrtc';

export default class Recorder {
    constructor(opts) {
        this.videoEl = opts.videoEl;
        this.stream = null;
        this.recorder = null;
        this.meta = {};
        this.uploadEndpoint = CONF.app.server + CONF.app.upload_endpoint;
    }

    async setupStream() {
        this.stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        this.videoEl.volume = 0;
        this.videoEl.srcObject = this.stream;
    }

    async start(meta) {
        this.meta = meta;

        this.recorder = new RecordRTCPromisesHandler(this.stream, {
            type: 'video',

            canvas : {
                width : CONF.app.cam.width,
                height : CONF.app.cam.height
            }
        });

        this.recorder.startRecording();
    }

    async stop() {
        await this.recorder.stopRecording();
        let blob = await this.recorder.getBlob();
        this.upload(blob);
    }

    async upload(blob) {
        let file = new File([blob], 'tmp.webm', {
            type : 'video/webm'
        });

        let data = new FormData();
        data.append('meta', JSON.stringify(this.meta));
        data.append('video', blob);

        let req = await window.fetch(this.uploadEndpoint, {
            method : 'POST',
            body : data
        });

        console.log(req);
    }
}