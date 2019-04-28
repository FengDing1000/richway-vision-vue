<template>
	<div class="richway-main-slide richway-shadow">
		<div class="slide-title">
			<i class="richway-icon icon-list" />导航菜单
		</div>
		<div class="slide-content">
			<MenuBarHorizontal
				key="1"
				:theme-info="themeInfo"
				:menu-list="currentMenuList"
				:menu-active="menuActive"
				:collapse="collapse"
				mode-type="vertical"
				@on-select="handleSelect" />
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import menu from '@rich/richwayweb-utils/lib/model/menu';

const { mapState, mapMutations } = require(`vuex`);
const MenuBarHorizontal = r => require.ensure([], () => r(require(`../../../navmenu/menuBarHorizontal`)), `richway_components`);

export default {
    name: `slide`,
    components: {
        MenuBarHorizontal
    },
    props: {
        slide: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            themeInfo: {
                backgroundColor: `white`,
                color: `#000`,
                activeTextColor: `#333`
            }
        };
    },
    computed: {
        ...mapState([`menuList`, `currentPageInfo`, `currentMenu`]),
        currentMenuList() {
            return menu.getFirstMenu((this.currentPageInfo.info || {}).menuId, this.menuList).children;
        },
        menuActive() {
            return this.currentMenu || window.location.pathname;
        },
        collapse() {
            return false;
        }
    },
    methods: {
        ...mapMutations([`SET_CURRENT_MENU`]),
        handleSelect(item) {
            this.SET_CURRENT_MENU(item.url);
        }
    }
};
</script>

<style lang="scss">
    .richway-layout-base {
        .richway-main-slide {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            display: inline-block;
            width: 8.1rem;
            overflow: hidden;
            color: #000;
            background-color: white;

            .slide-title {
                padding: 0.9rem 0.5rem 0.9rem 1.15rem;
                background-color: rgb(255, 255, 255);
                border-bottom: 2px solid #888;

                .richway-icon {
                    margin-right: .5rem;
                }
            }

            .slide-content {
                position: absolute;
                top: 2.1rem;
                bottom: 0;
                width: 100%;
                overflow-y: auto;
            }

            .nav-menu-content {
                width: 100%;
            }

            .el-menu {
                border-right: none;

                .is-active {
                    border-right: .2rem solid #108ee9;
                    background-color: rgba(0, 0, 0, .1) !important;
                }
            }

            .el-menu-item,
            .el-submenu__title {
                font-size: .8rem;
            }
        }
    }
</style>
