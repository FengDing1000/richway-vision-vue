<template>
    <div class="bar-item bar-btn richway-touch-btn">
        <i
            :class="[config.icon || 'icon-aim']"
            class="richway-icon bar-aim"
            @click="aim" />
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: `AimControl`,
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
            return {};
        },
        methods: {
            // 地图还原到原始中心点
            aim() {
                this.$getData.GetLocation().then((res) => {
                    this.map.setView(res.data, this.mapOptions.zoom);
                });

                // this.map.setView(this.mapOptions.center, this.mapOptions.zoom);
                //
                // // 广播数据
                // this.$mapLayersFun.MapControlsBroadcastFun({
                //     controlType: `aim`,
                //     eventType: `click`,
                //     data: {
                //         center: this.mapOptions.center
                //     }
                // });
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>
