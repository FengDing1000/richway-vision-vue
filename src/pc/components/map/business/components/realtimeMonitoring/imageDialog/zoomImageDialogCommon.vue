<template>
<div class="zoom-image-dialog">
<Dialog :title="123356" @on-hide="handleHide" :config=config>
    <div v-loading="loading" slot="content">
        <el-button @click="handelClick"> 11233 </el-button>
    </div>
</Dialog>
</div>
</template>

<script>
// 公用vuex
import * as _modulesType from "$src/constants/modulesType";
import Dialog from '../../commonDialog/dialog';
const { createNamespacedHelpers } = require(`vuex`);
const { mapMutations } = createNamespacedHelpers(_modulesType.MapMonitoring);
// 合并组件
const components = Object.assign({
    Dialog
});
export default {
    name: 'zoomImageDialog',
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
    components,
    data: function() {
        return {}
    },
    methods: {
        ...mapMutations([`SET_BUSINESS_INFO`]),
        handleHide(){
            this.$emit(`on-hide`);
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
