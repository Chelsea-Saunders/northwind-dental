import { registerModal } from "./modal.mjs";
import { buildAppointment } from "./contact.mjs";

function onDomReady(fn) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
        fn();
    }
}

// Insurance Logos
const  premera = '/images/insurance-logos/premera-bluecross.png';
const cigna = '/images/insurance-logos/cigna-dental.png';
const bcbs = '/images/insurance-logos/bluecross-blueshield.png';
const moda = '/images/insurance-logos/moda.png';
const delta = '/images/insurance-logos/delta-dental.jpg';
const united = '/images/insurance-logos/united-concordia-dental.png';
const metlife = '/images/insurance-logos/metlife.png';
const aetna = '/images/insurance-logos/aetna.svg';

registerModal("request-appt-modal", buildAppointment);

// used for google reviews (API)
// const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

// INSURANCE MODAL
function insuranceModal() {
    const logoContainer = document.getElementById("insurance-logos");
    const section = document.querySelector(".resnik-section");
    if (!logoContainer) return;

    const insuranceLogos = [
        { name: "Premera Blue Cross", src: premera, alt: "Premera Blue Cross Insurance Logo" },
        { name: "cigna-dental", src: cigna, alt: "Cigna Dental Insurance Logo" },
        { name: "bluecross-blueshield", src: bcbs, alt: "Blue Cross Blue Shield Insurance Logo" },
        { name: "moda-health", src: moda, alt: "Moda Health Insurance Logo" },
        { name: "delta-dental", src: delta, alt: "Delta Dental Insurance Logo" },
        { name: "united-concordia-dental", src: united, alt: "United Concordia Dental Insurance Logo" },
        { name: "metlife", src: metlife, alt: "MetLife Insurance Logo" }, 
        { name: "aetna", src: aetna, alt: "Aetna Insurance Logo" }
    ];

    logoContainer.innerHTML = "";
    insuranceLogos.forEach(logo => {
        const img = document.createElement("img");
        img.src = logo.src;
        img.alt = logo.alt;
        img.loading = "lazy";
        img.decoding = "async";
        logoContainer.appendChild(img);
    });

    // this is for the resnik section animation reveal
    if (section) {
        const io = new IntersectionObserver(([entry]) => {
            section.classList.toggle("resnik-in", entry.isIntersecting);
        }, { threshold: 0.15 });
        io.observe(section);
    }
}

// reveal welcome modal content
function welcomeReveal() {
    const welcome = document.querySelector(".welcome-wrapper");
    if (!welcome) return;

    const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            welcome.classList.add("welcome-in");
            io.unobserve(welcome); // only animate once
        }
    }, { threshold: 0.3 });

    io.observe(welcome);
}

// LAZY LOAD YOUTUBE WITH AUTOPLAY
// load api script on demand
function loadYouTubeAPI() {
    // don't double load
    if (window.YT || document.querySelector("script[data-yt-api]")) return;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    tag.defer = true;
    tag.dataset.ytApi = "true";
    document.head.appendChild(tag);
}

// youtube player initialization 
let player;
window.onYouTubeIframeAPIReady = function() {
    const videoContainer = document.getElementById("youtube-video");
    if (!videoContainer) return;

    player = new YT.Player("youtube-video", {

        videoId: "zyYbDoMD_1o", // Northwind Dental video ID
        
        playerVars: {
            autoplay: 1, 
            mute: 1, 
            controls: 0,
            loop: 1, 
            playlist: "zyYbDoMD_1o", // needed for loop
            modestbranding: 1, 
            rel: 0,
            showinfo: 0,
            playsinline: 1,
            origin: window.location.origin // for security
        }, 

        events: {
        onReady: () => {
            try { player.mute(); } catch (e) {}
            try { player.playVideo(); } catch (e) {}

            try {
                const iframe = player.getIframe();
                if (iframe) {
                    iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture; fullscreen");
                }
            } catch {}

            // Speaker toggle 
            const speakerToggle = document.querySelector("#speaker-toggle");
            if (!speakerToggle) return;

            const syncUI = () => {
                const muted = player.isMuted();
                speakerToggle.classList.toggle("muted", muted);
                speakerToggle.setAttribute("aria-pressed", String(!muted));
            };

            syncUI();

            const toggleMute = () => {
                if (player.isMuted()) {
                player.unMute();
                try { player.playVideo(); } catch {}
                } else {
                player.mute();
                }
                syncUI();
            };

            speakerToggle.addEventListener("click", toggleMute);
            speakerToggle.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleMute();
                }
            });
        }
        }
    });
};

// wait until page has loaded, then delay YouTube load slightly
window.addEventListener("load", () => {
    // lazy load youtube api after window load
    setTimeout(loadYouTubeAPI, 8000);
});

onDomReady(() => {
    registerModal("request-appt-modal", insuranceModal);
    requestAnimationFrame(insuranceModal);
    welcomeReveal();
});