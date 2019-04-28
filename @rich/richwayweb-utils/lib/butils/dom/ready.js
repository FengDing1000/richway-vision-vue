/**
 * 浏览器加载页面的顺序：
 * 1、 解析HTML结构
 * 2、 加载外部脚本和样式表文件
 * 3、 解析并执行脚本代码
 * 4、 构造HTML DOM模型==ready()
 * 5、 加载图片等组件
 * 6、 页面加载完毕==onload()
 * ready事件是在DOM模型构造完毕时触发
 * load事件是在页面加载完毕后触发
 * @param {object}fn is
 */
function ready(fn) {
    if (document.addEventListener) {
        document.addEventListener(`DOMContentLoaded`, () => {
            // 注销事件, 避免反复触发
            document.removeEventListener(`DOMContentLoaded`, arguments.callee, false);
            fn(); // 执行函数
        }, false);
    } else if (document.attachEvent) { // IE
        document.attachEvent(`onreadystatechange`, () => {
            if (document.readyState === `complete`) {
                document.detachEvent(`onreadystatechange`, arguments.callee);
                fn(); // 函数执行
            }
        });
    }
}

module.exports = ready;
