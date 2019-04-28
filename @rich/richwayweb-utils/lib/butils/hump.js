module.exports = (str = ``) => {
    const regexp = /[-_](\w)/g;
    str = str.replace(regexp, ($0, $1) => $1.toUpperCase());
    return str;
};
