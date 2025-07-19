
{/* <script>
    document.addEventListener("DOMContentLoaded", function () {
        const toggle = document.querySelector(".read-more");
        const moreText = document.querySelector(".more-text");

        toggle.addEventListener("click", function () {
            moreText.classList.toggle("hidden");
            toggle.style.display = "none";
        });
    });
</script> */}

document.addEventListener("DOMContentLoaded", () => {
    const speaker = document.querySelector(".speaker-icon");

    //play video button
    if (speaker) {
        speaker.addEventListener("click", () => {
            speaker.classList.toggle("muted");
        });
    }
});