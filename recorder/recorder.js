export default class Recorder {
    constructor(opts) {
        this.videoEl = opts.videoEl;
        this.stream = null;
        this.recorder = null;
    }

    async setupStream() {
        this.stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        this.videoEl.volume = 0;
        this.videoEl.srcObject = this.stream;
    }

    async start() {
        this.recorder = new RecordRTCPromisesHandler(this.stream, {
            type: 'video',
            canvas : {
                width : 1280,
                height : 720
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
        data.append('video-blob', blob);

        let req = await window.fetch('save.php', {
            method : 'POST',
            body : data
        });

        console.log(req);
    }
}