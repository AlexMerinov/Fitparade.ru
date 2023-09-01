import { animate, circ, makeEaseOut } from './animate';

export default function ScrollToAnchor(blockid: any, blocksep: any) {
    const header = document.querySelector('.header');
    const wintop = window.scrollY;
    const thisblock = document.querySelector(blockid);

    if (typeof blocksep === 'undefined' || blocksep == null) {
        // eslint-disable-next-line no-param-reassign
        blocksep = 0;
    }
    if (typeof header !== 'undefined' && header != null) {
        // eslint-disable-next-line no-param-reassign
        blocksep += (<HTMLElement>header).offsetHeight;
    }
    if (typeof thisblock !== 'undefined' && thisblock != null) {
        let thisblocktop =
            thisblock.getBoundingClientRect().top + wintop - blocksep;

        if (thisblocktop < 0) {
            thisblocktop = 0;
        }
        // @ts-ignore
        animate({
            duration: 700,
            timing: makeEaseOut(circ),
            draw(progress: any) {
                const scrollto = (thisblocktop - wintop) * progress + wintop;
                window.scrollTo(0, scrollto);
            },
        });
    }
}
