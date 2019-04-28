<template>
	<div
        class="monitor-gzshzh-container">
		<div class="monitor-item-list" :class="[takeUp ? 'is-hide' : '']">
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
        <div
            class="panel-toggle"
            @click.stop="handelToggle">
            <i
                :class="[takeUp ? 'icon-up-arrow' :'icon-down-arrow']"
                class="richway-icon" />
        </div>
        <mt-popup
            v-model="popupVisible"
            position="bottom">
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
        </mt-popup>
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
            popupVisible: false,
            takeUp: false,
            activeId: ``,
            activeCmponent: null,
            activeConfig: {}
        };
    },
    mounted() {
        this._log(`subComponents is`, this.subComponents);
        this._log(`monitorGzshzh has mounted`);
    },
    destroyed() {
        this._log(`realtimeMonitoring: destroyed`);
        window._RichWay.$map.businessLayers = {};
    },
    methods: {
        handelToggle() {
            this.takeUp = !this.takeUp;
        },
        handleChooseItem(item) {
            this._log(item.id);
            this.activeId = item.id;
            this.activeCmponent = item.componentName;
            this.activeConfig = item.config;
            this.popupVisible = true;
        }
    }
};
</script>

<style lang="scss" scoped>
		.monitor-gzshzh-container {
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			width: 2rem;
			transition: all .3s;
			pointer-events: auto;
		}

		.monitor-item-list {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			display: inline-block;
			width: 2rem;
			color: #fff;
			background-color: rgba(71, 117, 202, 1);
			box-shadow: -2px 0 5px rgba(0, 0, 0, .447058823529412);
            font-size: .6rem;
            transition: all .3s;

			li {
                display: flex;
                justify-content: center;
                flex-direction:column;
				position: relative;
				height: 2.2rem;
				border-top: 1px solid #133797;
				text-align: center;
				cursor: pointer;

				.richway-icon {
					display: block;
					font-size: 1rem;
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

        .panel-toggle {
            position: absolute;
            bottom: 0;
            width: 100%;
            display: flex;
            justify-content: center;
            flex-direction:column;
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            cursor: pointer;
            color: #fff;
            background-color: #4775ca;

            &:hover {
                background-color: rgba(0, 0, 0, .4);
            }
        }

        .mint-popup {
            width: 100%;
            color: #666;
            font-size: .6rem;
        }
		.monitor-panel {

			width: 100%;
			height: 100%;
			padding: .2rem;
			background-color: rgba(241, 242, 244, 1);
            font-size: .8rem;

			.monitor-content {
				border-radius: 7px;
                height: 100%;
				background-color: rgba(255, 255, 255, 1);
			}
		}

        .is-hide {
            transform: translateX(110%);
        }
</style>
