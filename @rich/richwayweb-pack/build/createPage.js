const path = require(`path`);
const fs = require(`fs`);
const {directory} = require(`@rich/richwayweb-utils/lib/nutils`);

function getRouterIndex(dir) {
    const str = `import RichWayWebUtils from '@rich/richwayweb-utils';
import appConfig from '../app.json';

const _log = RichWayWebUtils.console.log;
// 一级路由的组件
const firstComponent = r => require.ensure([], () => r(require(\`../template\`)), \`pages/${dir}\`);
const firstUrl = (appConfig.url || \`\`).substring(1);

export default {
    path: firstUrl,
    // 一级路由
    component: firstComponent,
    meta: appConfig,
    beforeEnter: (to, from, next) => {
        _log(\`Will enter \$\{firstUrl\}...\`);
        next();
    },
    children: []
};
`;
    return str;
}

function getStoreState(o) {
    const str = `export default {
    layoutInfo: {
        skin: \`container-${(o.pageName || ``).replace(`_`, `-`)}\`,
        footer: {
            display: \`hide\`
        }
    }
};
`;
    return str;
}

function getExportDefault() {
    const str = `export default {

};
`;
    return str;
}

function getStoreIndex() {
    const str = `import state from './state';
import getters from './getters';
import actions from './action';
import mutations from './mutations';

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
`;
    return str;
}

function getAppJson(o) {
    const str = `{
    "code": "",
    "type": "${o.type}",
    "title": "${o.title}",
    "icon": "",
    "url": "",
    "fileName": "",
    "menu": true,
    "sort": 999,
    "root": "",
    "compiled": true,
    "module": "",
    "target": "_single",
    "keysWords": "",
    "description": "",
    "ico": "",
    "method": "get",
    "mustLogin": true,
    "template": "index.html",
    "entry": "index.js",
    "css": [],
    "preJS": [],
    "js": [],
    "layoutId": "Layout-Base"
}`;
    return str;
}

function getTemplateIndex(o) {
    const className = (o.pageName || ``).replace(`_`, `-`);

    const componentName = (o.component || {}).name;
    const componentPackage = (o.component || {}).package;
    if (componentName && componentPackage) {
        const packageName = componentPackage.replace(`@rich/`, ``).replace(/(-\w{1})/g, ($s1)=>{return $s1.replace(`-`, ``).toUpperCase()}).replace(/^\w{1}/, ($s1)=>{return $s1.toUpperCase()});
        const str2 = `<template>
	<${componentName} />
</template>

<script type="text/ecmascript-6">
import ${packageName} from '${componentPackage}';

const { ${componentName} } = ${packageName};

export default {
    components: {
        ${componentName}
    }
};
</script>
`;
        return str2;
    }

    const str = `<template>
	<div class="content content-${className}">
		<BuildPanel page-name="${o.title}" />
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebComponents from '@rich/richwayweb-components';

const { BuildPanel } = RichWayWebComponents;

export default {
    components: {
        BuildPanel
    },
    data() {
        return {};
    },
    computed: {},
    mounted() {
        this._log(\`${o.pageName} has mounted\`);
    },
    methods: {}

};
</script>

<style lang="scss" scoped>
    .content-${className}{
      position: relative;
    }
</style>
`;
    return str;
}

function getIndexJs(flag, platform) {
    const main = flag === `components` ? `$${platform}/main` : `@rich/richwayweb-components/src/${platform}/main`;
    const str = `import main from '${main}';
import config from './app.json';

main({
    config
});
`;
    return str;
}

function writeFile(o) {
    return new Promise(function (resolve, reject) {
        try {
            const dirPath = path.dirname(o.path);
            directory.mkdirsSync(dirPath, () => {
                fs.writeFile(o.path, o.data, (err) => {
                    if (err) {
                        console.log(`Create file ${o.path} failure...`);
                        reject();
                    } else {
                        console.log(`Create file ${o.path} completes...`);
                        resolve();
                    }
                });
            });
        } catch (err) {
            console.log(`Create file ${o.path} error...`, err);
            reject();
        }
    });
}

function mkdir(o) {
    return new Promise(function (resolve, reject) {
        try {
            directory.mkdirsSync(o.path, () => {
                console.log(`Create dir ${o.path} completes...`);
                resolve();
            });
        } catch (err) {
            console.log(`Create dir ${o.path} error...`, err);
            reject();
        }
    });
}

function init(o = {}, config = {}) {
    console.log(`Start create new page...`);
    const startTime = (new Date()).getTime();
    return new Promise(function (resolve, reject) {
        const pageName = o.dir.substring(o.dir.lastIndexOf(`/`) + 1);
        o.pageName = pageName;
        const platform = o.platform || `pc`;
        const dirPath = path.join(config.rootDirDev, `${platform}/pages`, o.root, o.dir);

        if (!o.cover && fs.existsSync(dirPath)) {
            console.log(`The current page already exists and cannot be overwritten`);
            resolve();
            return false;
        }

        mkdir({
            path: dirPath
        }).then(() => {
            if (o.type === `page` || o.type === `component`) {
                const routerPath = path.join(dirPath, `router`);
                const storePath = path.join(dirPath, `store`);
                const templatePath = path.join(dirPath, `template`);

                return Promise.all([
                    writeFile({
                        path: path.join(routerPath, `index.js`),
                        data: getRouterIndex(o.dir)
                    }),
                    writeFile({
                        path: path.join(storePath, `action.js`),
                        data: getExportDefault()
                    }),
                    writeFile({
                        path: path.join(storePath, `getters.js`),
                        data: getExportDefault()
                    }),
                    writeFile({
                        path: path.join(storePath, `index.js`),
                        data: getStoreIndex()
                    }),
                    writeFile({
                        path: path.join(storePath, `mutations.js`),
                        data: getExportDefault()
                    }),
                    writeFile({
                        path: path.join(storePath, `state.js`),
                        data: getStoreState(o)
                    }),
                    writeFile({
                        path: path.join(templatePath, `index.vue`),
                        data: getTemplateIndex(o)
                    }),
                    writeFile({
                        path: path.join(dirPath, `app.json`),
                        data: getAppJson(o)
                    }),
                    writeFile({
                        path: path.join(dirPath, `index.js`),
                        data: getIndexJs(o.flag, platform)
                    })
                ]);
            } else {
                return writeFile({
                    path: path.join(dirPath, `app.json`),
                    data: getAppJson(o)
                });
            }
        }).then(() => {
            console.log(`create page success!!`, (new Date()).getTime() - startTime);
            resolve();
        }).catch((err) => {
            reject(err);
        });
    });
}


// init({
//     root: `gzshzh`,
//     dir: `water_rain_pages/rain_information/rainfall_contrast`,
//     title: `雨量对比`,
//     type: `component`
// });


module.exports = init;
