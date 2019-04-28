<template>
<div :class="['richway-map-dialog-container',{'richway-map-fixed-dialog':config.type === `abs`}]">
    <div class="detail-dialog" :style="detailDialogStyle">
        <div class="modal-header">
            <h4 class="modal-title">{{ title }}</h4>
            <i class="richway-icon icon-close modal-close" @click.stop="handleHide" />
        </div>

        <div class="modal-content">
            <slot name="content" />
        </div>
    </div>
    <div class="richway-map-dialog-mask-container" :style="dialogMaskstyle" v-show="config.showDialogMask"></div>
</div>
</template>

<script>
export default {
    name: `realtimeMonitoringDialog`,
    props: {
        title: {
            type: String,
            default: `详情`
        },
        config: {
            type: Object,
            default: () => {
                type:`abs`
                minWidth: `40rem`
                height: `auto`
                showDialogMask: false
            }
        }
    },
    data() {
        return {};
    },
    computed: {
        detailDialogStyle() {
            return {
                'min-width': this.config.minWidth,
                height: this.config.height
            }
        }
    },
    mounted() {},
    methods: {
        handleHide() {
            this.$emit(`on-hide`);
        }
    }
};
</script>

<style lang="scss" scoped>
.richway-map-dialog-container {
    position: relative;
    width: 100%;
    height: 100%;
    pointer-events: all;
    .detail-dialog {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
        display: inline-block;
        border-radius: 5px;
        overflow: hidden;
        background: #fff;
        box-shadow: 2px 0 12px 0 rgba(0, 0, 0, 0.5);
        transition: all 0.3s;
        .modal-header {
            position: relative;
            padding: 0.7rem 1rem;
            color: #000;
            background-color: #fff;
            &::after {
                position: absolute;
                bottom: 0;
                left: 1rem;
                right: 1rem;
                height: 1px;
                background-color: #eee;
                content: " ";
            }
            .modal-title {
                font-weight: 600;
                font-size: 0.9rem;
            }
            .modal-close {
                position: absolute;
                top: 0.4rem;
                right: 1rem;
                width: 1.6rem;
                height: 1.6rem;
                border-radius: 50%;
                font-size: 1.3rem;
                line-height: 1.8rem;
                text-align: center;
                cursor: pointer;
                &:hover {
                    background-color: rgba(0, 0, 0, 0.1);
                }
            }
        }
        .modal-content {
            min-height: 10rem;
            max-height: 40rem;
            padding: 0.4rem 1rem;
            overflow: hidden;
        }
    }
    .richway-map-dialog-mask-container {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        transition: all 0.3s;
    }
    &.richway-map-fixed-dialog{
        position: absolute;
        width: 100%;
        height: 100%;
        .detail-dialog{
            z-index:1001;
        }
        .richway-map-dialog-mask-container{
            z-index:1000;
        }
    }
}
</style>
