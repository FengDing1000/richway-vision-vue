<template>
	<div class="header-first-menu">
		<ul>
			<li
				v-for="(item, index) in menuList"
				:class="[item.menuId === currentMenuId? 'active' : '']"
				:key="index"
				class="menu-item"
				@click="handleClick(item)">
				<span>{{ item.menuName }}</span>
			</li>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
import menu from '@rich/richwayweb-utils/lib/model/menu';
import { goToPage } from "../../../../utils/pageInfo";

const { mapState } = require(`vuex`);

export default {
    name: `headerFirstMenu`,
    props: {},
    data() {
        return {};
    },
    computed: {
        ...mapState([`currentPageInfo`, `menuList`]),
        currentMenuId() {
            return menu.getFirstMenu((this.currentPageInfo.info || {}).menuId, this.menuList).menuId;
        }
    },
    methods: {
        handleClick(item) {
            goToPage(item, this.$router);
        }
    }
};
</script>

<style lang="scss" scoped>
		.header-first-menu {
			display: inline-block;
			width: auto;

			.menu-item {
				position: relative;
				float: left;
				display: inline-block;
				width: 5.45rem;
				height: 3rem;
				line-height: 3rem;
				text-align: center;
				color: #fff;

				&:hover {
					background-color: rgba(0,0,0,.1);
					cursor: pointer;
				}
			}

			.active {
				border-bottom: 3px solid #fff;
				background-color: rgba(0,0,0,.1);
			}
		}
</style>
