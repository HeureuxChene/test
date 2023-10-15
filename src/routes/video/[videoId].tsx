import lazyText from '~/function/lazyText';
import style from '~/Reference.module.css';
import media from '~/json/video.json';
import { screenWidth } from '~/root';
import { createSignal, createEffect, onCleanup, onMount } from 'solid-js';
import { useLocation, useParams } from 'solid-start';
import { setPositionReference, setPositionUnderlink } from '~/components/Header/Header';
import Carrousel from '~/components/Carrousel/Carrousel';
import citations from '~/json/citation.json';

export default function VideoId() {

    // const handleParralax = () => {
    //     document.getElementById('parralax')!.scrollTop = window.scrollY;
    // }

    const [position, setPosition] = createSignal(0);
    const [details, setDetails] = createSignal(false);

    const [hover, setHover] = createSignal(false);
    const [separationWidth, setSeparationWidth] = createSignal(false);

    const [params, setParams] = createSignal((media as any)[useParams().videoId]);

    const [citation, setCitation] = createSignal(citations[Math.floor(Math.random() * Object.keys(citations).length)]);

    createEffect(() => {
        setPosition(0);
        setParams((media as any)[useParams().videoId]);
    })

    createEffect(() => {
        useLocation().pathname;
        setCitation(citations[Math.floor(Math.random() * Object.keys(citations).length)]);
    })


    onMount(() => {
        setPositionUnderlink(3);
        setPositionReference(2);
        document.querySelectorAll('.lazyText').forEach(e => {
            lazyText(e as HTMLElement);
        });
        const hover = (target: HTMLElement) => {
            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    setHover(true);
                }
                else {
                    setHover(false)
                }
            }, { threshold: 0 });
            observer.observe(target);
        }
        hover(document.querySelector('.triggerMiddle')!)
    });

    onCleanup(() => {
        setPositionReference(0);
    });

    return (
        <>
            <section id={style.reference}>
                <h1>
                    {params().titre}
                </h1>
                <h2>
                    {params().soustitre}
                </h2>
                <p id={style.referenceP}>
                    {params().description}
                </p>
                <div id={style.referenceCarrousel} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <div class='triggerMiddle' />
                    {
                        Object.keys(params().videos).map(key => {
                            return (
                                <iframe style={{ transform: `translateX(${parseInt(key) - position()}00%)` }} class={style.referenceCarrouselMedia} src={`https://www.youtube.com/embed/${params().videos[key]}`} title="YouTube video player" frame-border='0' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
                            )
                        })
                    }
                    <button disabled={position() === 0 && true} class={`buttonfleche buttonCarrousel buttonCarrouselLeft ${hover() && position() !== 0 && 'buttonVisibleLeft'} ${style.buttonBlack}`} onClick={() => setPosition(position() - 1)}>
                        <svg height="15" width="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                            <path d="m5.52 0 7.91 7.5-7.91 7.5-1.95-1.95 5.83-5.55-5.83-5.55z" />
                        </svg>
                    </button>
                    <button disabled={position() === Object.keys(params().videos).length - 1 && true} class={`buttonfleche buttonCarrousel buttonCarrouselRight ${hover() && position() !== Object.keys(params().videos).length - 1 && 'buttonVisibleRight'} ${style.buttonBlack}`} onClick={() => setPosition(position() + 1)}>
                        <svg height="15" width="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                            <path d="m5.52 0 7.91 7.5-7.91 7.5-1.95-1.95 5.83-5.55-5.83-5.55z" />
                        </svg>
                    </button>
                </div>
                <h2 id={style.detail} onClick={() => setDetails(!details())}>
                    DÉTAIL DE MISSION
                    <button id={style.detailButton} onClick={() => setSeparationWidth(!separationWidth())}>
                        <div class={style.baton} />
                        <div class={style.baton} style={{ rotate: `${details() ? '0deg' : '90deg'}` }} />
                    </button>
                </h2>
            </section>
            <section id={style.details} class={details() ? style.detailVisible : style.detailInvisible}>
                <ul id={style.detailsListe}>
                    {
                        Object.keys(params().details).map(key => {
                            return (
                                <li class={style.detailsItem}>
                                    {params().details[key]}
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
            
            <section id={style.citationContainer}>
                <div class='lazyText'>
                    <p id={style.citation}>« {citation().citation} »</p>
                    <p id={style.auteur}>- {citation().auteur} -</p>
                </div>
            </section>

            <section id={style.decouverte}>
                <img id={style.decouverteBackground} alt='decouverte-autre-reference' src='/media/photo/decouverte-autre-reference.jpg' width='5000' height='3333' loading='lazy' />
                <h1 id={style.decouverteH1} class='lazyText'>
                    NOS AUTRES RÉFÉRENCES
                </h1>
                <div id={style.carrouselContainer}>
                    <Carrousel media={media} chemin='/media/photo/ref-video/' format='video' />
                </div>
            </section>
        </>
    )
};