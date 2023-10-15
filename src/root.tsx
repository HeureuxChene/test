import { createEffect, createSignal, onCleanup, onMount, Suspense } from "solid-js";
import {Body,ErrorBoundary,FileRoutes,Head, Html,Link,Meta,Routes,Scripts,Title} from "solid-start";
import Header from "~/components/Header/Header";
import Footer from "~/components/Footer/Footer";
import { setScrollDown } from "~/components/Header/Header";
import "./root.css";

export const [screenWidth, setScreenWidth] = createSignal<number>(-1);
export const [screenHeight, setScreenHeight] = createSignal<number>(-1);
export const [filtreRef, setFiltreRef] = createSignal<number>(0);
export const [previousScroll, setPreviousScroll] = createSignal(0);
export const [tabletSize, setTabletSize] = createSignal(screenWidth() >= 1024 ? 1 : 0);
export const [tabletSizeInferior, setTabletSizeInferior] = createSignal(screenWidth() >= 950 ? true : false);

export default function Root() {

  const handleScroll = () => {
    setScrollDown(window.scrollY > previousScroll() ? -1 : 0);
    setPreviousScroll(window.scrollY);
  };

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }

  onMount(() => {
    handleScroll();
    handleResize();
    addEventListener('scroll', handleScroll);
    addEventListener('resize', handleResize);
  });

  onCleanup(() => {
    removeEventListener('scroll', handleScroll);
    removeEventListener('resize', handleResize);
  });

  return (
    <Html lang="en">
      <Head>
        <Title>VIISync</Title>
        <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <Link rel="manifest" href="/site.webmanifest" />
        <Link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <Meta name="msapplication-TileColor" content="#ffc40d" />
        <Meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <Meta name="theme-color" content="#ffffff" />
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Header />
        <Suspense>
          <ErrorBoundary>
            <div id='topPage' />
            <main>
              <Routes>
                <FileRoutes />
              </Routes>
            </main>
            <Footer />
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
