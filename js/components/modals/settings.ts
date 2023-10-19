let winTop = 0;

const defaultSettings = {
    onShow: (modal: any) => {
        winTop = window.scrollY;
        document.body.classList.add('modal-show');
        document.body.style.top = `-${winTop}px`;
        document.body.style.setProperty('--wintop', `${winTop}px`);
    },
    onClose: (modal: any) => {
        document.body.classList.remove('modal-show');
        document.querySelector('html')?.classList.add('scroll-smooth-disabled');
        window.scroll(0, winTop);
        document
            .querySelector('html')
            ?.classList.remove('scroll-smooth-disabled');
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('--wintop');
    },
    awaitCloseAnimation: true,
    disableFocus: true,
    disableScroll: false,
};

export default defaultSettings;
