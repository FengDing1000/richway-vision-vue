const fs = require(`fs`);
const path = require(`path`);
const KoaMenu = require(`@rich/richwayweb-utils/lib/model/appMenu`);
const KoaAppJson = require(`@rich/richwayweb-utils/lib/model/appJson`);
const KoaRouter = require(`@rich/richwayweb-utils/lib/model/router`);
const KoaInterfaceHandle = require(`@rich/richwayweb-utils/lib/model/interfaceHandle`);
const {directory} = require(`@rich/richwayweb-utils/lib/nutils`);

function writeFile(o) {
    return new Promise(function (resolve, reject) {
        try {
            const dirPath = path.dirname(o.path);
            directory.mkdirsSync(dirPath, () => {
                fs.writeFile(o.path, o.data, (err) => {
                    if (err) {
                        console.log(`Rewrite ${o.fileName} failure...`);
                        reject();
                    } else {
                        console.log(`Rewrite ${o.fileName} completes...`);
                        resolve();
                    }
                });
            });
        } catch (err) {
            console.log(`Rewrite ${o.fileName} error...`, err);
            reject();
        }
    });
}

/**
 * 生成fetch需要的文件
 * @param {string} platform is
 * @return {boolean} is
 */
function writeFetchFile(platform = `pc`, config, flag) {
    const interfaceRouter = require(path.join(process.cwd(), config.interface_router_path));
    const fetchList = [];
    fetchList.push(`export default {`);
    const arr = [];
    for (const item of (interfaceRouter.list || [])) {
        for (const subItem of item.list) {
            const {node} = KoaInterfaceHandle(subItem);
            if (!node.config) {
                node.config = {};
            }
            if (node.method === `get`) {
                node.config.method = node.method;
            }
            if (node.fetchName) {
                arr.push(`    // ${node.description}`);
                arr.push(`    ${node.fetchName}: params => fetch(\`${item.prefix}${node.url}\`, params, ${JSON.stringify(node.config || {})})`);
            }
        }
    }
    fetchList.push(arr.join(`,\n`));
    fetchList.push(`};`);

    let fetchPath = config.fetch_pc_path || config.fetch_path;
    if (platform === `wap`) {
        fetchPath = config.fetch_wap_path;
    }
    const fetch = flag === `components` ? `$${platform}/utils/fetch` : `@rich/richwayweb-components/src/${platform}/utils/fetch`;
    fetchList.unshift(`import fetch from '${fetch}';\n`);

    const writeStream = fetchList.join(`\n`);
    const fetchFileName = path.join(process.cwd(), fetchPath);

    return writeFile({
        path: `./${fetchPath}`,
        data: writeStream,
        fileName: fetchFileName
    });
}

/**
 * 通过读取src里面的页面入口，生成服务需要的页面路由数据
 * @param {object}routerList is
 * @param {string} platform is
 * @returns {boolean} is
 */
function writeServiceRouterFile(routerList, platform = `pc`, config) {
    routerList = routerList.sort((a = {}, b = {}) => a.url < b.url);
    const newRouterList = [];
    for (const item of routerList) {
        item.platform = platform;
        newRouterList.push(new KoaRouter.Router(item));
    }
    let serviceRouterPath = config.service_router_pc_path;
    if (platform === `wap`) {
        serviceRouterPath = config.service_router_wap_path;
    }
    // 写入config/service.router.js文件
    const serviceRouterFileName = path.join(process.cwd(), serviceRouterPath);
    const serviceRoutersData = require(serviceRouterFileName);
    serviceRoutersData.pages = newRouterList;
    const writeStream = `module.exports = ${JSON.stringify(serviceRoutersData, null, 4)}`;

    return writeFile({
        path: `./${serviceRouterPath}`,
        data: writeStream,
        fileName: serviceRouterFileName
    });
}

/**
 * 通过读取src里面的页面入口，生成前端vue-router需要路由文件
 * @param {object}componentList is
 * @param {string} platform is
 * @returns {boolean} is
 */
