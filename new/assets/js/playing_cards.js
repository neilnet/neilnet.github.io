const strip = document.querySelector(".strip");
const trigger = document.querySelector(".caption-trigger");
const caption = document.querySelector(".caption");

function setEndSpacerWidth() {
    const images = strip.querySelectorAll(".image-panel img");
    const endWidth = Math.max(0, (strip.clientWidth - images[images.length - 1].getBoundingClientRect().width) / 2);
    strip.style.setProperty("--end-spacer-width", `${endWidth}px`);    
}

window.addEventListener("load", setEndSpacerWidth);
window.addEventListener("resize", setEndSpacerWidth);

strip.addEventListener("scroll", () => {
    const rect = trigger.getBoundingClientRect();

    const stripRect = strip.getBoundingClientRect();
    const stripCenter = stripRect.left + stripRect.width / 2;

    if (rect.left <= stripCenter) {
        caption.style.opacity = "";
        caption.classList.add("visible");
    } else {
        caption.classList.remove("visible");
    }
});
