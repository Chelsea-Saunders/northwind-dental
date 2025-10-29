
// print: try embedded PDF on this page; fallback to window.print() if not
document.addEventListener("click", (event) => {
    const printBtn = event.target.closest(".print-pdf");
    if (!printBtn) return;

    // look for an embedded PDF element on the page
    const frame = document.getElementById("pdf-frame") || document.querySelector(".pdf-container iframe");

    try {
        if (frame?.contentWindow?.print) {
            frame.contentWindow.focus();
            frame.contentWindow.print();
        } else {
            window.print();
        }
    } catch (error) {
        const src = frame?.getAttribute("src");
        if (src) {
            const w = window.open(src, "_blank", "noopener");
            if (w) {
                // try to trigger print shortly after open 
            setTimeout(() => {
                try { w?.print(); } catch {}
              }, 700);
            } else {
                window.print();
            }
        } else {
            window.print();
        }
    }
});

// pdf-close button
document.addEventListener("DOMContentLoaded", () => {
    const closePdf = document.querySelector(".close-pdf");
    if (!closePdf) return;

    closePdf.addEventListener("click", () => {
        const ref = document.referrer;
        const sameLocation = ref && new URL(ref).origin == location.origin;
        if (sameLocation && history.length > 1) {
            history.back();
        } else {
            location.href = "/";
        }
    });
});