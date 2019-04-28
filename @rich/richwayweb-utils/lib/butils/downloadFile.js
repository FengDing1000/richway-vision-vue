module.exports = (url = ``) => {
    try {
        const elemIF = document.createElement(`iframe`);
        elemIF.src = url;
        elemIF.style.display = `none`;
        document.body.appendChild(elemIF);
    } catch (e) {
        console.log(e);
    }
};
