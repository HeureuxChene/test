import { createEffect, createSignal, onCleanup, onMount, Setter } from 'solid-js';
import { useLocation } from '@solidjs/router';
import { A } from 'solid-start';
import Dropdown from '~/components/Dropdown/Dropdown';
import { setPositionUnderlink, setPositionReference } from '~/components/Header/Header';
import { screenWidth, setScreenWidth, filtreRef, setFiltreRef, tabletSize, setTabletSize } from '~/root';
import style from '~/References.module.css';
import media from '~/json/design.json';

export default function Design() {

    const location = useLocation();
    const filtreProps = parseInt(location.query.filtreProps);

    const [briqueFiltre, setBriqueFiltre] = createSignal([] as boolean[]);
    const [filtreTexte] = createSignal(['TOUT VOIR', 'IDENTITÉ VISUELLE', 'PACKAGING & ÉTIQUETTE', 'SITE INTERNET', 'DESIGN & MISE EN PAGE']);
    const [mobileSize, setMobileSize] = createSignal<boolean>();

    createEffect(() => {
        setFiltreRef(filtreProps);
    });

    createEffect(() => {
        setBriqueFiltre([] as boolean[]);
        let briqueFiltreTemp: boolean[] = [];
        Object.keys(media).map((key, index) => {
            for (let i = 0; i <= Object.keys((media as any)[key]["filtre"]).length + 1; i++) {
                if (filtreRef() === parseInt(Object.keys((media as any)[key]["filtre"])[i]) || filtreRef() === 0) {
                    briqueFiltreTemp.push(true);
                    break;
                };
            };
            if (!briqueFiltreTemp[index]) {
                briqueFiltreTemp.push(false);
            };
        });
        setBriqueFiltre(briqueFiltreTemp);
    })

    const numberOfVisibleBrique = (table: boolean[]) => {
        let numberOfVisibleBrique = 0;
        for (let item of table) {
            if (item === true) {
                numberOfVisibleBrique++;
            }
        }
        return numberOfVisibleBrique;
    }

    createEffect(() => {
        setMobileSize(screenWidth() < 600 ? true : false);
        setTabletSize(screenWidth() < 768 ? 1 : 0);
    })

    createEffect(() => {
        briqueFiltre();
        document.getElementById(style.referencesSection)!.style.animation = `${style.fadeIn} .4s ease-out normal`;
    })

    onMount(() => {
        setMobileSize(screenWidth() < 600 ? true : false);
        setPositionUnderlink(3);
        setPositionReference(1);
        if (!filtreProps) {
            setFiltreRef(0);
        };
        setScreenWidth(window.innerWidth);
        document.getElementById(style.referencesSection)!.addEventListener('animationend', () => document.getElementById(style.referencesSection)!.style.animation = '')
    })

    onCleanup(() => {
        setPositionReference(0);
    })

    return (
        <>
            <section id='homeRef' class={style.homeRef}>
                <video id={style.homeRefVideo} autoplay muted loop playsinline preload='auto' src={`/media/video/ref-design/design-accueil.mp4`} />
                <a href='#referencesSection' class='buttonfleche buttonSection'>
                    <svg height="15" width="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                        <path d="m5.52 0 7.91 7.5-7.91 7.5-1.95-1.95 5.83-5.55-5.83-5.55z" />
                    </svg>
                </a>
                <A href='/video' class={`${style.linkCatRef} ${style.linkRight}`}>
                    Vidéo
                    <svg height="20" width="20" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                        <path d="m5.52 0 7.91 7.5-7.91 7.5-1.95-1.95 5.83-5.55-5.83-5.55z" />
                    </svg>
                </A>
            </section>
            <div id={style.references}>
                <div id='referencesSection' class='anchor' />
                {
                    mobileSize() ?
                        <Dropdown valeurs={filtreTexte} valeur={filtreRef} setValeur={setFiltreRef as Setter<any>} />
                        :
                        <ul id={style.referencesListe}>
                            <li onClick={() => setFiltreRef(0)} class={`${style.referencesItem} ${filtreRef() == 0 ? style.sideLinkActive : style.sideLinkInactive}`}>
                                {filtreTexte()[0]}
                            </li>
                            <li onClick={() => setFiltreRef(1)} class={`${style.referencesItem} ${filtreRef() == 1 ? style.sideLinkActive : style.sideLinkInactive}`}>
                                {filtreTexte()[1]}
                            </li>
                            <li onClick={() => setFiltreRef(2)} class={`${style.referencesItem} ${filtreRef() == 2 ? style.sideLinkActive : style.sideLinkInactive}`}>
                                {filtreTexte()[2]}
                            </li>
                            <li onClick={() => setFiltreRef(3)} class={`${style.referencesItem} ${filtreRef() == 3 ? style.sideLinkActive : style.sideLinkInactive}`}>
                                {filtreTexte()[3]}
                            </li>
                            <li onClick={() => setFiltreRef(4)} class={`${style.referencesItem} ${filtreRef() == 4 ? style.sideLinkActive : style.sideLinkInactive}`}>
                                {filtreTexte()[4]}
                            </li>
                        </ul>
                }

                <section id={style.referencesSection} style={{ height: `calc(${Math.ceil(numberOfVisibleBrique(briqueFiltre()) / (tabletSize() === 1 ? 1 : 3))} * (100vw / ${(tabletSize() === 1 ? 1 : 3)}))` }}>
                    {
                        Object.keys(media).map((key, index) => {
                            return (
                                <A href={`/design/${key}`} class={`${style.referencesLink} ${briqueFiltre()[index] ? style.visible : style.invisible}`}>
                                    <h1 class={style.referencesH1} onMouseEnter={e => (e.target.nextSibling! as HTMLElement).style.transform = 'scale(1.2)'} onMouseLeave={e => (e.target.nextSibling! as HTMLElement).style.transform = 'scale(1)'}>{(media as any)[key]['titre']}</h1>
                                    <img class={style.referencesImg} alt={key} src={`/media/photo/ref-design/${key}/${(media as any)[key]['vignette']}`} width={1080} height={846} />
                                </A>
                            )
                        })
                    }
                </section>
            </div>
        </>
    )
}