import lazyWidth from '~/function/lazyWidth';
import lazyText from '~/function/lazyText';
import style from "./Footer.module.css";
import { createEffect } from 'solid-js';
import { A } from 'solid-start';
import { setFiltreRef } from '~/root';

const Footer = () => {
    createEffect(() => {
        document.querySelectorAll('.lazyWidth').forEach(e => {
            lazyWidth(e as HTMLElement);
        });
        document.querySelectorAll('.lazyText').forEach(e => {
            lazyText(e as HTMLElement);
        });
    }, [])

    return (
        <footer>
            <div id={style.footerContent}>
                <div id={style.footerTop}>
                    <div class={`${style.footerZoneText} lazyText`}>
                        <A class={`${style.footerLink} ${style.footerLinkBlue}`} href='/#home'>
                            <h2 class={style.footerH1}>
                                ACCUEIL
                            </h2>
                        </A>
                        <A class={`${style.footerLink} ${style.footerLinkBlue}`} href='/#presentation'>
                            Présentation
                        </A>
                        <A class={`${style.footerLink} ${style.footerLinkBlue}`} href='/#activite'>
                            Domaines d&apos;activités
                        </A>
                        <A class={`${style.footerLink} ${style.footerLinkBlue}`} href='/#referenceGraphique'>
                            Références
                        </A>
                        <A class={`${style.footerLink} ${style.footerLinkBlue}`} href='/#contact'>
                            Contact
                        </A>
                    </div>
                    <div class={`${style.footerZoneText} lazyText`}>
                        <A class={`${style.footerLink} ${style.footerLinkBlue}`} href={`/design?filtreProps=0#homeRef`} onClick={() => setFiltreRef(0)}>
                            <h2 class={style.footerH1}>
                                DESIGN
                            </h2>
                        </A>
                        <A class={`${style.footerLink} ${style.footerLinkBlue}`} href={`/design?filtreProps=1#referencesSection`} onClick={() => setFiltreRef(1)}>
                            Identité visuelle
                        </A>
                        <A class={`${style.footerLink} ${style.footerLinkBlue}`} href={`/design?filtreProps=2#referencesSection`} onClick={() => setFiltreRef(2)}>
                            Packaging & étiquette
                        </A>
                        <A class={`${style.footerLink} ${style.footerLinkBlue}`} href={`/design?filtreProps=3#referencesSection`} onClick={() => setFiltreRef(3)}>
                            Site Internet
                        </A>
                        <A class={`${style.footerLink} ${style.footerLinkBlue}`} href={`/design?filtreProps=4#referencesSection`} onClick={() => setFiltreRef(4)}>
                            Design & mise en page
                        </A>
                    </div>
                    <div class={`${style.footerZoneText} lazyText`}>
                        <A class={`${style.footerLink} ${style.footerLinkRed}`} href={`/video?filtreProps=0#homeRef`} onClick={() => setFiltreRef(0)}>
                            <h2 class={style.footerH1}>
                                VIDÉO
                            </h2>
                        </A>
                        <A class={`${style.footerLink} ${style.footerLinkRed}`} href={`/video?filtreProps=1#referencesSection`} onClick={() => setFiltreRef(1)}>
                            Motion Design
                        </A>
                        <A class={`${style.footerLink} ${style.footerLinkRed}`} href={`/video?filtreProps=2#referencesSection`} onClick={() => setFiltreRef(2)}>
                            Effets spéciaux
                        </A>
                        <A class={`${style.footerLink} ${style.footerLinkRed}`} href={`/video?filtreProps=3#referencesSection`} onClick={() => setFiltreRef(3)}>
                            Incrustation
                        </A>
                        <A class={`${style.footerLink} ${style.footerLinkRed}`} href={`/video?filtreProps=4#referencesSection`} onClick={() => setFiltreRef(4)}>
                            Sound design
                        </A>
                    </div>
                    <div class={`${style.footerZoneText} lazyText`}>
                        <h2 class={style.footerH1}>
                            RÉSEAUX
                        </h2>
                        <a href="https://www.youtube.com/@set5730" class={`${style.footerLink} ${style.footerLinkRed}`}>
                            <svg height="15" width="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                                <path d="m12.19 1.88h-9.38c-1.54 0-2.81 1.26-2.81 2.81v5.62c0 1.55 1.27 2.81 2.81 2.81h9.37c1.55 0 2.81-1.27 2.81-2.81v-5.62c.01-1.55-1.26-2.81-2.8-2.81zm-6.57 9.37v-7.5l4.69 3.75z" />
                            </svg>
                            Youtube
                        </a>
                        <a href="https://www.instagram.com/_viisync_/" class={`${style.footerLink} ${style.footerLinkRed}`}>
                            <svg height="15" width="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                                <path d="m10.86 0h-6.72c-2.28 0-4.14 1.86-4.14 4.14v6.72c0 2.28 1.86 4.14 4.14 4.14h6.72c2.28 0 4.14-1.86 4.14-4.14v-6.72c0-2.28-1.86-4.14-4.14-4.14zm0 13.67h-6.72c-1.55 0-2.81-1.26-2.81-2.81v-6.72c0-1.55 1.26-2.81 2.81-2.81h6.72c1.55 0 2.81 1.26 2.81 2.81v6.72c0 1.55-1.26 2.81-2.81 2.81zm-3.36-10.13c-2.13 0-3.87 1.73-3.87 3.87 0 2.13 1.73 3.86 3.87 3.86 2.13 0 3.87-1.73 3.87-3.86 0-2.14-1.74-3.87-3.87-3.87zm0 6.4c-1.4 0-2.53-1.14-2.53-2.53 0-1.4 1.14-2.53 2.53-2.53s2.53 1.14 2.53 2.53-1.13 2.53-2.53 2.53zm4.72-7.25c.18.18.29.43.29.69s-.1.51-.29.69c-.18.18-.43.29-.69.29s-.51-.1-.69-.29c-.18-.18-.29-.43-.29-.69s.1-.51.29-.69c.18-.18.43-.29.69-.29.25.01.51.11.69.29z" />
                            </svg>
                            Instagram
                        </a>
                    </div>
                </div>
                <div id={style.separation} class='lazyWidth' />
                <div id={style.footerBottom}>
                    <p class='lazyText' style={{"text-align":'start'}}>© 2022 VIISync Tous droits réservés.</p>
                    <p class='lazyText'>
                        <A href='/mentions-legales' class={`${style.footerLink} ${style.footerLinkBlue}`}>Mentions Légales</A>
                        <A href='/politique-de-confidentialite' class={`${style.footerLink} ${style.footerLinkRed}`}>Politique de confidentialité</A>
                    </p>
                </div>
            </div>
        </footer >
    )
}

export default Footer