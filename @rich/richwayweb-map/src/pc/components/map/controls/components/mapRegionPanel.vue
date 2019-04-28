<template>
	<div class="map-region-panel">
		<template v-if="type === 'cascader'">
			<CascaderSegion
				:selected-options="selectedOptions"
				:change-on-select="true"
				:region-info="regionInfo"
				@on-change="handleChangeProvince" />
			<el-button
				type="primary"
				@click="handelSure">确定</el-button>
		</template>
		<template v-else>
			<div class="region-content">
				<ul class="region-city">
					<li
						v-for="(item, index) in regionData"
						:key="index"
						class="richway-clear">
						<div
							class="region-city-panel"
							@click.stop="handleChooseCity(item)">
							<span
								:class="[currentRegionInfo.code === item.adcd ? 'active' : '']"
								class="region-title">{{ item.adnm }}</span>
						</div>
						<ul
							v-if="(item.children || []).length"
							class="region-county">
							<li
								v-for="(subItem, subIndex) in item.children"
								:key="subIndex">
								<span
									:class="[currentRegionInfo.code === subItem.adcd ? 'active' : '']"
									class="region-title"
									@click.stop="handleChooseCounty(subItem)">{{ subItem.adnm }}</span>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</template>
	</div>
</template>

<script type="text/ecmascript-6">
import CascaderSegion from '@rich/richwayweb-components/src/pc/components/region/cascaderSegion';
import RichWayWebUtils from '@rich/richwayweb-utils';

const { deepClone } = RichWayWebUtils;

export default {
    name: `RegionControl`,
    components: {
        CascaderSegion
    },
    props: {
        type: {
            type: String,
            default: `cascader`
        }
    },
    data() {
        return {
            chooseRegionInfo: {
                code: ``,
                name: ``
            },
            currentRegionInfo: {
                code: ``,
                name: ``
            },
            regionData: {}
        };
    },
    computed: {
        selectedOptions() {
            return [];
        }
    },
    created() {
        this.regionInfo = (window._RichWay.$map || {}).currentRegionInfo || {};
        if (this.type === `panel`) {
            this.$getData.GetRegionData({
                adcd: this.regionInfo.code,
                depth: 2
            }).then(res => {
                if ((this.regionInfo.code || ``).substring(2, 4) === `00`) {
                    this.regionData = ((res.data || [])[0] || {}).children;
                } else {
                    this.regionData = res.data;
                }
            });
        }
    },
    methods: {
        // 选择政区
        handleChangeProvince(value = {}) {
            const adCdList = value.adCdList || [];
            const adCdListLen = adCdList.length;
            const adNmList = value.adNmList || [];
            const adNmListLen = adNmList.length;

            this.chooseRegionInfo = {
                code: adCdList[adCdListLen - 1],
                name: adNmList[adNmListLen - 1]
            };
            this._log(`this.chooseRegionInfo is `, this.chooseRegionInfo);
        },
        handelSure() {
            this.currentRegionInfo = deepClone(this.chooseRegionInfo);
            this.$getData.GetBoundary({ boundaryCode: this.currentRegionInfo.code }).then((res = {}) => {
                this.$mapLayersFun.MapCurrentRegionInfoBroadcastFun(res.data[0]);
            });

            this.$emit(`choose`, this.currentRegionInfo);
        },

        handleChooseCity(item) {
            this._log(`choose city`, item);

            this.chooseRegionInfo = {
                code: item.adcd,
                name: item.adnm
            };
            this.handelSure();
        },
        handleChooseCounty(item) {
            this._log(`choose county`, item);
            if (item.adcd) {
                this.chooseRegionInfo = {
                    code: item.adcd,
                    name: item.adnm
                };
                this.handelSure();
            }
        }
    }
};
</script>

<style lang="scss">
    .map-region-panel {
        position: relative;
        .el-cascader {
            width: 16.5rem;
        }
        >.el-button {
            position: absolute;
            right: 0;
            top: 0;
        }

        .region-content {
            position: relative;
            display: inline-block;
            width: 35rem;
            max-height: 30rem;
            padding: .5rem;
            border-radius: 5px;
            overflow: auto;
            background: #fff;

            .region-city {
                > li {
                    /*display: flex;*/
                    padding: .3rem 0;
                }
            }

            .region-city-panel {
                float: left;
                /*flex-basis: 7rem;*/
                width: 10rem;
                padding-left: .3rem;
                font-weight: 600;
                width: 20%;
            }

            .region-county-plus{
                display: inline-block;
                width: 1rem;
                height: 1rem;
                line-height: 1rem;
                text-align: center;
                background-color: #999;
                cursor: pointer;
                margin-left: 1rem;
            }
            .region-county {
                float: left;
                width: 80%;
                padding-left: 1rem;
                > li {
                    float: left;
                }
            }

            .region-title {
                padding: .2rem .25rem;
                text-decoration: underline;
                cursor: pointer;

                &:hover {
                    background-color: rgba(0, 0, 0, .1);
                }
            }

            .active {
                background-color: rgba(0, 0, 0, 0.5);
                color: #fff !important;
                border-radius: 4px;
            }
        }
    }
</style>
