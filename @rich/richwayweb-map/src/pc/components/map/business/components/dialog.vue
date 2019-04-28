<template>
	<div
		:style="dialogStyle"
		class="detail-dialog">
		<div class="modal-header">
			<h4 class="modal-title">{{ title }}</h4>
			<i
				class="richway-icon icon-close modal-close"
				@click.stop="handleHide" />
		</div>
		<div class="modal-content">
			<slot name="content" />
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
    name: `realtimeMonitoringDialog`,
    props: {
        title: {
            type: String,
            default: `详情`
        },
        width: {
            type: String,
            default: ``
        }
    },
    computed: {
        dialogStyle() {
            if (this.width) {
                return {
                    width: this.width,
                    left: `50%`,
                    right: `auto`,
                    transform: `translate(-50%, -40%)`
                };
            }
            return {};
        }
    },
    methods: {
        handleHide() {
            this.$emit(`on-hide`);
        }
    }
};
</script>

<style lang="scss" scoped>
		.detail-dialog {
			position: fixed;
			z-index: 999;
			top: 50%;
			left: 2rem;
			right:32rem;
			display: inline-block;
			border-radius: 5px;
			overflow: hidden;
			background: #fff;
			box-shadow: 2px 0 12px 0 rgba(0, 0, 0, .5);
			transform: translateY(-40%);

			.modal-header{
				position: relative;
				padding: .7rem 1rem;
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

				.modal-title{
					font-weight: 600;
					font-size: .9rem;
				}

				.modal-close {
					position: absolute;
					top: .4rem;
					right: 1rem;
					width: 1.6rem;
					height: 1.6rem;
					border-radius: 50%;
					font-size: 1.3rem;
					line-height: 1.8rem;
					text-align: center;
					cursor: pointer;

					&:hover{
						background-color: rgba(0,0,0,.1);
					}
				}
			}

			.modal-content {
				min-height: 10rem;
				max-height: 40rem;
				padding: .4rem 1rem;

				/*overflow-y: auto;*/

				/*overflow-x: hidden;*/
				overflow: hidden;
			}
		}
</style>
