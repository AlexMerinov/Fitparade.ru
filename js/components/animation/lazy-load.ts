const observerCallback = (entries: any, observer: any) => {
    entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
            const image = entry.target;

            if (image.getAttribute('data-src')) {
                const src = image.getAttribute('data-src');
                image.src = src;

                const img = new Image();
                img.src = src;

                img.addEventListener('load', () => {
                    image.classList.add('img-loaded');
                });
            }

            if (image.getAttribute('data-src-bg')) {
                const src = image.getAttribute('data-src-bg');
                image.style.backgroundImage = `url('${src}')`;

                const img = new Image();
                img.src = src;

                img.addEventListener('load', () => {
                    image.classList.add('img-loaded');
                });
            }
        }
    });
};

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

const images = document.querySelectorAll('[data-src],[data-src-bg]');
images.forEach((el) => observer.observe(el));

// document.addEventListener('lazyload',()=>{
//     const images = document.querySelectorAll('[data-src],[data-src-bg]');
//     images.forEach((el) => observer.observe(el));
// });
