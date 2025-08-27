import { registerModal, toggleModal, } from './modal.mjs';

// MODAL FOR TEAM MEMBERS
const teamMembers = [
    {
        id: "dentist",
        name: "Dr. Thayne Dawson DDM", 
        role: "Dentist", 
        description: `Dr. Thayne Dawson grew up in a big family in Idaho. Throughout his growing up years he had to go through his share of dental treatment. From fillings, crowns, root canals, and implants, he has learned first-hand how important a good dentist is, and how good dentistry can contribute to a better quality of life.
            Becoming a dentist wasn’t something that Dr. Dawson ever saw himself doing, until he was married with two kids. He had worked in construction since he was a teenager, but knew that he wanted to pursue the education he’d never had.
            While taking classes at Brigham Young University-Idaho he became fascinated with the human body and decided to dive deeper into a degree in healthcare. Around this time, a friend allowed him to job shadow at his dental office, answered a million questions, and shared his joy for dentistry with Dr. Dawson, which opened a new door of discovery and excitement for him. From that time on, Dr. Dawson knew that becoming a dentist was not just a dream, it was something that he was going to make happen.
            After completing his degree in Exercise Science at BYU-Idaho, Dr. Dawson received his DMD degree at the Medical University of South Carolina and then moved his family across the country to Billings, MT where he began working at a very good, but fast-paced practice. He loved helping his patients. Whether it was helping someone in pain, seeing tears in a patient’s eyes as they joyfully received their new denture, or performing a child’s first dental exam, every patient that Dr. Dawson saw, confirmed to him that he had indeed chosen the right career. But working in a fast-paced dental practice wasn’t what he saw himself doing long-term; he wanted to practice in a place where he had time to visit with each of his patients and get to know them personally.
            With this goal in mind, Dr. Dawson moved his family to Alaska in the winter of 2018. Between the kind people and the beautiful outdoors, it took no time at all for his family to feel at home in Alaska. They knew they were here to stay.
            Dr. Dawson has loved the slower pace that he has found here, and getting to know each of his patients has been a delight. He feels blessed to be surrounded by so many good people who have influenced his life for the better. He loves nothing more than to help people feel better about their oral health, or give them new confidence in their smile. If you have questions or concerns, or if you aren’t happy with the way your teeth look or feel, he invites you to come talk to him.
            In addition to dentistry, Dr. Dawson loves spending time with his family, camping, fishing, hiking, hunting and enjoying the great outdoors. He has been married to his wife Kiama for 18 years, and together they have 5 kids.
            Dr. Dawson is a member of the American Dental Association, the Academy of General Dentistry, the Alaska Dental Society and the Matanuska-Susitna Dental Society.`,
        img: [
            { src: "./src/images/team/thayne/DSC_0772.jpg", alt: "Dr. Thayne Dawson" },
            { src: "./src/images/team/thayne/DawsonFamily-20.jpg", alt: "Dawson Family" },
            { src: "./src/images/team/thayne/DawsonFamily-73.jpg", alt: "Dawson Family" },
            { src: "./src/images/team/thayne/IMG-0412.jpg", alt: "Dr. Thayne Dawson" },
            { src: "./src/images/team/thayne/drDawson.jpg", alt: "Dr. Thayne Dawson" },
            { src: "./src/images/team/thayne/fam_edited.jpg", alt: "Dawson Family Ice Skating" },
            { src: "./src/images/team/thayne/dentistry1.png", alt: "Dr. Dawson with Patient" },
            { src: "./src/images/team/thayne/fam1.jpg", alt: "Dr. Thayne Dawson" },
            { src: "./src/images/team/thayne/family2020.jpg", alt: "Dr. Thayne Dawson" },
            { src: "./src/images/team/thayne/hiking.jpg", alt: "Dr. Thayne Dawson" },
            { src: "./src/images/team/thayne/DSC_0724.jpg", alt: "Dr. Thayne Dawson" },
            { src: "./src/images/team/thayne/IMG-9469.jpg", alt: "Dr. Thayne Dawson" },
            { src: "./src/images/team/thayne/IMG-9625.jpg", alt: "Dr. Thayne Dawson" },
            { src: "./src/images/team/thayne/shed.jpg", alt: "Dr. Thayne Dawson" },
            { src: "./src/images/team/thayne/thayne-fish.jpg", alt: "Dr. Thayne Dawson" },
            { src: "./src/images/team/thayne/thayne-grad-20.jpg", alt: "Dr. Thayne Dawson" },
            { src: "./src/images/team/thayne/DSC_0761.jpg", alt: "Mrs. Dr. Thayne Dawson" },
            { src: "./src/images/team/thayne/IMG-0505.png", alt: "Dr. Thayne Dawson" },
            { src: "./src/images/team/thayne/IMG-9410.png", alt: "Dr. Thayne Dawson" }
        ]
    },
    {
        id: "receptionist",
        name: "Jessica", 
        role: "Office Receptionist", 
        description: `Jessica is more than just a receptionist. Whether you need to schedule an appointment, pay a bill or have questions about your insurance, she will take the time to help with all your needs.
            Jessica was born and raised in Wenatchee, WA, which is known for being the apple capital of the world. She grew up always playing outside and climbing the tall pine trees.
            The Oregon coast was one of her favorite places to explore until she discovered Alaska and moved here in 2020 with her husband. They are living life to the fullest and checking off their bucket-list, climbing glaciers and discovering the beauty of Alaska.`,
        img: [
            { src: "./src/images/team/jessica-receptionist/jessica2.jpg", alt: "Jessica" },
            { src: "./src/images/team/jessica-receptionist/jessica3.jpg", alt: "Jessica" },
            { src: "./src/images/team/jessica-receptionist/Jessica1.jpg", alt: "Jessica" },
            { src: "./src/images/team/jessica-receptionist/jessica11.jpg", alt: "Jessica" },
        ]
    },
    {
        id: "hygienist",
        name: "Alyssa", 
        role: "Dental Hygienist", 
        description: `Alyssa was born in Minnesota and raised in Wasilla, Alaska. She graduated from the University of Alaska Anchorage. When she isn’t cleaning teeth, she enjoys spending time with her husband and dogs, gardening, and traveling. `,
        img: [
            { src: "./src/images/team/alyssa-hygienist/Alyssa3.png", alt: "Alyssa" }
        ]
    },
    {
        id: "assistant-1",
        name: "Beth", 
        role: "Dental Assistant", 
        description: `Beth is a “Valley Girl” having grown up in the Willow and Wasilla area. She comes to us with 30+ years of experience dental assisting, having started her career during her senior year at Wasilla High School in 1988. Two years later she went on to receive her CDA at SCC in Spokane, WA and additional certifications at Weber State
            University in Ogden, UT.
            Having moved around a bit in her younger years, she worked in Washington,
            Utah and Idaho before making her way back to Alaska and the Mat-Su Valley in 2002. Over the years she has continued to increase her knowledge, as techniques and materials have advanced, by attending CE courses and dental conferences online and around the US. As a highly skilled and compassionate dental assistant, Beth always strives to make your visit feel like you’re simply hanging out with friends.
            Beth has been happily married for 28 years and has two grown sons who are her pride and joy. Her oldest serves our community and our country as a local firefighter and an Army Guard medic and her youngest is a current college student studying special education and former college football player. When not in the office, Beth enjoys spending time with her family and pets in the outdoors, hiking, hunting and fishing. She is an active member in her church, teaching Sunday school to 14-15 year old's and volunteering for projects in the community. Her passion is travel and she hopes to do much more of it once she retires.`,
        img: [
            { src: "./src/images/team/beth-assistant/beth.jpg", alt: "Beth" }
        ]
    },
    {
        id: "assistant-2",
        name: "Shania", 
        role: "Dental Assistant",
        description: `More about Shania coming soon!`,
        img: [
            { src: "./src/images/team/shania-assistant/butterfly.png", alt: "Shania" }
        ]
    }
]

