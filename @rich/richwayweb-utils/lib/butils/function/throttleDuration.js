function throttleDuration(method, delay, duration) {
    let timer = null;
    let begin = new Date();

    return (...args) => {
        const context = this;
        const current = new Date();
        clearTimeout(timer);
        if (current - begin >= duration) {
            method.apply(context, args);
            begin = current;
        } else {
            timer = setTimeout(() => {
                method.apply(context, args);
            }, delay);
        }
    };
}

module.exports = throttleDuration;
