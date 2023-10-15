import { createEffect, createSignal } from "solid-js";
import style from './Input.module.css';
import { Setter } from "solid-js";

type Props = {
    type?: string;
    textLabel?: string;
    textError?: string;
    required?: boolean;
    htmlFor?: string;
    valeur: any;
    setValeur: Setter<any>;
    valeurError: boolean;
    setValeurError: Setter<boolean>;
    errorPatern: RegExp;
    firstSubmit: boolean;
    submitStatus: string;
    placeholder:string;


};

export default function Input(props: Props) {

    const [focus, setFocus] = createSignal(props.valeur === '' ? false : true);

    return (
        <div class='container'>
            <label class={`${style.label} ${focus() ? style.labelFocus : undefined}`} for={props.htmlFor}>
                {props.textLabel} {props.required ? '*' : ''}
            </label>
            {props.type === 'text' ?
                <input required={props.required} type={props.type} id={props.htmlFor} name={props.htmlFor} disabled={props.submitStatus === 'valid' ? true : false} placeholder={props.placeholder ? props.placeholder : ''} onChange={e => { props.setValeur(e.target.value); !props.firstSubmit && (props.errorPatern.test(e.target.value) ? props.setValeurError(false) : props.setValeurError(true)) }} onFocus={() => setFocus(true)} onBlur={() => props.valeur === '' ? setFocus(false) : undefined} value={props.valeur} class={`${style.input} ${props.valeurError && props.submitStatus === 'default' ? style.inputError : focus() && style.inputFocus}`} />
                :
                <textarea required={props.required} id={props.htmlFor} name={props.htmlFor} disabled={props.submitStatus === 'valid' ? true : false} rows='5' placeholder={props.placeholder ? props.placeholder : ''} onChange={e => props.setValeur(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => props.valeur === '' ? setFocus(false) : undefined} value={props.valeur} class={`${style.input} ${focus() && style.inputFocus} `} style={{ resize: 'vertical', height: 'auto' }} />
            }
            <div class={`${style.error} ${props.valeurError && props.submitStatus === 'default' ? 'errorVisible' : ''}`}>{props.textError}</div>
        </div>

    )
};