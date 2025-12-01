import { onModalClose, initReviews, resetReviews } from "./reviews.mjs";

const focusableSelectors = 
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const registry = new Map();
const modalStack = [];

export function registerModal(modalId, builder) {
    registry.set(modalId, builder);
}

/**
* @param {string} modalId
* @param {(container:HTMLElement) => (void|function)} builder
*/

// TOGGLE MODALS
export function toggleModal (modalId, show = true, opts = {}) {
    const asChild = opts?.asChild ?? false;
    const modal = document.getElementById(modalId);
    if (!modal) return;

    if (show) {
        // if opening a child modal, hide parent but keep on stack
        const parentId = modalStack[modalStack.length - 1];
        if (asChild && parentId) {
            const parent = document.getElementById(parentId);
            if (parent && !parent.classList.contains("hidden")) {
                // hide parent but keep on stack
                untrapFocus(parent);
                parent.classList.add("hidden");
                parent.setAttribute("aria-hidden", "true");
            }
        }

        // Open modal
        modal._lastActiveElement = document.activeElement;

        const builder = registry.get(modalId);
        if (builder) {
            const container = modal.querySelector(".modal-content");
            if (container && container.innerHTML.trim() === "") {
                const cleanup = builder(container);
                modal._cleanup = cleanup;
            }
        }

        // current modal
        modal._lastActiveElement = document.activeElement;
        modal.classList.remove("hidden");
        modal.removeAttribute("inert");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        modal.setAttribute("tabindex", "-1");
        modal.focus();
        trapFocus(modal);

        // push to stack
        if (modalStack[modalStack.length -1] !== modalId) {
            modalStack.push(modalId);
            if (modalStack.length === 1) {
                getEscape?.();
            }
        }

        // page specific init
        if (modalId === "google-reviews-modal") {
            initReviews();
        }

    } else {
        // Close modal
        untrapFocus(modal);
        modal.querySelectorAll("*").forEach(element => element.blur());
        modal.setAttribute("inert", "");
        modal.setAttribute("aria-hidden", "true");
        modal.classList.add("hidden");

        // run cleanup if it exists
        if (typeof modal._cleanup === "function") {
            modal._cleanup();
            modal._cleanup = null;
        }

        // reset only for reviews modal
        if (modalId === "google-reviews-modal") {
            onModalClose(); // clears map DOM / class
            resetReviews(); // allows re-init on next open
        }

        while (modalStack.length && modalStack[modalStack.length - 1] !== modalId) {
            modalStack.pop();
        }
        if (modalStack.length && modalStack[modalStack.length - 1] === modalId) {
            modalStack.pop();
        }

        // restore the parent element if there was one hidden
        const parentId = modalStack[modalStack.length -1];
        if (parentId) {
            const parent = document.getElementById(parentId);
            if (parent) {
                parent.classList.remove("hidden");
                parent.setAttribute("aria-hidden", "false");
                // resotre focus where user left off on parent element
                (parent._lastActiveElement || parent).focus();
                trapFocus(parent);
            }
        } else {
            // no more modals open
            document.body.classList.remove("modal-open");
            releaseEscape?.();
            if (modal._lastActiveElement) {
                modal._lastActiveElement.focus();
                modal._lastActiveElement = null;
            }
        }
    }
}

//close modal after delay and reload the page
export function closeAndReload(modalId, delayMs = 1000) {
    setTimeout(() => {
        toggleModal(modalId, false);
        // incase anything goes wrong, make sure scroll is restored
        document.body.classList.remove("modal-open");
        setTimeout(() => {
            window.location.reload();
        }, 150);
    }, delayMs);
}

// focusable elements within a modal
function getFocusable(container) {
    return [...container.querySelectorAll(focusableSelectors)]
        .filter(element => !element.disabled && element.offsetParent !== null);
}

// closing modals 
function closeTopmostModal() {
    const openModals = [...document.querySelectorAll(".modal:not(.hidden)")];
    if (!openModals.length) return;
    const top = openModals[openModals.length - 1];
    toggleModal(top.id, false);
}

// close with escape key
const escapeHandler = (event) => {
    const k = event.key || event.code;
    if (k === "Escape" || k === "Esc") {
        // prevent whatever is trying to swallow it so it'll close
        event.stopPropagation();
        event.preventDefault();
        closeTopmostModal();
    }
};

let _escCount = 0;
function getEscape() {
    if (_escCount === 0) {
        document.addEventListener("keydown", escapeHandler, true); // capture phase
    }
    _escCount++;
}
function releaseEscape() {
    _escCount = Math.max(0, _escCount - 1);
    if (_escCount === 0) {
        document.removeEventListener("keydown", escapeHandler, true);
    }
}

function trapFocus(modal) {
    let elements = [...modal.querySelectorAll(focusableSelectors)]
        .filter(element => !element.disabled && element.offsetParent !== null);
    
    if (!elements.length) {
        modal.setAttribute("tabindex", "-1");
        modal.focus();
    } else {
        elements[0].focus();
    }

    function onKeydown(event) {
        if (event.key !== "Tab") return;

        elements = getFocusable(modal);
        if (elements.length === 0) {
            // nothing to focus/trap
            modal.setAttribute("tabindex", "-1");
            modal.focus();
            event.preventDefault();
            return;
        }


        const first = elements[0];
        const last = elements[elements.length - 1];

        // focus issue on services page see if fixes

        if (event.shiftKey) {
            if (document.activeElement === first || document.activeElement === modal) {
                event.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    }
    modal._trapHandler = onKeydown;
    modal.addEventListener("keydown", onKeydown);
}
function untrapFocus(modal) {
    if (modal._trapHandler) {
        modal.removeEventListener("keydown", modal._trapHandler);
        modal._trapHandler = null;
    }
}

// CLOSE (X BUTTON OR EXCAPE KEY)
document.addEventListener("click", (event) => {
    // X buttons
    if (event.target.closest(".close-modal")) {
        const modal = event.target.closest(".modal");
        if (modal) closeModalAndReset(modal);
        return;
    }
});

function closeModalAndReset(modal) {
    // restore focus to the opener button
    if (modal._returnTo) {
        modal._returnTo.setAttribute("aria-expanded", "false");
        modal._returnTo.focus?.();
    }
    toggleModal(modal.id, false);
    modal._returnTo = null;
}

// document.addEventListener("keydown", escapeHandler, { capture: true });

document.addEventListener("click", (event) => {
    const opener = event.target.closest("[data-modal], [data-open-modal]");
    if (!opener) return;
    const id = opener.getAttribute("data-modal") || opener.getAttribute("data-open-modal");
    if (!id) return;

    if (opener.tagName === "A") event.preventDefault();
    opener.setAttribute("aria-expanded", "true");

    const inModal = !!opener.closest(".modal:not(.hidden)");
    toggleModal(id, true, { asChild: inModal });
});