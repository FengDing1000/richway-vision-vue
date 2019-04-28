<template>
	<div class="nav-menu-content">
		<el-menu
			:mode="modeType"
			:default-active="activeIndex"
			:background-color="backgroundColor"
			:text-color="textColor"
			:collapse="collapse"
			:active-text-color="activeTextColor"
			unique-opened
			@select="handleSelect">
			<template v-for="(menu, index) in menuList">
				<el-menu-item
					v-if="!((menu || {}).children || []).length"
					:key="index"
					:index="index+''">
					<i
						:class="[menu.icon]"
						class="richway-icon" />
					<span slot="title">{{ menu.menuName }}</span>
				</el-menu-item>
				<el-submenu
					v-else
					:key="index"
					:index="index+''">
					<template slot="title">
						<i
							:class="[menu.icon]"
							class="richway-icon" />
						<span>{{ menu.menuName }}</span>
					</template>
					<template v-for="(subMenu, subIndex) in menu.children">
						<el-menu-item
							v-if="!((subMenu || {}).children || []).length"
							:key="subIndex"
							:index="index+'-'+subIndex">{{ subMenu.menuName }}
						</el-menu-item>
						<el-submenu
							v-else
							:key="subIndex"
							:index="subIndex+''">
							<template slot="title">
								<i
									:class="[subMenu.icon]"
									class="richway-icon" />
								<span>{{ subMenu.menuName }}</span>
							</template>
							<template v-for="(oMenu, oIndex) in subMenu.children">
								<el-menu-item
									:key="oIndex"
									:index="index+'-'+subIndex+'-'+oIndex">{{ oMenu.menuName }}
								</el-menu-item>
							</template>
						</el-submenu>
					</template>
				</el-submenu>
			</template>
		</el-menu>
	</div>
</template>

<script type="text/ecmascript-6">
import { goToPage } from "../../utils/pageInfo";

export default {
    name: `MenuBarTop`,
    props: {
        themeInfo: {
            type: Object,
            default: () => {
            }
        },
        menuList: {
            type: Array,
            default: () => []
        },
        menuActive: {
            type: String,
            default: ``
        },
        modeType: {
            type: String,
            default: ``
        },
        collapse: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },
    computed: {
        activeIndex() {
            let menuIndex = 0;
            let index = 0;
            for (const item of (this.menuList || [])) {
                if (item.url === this.menuActive) {
                    menuIndex = index;
                    break;
                } else {
                    let subIndex = 0;
                    for (const subItem of (item.children || [])) {
                        if (subItem.url === this.menuActive) {
                            menuIndex = `${index}-${subIndex}`;
                            break;
                        } else {
                            let oIndex = 0;
                            for (const oItem of (subItem.children || [])) {
                                if (oItem.url === this.menuActive) {
                                    menuIndex = `${index}-${subIndex}-${oIndex}`;
                                    break;
                                }
                                oIndex++;
                            }
                        }
                        subIndex++;
                    }
                }
                index++;
            }
            return `${menuIndex}`;
        },
        backgroundColor() {
            return this.themeInfo.backgroundColor || `#ffffff`;
        },
        textColor() {
            return this.themeInfo.color || `#303133`;
        },
        activeTextColor() {
            return this.themeInfo.activeTextColor || `#409EFF`;
        }
    },
    // 事件处理器
    methods: {
        handleSelect(key, keyPath) {
            const activePathArr = `${keyPath[keyPath.length - 1]}`.split(`-`);
            let activeItem = null;
            if (activePathArr.length === 1) {
                activeItem = this.menuList[activePathArr[0]];
            } else if (activePathArr.length === 2) {
                activeItem = this.menuList[activePathArr[0]].children[activePathArr[1]];
            } else if (activePathArr.length === 3) {
                activeItem = this.menuList[activePathArr[0]].children[activePathArr[1]].children[activePathArr[2]];
            }
            // const activeUrl = activeItem.url;
            // if (!activeUrl || location.pathname === activeUrl) {
            //     return false;
            // }
            // const target = activeItem.target || `_blank`;
            // if (target === `_single`) {
            //     this.$router.push(activeUrl);
            // } else if (target === `_blank`) {
            //     window.open(activeUrl);
            // } else {
            //     window.location.href = activeUrl;
            // }
            this.$emit(`on-select`, activeItem);
            goToPage(activeItem, this.$router);
        }
    }
};
</script>

<style lang="scss">
		.nav-menu-content {
			display: inline-block;
		}
</style>
