<template>
    <div
        class="bar-item bar-btn richway-touch-btn">
        <i
            :class="[config.icon || 'icon-setting']"
            @click="handleClick"
            class="richway-icon bar-legend" />

        <mt-popup
            v-model="popupVisible"
            class="site-legend-popup"
            position="bottom">
            <div class="site-legend-panel">
                <div class="legend-site-category">
                    <div
                        v-for="(item, index) in legendInfo.siteCategoryList"
                        :key="index"
                        class="legend-item">
                        <span class="site-abb-code">{{ item.abbCode }}</span>
                        <span class="site-name">{{ item.name }}</span>
                    </div>
                </div>
                <div class="legend-warning-type">
                    <div
                        v-for="(item, index) in legendInfo.warningTypeList"
                        :key="index"
                        class="legend-item">
					<span
                        :class="[item.classFont]"
                        class="warning-classfont" />
                        <span class="warning-name">{{ item.name }}</span>
                    </div>
                </div>
            </div>
        </mt-popup>
    </div>
</template>

<script type="text/ecmascript-6">
import siteType from "../../../../../constants/siteType";

export default {
    name: `LegendControl`,
    props: {
        position: {
            type: String,
            default: ``
        },
        config: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            popupVisible: false,
            legendInfo: {
                siteCategoryList: siteType.siteTypeList,
                warningTypeList: [
                    {
                        type: ``,
                        classFont: `warning-normal`,
                        name: `正常`
                    },
                    {
                        type: ``,
                        classFont: `warning-early`,
                        name: `预警`
                    },
                    {
                        type: ``,
                        classFont: `warning-call`,
                        name: `报警`
                    },
                    {
                        type: ``,
                        classFont: `warning-remind`,
                        name: `提醒`
                    }
                ]
            }
        };
    },
    computed: {},
    methods: {
        handleClick() {
            this.popupVisible = true;
        }
    }
};
</script>

<style lang="scss" scoped>
    .site-legend-popper{
        width: 14rem;
    }
    .site-legend-popup {
        width: 100%;
        color: #666;
        font-size: .6rem;
    }
    .site-legend-panel {
        user-select: none;

        .legend-site-category {
            width: 11.5rem;
            padding-bottom: .5rem;
            margin: .25rem;
            background-color: #fff;

            .legend-item {
                display: inline-block;
                width: 50%;
                padding-bottom: .05rem;
                padding-left: .5rem;
                border-right: 1px solid #e0dcdc;

                &:nth-child(even) {
                    border-right: none;
                }
            }

            .site-name {
                padding-left: .4rem;
            }
        }

        .legend-warning-type {
            display: flex;
            width: 100%;
            height: 2.5rem;
            border-top: 1px solid #e0dcdc;
            background-color: #fff;

            .legend-item {
                flex-grow: 1;
                padding: .5rem;
            }

            .warning-classfont {
                display: inline-block;
                width: .6rem;
                height: .6rem;
                margin-left: .5rem;
                border-radius: 50%;
            }

            .warning-name {
                float: left;
                padding-left: .25rem;
            }

            .warning-normal {
                background-color: #093;
            }

            .warning-early {
                background-color: #f00;
            }

            .warning-call {
                background-color: #fc0;
            }

            .warning-remind {
                background-color: #06c;
            }
        }
    }
</style>
