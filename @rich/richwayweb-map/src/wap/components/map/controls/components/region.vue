<template>
    <div
        class="bar-item bar-btn richway-touch-btn">
        <!--<i class="richway-icon icon-region bar-region" />-->
        <div class="map-region-text" @click="handleClick">{{ currentRegionInfo.name | _filterStr(3) }}</div>

        <mt-popup
            v-model="popupVisible"
            class="region-popup"
            position="bottom">
            <mt-picker :slots="slots"></mt-picker>
        </mt-popup>
    </div>
</template>

<script type="text/ecmascript-6">
    import {_filterStr} from '@rich/richwayweb-utils/lib/filter/filterStation';

    export default {
        name: `RegionControl`,
        components: {},
        filters: {
            _filterStr
        },
        props: {
            position: {
                type: String,
                default: ``
            },
            map: {
                type: Object,
                default: () => ({})
            },
            mapOptions: {
                type: Object,
                default: () => ({})
            },
            config: {
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {
                popupVisible: false,
                chooseRegionInfo: {
                    code: ``,
                    name: ``
                },
                currentRegionInfo: {
                    code: ``,
                    name: ``
                },
                regionData: {},
                slots:
                    [
                        {
                            flex: 1,
                            values: ['年假', '事假', '病假', '婚假', '其他'],
                            className: 'slot1',
                            textAlign: 'left'
                        },
                        {
                            divider: true,
                            content: '-',
                            className: 'slot2'
                        },
                        {
                            flex: 1,
                            values: ['2015-11', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                            className: 'slot3',
                            textAlign: 'right'
                        }
                    ]
            };
        },
        computed: {
            selectedOptions() {
                return [];
            }
        },
        mounted() {
            this.currentRegionInfo = (window._RichWay.$map || {}).currentRegionInfo || {};

            if (this.config.toggle === `show`) {
                this.popupVisible = true;
            }
        },
        methods: {
            handleClick() {
                this.popupVisible = true;
            },
            handleChoose(item) {
                this.currentRegionInfo = item;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .map-region-text {
        font-size: .6rem;
        text-align: center;
    }

    .region-popup {
        width: 100%;
        color: #666;
        font-size: .6rem;
    }
</style>
