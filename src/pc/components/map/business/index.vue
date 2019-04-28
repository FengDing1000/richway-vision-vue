<template>
<div :id="id" class="richway-map-business">
    <!-- 测站弹框 -->
    <div class="monitor-content-common-dialog">
        <keep-alive>
            <component :detail-info="businessInfo.siteData" v-show="businessInfo.showSiteDialog" @on-hide="businessInfo.showSiteDialog=false" :is="siteDialog.activeComponent" :map="map" :config="siteDialog.activeConfig" @on-long="handleLong" />
        </keep-alive>
    </div>
    <!-- 业务组件 -->
    <component v-for="(item, index) in businessComponents" :is="item.componentName" :map="map" :map-options="mapOptions" :config="item.config || {}" :sub-components="item.subComponents" :key="index" />
    <!-- 大图弹框 -->
    <div class="monitor-content-zoom-image-dialog" v-show="businessInfo.showZoomImage">
        <keep-alive>
            <component
                :detail-info="businessInfo.imageData"
                @on-hide="businessInfo.showZoomImage=false"
                :is="zoomImage.activeComponent"
                :map="map"
                :config="zoomImage.activeConfig"
                @on-long="handleLong" />
        </keep-alive>
    </div>
</div>
</template>

<script>
// 组件utils包
import RichWayComponentUtils from "$src/pc/utils/index";
// vuex信息
import * as _modulesType from "../../../../constants/modulesType";
// 弹框组件
import dialogList from './components/realtimeMonitoring/dialog';
// 弹框配置信息
import dialogComponentList from "$src/constants/realtimeMonitoring/dialogComponentList";
// 业务组件
import businessComponentsList from "./index.js";
// 大图弹框组件
import imageDialogList from './components/realtimeMonitoring/imageDialog';
// 大图弹框配置信息
import zoomImageDialogList from "$src/constants/realtimeMonitoring/zoomImageDialogList";
// 组件公用utils方法
const {
    selectComponent
} = RichWayComponentUtils;
const {
    createNamespacedHelpers
} = require(`vuex`);
// 根据命名获取vuex管理
const {
    mapState
} = createNamespacedHelpers(_modulesType.MapMonitoring);
const components = Object.assign(dialogList, businessComponentsList,imageDialogList);
export default {
    name: `mainMapBusiness`,
    components,
    props: {
        businessComponents: {
            type: Array,
            default: () => []
        },
        id: {
            type: String,
            default: `business`
        }
    },
    data() {
        return {
            dialogComponentList: dialogComponentList,
            zoomImageDialogList:zoomImageDialogList,
            siteDialog:{
                activeId: ``,
                activeComponent: null,
                activeConfig: {}
            },
            zoomImage:{
                activeId: ``,
                activeComponent: null,
                activeConfig: {}
            }
        };
    },
    computed: {
        ...mapState([`map`, `mapOptions`, `businessInfo`])
    },
    mounted() {
        // 获取选中的component
        selectComponent.getDefaultSelectComponent(this.dialogComponentList,this.siteDialog);
        selectComponent.getDefaultSelectComponent(this.zoomImageDialogList,this.zoomImage);
    },
    methods: {
        // 处理选中component
        handleChooseItem(item) {
            selectComponent.handleChooseItem(item,this.siteDialog);
            selectComponent.handleChooseItem(item,this.zoomImage);
        }
    }
};
</script>

<style lang="scss">
.richway-map-business {
    display: flex;
    position: absolute;
    z-index: 4;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 1;
    pointer-events: none;

    .monitor-content-common-dialog {
        flex-grow: 1;
        z-index: 1;
    }
    .monitor-content-zoom-image-dialog{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        z-index: 2;
    }
}
</style>
