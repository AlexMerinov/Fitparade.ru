const scrollParallax = (current: any) => {
    let speed = 0.5;
    let dir = 'up';

    let scrollTop = window.scrollY;
    let wintop = window.scrollY;
    let currtop = 0;

    if (current.getAttribute('data-prlx')) {
        speed = current.getAttribute('data-prlx');
    }

    if (current.getAttribute('data-direction')) {
        dir = current.getAttribute('data-direction');
    }

    const currentResetTop = () => {
        // eslint-disable-next-line no-param-reassign
        current.style.transform = 'translate3d(0,0,0)';
        currtop = current.getBoundingClientRect().top + wintop;
        current.setAttribute('data-top', currtop);
    };

    currentResetTop();

    window.addEventListener('resize', () => {
        currentResetTop();
    });

    window.addEventListener('load', () => {
        currentResetTop();
    });

    const make = () => {
        scrollTop = window.scrollY;
        wintop = window.scrollY;
        currtop = current.getAttribute('data-top');
        const delta = (wintop - currtop) * speed;
        // eslint-disable-next-line no-param-reassign
        current.style.transform = `translate3d(0,${delta}px,0)`;
        window.requestAnimationFrame(make);
    };
    // @ts-ignore
    if (window.requestAnimationFrame()) {
        make();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const jsprlx = document.querySelectorAll('[data-prlx]');
    jsprlx.forEach((item, index) => {
        scrollParallax(item);
    });
});
