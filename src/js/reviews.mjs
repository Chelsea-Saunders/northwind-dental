
// const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
const PLACE_ID = "ChIJwe5_PITgyFYR31cJup3wyn0";

let mapsLoad;
let mapInitialized = false;
let reviewsLoaded = false;

export function resetReviews() {
    reviewsLoaded = false;
}

// retrieve google reviews with api
// async function fetchPlaceDetails(
//     placeId, 
//     fields = "name,rating,user_ratings_total,reviews,formatted_address,geometry,website"
// ) {
//     const url = `/backend/config.php?place_id=${encodeURIComponent(placeId)}&fields=${encodeURIComponent(fields)}`;
//     const res = await fetch(url, { credentials: "omit" });
//     if(!res.ok) throw new Error("places proxy request failed");
//     return res.json();
// }
// TEMP: log raw proxy response to find the non-JSON text
async function fetchPlaceDetails(
  placeId,
  fields = "name,rating,user_ratings_total,reviews,formatted_address,geometry,website"
) {
  const url = `/backend/config.php?place_id=${encodeURIComponent(placeId)}&fields=${encodeURIComponent(fields)}`;
  const res = await fetch(url, { credentials: "omit" });
  if (!res.ok) throw new Error(`places proxy request failed (${res.status})`);

  const data = await res.json();
  if (data.status && data.status !== "OK") {
    throw new Error(data.error_message || data.status);
  }
  return data; // <— back to this
}



// function to load maps JS API & Places Library
function loadMaps() {
    if (mapsLoad) return mapsLoad;

    mapsLoad = new Promise((resolve, reject) => {
        // if already loaded, resolve immediately
        if (window.google?.maps?.importLibrary) {
            resolve();
            return;
        }

        const key = document.querySelector('meta[name="google-maps-key"]')?.content;
        if (!key) {
            reject(new Error("Missing Google Maps key (meta[name='google-maps-key'])."));
            return;
        }

        window.initPlaces = () => resolve();

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=places&callback=initPlaces&loading=async`;
        script.async = true;
        script.defer = true;
        script.onerror = () => reject(new Error("Failed to load Google Maps JS"));
        document.head.appendChild(script);
    });
    return mapsLoad;
}

async function getPlaceDetails(placeId) {
    const data = await fetchPlaceDetails(placeId);
        const r = data.result || {};

        // parse location with a toJSON() so initMap() keeps working
        let location = null;
        if (r.geometry?.location) {
            const lat = typeof r.geometry.location.lat === "function" ? r.geometry.location.lat() : r.geometry.location.lat;
            const lng = typeof r.geometry.location.lng === "function" ? r.geometry.location.lng() : r.geometry.location.lng;
            location = {
                lat, lng,
                toJSON() { return {lat, lng }; }
            };
        }

        // make reviews array usable in reviews
        const reviews = Array.isArray(r.reviews)
            ? r.reviews.map(rv => ({
                authorAttribution: { displayName: rv.author_name ?? rv.authorAttribution?.displayName ?? "Anonymous" }, 
                rating: rv.rating, 
                text: { text: rv.text ?? "" }, 
            relativePublishTimeDescription: rv.relative_time_description ?? rv.relativePublishTimeDescription ?? ""
            }))
        : [];

        return {
            displayName: {text: r.name ?? "" }, 
            rating: r.rating ?? 0,
            userRatingCount: r.user_ratings_total ?? 0, 
            formatted_address: r.formatted_address ?? "", 
            website: r.website ?? "",
            reviews, 
            location
        };
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
function waitForVisible(el, {timeout = 4000 } = {}) {
        return new Promise(resolve=>{
            const start = performance.now();
            const check = () => {
                const r = el.getBoundingClientRect();
                const cs = getComputedStyle(el);
                if (r.width > 0 && r.height > 0 && cs.display !== "none" && cs.visibility !== "hidden") {
                    resolve();
                } else if (performance.now() - start > timeout) {
                    resolve(); // timeout
                } else {
                    requestAnimationFrame(check);
                }
            };
            check();
        });
    }

async function initMap(place) {
    if (mapInitialized) return;

    const mount = document.getElementById("google-reviews-map");
    if (!mount) return;

    await loadMaps();

    await waitForVisible(mount);

    const [{ Map }, {AdvancedMarkerElement }] = await Promise.all([
        google.maps.importLibrary("maps"), 
        google.maps.importLibrary("marker"),
    ]);

    const center = place.location?.toJSON?.() || { lat: 61.581, lng: -149.441 };
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query_place_id=${PLACE_ID}`;

    const map = new Map(mount, {
        center, 
        zoom: 14, 
        mapId: "ba6791afb84dafcee85d5cbb",
        disableDefaultUI: true,
        gestureHandling: "greedy", 
        keyboardShortcuts: false,
    });

    const marker = new AdvancedMarkerElement({
        map, 
        position: center, 
        title: place?.displayName?.text ?? place?.displayName ?? "Our Location", 
    });

    const infoWind = new google.maps.InfoWindow({
        content: 
            `<strong>${place.displayName?.text ?? "Our Office"}</strong><br>` +
            `<a href="${mapsUrl}" target="_blank" rel="noopener">Directions</a>`,
    });
    marker.addListener("gmp-click", () => infoWind.open({ map, anchor: marker }));

    requestAnimationFrame(() => mount.classList.add("is-visible"));
    mapInitialized = true;
}

export async function initReviews() {
    const container = document.getElementById("reviews-container");
    if (!container || reviewsLoaded) return;
    reviewsLoaded = true;

    container.innerHTML = "<p>Loading reviews...</p>";

    try {
        const place = await getPlaceDetails(PLACE_ID);
        
        // initMap(place).catch(console.error);
        renderReviews(place, container);

        // only init map if there's a location
        if (place?.location) {
            await initMap(place).catch(console.error);
        }
    } catch (e) {
        console.error(e);
        container.innerHTML = `<p class="error">Couldn't load reviews (${e.message || e}).</p>`;
    }
}
// make map refresh when modal opens
export function onModalClose() {
    mapInitialized = false;
    const mount = document.getElementById("google-reviews-map");
    if (mount) {
        mount.classList.remove("is-visible");
        mount.innerHTML = "";
    }
}