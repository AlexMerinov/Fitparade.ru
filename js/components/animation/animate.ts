export function animate(timing: any, draw: any, duration: any) {
    const start = performance.now();

    // eslint-disable-next-line @typescript-eslint/no-shadow
    requestAnimationFrame(function animate(time) {
        // timeFraction goes from 0 to 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // calculate the current animation state
        const progress = timing(timeFraction);

        draw(progress); // draw it

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

export function makeEaseOut(timing: any) {
    return function (timeFraction: any) {
        return 1 - timing(1 - timeFraction);
    };
}

export function makeEaseInOut(timing: any) {
    return function (timeFraction: any) {
        if (timeFraction < 0.5) return timing(2 * timeFraction) / 2;
        return (2 - timing(2 * (1 - timeFraction))) / 2;
    };
}

export function circ(timeFraction: any) {
    return 1 - Math.sin(Math.acos(timeFraction));
}
