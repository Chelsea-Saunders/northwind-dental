
document.addEventListener("DOMContentLoaded", () => {
    const speaker = document.querySelector(".speaker-icon");

    //play video button
    if (speaker) {
        speaker.addEventListener("click", () => {
            speaker.classList.toggle("muted");
        });
    }
});