function writeRouterFile(componentList, platform, config) {
    let routesPath = config.routes_pc_path || config.routes_path;
    if (platform === `wap`) {
        routesPath = config.routes_wap_path;
    }

    const routesStrArr = [];
    for (const item of componentList) {
        const code = `${item.code}`.toUpperCase().replace(/\//g, `_`);
        routesStrArr.push(`// ${item.title}页面的一级路由`);
        routesStrArr.push(`import ${code} from '${item.root}/router';`);
    }
    routesStrArr.push(`\nconst routes = [];`);
    for (const item of componentList) {
        const code = `${item.code}`.toUpperCase().replace(/\//g, `_`);
        routesStrArr.push(`routes.push(${code});`);
    }
    routesStrArr.push(`\nexport default routes;`);

    const writeStream = routesStrArr.join(`\n`);
    const routesFileName = path.join(process.cwd(), routesPath);

    return writeFile({
        path: `./${routesPath}`,
        data: writeStream,
        fileName: routesFileName
    });
}

/**
 * 通过读取src里面的页面入口，生成前端vuex需要modules文件
 * @param {object}componentList is
 * @param {string} platform is
 * @returns {boolean} is
 */
function writeModulesFile(componentList, platform, config) {
    let modulesPath = config.modules_pc_path || config.modules_path;
    if (platform === `wap`) {
        modulesPath = config.modules_wap_path;
    }

    const modulesStrArr = [];
    for (const item of componentList) {
        modulesStrArr.push(`// ${item.title}页面的store`);
        modulesStrArr.push(`import ${item.module} from '${item.root}/store';`);
    }
    modulesStrArr.push(`\nconst modules = {`);
    const arr = [];
    for (const item of componentList) {
        arr.push(`    ${item.module}`);
    }
    modulesStrArr.push(arr.join(`,\n`));
    modulesStrArr.push(`};\n`);
    modulesStrArr.push(`\nexport default modules;`);

    const writeStream = modulesStrArr.join(`\n`);
    const modulesFileName = path.join(process.cwd(), modulesPath);

    return writeFile({
        path: `./${modulesPath}`,
        data: writeStream,
        fileName: modulesFileName
    });
}

function menuSort(children = []) {
    let arr = [];
    for (const item of children) {
        if (((item || {}).children || []).length) {
            item.children = menuSort((item || {}).children);
        }
    }
    arr = children.sort((a = {}, b = {}) => a.sortId > b.sortId);
    return arr;
}

/**
 * 通过读取src里面的页面入口，生成菜单列表
 * @param {object}menuList is
 * @param {string} platform is
 * @returns {boolean} is
 */
function writeMenuFile(menuList, platform, config) {
    menuList = menuSort(menuList);
    const writeStream = `module.exports = ${JSON.stringify(menuList, null, 4)}`;
    const menuFileName = path.join(process.cwd(), config.menu_path);

    return writeFile({
        path: `./${config.menu_path}`,
        data: writeStream,
        fileName: menuFileName
    });
}


/**
 * 生成接口路由文件
 * @return {*}
 */
function writeInterfaceFile() {
    const interfaceRouterInfo = require(path.join(process.cwd(), _richwayKoaConfig.interface_router_path));
    const writeStream = `module.exports = ${JSON.stringify(interfaceRouterInfo, null, 4)}`;
    const targetPath = `server/interface/index.js`;
    const interfaceFileName = path.join(process.cwd(), targetPath);

    return writeFile({
        path: `./${targetPath}`,
        data: writeStream,
        fileName: interfaceFileName
    });
}


/**
 * 生成socket路由文件
 * @return {*}
 */
function writeSocketFile() {
    const socketRouterInfo = require(path.join(process.cwd(), _richwayKoaConfig.socket_router_path));
    const writeStream = `module.exports = ${JSON.stringify(socketRouterInfo, null, 4)}`;
    const targetPath = `server/socket/index.js`;
    const socketFileName = path.join(process.cwd(), targetPath);

    return writeFile({
        path: `./${targetPath}`,
        data: writeStream,
        fileName: socketFileName
    });
}

/**
 * 重写页面的app.json
 * @param {string}appPath is
 * @param {string}pageName is
 * @param {string}dirName is
 * @return {*} is
 */
function writeAppJson(appPath, pageName, dirName, platform) {
    if (fs.existsSync(appPath)) {
        let appConfig = JSON.parse(fs.readFileSync(appPath).toString());
        appConfig.pageName = pageName;
        appConfig.dirName = dirName;
        appConfig.platform = platform;
        appConfig = new KoaAppJson.AppJson(appConfig);
        // 重写app.json文件
        fs.writeFileSync(appPath, JSON.stringify(appConfig, null, 4));
        return appConfig;
    }
    return {};
}

/**
 * 获取入口页面数组
 * @param {object} o 入口页面所在的文件夹
 * @returns {Boolean} is 入口文件信息的数组
 */
function getPages(o) {
    for (const dirName of fs.readdirSync(o.path)) {
        // common目录除外
        if (dirName !== `common`) {
            const pageName = o.prefix + dirName;
            const childDirPath = path.join(o.path, dirName);
            if (fs.statSync(childDirPath).isDirectory()) {
                const appConfig = writeAppJson(path.join(childDirPath, `app.json`), pageName, dirName, o.platform);
                if (appConfig.type === `root`) {
                    const entryPath = path.join(childDirPath, appConfig.entry);
                    if (appConfig.compiled && fs.existsSync(entryPath)) {
                        o.routerList.push(Object.assign(appConfig, {
                            entry: entryPath,
                            template: path.resolve(appConfig.template),
                            filename: `html/${appConfig.fileName || pageName}.html`,
                            keysWords: appConfig.keysWords || o.config.webpack.keysWords,
                            description: appConfig.description || o.config.webpack.description,
                            ico: appConfig.ico || o.config.webpack.ico
                        }));
                        if (appConfig.menu === true) {
                            o.menuList.push(new KoaMenu.MenuForFile(appConfig));
                        }
                        getPages({
                            path: childDirPath,
                            prefix: `${pageName}/`,
                            routerList: o.routerList,
                            menuList: o.menuList,
                            componentList: o.componentList,
                            config: o.config,
                            platform: o.platform
                        });
                    } else {
                        continue;
                    }
                } else if (appConfig.type === `page` || appConfig.type === `component`) {
                    const entryPath = path.join(childDirPath, appConfig.entry);
                    // 如果是具体的页面
                    if (appConfig.compiled && fs.existsSync(entryPath)) {
                        if (appConfig.type === `page`) {
                            o.routerList.push(Object.assign(appConfig, {
                                entry: entryPath,
                                template: path.resolve(appConfig.template),
                                filename: `html/${appConfig.fileName || pageName}.html`,
                                keysWords: appConfig.keysWords || o.config.webpack.keysWords,
                                description: appConfig.description || o.config.webpack.description,
                                ico: appConfig.ico || o.config.webpack.ico
                            }));
                        }
                        if (appConfig.type === `component`) {
                            o.componentList.push(appConfig);
                        }
                        if (appConfig.menu === true) {
                            o.menuList.push(new KoaMenu.MenuForFile(appConfig));
                        }
                    }
                } else {
                    let currentMenuInfo = {};
                    if (appConfig.menu === true) {
                        // 如果是父级菜单
                        appConfig.type = `label`;
                        currentMenuInfo = new KoaMenu.MenuForFile(appConfig);
                        o.menuList.push(currentMenuInfo);
                    }
                    getPages({
                        path: childDirPath,
                        prefix: `${pageName}/`,
                        routerList: o.routerList,
                        menuList: currentMenuInfo.children || o.menuList,
                        componentList: o.componentList,
                        config: o.config,
                        platform: o.platform
                    });
                }
            }
        }
    }
    return true;
}

/**
 * 获取webpack打包需要的入口文件信息
 * @param {object}o is
 * @return {Array} is
 */
exports.getPagesInfo = (o = {}) => {
    const startTime = (new Date()).getTime();
    return new Promise(function (resolve, reject) {
        const routerList = [];
        const menuList = [];
        const componentList = [];
        getPages({
            path: o.path,
            prefix: ``,
            routerList,
            menuList,
            componentList,
            config: o.config,
            platform: o.platform
        });

        Promise.all([
            writeMenuFile(menuList, o.platform, o.config),
            writeServiceRouterFile(routerList, o.platform, o.config),
            writeModulesFile(componentList, o.platform, o.config),
            writeRouterFile(componentList, o.platform, o.config),
            writeFetchFile(o.platform, o.config, o.flag)
            // writeInterfaceFile(),
            // writeSocketFile()
        ]).then(() => {
            console.log(`There are ${routerList.length} pages in total`, (new Date()).getTime() - startTime);
            resolve(routerList);
        }).catch((err) => {
            reject(err);
        });
    });
};
