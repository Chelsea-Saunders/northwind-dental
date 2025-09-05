const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
const PLACE_ID = "ChIJwe5_PITgyFYR31cJup3wyn0";

// function to load maps JS API & Places Library
function loadMaps() {
    return new Promise((resolve) => {
        if (window.google?.maps?.importLibrary) return resolve();
        window.initPlaces = () => resolve();
        
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initPlaces&loading=async`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    });
}

async function getPlaceDetails(placeId) {
    await loadMaps();
    const { Place } = await google.maps.importLibrary("places");

    const place = new Place({ id: placeId });
    await place.fetchFields({
        fields: [
            "displayName", 
            "rating", 
            "userRatingCount", 
            "reviews"
        ]
    });
    return place;
}

function renderReviews(place, container) {
    const name = place.displayName?.text ?? place.displayName ?? "Our Office";
    const rating = place.rating ?? "N/A";
    const count = place.userRatingCount ?? 0;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query_place_id=${PLACE_ID}`;
    const reviews = Array.isArray(place.reviews) ? place.reviews.slice(0, 3) : [];

    container.innerHTML = `
        <h3>${name}</h3>
        <p>⭐ ${rating} (${count} reviews)</p>
        ${
            reviews.length
                ? `<ul>
                    ${reviews.map(r => `
                        <li>
                            <strong>${r.authorAttribution?.displayName ?? "Anonymous"}</strong><br>
                            "${r.text?.text ?? r.text ?? ""}"
                            ${r.rating ? `<div>Rating: ${r.rating}</div>` : ""}
                            ${r.relativePublishTimeDescription ? `<div>${r.relativePublishTimeDescription}</div>` : ""}
                        </li>
                    `).join("")}
                </ul>`
                : `<p>No public Google reviews available yet.</p>`
            }
            <p><a href ="${mapsUrl}" target="_blank" rel="noopener">View on Google</a></p>
    `;
}

let reviewsLoaded = false;
export async function initReviews() {
    const container = document.getElementById("reviews-container");
    if (!container || reviewsLoaded) return;
    reviewsLoaded = true;

    container.innerHTML = "<p>Loading reviews...</p>";
    try {
        const place = await getPlaceDetails(PLACE_ID);
        renderReviews(place, container);
    } catch (e) {
        console.error(e);
        container.innerHTML = `<p class="error">Couldn't load reviews (${e}).</p>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document
        .querySelectorAll('[data-modal="google-reviews-modal"]')
        .forEach(button => button.addEventListener("click", initReviews, { once: true }));
});