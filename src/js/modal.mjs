
const focusableSelectors = 
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const registry = new Map();

export function registerModal(modalId, builder) {
    registry.set(modalId, builder);
}

/**
* @param {string} modalId
* @param {(container:HTMLElement) => (void|function)} builder
*/

export function registerModalBuilder(modalId, builder) {
    registry.set(modalId, builder);
}

// TOGGLE MODALS
export function toggleModal (modalId, show = true) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    if (show) {
        const builder = registry.get(modalId);
        if (builder) {
            const container = modal.querySelector(".modal-content");
            if (container && container.innerHTML.trim() === "") {
                const cleanup = builder(container);
                modal._cleanup = cleanup;
            }
        }

        modal.classList.remove("hidden");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        trapFocus(modal);
    } else {
        untrapFocus(modal);
        modal.classList.add("hidden");
        modal.setAttribute("aria-hidden", "true");
        // document.body.classList.remove("modal-open");

        if (typeof modal._cleanup === "function") {
            modal._cleanup();
            modal._cleanup = null;
        }
        // only close last opened modal
        const openedModal = document.querySelector(".modal:not(.hidden)");
        if (!openedModal) {
            document.body.classList.remove("modal-open");
        }
    }
}

function trapFocus(modal) {
    const elements = [...modal.querySelectorAll(focusableSelectors)]
        .filter(element => !element.disabled && element.offsetParent !== null);
    
    if (!elements.length) {
        modal.setAttribute("tabindex", "-1");
        modal.focus();
        return;
    }
    const first = elements[0];
    const last = elements[elements.length - 1];

    first?.focus();

    function onKeydown(event) {
        if (event.key !== "Tab") return;

        if (event.shiftKey) {
            if (document.activeElement === first) {
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

// CLOSE MODAL ON X OR ESCAPE
document.addEventListener("click",(event) => {
    if (event.target.classList?.contains("close-modal")) {
        const modal = event.target.closest(".modal");
        if (modal?.id) {
            toggleModal(modal.id, false);
        }
    }
});
// escape key to close modal
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal:not(.hidden)").forEach(modal => {
            toggleModal(modal.id, false);
        });
    }
});