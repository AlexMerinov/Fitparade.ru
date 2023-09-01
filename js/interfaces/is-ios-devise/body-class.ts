import { isIosDevice } from './is-ios-device';

document.addEventListener('DOMContentLoaded', () => {
    if (isIosDevice) {
        document.body.classList.add('touch-device');
    }
});
