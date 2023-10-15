const lazyOpacity = (target: HTMLElement) => {
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            (entries[0].target as HTMLElement).style.opacity = '1';
        }
        else {
            (entries[0].target as HTMLElement).style.opacity = '0';
        }
    }, { threshold: 0 });
    observer.observe(target);
}

export default lazyOpacity