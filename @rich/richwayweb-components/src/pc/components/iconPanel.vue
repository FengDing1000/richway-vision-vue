<template>
	<ul class="icon-ul-list">
		<li
			v-for="item in iconList"
			:key="item.icon_code"
			:class="[activeIcon === item.icon_fontclass ? 'active' : '']"
			@click="handleClick(item)">
			<span>
				<i
					:class="item.icon_fontclass"
					class="richway-icon" />
				<span class="icon-name">{{ item.icon_fontclass }}</span>
			</span>
		</li>
	</ul>
</template>

<script type="text/ecmascript-6">
import iconInfo from "../../constants/icon.json";

export default {
    name: `rightAnim`,
    props: {
        activeIcon: {
            type: String,
            default: ``
        }
    },
    data() {
        return {
            iconList: iconInfo.iconList || []
        };
    },
    methods: {
        handleClick(data) {
            this.$emit(`on-choose`, data);
        }
    }
};
</script>

<style lang="scss" scoped>
		.icon-ul-list {
			list-style: none;
			width: 100%;
			padding: 0;
			margin: 0 auto;
			border: 1px solid #eaeefb;
			overflow: hidden;
			background: #fff;

			li {
				float: left;
				width: 12.5%;
				height: 6rem;
				border-bottom: 1px solid #eee;
				font-size: .65rem;
				line-height: 6rem;
				text-align: center;
				color: #666;
				transition: color .15s linear;
				border-right: 1px solid #eee;
				//margin-right: -1px;
				//margin-bottom: -1px;

				span {
					display: inline-block;
					font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
					line-height: normal;
					vertical-align: middle;
					color: #99a9bf;
				}

				&:hover {
					color: #fff;
					background: #f9f9f9;
				}
			}

			.active {
				background: rgba(0, 0, 0, .1);
			}

			.richway-icon {
				display: block;
				margin-bottom: .75rem;
				font-size: 1.6rem;
				color: #606266;
			}

			.icon-name {
				display: inline-block;
				height: 1em;
				padding: 0 .15rem;
				line-height: normal;
				vertical-align: middle;
				color: #606266;
			}
		}
</style>
