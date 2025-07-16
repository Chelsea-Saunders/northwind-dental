
document.addEventListener("DOMContentLoaded", () => {
    const speaker = document.querySelector(".speaker-icon");
    const video = document.querySelector(".hero-video");
    // const playButton = document.querySelector("#play-video");

    //play video button
    speaker.addEventListener("click", () => {
        video.muted = !video.muted;
        speaker.classList.toggle("muted", video.muted);
        // video.play();
    });
});