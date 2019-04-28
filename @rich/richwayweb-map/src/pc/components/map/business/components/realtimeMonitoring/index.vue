<template>
	<div
		:class="[takeUp ? 'is-hide' : '', long && !takeUp ? 'is-long' : '']"
		class="monitor-gzshzh-container">
		<div class="monitor-item-list">
			<div
				class="panel-toggle"
				@click.stop="handelToggle">
				<i
					:class="[takeUp ? 'icon-left' :'icon-right']"
					class="richway-icon" />
				<span>{{ takeUp ? '展开' : '收起' }}</span>
			</div>
			<ul>
				<li
					v-for="(item, index) in subComponents"
					:class="[activeId === item.id ? 'active' : '']"
					:key="index"
					@click.stop="handleChooseItem(item)">
					<i
						:class="[item.config.icon || 'icon-monitor']"
						class="richway-icon" />
					<span>{{ item.config.title }}</span>
				</li>
			</ul>
		</div>
		<div class="monitor-panel">
			<div class="monitor-content">
				<keep-alive>
					<component
						:is="activeCmponent"
						:map="map"
						:config="activeConfig"
						@on-long="handleLong" />
				</keep-alive>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import businessComponentsList from './index';

export default {
    name: `realtimeMonitoring`,
    components: businessComponentsList,
    props: {
        map: {
            type: Object,
            default: () => {
            }
        },
        subComponents: {
            type: Array,
            default: () => []
        },
        config: {
            type: Object,
            default: () => {
            }
        }
    },
    data() {
        return {
            takeUp: false,
            long: false,
            activeId: ``,
            activeCmponent: null,
            activeConfig: {}
        };
    },
    mounted() {
        this._log(`subComponents is`, this.subComponents);
        let item = this.subComponents.find((item = {}) => item.active === true);
        if (!item) {
            [item] = this.subComponents;
        }
        this.handleChooseItem(item);

        // 获取当前行政区的边界数据并广播
        this.$getData.GetBoundary({ boundaryCode: window._RichWay.$map.currentRegionInfo.code }).then((res = {}) => {
            this.$mapLayersFun.MapCurrentRegionInfoBroadcastFun(res.data[0]);
        });

        this._log(`monitorGzshzh has mounted`);
    },
    destroyed() {
        this._log(`realtimeMonitoring: destroyed`);
        window._RichWay.$map.businessLayers = {};
    },
    methods: {
        handelToggle() {
            this.takeUp = !this.takeUp;
            this.$mapLayersFun.MapInitBroadcastFun({
                offsetX: this.takeUp ? 0 : 30
            });
        },
        handleChooseItem(item) {
            this._log(item.id);
            this.activeId = item.id;
            this.activeCmponent = item.componentName;
            this.activeConfig = item.config;
            this.takeUp = false;
            this.long = false;
        },
        handleLong(bl) {
            this.long = bl;
        }
    }
};
</script>

<style lang="scss">
		.monitor-gzshzh-container {
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			width: 30rem;
			transition: all .3s;
			pointer-events: auto;
		}

		.monitor-item-list {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			display: inline-block;
			width: 4rem;
			font-size: .9rem;
			color: #fff;
			background-color: rgba(71, 117, 202, 1);
			box-shadow: -2px 0 5px rgba(0, 0, 0, .447058823529412);

			.panel-toggle {
				height: 4rem;
				line-height: 4rem;
				text-align: center;
				cursor: pointer;

				&:hover {
					background-color: rgba(0, 0, 0, .4);
				}
			}

			li {
				position: relative;
				height: 4rem;
				padding: .6rem 0;
				border-top: 1px solid #133797;
				line-height: 4rem;
				text-align: center;
				cursor: pointer;

				.richway-icon {
					display: block;
					font-size: 1.3rem;
				}

				> span {
					position: absolute;
					top: 2.25rem;
					left: 50%;
					display: inline-block;
					height: 1rem;
					line-height: 1rem;
					transform: translateX(-50%);
				}

				&:hover {
					border-left: 5px solid rgba(78, 220, 251, 1);
					background-color: rgba(0, 0, 0, .3);
				}
			}

			.active {
				border-left: 5px solid rgba(78, 220, 251, 1);
				background-color: rgba(19, 55, 151, 1);
			}
		}

		.monitor-panel {
			display: inline-block;
			width: 100%;
			height: 100%;
			padding: .4rem .4rem .4rem 4.4rem;
			font-size: .8rem;
			background-color: rgba(241, 242, 244, 1);

			.monitor-content {
				height: 100%;
				border-radius: 7px;
				background-color: rgba(255, 255, 255, 1);

				> div {
					display: flex;
					flex-direction: column;
					max-height: 100%;
					padding: .5rem;
					overflow: hidden;
				}
			}

			.panel-form {
				padding: .2rem .5rem;
				margin: .5rem 0;
				border: 1px solid #eee;
				border-radius: 4px;
				background-color: #f9f9f9;
			}

			.panel-list {
				min-height: 5rem;
				border: 1px solid #eee;
				border-radius: 4px;
				overflow-y: auto;
			}

			.el-form-item__label,
			.el-radio__label,
			.el-checkbox__label,
			td,
			th,
			caption {
				font-size: .8rem !important;
			}

			.el-cascader{
				width: 100%;
			}

			.el-radio__inner {
				width: 1rem;
				height: 1rem;

				&::after {
					width: .5rem;
					height: .5rem;
				}
			}

			.el-checkbox__inner {
				width: 1rem;
				height: 1rem;

				&::after {
					top: -.1rem;
					width: .4rem;
					height: .7rem;
				}
			}

			.el-icon-search {
				font-size: 1.2rem;
			}

			.el-form-item__label {
				color: #000;
			}

			.el-form-item {
				margin-bottom: .2rem;
			}

			.el-input--medium {
				.el-input__inner {
					height: 2.3rem !important;
					font-size: .9rem;
					line-height: 2.3rem !important;

					&::-webkit-input-placeholder {
						font-size: .9rem;
					}
				}
			}

			.el-input-group__append {
				&:hover {
					background: rgba(0, 0, 0, .1);
				}
			}

			.el-checkbox + .el-checkbox {
				margin-left: 0 !important;
			}

			.el-checkbox-group{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
			}

			.el-input--suffix .el-input__inner{
				padding-right: 0 !important;
			}
		}

		.is-long {
			width: 61rem;
		}

		.is-hide {
			right: -26rem;
		}
</style>
