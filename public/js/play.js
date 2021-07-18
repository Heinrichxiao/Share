/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function setup() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const videoId = urlParams.get('videoid');

    function getVideo() {
        return loadJSON(`/play/api/${videoId}`);
    }

    const video = Object.values(getVideo());
    console.log(video);
}