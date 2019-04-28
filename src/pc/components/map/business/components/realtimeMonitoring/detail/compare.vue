<template>
<div class="map-business-model-compare">
    <el-button @click="handelClick"> 11233 </el-button>
</div>
</template>

<script>
// 公用vuex
import * as _modulesType from "$src/constants/modulesType";
const { createNamespacedHelpers } = require(`vuex`);
const { mapMutations } = createNamespacedHelpers(_modulesType.MapMonitoring);
export default {
    name: 'Map-Business-Model-Compare',
    props: {
        detailInfo: {
            type: Object,
            default: () => {}
        },
        config:{
            type: Object,
            default: () => {}
        }
    },
    data: function () {
        return {

        }
    },
    mounted () {

    },
    methods: {
        ...mapMutations([`SET_BUSINESS_INFO`]),
        handleChooseItem(item) {
            this._log(item.id);
            this.activeId = item.id;
            this.activeComponent = item.componentName;
            this.activeConfig = item.config;
        },
        handelClick(){
           let businessInfo = {};
            businessInfo.showZoomImage = true;
            businessInfo.imageData = {};
            this.SET_BUSINESS_INFO(businessInfo);
        },
    }
}
</script>

<style scoped>

</style>
