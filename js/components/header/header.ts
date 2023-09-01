const fHeader = () => {
    const wintop = window.scrollY;
    const header = document.querySelector('.header');
    if (typeof header !== 'undefined' && header != null) {
        if (
            !document.body.classList.contains('modal-show') &&
            !document.body.classList.contains('menu-show')
        ) {
            if (wintop > 20) {
                header.classList.add('header--fixed');
            } else {
                header.classList.remove('header--fixed');
            }
        }
    }
};

const f100vh = () => {
    const bodyHeight = document.body.offsetHeight;
    document.body.style.setProperty('--vh-100', `${bodyHeight}px`);
};

document.addEventListener('DOMContentLoaded', () => {
    fHeader();
    f100vh();
});

window.addEventListener('resize', () => {
    fHeader();
    f100vh();
});

window.addEventListener('load', () => {
    fHeader();
    f100vh();
});

window.addEventListener('scroll', () => {
    fHeader();
});
