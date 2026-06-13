const captions = {
    "if_were_meeting_over_there": `
        <em>If we're meeting over there</em><br>
        Oil on canvas<br>
        30 × 48 inches
    `,
    "on_saturdays": `
        <em>On Saturdays</em><br>
        Oil on canvas<br>
        30 × 48 inches
    `,
    "to_fieldtrips": `
        <em>To fieldtrips</em><br>
        Oil on canvas<br>
        30 × 48 inches
    `,
    "neel_u": `
        <em>Neel(u)</em><br>
        Oil on canvas<br>
        38 × 51 inches
    `,
    "summer_evenings_in_the_grass": `
        <em>Summer evenings in the grass</em><br>
        Oil on canvas<br>
        30 × 48 inches
    `,
    "if_were_meeting_in_the_square": `
        <em>If we're meeting in the Square</em><br>
        Oil on canvas<br>
        30 × 48 inches
    `,
    "untitled_harry_bilfo_shmoo": `
        <em>Untitled (Harry Bilfo Shmoo)</em><br>
        Oil on canvas<br>
        30 × 48 inches
    `,
    "not_so_fun_parties": `
        <em>Not so fun parties</em><br>
        Oil on canvas<br>
        30 × 48 inches
    `,
    "on_first_days": `
        <em>On first days</em><br>
        Oil on canvas<br>
        30 × 48 inches
    `,
    "if_were_meeting_in_the_archway": `
        <em>If we're meeting in the archway</em><br>
        Oil on canvas<br>
        30 × 48 inches
    `,
    "on_rainy_days": `
        <em>On rainy days</em><br>
        Oil on canvas<br>
        30 × 48 inches
    `,
    "to_dinner_at_7_15": `
        <em>To dinner at 7:15</em><br>
        Oil on canvas<br>
        30 × 48 inches
    `,
    "to_dinner_at_5_00": `
        <em>To dinner at 5:00</em><br>
        Oil on canvas<br>
        30 × 48 inches
    `
};

document.querySelectorAll(".image-object").forEach((imageObject) => {
    const img = imageObject.querySelector("img");
    const captionId = img?.dataset.captionId;
    const imageCaption = imageObject.querySelector(".image-caption");

    if (!captionId || !imageCaption) return;

    imageCaption.innerHTML = captions[captionId] || "";
});

const strip = document.querySelector(".strip");
const sidebarCaption = document.querySelector(".caption");
const images = document.querySelectorAll(".strip img");
const textPanel = document.querySelector(".text-panel");
const scrollHint = document.querySelector(".scroll-hint");

function updateCaption() {
    const stripRect = strip.getBoundingClientRect();
    const stripCenter = stripRect.left + stripRect.width / 2;

    let closestImage = null;
    let closestDistance = Infinity;

    images.forEach((img) => {
        const rect = img.getBoundingClientRect();
        const imageCenter = rect.left + rect.width / 2;
        const distance = Math.abs(imageCenter - stripCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestImage = img;
        }
    });

    if (closestImage) {
        const captionId = closestImage.dataset.captionId;
        sidebarCaption.innerHTML = captions[captionId] || "";
        sidebarCaption.classList.add("visible");
    } else {
        sidebarCaption.classList.remove("visible");
    }
}

function updateScrollHint() {
    const isMobile = window.matchMedia("(max-width: 800px)").matches;

    if (isMobile) {
        const mobileTextPanel = document.querySelector(".mobile-text-panel");

        if (!mobileTextPanel) return;

        const pastTextPanel = strip.scrollLeft > mobileTextPanel.offsetWidth / 2;

        if (pastTextPanel) {
            scrollHint.classList.add("hidden");
        } else {
            scrollHint.classList.remove("hidden");
        }

        return;
    }

    const atEnd = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 2;

    if (atEnd) {
        scrollHint.classList.add("hidden");
    } else {
        scrollHint.classList.remove("hidden");
    }
}

textPanel.addEventListener("wheel", (event) => {
    event.preventDefault();

    const scrollAmount = Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    strip.scrollLeft += scrollAmount;

    updateCaption();
    updateScrollHint();    
}, { passive: false });

window.addEventListener("load", () => {
    updateCaption();
    updateScrollHint();
});

window.addEventListener("resize", () => {
    updateCaption();
    updateScrollHint();
});

strip.addEventListener("scroll", () => {
    updateCaption();
    updateScrollHint();
});

