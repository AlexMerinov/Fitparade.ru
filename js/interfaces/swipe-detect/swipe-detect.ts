export default function detectSwipe(block: any, direction: any) {
    const pageWidth = window.innerWidth || document.body.clientWidth;
    const treshold = Math.max(1, Math.floor(0.01 * pageWidth));

    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;
    const limit = Math.tan((45 / 180) * Math.PI);
    const swipeBlock = document.querySelector(block);

    const swipeDir = (ev: any) => {
        let swipe;
        const x = touchendX - touchstartX;
        const y = touchendY - touchstartY;
        const xy = Math.abs(x / y);
        const yx = Math.abs(y / x);

        if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
            if (yx <= limit && (direction === 'x' || direction === 'xy')) {
                if (x < 0) {
                    swipe = 'left';
                } else {
                    swipe = 'right';
                }
            }
            if (xy <= limit && (direction === 'y' || direction === 'xy')) {
                if (y < 0) {
                    swipe = 'top';
                } else {
                    swipe = 'bottom';
                }
            }
        } else {
            swipe = 'tap';
        }

        swipeBlock.classList.remove(
            'swipe-left',
            'swipe-right',
            'swipe-top',
            'swipe-bottom'
        );

        if (ev) {
            swipeBlock.dispatchEvent(
                new CustomEvent('swipe', {
                    detail: {
                        swipe,
                    },
                }),
                false
            );
        } else {
            swipeBlock.classList.add(`swipe-${swipe}`);
        }
    };

    swipeBlock?.addEventListener(
        'touchstart',
        (e: any) => {
            touchstartX = e.changedTouches[0].screenX;
            touchstartY = e.changedTouches[0].screenY;
        },
        false
    );

    swipeBlock?.addEventListener(
        'touchmove',
        (e: any) => {
            touchendX = e.changedTouches[0].screenX;
            touchendY = e.changedTouches[0].screenY;

            swipeDir(false);
        },
        false
    );

    swipeBlock?.addEventListener(
        'touchend',
        (e: any) => {
            touchendX = e.changedTouches[0].screenX;
            touchendY = e.changedTouches[0].screenY;

            swipeDir(true);
        },
        false
    );
}
