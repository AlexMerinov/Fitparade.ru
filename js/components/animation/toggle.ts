let slideTimer;
let toggleFlag = true;

export function slideUp(target: any, duration: any) {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = `${duration}ms`;
    target.style.boxSizing = 'border-box';
    target.style.height = `${target.offsetHeight}px`;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.style.display = 'block';

    slideTimer = window.setTimeout(() => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, duration);
}

export function slideDown(target: any, duration: any) {
    target.style.removeProperty('display');
    let { display } = window.getComputedStyle(target);

    if (display === 'none') display = 'block';

    target.style.display = display;
    const height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${height}px`;
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');

    slideTimer = window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, duration);
}

// eslint-disable-next-line consistent-return
export function slideToggle(link: any, target: any, duration: any) {
    // clearTimeout(slideTimer);
    if (toggleFlag) {
        toggleFlag = false;
        setTimeout(() => {
            toggleFlag = true;
        }, duration);
        if (window.getComputedStyle(target).display === 'none') {
            link.classList.add('show');
            return slideDown(target, duration);
        }
        link.classList.remove('show');
        return slideUp(target, duration);
    }
}
