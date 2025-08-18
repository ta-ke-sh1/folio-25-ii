// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const textShuffleLight = (sourceElement: any, content: string, interval: any, duration: number) => {
    if (sourceElement.isAnimating) return;
    sourceElement.isAnimating = true
    let iteration = 1;
    const letters = ['!', '*', '_', '+', ';', ':', '<', '>'];
    clearInterval(interval);

    if (sourceElement) {
        interval = setInterval(() => {
            sourceElement.innerHTML = content
                .split("")
                .map((_, i: number) => {
                    if (i < iteration) {
                        return content[i];
                    }
                    if (i === iteration) {
                        return letters[Math.floor(Math.random() * letters.length - 1)];
                    } else if (i === iteration + 1) {
                        return "█"
                    } else {
                        return "&nbsp;";
                    }
                })
                .join("");
            if (iteration >= content.length) {
                clearInterval(interval);
                sourceElement.isAnimating = false
            }
            iteration += 1;
        }, duration);
    } else {
        return;
    }
};