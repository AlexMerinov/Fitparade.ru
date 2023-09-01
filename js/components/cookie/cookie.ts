import { closeModal, openModal } from '@js/components/modals/utils';
import getCookie from '@js/components/cookie/cookie-get';
import deleteCookie from '@js/components/cookie/cookie-del';
import setCookie from '@js/components/cookie/cookie-set';

document.addEventListener('DOMContentLoaded', () => {
    const cookieName = 'site-cookies-agree';
    const cookiesAgree = getCookie(cookieName);
    if (!cookiesAgree) {
        const modal = document.getElementById('modal-cookie');
        if (modal !== null && modal !== undefined) {
            setTimeout(() => {
                openModal('modal-cookie');
            }, 1000);
            const btn = modal.querySelector('.btn');
            btn?.addEventListener('click', (e) => {
                e.preventDefault();
                const cookieDate = new Date();
                cookieDate.setDate(cookieDate.getDate() + 180);
                const cookieDateAgree = cookieDate.toUTCString();
                deleteCookie(cookieName);
                setCookie(cookieName, 'agree', {
                    path: '/',
                    expires: cookieDateAgree,
                });
                closeModal();
            });
        }
    }
});
