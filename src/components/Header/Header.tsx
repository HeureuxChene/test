import { createEffect, createSignal, onMount } from 'solid-js';
import { A, useLocation } from 'solid-start';
import style from './Header.module.css';
import { previousScroll } from '~/root';

export const [scrollDown, setScrollDown] = createSignal(0);
export const [positionUnderlink, setPositionUnderlink] = createSignal(0);
export const [positionReference, setPositionReference] = createSignal(0);

export default function Header() {

    const [hover, setHover] = createSignal(0);
    const [toggle, setToggle] = createSignal(false);

    const location = useLocation();

    console.log(location.pathname);

    createEffect(() => {
        if(location.pathname === '/mentions-legales' || location.pathname === '/politique-de-confidentialite'){
            setPositionUnderlink(0);
        };
    });

    return (
        <>
            <header class={`${style.header} ${previousScroll() > 0 || toggle() ? style.headerHover : undefined} ${scrollDown() && previousScroll() > 0 && !toggle() ? style.hiddenHeader : undefined}`}>
                <A href='/#home' target='_self'>
                    {/* <img id={style.logo} alt='logo' src={`/media/photo/${!topPage() || toggle() ? 'logoHeaderNoir' : 'logoHeaderBlanc'}.svg`} /> */}
                    <svg id={style.logo} xmlns="http://www.w3.org/2000/svg" style="enable-background:new 0 0 1458.2 1080" viewBox="260.7 236.91 936.8 606.19">
                        <path d="M856.8 289.8c37.9 37.9 55.4 88.3 52.6 137.9L718.8 237.2c49.6-2.8 100.1 14.7 138 52.6z" style="fill:#e30613" />
                        <path d="m718.8 237.2 190.5 190.5c-1.3 23.3-7.1 46.4-17.5 67.9L651 254.7c21.5-10.4 44.6-16.2 67.8-17.5z" style="fill:#c72924" />
                        <path d="m651 254.7 240.9 240.9c-8.6 17.9-20.3 34.7-35.1 49.5l-.3.3-255.4-255.3.3-.3c14.9-14.8 31.6-26.6 49.6-35.1z" style="fill:#a82422" />
                        <path d="m601.1 290.1 255.3 255.3c-15 14.9-32 26.7-50.1 35.3L565.8 340.2c8.6-18.1 20.4-35.1 35.3-50.1z" style="fill:#0059a6" />
                        <path d="m565.8 340.2 240.5 240.5c-21.6 10.2-44.8 15.9-68.2 17.1L548.8 408.4c1.1-23.4 6.8-46.6 17-68.2z" style="fill:#0077ae" />
                        <path d="m548.8 408.4 189.4 189.4c-49.2 2.5-99.2-15.1-136.7-52.7s-55.2-87.5-52.7-136.7z" style="fill:#00a3ca" />
                        <path id={style.logoText} d="m437 655-66.7 185.2h-42.9L260.7 655h50.2l29 90.5 8.4 43.9h.8l8.4-43.7 29.3-90.8H437zm12.3 185.5V655.3h46.8v185.2h-46.8zm76.1 0V655.3h46.8v185.2h-46.8zm138.4-97.9c30.3 6 63.3 18.3 60.7 54.7-2.1 29.8-31.9 45.8-62.3 45.8-22.8 0-47.1-8.9-61-29.8l6-2.6c12 17.3 33.7 26.2 55.5 26.2 25.6 0 51-12.3 54.7-39.5 2.4-33-26.4-42.1-55.2-48.4-27.7-5.8-61-16.2-59.4-51.3 1-30.6 30.1-45 59.6-45 23.8 0 46 8.4 57.6 28.5l-6 2.4c-9.7-16.7-30.9-24.6-51.5-24.6-26.2 0-51.3 11-53.1 38.7-2.1 27.4 24.6 38.9 54.4 44.9zm138.9 97.9V767l-63.3-111.7h7.8l58.9 104.4 60.7-104.4h8.1L809.3 767v73.5h-6.6zM1023 655.3h6.5v185.2h-11.2L909.7 663.6l-.3 176.8h-6.8V655.3h10.2L1023 834.2V655.3zm116.9-2.7c23.3 0 46.6 8.9 57.6 26.7l-5.8 4.2c-9.7-16-31.4-24.6-52.6-24.6-28.8 0-58.3 15.2-58.3 45.5v86.9c0 30.3 29.6 45.3 58.3 45.3 20.9 0 42.4-7.6 52.6-23.3l5.8 2.9c-11 17.8-34.8 26.9-58.3 26.9-32.2 0-64.9-17.5-64.9-51.8v-86.9c-.1-34 32.9-51.8 65.6-51.8z"
                            fill={`#${previousScroll() > 0 || toggle() || (positionReference() === 1 && location.pathname !== '/design') || (positionReference() === 2 && location.pathname !== '/video') || location.pathname === '/mentions-legales' || location.pathname === '/politique-de-confidentialite' ? '000' : 'fff'}`} />
                    </svg>
                </A>
                <nav onClick={() => setToggle(false)} class={`${style.nav} ${toggle() ? style.visibleMobile : style.invisibleMobile}`} style={(positionReference() === 1 && location.pathname !== '/design' && (useLocation().pathname + useLocation().hash) !== '/design/#topPage') || (positionReference() === 2 && location.pathname !== '/video' && (useLocation().pathname + useLocation().hash) !== '/video/#topPage') || location.pathname === '/mentions-legales' || location.pathname === '/politique-de-confidentialite' ? { color: '#000' } : {}}>
                    <div class={style.navColumn}>
                        <div class={style.linkContainer}>
                            <A class={`${style.link} ${style.linkRight} ${positionUnderlink() === 1 ? style.linkActive : hover() === 1 ? style.linkHover : style.linkInactive}`} href='/#presentation' onMouseEnter={() => setHover(1)} onMouseLeave={() => setHover(0)} target='_self'>
                                Présentation
                            </A>
                        </div>
                        <div class={style.linkContainer}>
                            <A class={`${style.link} ${style.linkRight} ${positionUnderlink() === 2 ? style.linkActive : hover() === 2 ? style.linkHover : style.linkInactive}`} href='/#activite' onMouseEnter={() => setHover(2)} onMouseLeave={() => setHover(0)} target='_self'>
                                Domaines d&apos;Activités
                            </A>
                        </div>
                    </div>
                    <div id={style.logoEmplacement} />
                    <div class={style.navColumn}>
                        <div class={style.linkContainer} onMouseEnter={() => setHover(3)} onMouseLeave={() => setHover(0)} onClick={() => setHover(0)}>
                            <A class={`${style.link} ${style.linkLeft} ${positionUnderlink() === 3 ? style.linkActive : hover() === 3 ? style.linkHover : style.linkInactive}`} href='/design' target='_self'>
                                Références
                            </A>
                            <div class={`${style.linkDropdown} ${hover() === 3 ? style.visible : style.invisible} ${previousScroll() > 0 ? style.headerHover : undefined}`}>
                                <A class={`${style.dropdownItem} ${positionReference() === 1 ? style.dropdownItemActive : style.dropdownItemInactive}`} href='/design' target='_self'>
                                    Design
                                </A>
                                <A class={`${style.dropdownItem} ${positionReference() === 2 ? style.dropdownItemActive : style.dropdownItemInactive}`} href='/video' target='_self'>
                                    Vidéo
                                </A>
                            </div>
                        </div>
                        <div class={style.linkContainer}>
                            <A class={`${style.link} ${style.linkLeft} ${positionUnderlink() === 4 ? style.linkActive : hover() === 4 ? style.linkHover : style.linkInactive}`} href='/#contact' onMouseEnter={() => setHover(4)} onMouseLeave={() => setHover(0)} target='_self'>
                                Contact & Devis
                            </A>
                        </div>
                    </div>
                </nav>
                <div id={style.humburger} onClick={() => setToggle(!toggle())}>
                    <div class={`${style.patteHumburger} ${toggle() ? style.patteHumburgerUn : undefined} ${previousScroll() <= 0 && !toggle() ? style.patteHumburgerWhite : undefined}`} />
                    <div class={`${style.patteHumburger} ${toggle() ? style.patteHumburgerDeux : undefined} ${previousScroll() <= 0 && !toggle() ? style.patteHumburgerWhite : undefined}`} />
                    <div class={`${style.patteHumburger} ${toggle() ? style.patteHumburgerTrois : undefined} ${previousScroll() <= 0 && !toggle() ? style.patteHumburgerWhite : undefined}`} />
                </div>
            </header>
            <div class={`${style.navFondBlur} ${toggle() ? style.visibleMobile : style.invisibleMobile}`} />
        </>
    )
}