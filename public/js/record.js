/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const frames = [];
let video;
let finishedRecording;
let videoWidth;
let videoHeight;

function setup() {
    noCanvas();

    finishedRecording = true;

    video = createCapture({
        video: {
            optional: [{
                maxFrameRate: 30
            }]
        }
    });
    const button = createButton('Submit video', 'submit');
    const videosetupLabel1 = createSpan('Video width').class('center');
    createElement('br');
    const widthInp = createInput();
    createElement('br');
    const videosetupLabel2 = createSpan('Video height').class('center');
    createElement('br');
    const heightInp = createInput();
    createElement('br');
    const videosetupLabel3 = createSpan('Video name').class('center');
    createElement('br');
    const videoName = createInput();
    createElement('br');
    createElement('br');
    const setupVideo = createButton('Setup Video');

    // Setup width and height inputs
    widthInp.show();
    widthInp.class('w3-round textInput');
    heightInp.show();
    heightInp.class('w3-round textInput');
    videoName.show();
    videoName.class('w3-round textInput');

    // Setup the setup video button
    setupVideo.class('w3-round w3-green w3-button');
    setupVideo.mouseReleased(() => {
        heightInp.hide();
        widthInp.hide();
        videoName.hide();
        videosetupLabel1.hide();
        videosetupLabel2.hide();
        videosetupLabel3.hide();
        setupVideo.hide();

        button.show();
        video.size(widthInp.value(), heightInp.value());
        video.show();
        video.loadPixels();
        finishedRecording = false;
    });

    // Setup the video
    video.hide();

    // Setup the button
    button.hide();
    button.class('w3-round w3-green w3-border-0 w3-right');
    button.mouseReleased(async () => {
        video.hide();
        finishedRecording = true;
        const name = videoName.value();
        for (let i in frames) {
            const data = {
                frame: frames[i],
                name,
                finished: i == frames.length - 1
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('/record', options);
            const json = await response.json();
            console.log(json);
            setTimeout(1, () => {});
        }
    });
    frameRate(30);

}

function draw() {
    if (!finishedRecording) {
        const frame64 = video.canvas.toDataURL();
        frames.push(frame64);
    }
}