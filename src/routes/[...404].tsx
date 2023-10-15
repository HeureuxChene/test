import style from './notFound.module.css'

export default function NotFound() {
    return (
        <div id={style.error}>
            <div id={style.glitchContainer}>
                <h1 id={style.invisible404}>404</h1>
                <h1 class={style.glitched404}>404</h1>
                <h1 class={style.glitched404}>404</h1>
                <h1 class={style.glitched404}>404</h1>
            </div>
            <p id={style.textError}>Oups, cette page n&apos;existe pas</p>
        </div>
    )
};