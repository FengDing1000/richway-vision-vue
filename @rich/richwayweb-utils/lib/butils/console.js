const info = {};
for (const key in console) {
    if (Object.hasOwnProperty.call(console, key)) {
        info[key] = (...arr) => {
            console[key](...arr);
        };
    }
}

if (!info.log) {
    info.log = () => {

    }
}

module.exports = info;
