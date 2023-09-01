import setCookie from './cookie-set';

export default function deleteCookie(name: any) {
    setCookie(name, '', { expires: -1 });
}
