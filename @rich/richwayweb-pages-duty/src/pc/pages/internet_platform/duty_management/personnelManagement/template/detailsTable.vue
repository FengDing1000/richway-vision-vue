<template>
	<div>
		<el-row>
			<el-col :span="15">
				<div class="grid-content bg-purple">
					<el-table
						:data="expressDetails"
						:show-header="false"
						stripe="true"
						style="width:100%;
">
						<el-table-column
							prop="left"
							width="300" />
						<el-table-column
							prop="right"
						/>
					</el-table>
				</div>
			</el-col>
			<el-col :span="9">
				<div class="grid-content bg-purple-light">
					<div class="gridContentPhoto" />
				</div>
			</el-col>
		</el-row>

		<el-button
			class="elButton"
			type="primary"
			@click="closeWindow()">关闭
		</el-button>
	</div>

</template>

<script type="text/ecmascript-6">
export default {
    name: `DetailsTable`,
    props: {
        userDetailsInfo: {
            type: Object,
            default: () => {
            }
        }
    },
    data() {
        return {};
    },
    computed: {
        expressDetails() {
            return [
                {
                    left: `值班人员姓名:`,
                    right: this.userDetailsInfo.personName
                },
                {
                    left: `手机号码：`,
                    right: this.userDetailsInfo.mobile
                },
                {
                    left: `值班角色：`,
                    right: this.userDetailsInfo.dutyRoleFmt
                },
                {
                    left: `性别：`,
                    right: this.userDetailsInfo.sexFmt
                }
            ];
        }
    },
    methods: {
        // 关闭
        closeWindow() {
            this.$emit(`on-close`);
        }
    }
};
</script>

<style lang="scss" scoped>
		.gridContentPhoto {
			width: 60%;
			height: 13rem;
			margin-left: 2.5rem;
			border: 1px dotted #ccc;
			border-radius: .4rem;
		}

		.elButton {
			margin-top: .5rem;
			margin-left: 90%;
		}
</style>
