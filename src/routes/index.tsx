import { createSignal, createEffect, onMount, onCleanup } from 'solid-js';
import { A } from 'solid-start';
import { setPositionUnderlink } from '~/components/Header/Header';
import Carrousel from '~/components/Carrousel/Carrousel';
import Input from '~/components/Input/Input';
import underlinkObserver from '~/function/underlinkObserver';
import lazyText from '~/function/lazyText';
import lazyOpacity from '~/function/lazyOpacity';
import lazyHeight from '~/function/lazyHeight';
import lazyWidth from '~/function/lazyWidth';
import { previousScroll, screenHeight, screenWidth, setScreenWidth, tabletSize, setTabletSize, tabletSizeInferior, setTabletSizeInferior } from '~/root';
import style from './Index.module.css';
import media from '~/json/activite.json';

export default function Index() {

  const handleParralax = () => {
    document.getElementById('parralax')!.scrollTop = window.scrollY;
  }

  const getOffsetTop = (element: HTMLElement) => {
    let offsetTop = 0;
    while (element) {
      offsetTop += element.offsetTop;
      element = (element.offsetParent as HTMLElement);
    }
    return offsetTop;
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (submitStatus() === status[0]) {
      let error = false;
      setSubmitStatus(status[1]);
      setFirstSubmit(false);
      if (!namePatern.test(surname())) {
        setSurnameError(true);
        error = true;
      }
      if (!namePatern.test(name())) {
        setNameError(true);
        error = true;
      }
      if (!mailPatern.test(mail())) {
        setMailError(true);
        error = true;
      }

      if (error) {
        setTimeout(() => setSubmitStatus(status[2]), 1000);
        return;
      }
      else {
        try {
          // const response = await fetch('/api/mailing', {
          //   method: 'POST',
          //   headers: { 'Content-type': 'application/json' },
          //   body: JSON.stringify({
          //     surname: surname,
          //     name: name,
          //     mail: mail,
          //     message: message
          //   })
          // })
          // if (response.ok) {
          //   router.reload(window.location.pathname)
          // }
          setTimeout(() => setSubmitStatus(status[3]), 1000);
        } catch (err) {
          setTimeout(() => setSubmitStatus(status[2]), 1000);
          console.error(err);
        }
      }
    }
  }

  const status = ['default', 'loading', 'error', 'valid'];

  const [submitStatus, setSubmitStatus] = createSignal(status[0]);
  const [firstSubmit, setFirstSubmit] = createSignal(true);

  const [mail, setMail] = createSignal('');
  const [mailError, setMailError] = createSignal(false);
  const mailPatern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [surname, setSurname] = createSignal('');
  const [surnameError, setSurnameError] = createSignal(false);
  const [name, setName] = createSignal('');
  const [nameError, setNameError] = createSignal(false);
  const namePatern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

  const [message, setMessage] = createSignal('');

  const [activiteUnderlink, setActiviteUnderlink] = createSignal(0);

  createEffect(() => {
    screenHeight();
    screenWidth();
    setActiviteUnderlink(((window.innerHeight - document.getElementById(style.activite)!.offsetHeight) / 2) + 1);
  })

  createEffect(() => {
    setTabletSize(screenWidth() >= 1024 ? 1 : 0);
    setTabletSizeInferior(screenWidth() >= 950 ? true : false);
  })

  createEffect(() => {
    if (tabletSize() === 1) {
      document.getElementById(style.separation)!.classList.remove('lazyWidth');
      document.getElementById(style.separation)!.classList.add('lazyHeight');
      document.querySelectorAll('.lazyHeight').forEach(e => {
        lazyHeight(e as HTMLElement);
      });
    }
    else {
      document.getElementById(style.separation)!.classList.remove('lazyHeight');
      document.getElementById(style.separation)!.classList.add('lazyWidth');
      document.querySelectorAll('.lazyWidth').forEach(e => {
        lazyWidth(e as HTMLElement);
      });
    }
  });

  createEffect(() => {
    document.getElementById(style.savoirFaire)!.style.translate = `0px ${((-previousScroll() + getOffsetTop(document.getElementById(style.savoirFaire)!)) * 0.2) * tabletSize()}px`;
    document.getElementById(style.qualite)!.style.translate = `0px ${((previousScroll() - getOffsetTop(document.getElementById(style.qualite)!)) * 0.2) * tabletSize()}px`;
  })

  createEffect(() => {
    if (submitStatus() === status[2]) {
      setTimeout(() => setSubmitStatus(status[0]), 1000);
    }
  });

  onMount(() => {
    document.querySelectorAll('.underlinkObserver').forEach(e => {
      underlinkObserver(e as HTMLElement, setPositionUnderlink);
    });
    document.querySelectorAll('.lazyText').forEach(e => {
      lazyText(e as HTMLElement);
    });
    document.querySelectorAll('.lazyOpacity').forEach(e => {
      lazyOpacity(e as HTMLElement);
    });
    setScreenWidth(window.innerWidth);
    document.getElementById('parralaxHeight')!.style.height = `${document.body.clientHeight}px`;
    addEventListener('scroll', handleParralax);
  });

  onCleanup(() => {
    removeEventListener('scroll', handleParralax);
  })

  return (
    <>
      <div id='parralax'>
        <div id='parralaxHeight' />
        <div id={style.fondNoir} />
        <section class={style.parralaxHome} />
        <img id={style.planete} alt='home-planete' src='/media/photo/home/home-planete.png' width='1448' height='1014' loading='lazy' />
      </div>

      <section id='home'>
        <div id='0' class='underlinkObserver triggerMiddle' />
        <div id={style.homeContent}>
          <article id={style.homeText} class='lazyText'>
            <h3 id={style.homeTextTitle}>
              {/* Votre <span class={style.homeTextTitleBold}>Message</span>, Notre <span class={style.homeTextTitleBold}>Métier</span> */}
              <span class={style.homeTextTitleBold}>Design & Audiovisuel</span>
            </h3> 
            <p id={style.homeTextSubtitle}>
              Identité visuelle <span class={style.homeTextSubtitleSeparation}>|</span> Design Print & Web <span class={style.homeTextSubtitleSeparation}>|</span> Développement <span class={style.homeTextSubtitleSeparation} style={{display: tabletSizeInferior() ? 'none' : 'initial'}}>|</span> Montage Vidéo <span class={style.homeTextSubtitleSeparation}>|</span> Post-production <span class={style.homeTextSubtitleSeparation}>|</span> Motion Design
            </p>
          </article>
        </div>
        <a href='https://www.talidad.fr/' id={`${style.homeTalidad}`} style={{ opacity: 1 - (previousScroll() / 250) }}>
          <svg id={style.logoTalidad} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 236.8 236.8" style="enable-background:new 0 0 236.8 236.8">
            <circle cx="118.4" cy="118.4" r="107.6" style="fill:#fff" />
            <path d="M75.4 82.4c-.5 1-.6 1.8-.5 2.4-1.1-.3-2.5-.7-4.4-1.3-3-.8-5.9-1.2-8.8-1.2-4.3 0-8.1 1-11.3 3.1-.6 4.8-1 10.1-1.3 15.7-.3 5.6-.4 11.7-.4 18.3 0 6.9.2 12.7.7 17.4-.5 1-1.9 1.5-4.1 1.5H45c-1.3-4.3-2-11.7-2-22 0-9.4.4-19 1.3-28.8-1.6.4-4.2 1.6-8 3.8-3.5 2-5.9 3-7.2 3-.5 0-.9-.3-1.3-1s-.5-1.3-.5-1.8c0-.7.2-1.2.5-1.5.2-.2.7-.5 1.6-1.1.9-.6 2.1-1.4 3.7-2.4C43.5 80 52.5 76.8 60 76.8c6 0 11.1 1.9 15.4 5.6zM87 144.2c0 .3-.4.4-1.2.4-2 0-4.1-1.8-6.1-5.4-.7-1.3-1.4-2.5-2.1-3.8-.7-1.3-1.4-2.6-2-3.9-1 .5-2 .9-3 1.4-1 .5-2 .9-2.9 1.4-2.4 1.2-4.5 1.7-6.3 1.7-2.3 0-4.2-.7-5.7-2.2-1.5-1.5-2.2-3.4-2.2-5.7 0-2.7 1.4-5.7 4.1-9 2.8-3.2 5.5-4.8 8.2-4.8 3.3 0 6.2 1.4 8.7 4.3.7-1.4 1.8-2 3.5-2 1 0 1.8.3 2.4 1-1 2-1.4 4-1.4 6 0 2.5 1 5.9 3 10.3 2 4.3 3 7.7 3 10.3zm-15.6-19.7c0-.5-.5-1.2-1.4-2.2-.9-1-1.6-1.5-2.1-1.5-1.2 0-2.6.8-4.2 2.3-1.6 1.5-2.4 2.9-2.4 4.1 0 .6.5 1.2 1.4 1.8.9.6 1.7.9 2.5.9 1.3 0 2.6-.6 4.1-1.8 1.4-1.1 2.1-2.3 2.1-3.6zM97.5 136.8c-1.1 1-2.2 1.4-3.2 1.4-2.7 0-4.1-6.2-4.1-18.6 0-3.9.1-8.2.2-12.7.2-4.5.4-9.4.7-14.6.1-1.2.3-2.6.4-4.4.2-1.7.3-3.8.5-6.1V80c0-.7.1-1.6.1-2.5.2-1.2.8-1.8 1.7-1.8 1.5 0 2.4.8 2.6 2.4.1.8.2 1.9.3 3.4.1 1.5.1 3.3.1 5.5 0 1.7-.1 3.8-.2 6.3s-.3 5.4-.5 8.8c-.4 6.7-.5 11.7-.5 15 0 3.6.1 7.1.4 10.4.4 3.2.8 6.3 1.5 9.3z" />
            <path d="M114.2 96.1c0 1.4-.7 2.1-2.1 2.1-1.4 0-2.7-.8-3.9-2.3-1.2-1.5-1.9-3-1.9-4.4 0-2.6.8-3.9 2.4-3.9 1.7 0 3.1 1 4.1 3.1.9 1.7 1.4 3.5 1.4 5.4z" style="fill:#ed1c24" />
            <path d="M110.8 136.1c-1.2.7-2.4 1.1-3.6 1.1-1.3 0-2.2-.5-2.9-1.6-.2-4.4-.3-8.2-.4-11.5-.1-3.3-.1-6.1-.1-8.3 0-4.5.5-8.4 1.6-11.5h.9c1.9 0 3.2.6 4.1 1.9-.4 4.9-.6 8.8-.6 11.7 0 9.1.4 15.1 1 18.2zM145.3 120.5c0 3.9-2.2 7.6-6.7 11.4-4.5 3.7-8.7 5.5-12.7 5.5-2.6 0-4.9-1.2-6.8-3.7-1.7-2.2-2.6-4.7-2.6-7.5 0-4.4 1.2-8 3.8-10.8 2.5-2.8 5.9-4.2 10.3-4.2 4.2 0 6.4 1.8 6.4 5.3 0 .7-.2 1.5-.6 2.3-.4.8-.9 1.2-1.5 1.2-.9 0-1.9-.5-3-1.6-1-1.1-1.8-1.6-2.4-1.6-1.8 0-3.5 1-5 3.1-1.5 2-2.2 4-2.2 5.9 0 .9.4 2 1.3 3.3.9 1.2 1.8 1.8 2.8 1.8 2.8 0 5.5-1.2 8.1-3.6 1.1-1 2-2.1 2.9-3.3.9-1.2 1.7-2.5 2.3-4-1.4-13.1-2.1-25.1-2.1-36.1 0-2.9.1-4.5.2-4.8.2-.2.5-.3 1-.3.8 0 1.6.6 2.4 1.7.8 1.1 1.3 2.1 1.3 3 0 .6.1 1.3.1 2.1s.1 1.8.1 2.9c0 .6.1 1.6.2 3.2.1 1.5.3 3.6.5 6.2.2 1.9.3 3.7.5 5.6.2 1.8.4 3.7.6 5.6.4 4.4.6 8.2.6 11.3v.1zM180.9 144.2c0 .3-.4.4-1.2.4-2 0-4.1-1.8-6.1-5.4-.7-1.3-1.4-2.5-2.1-3.8-.7-1.3-1.4-2.6-2-3.9-1 .5-2 .9-3 1.4-1 .5-2 .9-2.9 1.4-2.4 1.2-4.5 1.7-6.3 1.7-2.3 0-4.2-.7-5.7-2.2-1.5-1.5-2.2-3.4-2.2-5.7 0-2.7 1.4-5.7 4.1-9 2.8-3.2 5.5-4.8 8.2-4.8 3.3 0 6.2 1.4 8.7 4.3.7-1.4 1.8-2 3.5-2 1 0 1.8.3 2.4 1-1 2-1.4 4-1.4 6 0 2.5 1 5.9 3 10.3 2 4.3 3 7.7 3 10.3zm-15.6-19.7c0-.5-.5-1.2-1.4-2.2-.9-1-1.6-1.5-2.1-1.5-1.2 0-2.6.8-4.2 2.3-1.6 1.5-2.4 2.9-2.4 4.1 0 .6.5 1.2 1.4 1.8.9.6 1.7.9 2.5.9 1.3 0 2.6-.6 4.1-1.8 1.4-1.1 2.1-2.3 2.1-3.6zM209.7 120.5c0 3.9-2.2 7.6-6.7 11.4-4.5 3.7-8.7 5.5-12.7 5.5-2.6 0-4.9-1.2-6.8-3.7-1.7-2.2-2.6-4.7-2.6-7.5 0-4.4 1.2-8 3.8-10.8 2.5-2.8 5.9-4.2 10.3-4.2 4.2 0 6.4 1.8 6.4 5.3 0 .7-.2 1.5-.6 2.3-.4.8-.9 1.2-1.5 1.2-.9 0-1.9-.5-3-1.6-1-1.1-1.8-1.6-2.4-1.6-1.8 0-3.5 1-5 3.1-1.5 2-2.2 4-2.2 5.9 0 .9.4 2 1.3 3.3.9 1.2 1.8 1.8 2.8 1.8 2.8 0 5.5-1.2 8.1-3.6 1.1-1 2-2.1 2.9-3.3.9-1.2 1.7-2.5 2.3-4-1.4-13-2.1-25-2.1-36 0-2.9.1-4.5.2-4.8.2-.2.5-.3 1-.3.8 0 1.6.6 2.4 1.7.8 1.1 1.3 2.1 1.3 3 0 .6.1 1.3.1 2.1s.1 1.8.1 2.9c0 .6.1 1.6.2 3.2.1 1.5.3 3.6.5 6.2.2 1.9.3 3.7.5 5.6.2 1.8.4 3.7.6 5.6.4 4.4.6 8.2.6 11.3z" />
            <path class="st2" d="M50.6 157.2c-.1 1.2-.6 2.2-1.3 2.8-.7.7-1.7 1-3 1-.9 0-1.6-.2-2.3-.7-.7-.4-1.2-1-1.5-1.8-.4-.8-.5-1.7-.6-2.7v-1.5c0-1 .2-2 .5-2.8.4-.8.9-1.4 1.6-1.9.7-.4 1.5-.7 2.4-.7 1.3 0 2.2.3 3 1s1.1 1.6 1.3 2.8h-1c-.2-2-1.3-3-3.2-3-1.1 0-1.9.4-2.5 1.2-.6.8-.9 1.9-.9 3.3v1.4c0 1.4.3 2.4.9 3.2.6.8 1.4 1.2 2.5 1.2 1 0 1.8-.2 2.3-.7.5-.5.8-1.2 1-2.2h.8zM64.6 155.6c0 1.1-.2 2-.6 2.8-.4.8-.9 1.4-1.6 1.9-.7.4-1.5.7-2.4.7-1.4 0-2.5-.5-3.3-1.5-.8-1-1.3-2.3-1.3-4v-1.2c0-1.1.2-2 .6-2.8.4-.8.9-1.5 1.6-1.9.7-.4 1.5-.7 2.4-.7.9 0 1.7.2 2.4.7.7.4 1.2 1 1.6 1.8.4.8.6 1.7.6 2.8v1.4zm-1-1.2c0-1.4-.3-2.5-1-3.3-.6-.8-1.5-1.2-2.6-1.2s-2 .4-2.6 1.2c-.6.8-1 1.9-1 3.4v1.2c0 1.4.3 2.5 1 3.3.6.8 1.5 1.2 2.6 1.2s2-.4 2.6-1.2c.6-.8.9-1.9.9-3.3v-1.3zM71.3 149.2l4.3 10.3 4.3-10.3h1.3v11.7h-1v-5.1l.1-5.2-4.3 10.3h-.8l-4.3-10.3.1 5.2v5.1h-1v-11.7h1.3zM88.5 149.2l4.3 10.3 4.3-10.3h1.3v11.7h-1v-5.1l.1-5.2-4.4 10.3h-.8L88 150.6l.1 5.2v5.1h-1v-11.7h1.4zM112.4 149.2v8c0 .8-.2 1.5-.5 2.1-.3.6-.8 1-1.5 1.3-.6.3-1.3.5-2.2.5-1.2 0-2.2-.3-3-1-.7-.7-1.1-1.6-1.2-2.8v-8.1h1v7.9c0 1 .3 1.8.8 2.3.6.5 1.3.8 2.3.8 1 0 1.7-.3 2.3-.8.6-.5.8-1.3.8-2.3v-7.9h1.2zM126.8 160.9h-1l-6.7-10v10h-1v-11.7h1l6.7 10v-10h1v11.7zM133.9 160.9h-1v-11.7h1v11.7zM148.3 157.2c-.1 1.2-.6 2.2-1.3 2.8-.7.7-1.7 1-3 1-.9 0-1.6-.2-2.3-.7-.7-.4-1.2-1-1.5-1.8-.4-.8-.5-1.7-.6-2.7v-1.5c0-1 .2-2 .5-2.8.4-.8.9-1.4 1.6-1.9.7-.4 1.5-.7 2.4-.7 1.3 0 2.2.3 3 1 .7.7 1.1 1.6 1.3 2.8h-1c-.2-2-1.3-3-3.2-3-1.1 0-1.9.4-2.5 1.2-.6.8-.9 1.9-.9 3.3v1.4c0 1.4.3 2.4.9 3.2.6.8 1.4 1.2 2.5 1.2 1 0 1.8-.2 2.3-.7.5-.5.8-1.2 1-2.2h.8zM160 157.6h-5.3l-1.2 3.3h-1l4.4-11.7h.9l4.4 11.7h-1l-1.2-3.3zm-5-.9h4.7l-2.3-6.4-2.4 6.4zM173.8 150h-4v10.9h-1V150h-4v-.8h9v.8zM179.8 160.9h-1v-11.7h1v11.7zM194.6 155.6c0 1.1-.2 2-.6 2.8-.4.8-.9 1.4-1.6 1.9-.7.4-1.5.7-2.4.7-1.4 0-2.5-.5-3.3-1.5-.8-1-1.3-2.3-1.3-4v-1.2c0-1.1.2-2 .6-2.8.4-.8.9-1.5 1.6-1.9.7-.4 1.5-.7 2.4-.7.9 0 1.7.2 2.4.7.7.4 1.2 1 1.6 1.8s.6 1.7.6 2.8v1.4zm-1-1.2c0-1.4-.3-2.5-1-3.3-.6-.8-1.5-1.2-2.6-1.2s-2 .4-2.6 1.2c-.6.8-1 1.9-1 3.4v1.2c0 1.4.3 2.5 1 3.3.6.8 1.5 1.2 2.6 1.2s2-.4 2.6-1.2c.6-.8.9-1.9.9-3.3v-1.3zM208.7 160.9h-1l-6.7-10v10h-1v-11.7h1l6.7 10v-10h1v11.7z" />
          </svg>
          <p>
            Membre du GIE <span class={style.homeTextTitleBold}>TALIDAD</span>
          </p>
        </a>
      </section>

      <section id={style.presentation}>
        <div id='1' class='underlinkObserver triggerTop' />
        <div id='1' class='underlinkObserver triggerBottom' style={{ translate: `0px ${-activiteUnderlink()}px` }} />
        <div id='presentation' class='anchor' />
        <article id={style.presentationContent} class='lazyText'>
          <h1>
            PRÉSENTATION
          </h1>
          <p>
            Je suis Yanis Belaslouni, freelance,  <strong>spécialiste en identité visuelle, création de support de communication et vidéo,</strong> je suis prêt à vous accompagner dans la <strong>réalisation et la promotion de vos projets.</strong>
          </p>
          <p>
            En tant que membre actif du groupement d&apos;indépendants <strong>TALIDAD</strong>, j'ai la capacité de vous offir un plus
            <strong> large panel de compétences</strong> dans la mise en œuvre de vos idées.
          </p>
          <p>
            <strong>MA MISSION :</strong><br />
            Définir une stratégie de communication et <strong>créer des outils adaptés</strong>, basées sur l&apos;écoute de vos besoins.
          </p>
          <p>
            Quelle que soit la nature de votre demande : Création d&apos;un logo, d&apos;un site internet, d&apos;une vidéo ou d&apos;une stratégie complète incluant divers domaines d&apos;expertises, <strong>je fais de votre satisfaction ma priorité</strong>.
          </p>
          <a href='#activite'>
            <button class={style.button}>
              Découvrez mes domaines d&apos;activités
            </button>
          </a>
        </article>

        <div id={style.planeteAbstraitContainer}>
          <img id={style.planeteAbstrait} alt='home-terre-abstrait' src='/media/photo/home/home-terre.png' width='6000' height='2962' loading='lazy' />
        </div>
        <div id={style.savoirFaireQualite}>
          <article id={style.savoirFaire} class='zoneText lazyOpacity'>
            <h1>
              SAVOIR-FAIRE
            </h1>
            <p>
              Dôtés de plus de 6 ans d&apos;expérience dans le domaine de la communication, je sais <strong>développer le potentiel
                des marques et des entreprises</strong> grâce à ma connaissance des tendances créatives actuelles.
              Mon savoir-faire repose sur la <strong>création de moyens de communication cohérents et esthétiques
                en adéquation avec vos objectifs.</strong>
            </p>
          </article>
          <div id={style.separation} />
          <article id={style.qualite} class='zoneText lazyOpacity'>
            <h1>
              QUALITÉ
            </h1>
            <p>
              <strong>De nombreux artistes, marques et entreprises renommés m'ont déjà accordés leur confiance par le prisme de TALIDAD :</strong> :
              Arkopharma, Naturland, La maison de champagne Thomas Cheurlin, Maître Savon de Marseille,
              Bioc3, Concept Verre, Seven Driver Riviera, I-SEE Airborn Observatory, Laurence Jenkell,
              Le collectif du Dôme et bien d&apos;autres...
            </p>
          </article>
        </div>
        <a href='#activite' class='buttonfleche buttonSection'>
          <svg width="15" height="15">
            <path d="m5.52 0 7.91 7.5-7.91 7.5-1.95-1.95 5.83-5.55-5.83-5.55z" />
          </svg>
        </a>
      </section>


      <section id={style.activite}>
        <div id='2' class='underlinkObserver triggerMiddle' />
        <div id='activite' class='anchor' />
        <div style={{ display: 'flex', "justify-content": 'center' }}>
          <article id={style.activiteTitre} class='zoneText lazyText'>
            <h1>
              DOMAINES D&apos;ACTIVITÉS
            </h1>
            <p>
              Je vous propose un large panel de spécialisations. J'y maîtrise au détail l&apos;ensemble des aspects techniques,
              vous garantissant le meilleur en terme de créativité.
            </p>
          </article>
        </div>
        <Carrousel media={media} chemin='/media/video/home/activite/' format='.mp4' />
      </section>



      <section id={style.referenceGraphique}>
        <div id='3' class='underlinkObserver triggerTop' style={{ translate: `0px ${activiteUnderlink()}px` }} />
        <img id={style.referenceGraphiqueImg} alt='reference-photo' src='/media/photo/home/reference-photo.jpg' width='3228' height='2896' loading='lazy' />
        <article id={style.referenceGraphiqueText} class='zoneText lazyText'>
          <h1>
            RÉFÉRENCES GRAPHIQUE
          </h1>
          <p>
            Création d&apos;identité visuelle, de Logo, conception de charte graphique,
            de packaging, web design & développement, retouche photographique, design et mise en page pour supports
            de communication (flyer, catalogue, carte de visite, annonce presse, plaquette commerciale,
            affiches, étiquettes, etc ...).
          </p>
          <A href='/design'>
            <button class={`${style.button} ${style.buttonWhite}`}>
              Découvrez mes références graphiques
            </button>
          </A>
        </article>
      </section>

      <section id={style.referenceVideo}>
        <div id='3' class='underlinkObserver triggerBottom' />
        <video id={style.referenceVideoVideo} autoplay muted loop playsinline preload='auto' src={`/media/video/home/reference-video.mp4`} />
        <div id={style.referenceVideoContent}>
          <article id={style.referenceVideoText} class='zoneText lazyText'>
            <h1>
              RÉFÉRENCES VIDÉO
            </h1>
            <p>
              Montage vidéo, Clip musical, Incrustation fond vert, Effets spéciaux (VFX), Motion Design, Sound Design, Traitement audio,
              Réalisation, Scénarisation, etc...
            </p>
            <A href='/video'>
              <button class={style.button}>
                Découvrez mes références vidéos
              </button>
            </A>
          </article>
        </div>
      </section>


      <section id={style.contact}>
        <div id='4' class='underlinkObserver triggerTop' />
        <div id='contact' class='anchor' />
        <h1 class='lazyText'>
          CONTACT
        </h1>
        <form id={style.contactForm} class='lazyText' onSubmit={e => handleSubmit(e)}>
          <Input type='text' textLabel='Adresse Mail' textError='Veuillez saisir une adresse mail valide' required={true} htmlFor='mail' valeur={mail()} setValeur={setMail} valeurError={mailError()} setValeurError={setMailError} errorPatern={mailPatern} firstSubmit={firstSubmit()} submitStatus={submitStatus()} />
          <Input type='text' textLabel='Nom' textError='Veuillez saisir un nom valide' required={true} htmlFor='surname' valeur={surname()} setValeur={setSurname} valeurError={surnameError()} setValeurError={setSurnameError} errorPatern={namePatern} firstSubmit={firstSubmit()} submitStatus={submitStatus()} />
          <Input type='text' textLabel='Prénom' textError='Veuillez saisir un prénom valide' required={true} htmlFor='name' valeur={name()} setValeur={setName} valeurError={nameError()} setValeurError={setNameError} errorPatern={namePatern} firstSubmit={firstSubmit()} submitStatus={submitStatus()} />
          <Input type='textarea' textLabel='Message' htmlfor='message' valeur={message()} setValeur={setMessage} submitStatus={submitStatus()} />
          <p id={style.formP}>Pour toute demande de devis, merci de nous préciser votre demande au maximum. Cela me permettra de vous donner un prix en adéquation avec le service que je vous proposerez.</p>
          <button type='submit' disabled={submitStatus() !== status[0] ? true : false} class={`${style.button} ${style.buttonWhite} ${style.envoyer} ${submitStatus() === status[1] ? style.envoyerLoading : submitStatus() === status[2] ? style.envoyerError : submitStatus() === status[3] ? style.envoyerValid : undefined}`}>
            <p id={style.textEnvoyer}>Envoyer</p>
            <svg class={`${style.iconEnvoyer} ${submitStatus() === status[2] ? style.errorSVG : submitStatus() === status[3] ? style.validSVG : style.noSVG}`} viewBox={submitStatus() === status[2] ? "0 0 48 48" : "0 0 24 24"}>
              {
                submitStatus() === status[2]
                  ?
                  <path d="M 39.486328 6.9785156 A 1.50015 1.50015 0 0 0 38.439453 7.4394531 L 24 21.878906 L 9.5605469 7.4394531 A 1.50015 1.50015 0 0 0 8.484375 6.984375 A 1.50015 1.50015 0 0 0 7.4394531 9.5605469 L 21.878906 24 L 7.4394531 38.439453 A 1.50015 1.50015 0 1 0 9.5605469 40.560547 L 24 26.121094 L 38.439453 40.560547 A 1.50015 1.50015 0 1 0 40.560547 38.439453 L 26.121094 24 L 40.560547 9.5605469 A 1.50015 1.50015 0 0 0 39.486328 6.9785156 z" />
                  : submitStatus() === status[3] ?
                    <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z" />
                    : <path />
              }
            </svg>
          </button>
          <p class={`${style.textStatus} ${submitStatus() === status[3] ? style.visible : undefined}`}>Votre message a bien été envoyé</p>
        </form>
      </section>
    </>
  );
}
