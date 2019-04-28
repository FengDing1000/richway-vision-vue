/**

 @Name：richwayui 项目的markdown文件
 @Author：g.zhou
 @License：MIT

 */

const path = require(`path`);
const fs = require(`fs`);

module.exports = ctx => {
    const pathUrl = ctx.request.path;
    if (pathUrl === `/markdown`) {
        const markdownHtmlPath = path.join(process.cwd(), `${_richwayKoaConfig.rootDirClientAssets}/markdown/html/index.html`);
        const markdownHtml = fs.readFileSync(markdownHtmlPath).toString();
        ctx.response.type = `html`;
        ctx.response.body = markdownHtml;
        return false;
    }
    return true;
};
