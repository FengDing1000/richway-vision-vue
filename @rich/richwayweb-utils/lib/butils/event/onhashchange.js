/**
 * hashchange事件在URL的hash部分（即#号后面的部分，包括#号）发生变化时触发。
 * 如果老式浏览器不支持该属性，可以通过定期检查location.hash属性，模拟该事件
 */
(function (window) {
    if (`onhashchange` in window.document.body) { return; }

    const { location } = window;
    let oldURL = location.href;
    let oldHash = location.hash;

    // 每隔100毫秒检查一下URL的hash
    setInterval(() => {
        const newURL = location.href;
        const newHash = location.hash;

        if (newHash !== oldHash && typeof window.onhashchange === `function`) {
            window.onhashchange({
                type: `hashchange`,
                oldURL,
                newURL
            });

            oldURL = newURL;
            oldHash = newHash;
        }
    }, 100);
}(window));
