
// MUTE/UNMUTE LOGIC
function toggleSpeaker(button) {
    button.classList.toggle("muted");
}

// WELCOME MESSAGE ...READ MORE CLICK
function toggleReadMore() {
    const moreText = document.querySelector(".more-text");
    const toggleButton = document.querySelector(".read-more");
    const modalContent = document.querySelector(".welcome-modal-content");

    if (moreText && toggleButton && modalContent) {
        moreText.classList.toggle("hidden");
        moreText.style.opacity = "1";
        toggleButton.style.display = "none";
        toggleButton.setAttribute("aria-expanded", "true");

        modalContent.classList.toggle("initial-state");
        modalContent.classList.add("expanded-state");
    }

    return false; // Prevent default action if needed
}


// INIT FUNCTION TO ATTACH EVENT LISTENERS
function init() {
    const speaker = document.querySelector(".speaker-icon");
    const readMoreButton = document.querySelector("#read-more-toggle");

    // event listener for toggleSpeaker
    if (speaker) {
        speaker.addEventListener("click", () => toggleSpeaker(speaker));
    }

    // event listener for toggleReadMore
    if (readMoreButton) {
        readMoreButton.addEventListener("click", toggleReadMore);
    }
}

init();
// <script>
    // document.addEventListener("DOMContentLoaded", function () {
    //     const toggle = document.querySelector(".read-more");
    //     const moreText = document.querySelector(".more-text");

    //     toggle.addEventListener("click", function () {
    //         moreText.classList.toggle("hidden");
    //         toggle.style.display = "none";
    //     });
    // });

// </script> 

// document.addEventListener("DOMContentLoaded", () => {
//     const speaker = document.querySelector(".speaker-icon");

//     //play video button
//     if (speaker) {
//         speaker.addEventListener("click", () => {
//             speaker.classList.toggle("muted");
//         });
//     }
// });