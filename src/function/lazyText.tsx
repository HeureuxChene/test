const lazyText = (target: HTMLElement) => {
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            (entries[0].target as HTMLElement).classList.add('lazyTextVisible');
        }
        else {
            (entries[0].target as HTMLElement).classList.remove('lazyTextVisible')
        }
    }, { threshold: 0 });
    observer.observe(target);
}

export default lazyText