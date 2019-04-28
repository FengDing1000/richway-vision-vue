/**
 * @desc 获取滚动条距顶部的距离
 * @return {string} is
 */
function getScrollTop() {
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
}

module.exports = getScrollTop;
