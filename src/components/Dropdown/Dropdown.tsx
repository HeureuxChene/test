import { createEffect, createSignal } from "solid-js";
import style from './Dropdown.module.css';
import { Setter, Accessor } from "solid-js";

type Props = {
    htmlFor?: string;
    valeurs: Accessor<string[]>;
    valeur: Accessor<any>;
    setValeur: Setter<any>;
}

export default function Dropdown(props: Props) {

    const [scroll, setScroll] = createSignal(false);

    return (
        <div class={style.dropdown} onMouseLeave={() => setScroll(false)}>
            <svg class={`${style.angleUp} ${scroll() ? style.angleUpFocus : undefined}`} viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                <path d="m5.52 0 7.91 7.5-7.91 7.5-1.95-1.95 5.83-5.55-5.83-5.55z" />
            </svg>
            <input onClick={() => setScroll(!scroll())} type='button' id={props.htmlFor} name={props.htmlFor} value={props.valeurs()[props.valeur()]} class={`${style.input}`} />
            <ul class={style.liste} style={scroll() ? { height: `${props.valeurs().length * 100 + 1}px` } : { height: '0px', border: '0px solid #0000' }}>
                {
                    props.valeurs().map((e: string, index: number) => {
                        return (
                            <li class={`${style.item} ${index === props.valeur() ? style.itemSelected : undefined}`} onClick={() => { props.setValeur(index); setScroll(false) }}>
                                {e}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}