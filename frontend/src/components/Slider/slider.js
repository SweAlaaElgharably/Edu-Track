import Flickity from 'flickity';

export function initFlickity() {
    const sliderEl = document.querySelector('.marquee-slider');
    if (!sliderEl) return null;

    // Before initializing Flickity, ensure enough cells to cover > 2x viewport
    // This prevents any visible gap when wrapping while animating quickly.
    if (!sliderEl.dataset.duped) {
        const originalCells = Array.from(sliderEl.children);
        // Measure current total width of cells
        const viewportWidth = sliderEl.clientWidth || window.innerWidth;
        const measure = (els) => els.reduce((acc, el) => acc + (el.getBoundingClientRect().width || el.offsetWidth || 0), 0);
        let totalWidth = measure(originalCells);

        // If styles aren't applied yet and width is 0, fall back to duplicating once optimistically
        if (!totalWidth && originalCells.length) {
            originalCells.forEach((el) => sliderEl.appendChild(el.cloneNode(true)));
            totalWidth = measure(Array.from(sliderEl.children));
        }

        // Duplicate until we have at least 3x viewport width of content (more coverage hides wrap)
        while (totalWidth && totalWidth < viewportWidth * 3) {
            originalCells.forEach((el) => {
                const clone = el.cloneNode(true);
                clone.classList.add('is-clone');
                sliderEl.appendChild(clone);
            });
            totalWidth *= 2;
        }

        // Mark so we don't duplicate again on hot reloads
        sliderEl.dataset.duped = '1';
    }

    // Destroy any existing instance to prevent errors on hot-reload
    if (sliderEl.flickity) {
        sliderEl.flickity.destroy();
    }

    const flickity = new Flickity(sliderEl, {
        accessibility: true,
        resize: true,
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false,
        percentPosition: true,
        setGallerySize: true,
        draggable: false, // Disable user dragging for a pure marquee effect
        cellAlign: 'left',
        contain: true,
    });

    flickity.x = 0; // Set initial position
    let requestId;

    // The animation function, identical in spirit to the CodePen example
    function play() {
        // Decrement the x position and settle with the current value.
        // Slightly faster speed per user request.
        flickity.x -= 1.2;
        flickity.settle(flickity.x);
        requestId = window.requestAnimationFrame(play);
    }

    function pause() {
        if (requestId) {
            window.cancelAnimationFrame(requestId);
            requestId = undefined;
        }
    }

    sliderEl.addEventListener('mouseenter', pause);
    sliderEl.addEventListener('mouseleave', play);

    play(); // Start the animation

    // Custom cleanup function for React's useEffect
    flickity.stop = () => {
        pause();
        sliderEl.removeEventListener('mouseenter', pause);
        sliderEl.removeEventListener('mouseleave', play);
    };

    // Store the instance on the element so we can destroy it later
    sliderEl.flickity = flickity;

    return flickity;
}