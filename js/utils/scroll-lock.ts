const scrollLock = (lock: boolean): void => {
    const html = document.documentElement;
    if (lock) {
        html.classList.add('scroll-locked');
    } else {
        html.classList.remove('scroll-locked');
    }
};

export default scrollLock;
