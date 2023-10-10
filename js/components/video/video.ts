document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.js-video-link');
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const yId = link.getAttribute('data-youtube-id');
            let iframe = link.querySelector('iframe');
            const src = `https://www.youtube.com/embed/${yId}?autoplay=1`;
            if (iframe !== null && iframe !== undefined) {
                iframe.src = src;
            } else {
                iframe = document.createElement('iframe');
                iframe.src = src;
                iframe.setAttribute(
                    'allow',
                    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                );
                iframe.setAttribute('allowfullscreen', 'allowfullscreen');
                link.appendChild(iframe);
            }
        });
    });
});
