document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector(".printable-forms");
    if (title) {
        requestAnimationFrame(() => title.classList.add("loaded"));
    }
});