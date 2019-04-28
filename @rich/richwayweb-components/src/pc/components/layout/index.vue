<template>
	<section
		:style="themeInfo"
		:class="[layoutInfo.skin,
			layoutInfo.header.display === `show` ? 'has-header' : '',
			layoutInfo.header.takeUp ? 'richway-header-take-up' : '',
			((layoutInfo.header.rollType === `fixed` && layoutInfo.header.position === 'top') ? 'richway-header-fixed' : ''),
			(layoutInfo.container === 'fill' || layoutInfo.header.position === 'left') ? 'richway-container-fill' : '',
			(layoutInfo.header.position === 'left') ? 'richway-header-left' : '']"
		class="richway-container richway-layout-base richway-clear">

		<!-- 头部 -->
		<LayoutHeader v-if="layoutInfo.header.display === `show`">
			<template slot="headerSlot">
				<slot name="header" />
			</template>
		</LayoutHeader>

		<!-- 中间区域 -->
		<LayoutMain
			v-if="layoutInfo.main.display === `show`"
			:slide="layoutInfo.main.slide"
			:breadcrumb="layoutInfo.main.breadcrumb">
			<template slot="mainSlot">
				<slot name="main" />
			</template>
		</LayoutMain>

		<!-- 尾部 -->
		<LayoutFooter v-if="layoutInfo.footer.display === `show`">
			<template slot="footerSlot">
				<slot name="footer" />
			</template>
		</LayoutFooter>

		<!-- 全局的ajax加载loading -->
		<BriefLoading :brief-loading="briefLoading" />

		<!-- 全局的全屏加载loading -->
		<FullLoading :full-loading="fullLoading" />

		<!-- 回到顶部 -->
		<BackTop />
	</section>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';

const { mapState } = require(`vuex`);
const LayoutHeader = r => require.ensure([], () => r(require(`./detail/header`)), `components/layout/base`);
const LayoutMain = r => require.ensure([], () => r(require(`./detail/main`)), `components/layout/base`);
const LayoutFooter = r => require.ensure([], () => r(require(`./detail/footer`)), `components/layout/base`);
const FullLoading = r => require.ensure([], () => r(require(`../loading/fullLoading`)), `richway_components`);
const BriefLoading = r => require.ensure([], () => r(require(`../loading/briefLoading`)), `richway_components`);
const BackTop = r => require.ensure([], () => r(require(`../backTop`)), `richway_components`);
const { getRequest } = RichWayWebUtils;

// import _setting from '$src/constants/setting';

export default {
    name: `layout`,
    // 注册指令,包含 Vue 实例可用指令的哈希表。
    directives: {},
    // 注册过滤器,包含 Vue 实例可用过滤器的哈希表。
    filters: {},
    // 注册组件,包含 Vue 实例可用组件的哈希表。
    components: {
        LayoutHeader,
        LayoutMain,
        LayoutFooter,
        FullLoading,
        BriefLoading,
        BackTop
    },
    // 可以是数组或对象，用于接收来自父组件的数据
    props: {},
    // Vue 实例的数据对象
    data() {
        return {};
    },
    // 计算属性
    computed: {
        ...mapState([
            `currentPageInfo`,
            `settingInfo`,
            `fullLoading`,
            `briefLoading`,
            `fastLogin`
        ]),
        themeInfo() {
            // const info = _setting.getColorInfo(this.settingInfo.bgColor);
            const info = {};
            return {
                backgroundColor: info.backgroundColor || `#f2f7fa`,
                color: info.color || `#333`
            };
        },
        layoutInfo() {
            const moduleName = this.currentPageInfo.module;
            const moduleLayoutInfo = (this.$store.state[moduleName] || {}).layoutInfo || {};
            this._log(`current module has change...moduleName is:${moduleName}, module is`, this.$store.state[moduleName]);

            const info = {
                skin: moduleLayoutInfo.skin || `default-container`,
                container: this.settingInfo.container,
                header: Object.assign({}, {
                    display: `show`,
                    takeUp: false,
                    rollType: `follow`,
                    position: `top`
                }, moduleLayoutInfo.header, {
                    takeUp: this.settingInfo.headerTakeUp,
                    rollType: this.settingInfo.headerRollType,
                    position: this.settingInfo.headerPosition
                }),
                main: Object.assign({}, {
                    display: `show`,
                    slide: true,
                    breadcrumb: true
                }, moduleLayoutInfo.main),
                footer: Object.assign({}, {
                    display: `show`
                }, moduleLayoutInfo.footer)
            };

            const requestInfo = getRequest();
            if (requestInfo.configureType) {
                info.header.display = `hide`;
                info.main.slide = false;
                info.main.breadcrumb = false;
                info.footer.footer = `hide`;
            }

            return info;
        }
    },
    // Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。
    // 注意，不应该使用箭头函数来定义 watcher 函数
    watch: {},
    // 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
    beforeCreate() {
        // this._log(`layout: beforeCreate`);
    },
    // 在挂载开始之前被调用：相关的 render 函数首次被调用。
    beforeMount() {
        this._log(`layout: beforeMount`);
    },
    // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
    // 注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
    mounted() {
        this._log(`layout: mounted`);
        this._log(`state is:`, this.$store);
        this._log(`router is:`, this.$router);
        // 隐藏加载动画
        document.getElementById(`richway_init_loading`).style.display = `none`;
    },
    // 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
    beforeUpdate() {
        this._log(`layout: beforeUpdate`);
    },
    // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
    updated() {
        this._log(`layout: updated`);
    },
    // keep-alive 组件激活时调用。
    activated() {
        this._log(`layout: activated`);
    },
    // keep-alive 组件停用时调用。
    deactivated() {
        this._log(`layout: deactivated`);
    },
    // 实例销毁之前调用。在这一步，实例仍然完全可用。
    beforeDestroy() {
        this._log(`layout: beforeDestroy`);
    },
    // Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    destroyed() {
        this._log(`layout: destroyed`);
    },
    // 事件处理器
    methods: {},
    // 在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
    create() {
        this._log(`layout: create`);
    }
};
</script>

<style lang="scss">
    $takeUpW: 3rem;

    .richway-layout-base {
        &.richway-container {
            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 1;
            box-sizing: border-box;
            width: 1200px;
            min-width: 1200px;
            height: 100%;
            margin: 0 auto;
            font-size: .8rem;
            background-color: #f2f7fa;

            .richway-header,
            .richway-main,
            .richway-footer {
                box-sizing: border-box;
                width: 1200px;
            }

            .el-menu {
                border-bottom: 0;
                border-right: 0;
            }
        }

        &.richway-container-fill {
            width: 100%;

            .richway-header,
            .richway-main,
            .richway-footer {
                width: 100%;
            }
        }
    }


</style>