let autoTimer = null;

// TEAM MEMBER MODAL CONTENT
registerModal("teamModal", (container) => {
    container.innerHTML = `
        <span class="close-modal" aria-label="Close Modal">&times;</span>
        <div class="team-modal-content">
            <img src="" alt="Team Member Photo" class="team-member-photo">
            <h2 class="team-member-name"></h2>
            <h3 class="team-member-role"></h3>
            <div class=team-member-description></div>
        </div>
        <div class="carousel">
            <button class="car-btn prev" aria-label="Previous slide">❮</button>

            <div class="carousel-window">
                <div class="carousel-track"></div>
            </div>

            <button class="car-btn next" aria-label="Next slide">❯</button>
        </div>

        <div class="carousel-dots"></div>
    `;

    const memberName = container.querySelector(".team-member-name");
    const memberRole = container.querySelector(".team-member-role");
    const memberDescription = container.querySelector(".team-member-description");
    const track = container.querySelector(".carousel-track");
    const dotsContainer = container.querySelector(".carousel-dots");
    const prevButton = container.querySelector(".prev");
    const nextButton = container.querySelector(".next");
    const carousel = container.querySelector(".carousel");

    // let autoTimer = null;
    let currentMember = null;
    let currentImageIndex = 0;

    const cWindow = container.querySelector(".carousel-window");
    const AUTOPLAY_MS = 2000;

    // FUNCTION TO SHOW IMAGES
    function showImage(index) {
        const slides = track.querySelectorAll(".carousel-slide");
        if (!slides.length) return;

        // wrap around logic
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        currentImageIndex = index;

        const w = cWindow.clientWidth;
        track.style.transform = `translateX(${-index * w}px)`;
        // const offset = index * -100;
        // track.style.transform = `translateX(${offset}%)`;

        // update dots
        dotsContainer.querySelectorAll("button").forEach((dot, ind) => {
            dot.classList.toggle("active", ind === index);
        });
    }

    // LOAD TEAM MEMBER DATA INTO MODAL
    function loadMember(member) {
        currentMember = member;
        memberName.textContent = member.name;
        memberRole.textContent = member.role;
        memberDescription.innerHTML = member.description.replace(/\n/g, "<br>");

        // clear old slides and dots
        track.innerHTML = "";
        dotsContainer.innerHTML = "";

        // add new slides 
        member.img.forEach((img, index) => {
            const slide = document.createElement("div");
            slide.classList.add("carousel-slide");
            // slide.style.minWidth = "100%";

            const image = document.createElement("img");
            image.src = img.src;
            image.alt = img.alt;




            // TEMPORARY TO FIGURE OUT IMAGE ISSUES
            image.addEventListener('error', () =>
            console.error('IMG ERROR:', image.currentSrc || image.src)
            );
            image.addEventListener('load', () =>
            console.log('IMG LOADED:', image.currentSrc || image.src, image.naturalWidth + 'x' + image.naturalHeight)
            );





            slide.appendChild(image);
            track.appendChild(slide);

            // create dots
            const dot = document.createElement("button");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");
            dot.addEventListener("click", () => showImage(index));
            dotsContainer.appendChild(dot);
        });

        currentImageIndex = 0;
        // track.style.width = `${member.img.length * 100}%`;
        showImage(0);
    }

    // buttons
    prevButton.addEventListener("click", () => {
        showImage(currentImageIndex - 1)
        startAutoplay();
    });
    nextButton.addEventListener("click", () => {
        showImage(currentImageIndex + 1)
        startAutoplay();
    });

    container.loadMember = loadMember;

    //  AUTOPLAY FUNCTION
    function startAutoplay() {
        // respect user accessibility preferences
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        stopAutoplay();

        // don't autoplay if there's only one image
        const slides = track.querySelectorAll(".carousel-slide");
        if (slides.length <= 1) return;

        autoTimer = setInterval(() => {
            showImage(currentImageIndex + 1);
        }, AUTOPLAY_MS);
    }

    // stop autoplay
    function stopAutoplay() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }

    // pause when modal is closed
    document.addEventListener("visibilitychange", () => {
        const modal = document.getElementById("teamModal");
        if (!modal.classList.contains("visible")) return;

        const container = modal.querySelector(".modal-content");
        if (!container || !container.startAutoplay || !container.stopAutoplay) return;

        if (document.hidden) container.stopAutoplay(); 
        else container.startAutoplay();
    });


    // pause autoplay on hover/focus
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", startAutoplay);

    container.startAutoplay = startAutoplay;
    container.stopAutoplay = stopAutoplay;

    return () => {
        stopAutoplay();
        currentMember = null;
        track.innerHTML = "";
        dotsContainer.innerHTML = "";
    };
});

// EVENT LISTENERS FOR TEAM MEMBER MODAL BUTTONS
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("teamModal");
    const modalContent = modal?.querySelector(".modal-content");

    document.querySelectorAll(".modal-button").forEach(button => {
        button.addEventListener("click", () => {

            const modalId = button.dataset.modal;
            const member = teamMembers.find(m => m.id === modalId);

            if (member) {
                toggleModal("teamModal", true);
                modalContent.loadMember(member);
            } else {
                console.error(`No team member found with id: ${modalId}`);
            }
        });
    });
});