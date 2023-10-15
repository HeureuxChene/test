import { Setter } from "solid-js";

const underlinkObserver = (target: HTMLElement, setPosition:Setter<number>) => {
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            setPosition(parseInt((entries[0].target as HTMLElement).id));
        }
    }, { threshold: 0 });
    observer.observe(target);
}

export default underlinkObserver