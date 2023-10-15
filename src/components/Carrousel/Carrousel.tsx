import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { A } from 'solid-start';
import { screenWidth } from '~/root';
import style from './Carrousel.module.css';

type props = {
    media: object;
    chemin: string;
    format: string;
}

export default function Carrousel(props: props) {

    const [scrollCarrousel, setScrollCarrousel] = createSignal(0)
    const [mouseDown, setMouseDown] = createSignal(false)
    const [offsetScroll, setOffsetScroll] = createSignal(0)
    const [hover, setHover] = createSignal(false)
    const [clickable, setClickable] = createSignal(true)

    const getCssVariable = (nom: string) => {
        return parseInt(getComputedStyle(document.body).getPropertyValue(nom).replace('px', ''));
    }

    const handleTouchDown = (e: TouchEvent) => {
        document.getElementById(style.scrolling)!.style.scrollBehavior = 'initial';
        setMouseDown(true);
        setClickable(true);
        setOffsetScroll(e.touches[0].pageX + scrollCarrousel());
    }

    const handleTouchHold = (e: TouchEvent) => {
        if ((offsetScroll() - e.touches[0].pageX) !== document.getElementById(style.scrolling)!.scrollLeft) {
            setClickable(false);
        };
        document.getElementById(style.scrolling)!.scrollLeft = offsetScroll() - e.touches[0].pageX;
    }

    const handleMouseDown = (e: MouseEvent) => {
        document.getElementById(style.scrolling)!.style.scrollBehavior = 'initial';
        setMouseDown(true);
        setClickable(true);
        setOffsetScroll(e.pageX + scrollCarrousel());
    }

    const handleMouseHold = (e: MouseEvent) => {
        if ((offsetScroll() - e.pageX) !== document.getElementById(style.scrolling)!.scrollLeft) {
            setClickable(false);
        };
        document.getElementById(style.scrolling)!.scrollLeft = offsetScroll() - e.pageX;
    }

    const handleUp = () => {
        setMouseDown(false);
    }

    const handleScroll = (target: HTMLElement) => {
        setScrollCarrousel(target.scrollLeft);
    }

    const handleBriqueEnter = (target: HTMLElement) => {
        const video = target.nextSibling as HTMLVideoElement;
        const img = video.nextSibling as HTMLImageElement;
        video.play();
        img.style.opacity = '0';
    }

    const handleBriqueLeave = (target: HTMLElement) => {
        const video = target.nextSibling as HTMLVideoElement;
        const img = video.nextSibling as HTMLImageElement;
        video.pause();
        video.currentTime = 0;
        img.style.opacity = '1';
    }

    createEffect(() => {
        if (mouseDown()) {
            addEventListener('mousemove', handleMouseHold);
            addEventListener('touchmove', handleTouchHold);
        }
        else {
            removeEventListener('mousemove', handleMouseHold);
            removeEventListener('touchmove', handleTouchHold);
        }
    });

    createEffect(() => {
        screenWidth();
        document.getElementById(style.scrollingSlider)!.style.width = `${document.getElementById(style.slider)!.offsetWidth}px`;
    });

    onMount(() => {
        addEventListener('mouseup', () => handleUp());
        addEventListener('touchend', () => handleUp());
        const hoverObserver = (target: HTMLElement) => {
            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    setHover(true);
                }
                else {
                    setHover(false);
                }
            }, { threshold: 0.5});
            observer.observe(target);
        }
        hoverObserver(document.getElementById(style.carrousel)!)
    })

    onCleanup(() => {
        removeEventListener('mouseup', () => handleUp());
        removeEventListener('touchend', () => handleUp());
    })

    return (
        <div id={style.carrousel} onMouseDown={e => handleMouseDown(e)} onTouchStart={e => handleTouchDown(e)}>
            <div id={style.slider} style={{ transform: `translateX(${-scrollCarrousel()}px)` }}>
                {
                    props.format === '.mp4' ?
                        Object.keys(props.media).map(key => {
                            return (
                                <A href={clickable() ? `${(props.media as any)[key]['domaine']}?filtreProps=${(props.media as any)[key]['filtre']}#referencesSection` : ''} draggable={false} id={key} class={`${style.brique} lazyText`}>
                                    <div class={style.briqueHover} onMouseEnter={e => handleBriqueEnter(e.target as HTMLElement)} onMouseLeave={e => handleBriqueLeave(e.target as HTMLElement)} />
                                    <video id={`${key}-video`} class={style.background} muted loop playsinline preload='auto' src={props.chemin + key + props.format} />
                                    <img class={style.backgroundImage} alt={key} src={`/media/photo/home/activite/${key}.jpg`} width='520' height='720' loading='lazy' />
                                    <div class={style.briqueText}>
                                        <h1 class={style.briqueTitre}>
                                            {(props.media as any)[key]['titre']}
                                        </h1>
                                        <h2 class={style.briqueSousTitre}>
                                            {(props.media as any)[key]['soustitre']}
                                        </h2>
                                    </div>
                                </A>
                            )
                        })
                        :
                        Object.keys(props.media).map(key => {
                            return (
                                <A href={clickable() ? `/${props.format}/${key}` : ''} draggable={false} class={`${style.brique} lazyText`}>
                                    <img class={style.backgroundImage} alt={key} src={`${props.chemin + key}/${(props.media as any)[key]['vignette']}`} width='1080' height='846' />
                                    <h1 class={style.briqueRefTitre}>
                                        {(props.media as any)[key]['titre']}
                                    </h1>
                                </A>
                            )
                        })
                }
            </div>
            <div id={style.scrolling} onScroll={e => handleScroll(e.target as HTMLElement)}>
                <div id={style.scrollingSlider} />
            </div>

            <button class={`buttonfleche buttonCarrousel buttonCarrouselLeft ${hover() && scrollCarrousel() !== 0 && 'buttonVisibleRefLeft'}`} onClick={() => { document.getElementById(style.scrolling)!.style.scrollBehavior = 'smooth'; document.getElementById(style.scrolling)!.scrollLeft = Math.round(scrollCarrousel() / (getCssVariable('--briqueWidth') + getCssVariable('--briqueGap')) - 1) * (getCssVariable('--briqueWidth') + getCssVariable('--briqueGap')) }}>
                <svg height="15" width="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                    <path d="m5.52 0 7.91 7.5-7.91 7.5-1.95-1.95 5.83-5.55-5.83-5.55z" />
                </svg>
            </button>
            <button class={`buttonfleche buttonCarrousel buttonCarrouselRight ${hover() && scrollCarrousel() < (getCssVariable('--briqueWidth') + getCssVariable('--briqueGap')) * (Object.keys(props.media).length - getCssVariable('--briqueNumber')) && 'buttonVisibleRefRight'}`} onClick={() => { document.getElementById(style.scrolling)!.style.scrollBehavior = 'smooth'; document.getElementById(style.scrolling)!.scrollLeft = Math.round(scrollCarrousel() / (getCssVariable('--briqueWidth') + getCssVariable('--briqueGap')) + 1) * (getCssVariable('--briqueWidth') + getCssVariable('--briqueGap')) }}>
                <svg height="15" width="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                    <path d="m5.52 0 7.91 7.5-7.91 7.5-1.95-1.95 5.83-5.55-5.83-5.55z" />
                </svg>
            </button>
        </div>
    )
}