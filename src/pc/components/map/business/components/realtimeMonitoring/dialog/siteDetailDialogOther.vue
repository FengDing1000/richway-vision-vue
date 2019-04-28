<template>
<Dialog :title="detailInfo.stnm" @on-hide="handleHide" :config="config">
    <div v-loading="loading" slot="content" class="site-dialog-content">
        <ul>
            <li v-for="(item, index) in currentComponentList" :style="styleObj" :class="[activeId === item.id ? 'active' : '']" :key="index" @click.stop="handleChooseItem(item)">
                <span>{{ item.config.title }}</span>
            </li>
        </ul>
        <div class="site-detail-panel">
            <keep-alive>
                <component :is="activeComponent" :config="activeConfig" />
            </keep-alive>
        </div>
    </div>
</Dialog>
</template>

<script>
// 公用的dialog
import Dialog from '../../commonDialog/dialog';
// 组件utils包
import RichWayComponentUtils from "$src/pc/utils/index";
// 模型组件库
import detailList from "../detail";
// 模型组件类型
import modelComponentList from "$src/constants/realtimeMonitoring/modelComponentList";
// 组件公用utils方法
const {
    selectComponent
} = RichWayComponentUtils;
const components = Object.assign({Dialog},detailList);
export default {
    name: `siteDetailDialogOther`,
    components,
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
    data() {
        return {
            loading: false,
            componentList: modelComponentList,
            activeId: ``,
            activeComponent: null,
            activeConfig: {}
        };
    },
    computed: {
        styleObj(){
            return {
                width:Number(100 / this.currentComponentList.length) + `%`
            }
        },
        currentComponentList() {
            if (Object.keys(this.detailInfo).length === 0) return this.componentList;
            let modelList = this.detailInfo.model.split(",");
            modelList.unshift(`viw_model_compare`);
            let list = this.componentList.filter(item => {
                return item.modelList.some(item2 => {
                    return modelList.includes(item2);
                });
            });
            selectComponent.getDefaultSelectComponent(this,list);
            return list;
        }
    },
    mounted() {
    },
    methods: {
        handleChooseItem(item) {
            this._log(item.id);
            selectComponent.handleChooseItem(this,item);
        },
        handleHide() {
            this.$emit(`on-hide`);
        }
    }
};
</script>

<style lang="scss" scoped>
.site-dialog-content {
    min-width:60rem;
    height: 38rem;
    ul {
        display: flex;
        justify-content: center;
        height: 2rem;
        line-height: 2rem;
        font-size: 0.8rem;
        text-align: center;
        li{
            border-right:0.1rem solid #F5F5F5;
            background: #108EE9;
            color:#fff;
            cursor: pointer;
        }
        li:last-of-type{
            border-right:0;
        }
        li.active{
            background: #1565C0;
        }
    }
    >div {
        width: 100%;
        height: calc(100% - 2rem);
        padding: 0.5rem;
        border: 1px solid #eee;
        border-radius: 4px;
        background-color: #fbfbfb;
    }
}
</style>
