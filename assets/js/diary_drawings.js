const strip = document.querySelector(".strip");
const scrollHint = document.querySelector(".scroll-hint");

function setStripSpacing() {
    const images = strip.querySelectorAll(".image-panel img");

    const firstWidth = Math.max(0, (strip.clientWidth - images[0].getBoundingClientRect().width) / 3);
    strip.style.setProperty("--first-spacer-width", `${firstWidth}px`);

    const secondWidth = strip.clientWidth - images[0].getBoundingClientRect().width - firstWidth;
    strip.style.setProperty("--second-spacer-width", `${secondWidth}px`);

    const endWidth = Math.max(0, (strip.clientWidth - images[images.length - 1].getBoundingClientRect().width) / 2);
    strip.style.setProperty("--end-spacer-width", `${endWidth}px`);    
}

function updateScrollHint() {
    const isMobile = window.matchMedia("(max-width: 800px)").matches;

    if (isMobile) {
        const firstImagePanel = document.querySelector(".image-panel");

        if (!firstImagePanel) return;

        const stillOnFirstPanel =
            strip.scrollLeft < firstImagePanel.offsetWidth / 2;

        if (stillOnFirstPanel) {
            scrollHint.classList.remove("hidden");
        } else {
            scrollHint.classList.add("hidden");
        }

        return;
    }

    const hasScrolled = strip.scrollLeft > 10;
    const atEnd = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 2;

    if (hasScrolled || atEnd) {
        scrollHint.classList.add("hidden");
    } else {
        scrollHint.classList.remove("hidden");
    }
}

window.addEventListener("load", () => {
    setStripSpacing();
    strip.style.visibility = "visible";
    updateScrollHint();
});

window.addEventListener("resize", () => {
    setStripSpacing();
    updateScrollHint();
});

strip.addEventListener("scroll", updateScrollHint);
