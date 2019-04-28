<template>
	<div class="transferDiv">
		<el-row>
			<el-col :span="10">
				<div class="leftTitle">
					<div class="leftTitleLeft">待选联系人</div>
					<div class="leftTitleRight">
						<el-input
							v-model="tableDataName"
							class="input"
							icon="search"
							placeholder="请输入搜索内容"
							@change="realTime"
						/>
						<el-button
							class="button"
							type="primary"
							icon="el-icon-search"
							@click="handleSearch">搜索</el-button>
					</div>
				</div>
				<el-table
					ref="moviesTable"
					:data="tableDataLeft"
					border
					height="280"
					class="elTable"
					@row-click="handleRowClickLeft"
					@selection-change="handleSelectionChangeLeft"
				>
					<el-table-column
						type="selection"
						width="40" />
					<el-table-column label="姓名">
						<template slot-scope="scope">
							<p>{{ scope.row.contactsName ||scope.row.inchargeName }}</p>
						</template>
					</el-table-column>
					<el-table-column label="电话">
						<template slot-scope="scope">
							<p>{{ scope.row.mobile ||scope.row.inchargeMobile }}</p>
						</template>
					</el-table-column>
					<el-table-column label="职位">
						<template slot-scope="scope">
							<p>{{ scope.row.position ||scope.row.chargePosition }}</p>
						</template>
					</el-table-column>
					<el-table-column
						prop="nt"
						label="备注" />
				</el-table>
			</el-col>

			<el-col :span="4">
				<div class="elColSpan4">
					<el-button
						type="primary"
						icon="el-icon-arrow-right"
						@click="selectToRight" />
					<br>
					<el-button
						class="elButton"
						type="primary"
						icon="el-icon-arrow-left"
						@click="selectToLeft"
					/>
				</div>
			</el-col>

			<el-col :span="10">
				<div class="rightTitle">
					<div>已选联系人</div>
					<span @click="handleCreateContacts">未找到联系人？创建临时接收人</span>
					<!-- <div>{{userInfo}}</div> -->
					{{ searchData }}
					{{ tableDataName }}
					<!-- {{searchData()}} -->
				</div>
				<el-table
					ref="moviesTable2"
					:data="tableDataRight"
					border
					class="moviesTable2"
					height="280"
					@row-click="handleRowClickRight"
					@selection-change="handleSelectionChangeRight"
				>
					<el-table-column
						type="selection"
						width="40" />
					<el-table-column label="姓名">
						<template slot-scope="scope">
							<p>{{ scope.row.contactsName ||scope.row.inchargeName }}</p>
						</template>
					</el-table-column>
					<el-table-column label="电话">
						<template slot-scope="scope">
							<p>{{ scope.row.mobile ||scope.row.inchargeMobile }}</p>
						</template>
					</el-table-column>
					<el-table-column label="职位">
						<template slot-scope="scope">
							<p>{{ scope.row.position ||scope.row.chargePosition }}</p>
						</template>
					</el-table-column>
					<el-table-column
						prop="nt"
						label="备注" />
				</el-table>
			</el-col>
		</el-row>
		<el-dialog
			:visible.sync="dialogFormVisible"
			:modal="false"
			title="临时联系人"
			width="40%">
			<el-form
				ref="form"
				:model="form"
				:rules="rules"
				label-width="200px">
				<el-form-item
					:label-width="formLabelWidth"
					label="姓名"
					prop="name"
					width="80%">
					<el-input v-model="form.name" />
				</el-form-item>
				<el-form-item
					:label-width="formLabelWidth"
					label="手机号"
					prop="mobile">
					<el-input v-model="form.mobile" />
				</el-form-item>
			</el-form>
			<div
				slot="footer"
				class="dialog-footer">
				<el-button @click="handleReset('form')">取 消</el-button>
				<el-button
					type="primary"
					@click="handleSuccess">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
    components: {},
    props: {
        userInfo: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            tableDataName: ``,
            tableData: [],
            tableDataLeft: [],
            tableDataRight: [],
            multipleSelectionLeft: [],
            multipleSelectionRight: [],
            valueKey: ``,
            form: {
                name: ``,
                mobile: ``
            },
            formLabelWidth: `80px`,
            rules: {
                name: [
                    { required: true, message: `请输新增人员姓名`, trigger: `blur` }
                ],
                mobile: [
                    { required: true, message: `请输入新增人员电话`, trigger: `change` }
                ]
            },
            dialogFormVisible: false,
            id: 0
        };
    },
    computed: {},
    watch: {
        userInfo(val) {
            this.tableData = val;
            // console.log(25252536363625253636, val);
            this.tableDataLeft = [];
            // this.tableDataLeft = this.tableData;

            for (const item1 of this.tableData) {
                let bl = false;
                for (const item2 of this.tableDataRight) {
                    if (typeof item2.contactsId === `undefined`) {
                        if (item1.id === item2.id || item1.contactsId === item2.id) {
                            bl = true;
                            break;
                        }
                    } else if (item1.contactsId === item2.contactsId || item1.id === item2.contactsId) {
                        bl = true;
                        break;
                    }
                }

                if (!bl) {
                    this.tableDataLeft.push(item1);
                }
            }
        }
    },
    mounted() {
    // this.tableData = this.userInfo;
    // this.tableDataLeft = this.tableData;
    // _log(`sendList has mounted`);
    // this.GetcontactsList();
    },
    methods: {
    // 点击一行，复选框选中
        handleRowClickLeft(row) {
            this.$refs.moviesTable.toggleRowSelection(row);
        },
        handleRowClickRight(row) {
            this.$refs.moviesTable2.toggleRowSelection(row);
        },
        // 点击左边表格每行，每行的信息
        handleSelectionChangeLeft(selection) {
            this.multipleSelectionLeft = selection;
        },
        // 点击右边表格每行，每行的信息
        handleSelectionChangeRight(selection) {
            this.multipleSelectionRight = selection;
        },
        // 点击右边箭头
        selectToRight() {
            this.tableDataRight = this.tableDataRight.concat(
                this.multipleSelectionLeft
            );
            let cIndex = 0;
            const tableDataLeft = Object.assign([], this.tableDataLeft);
            for (const item1 of tableDataLeft) {
                for (const item2 of this.multipleSelectionLeft) {
                    if (typeof item2.contactsId === `undefined`) {
                        if (item1.id === item2.id || item1.contactsId === item2.id) {
                            this.tableDataLeft.splice(cIndex, 1);
                            cIndex--;
                            break;
                        }
                    } else if (item1.contactsId === item2.contactsId || item1.id === item2.contactsId) {
                        this.tableDataLeft.splice(cIndex, 1);
                        cIndex--;
                        break;
                    }
                }
                cIndex++;
            }
            this.$emit(`sendOutRightInfo`, this.tableDataRight);
        },
        // 点击左边箭头
        selectToLeft() {
            this.tableDataLeft = this.tableDataLeft.concat(
                this.multipleSelectionRight
            );
            let cIndex = 0;
            const tableDataRight = Object.assign([], this.tableDataRight);
            for (const item1 of tableDataRight) {
                for (const item2 of this.multipleSelectionRight) {
                    if (typeof item2.contactsId === `undefined`) {
                        if (item1.id === item2.id || item1.contactsId === item2.id) {
                            this.tableDataRight.splice(cIndex, 1);
                            cIndex--;
                            break;
                        }
                    } else if (item1.contactsId === item2.contactsId || item1.id === item2.contactsId) {
                        this.tableDataRight.splice(cIndex, 1);
                        cIndex--;
                        break;
                    }
                }
                cIndex++;
            }
            this.$emit(`sendOutRightInfo`, this.tableDataRight);
        },
        // 点击创建临时联系人
        handleCreateContacts() {
            this.dialogFormVisible = true;
        },
        // 点击确认新增联系人
        handleSuccess() {
            this.dialogFormVisible = false;
            this.tableDataRight.push({
                contactsId: this.id++,
                contactsName: this.form.name,
                mobile: this.form.mobile,
                nt: `临时联系人`
            });
            this.$emit(`sendOutRightInfo`, this.tableDataRight);
        },
        // 点击取消新增联系人
        handleReset(form) {
            this.dialogFormVisible = false;
            this.$refs[form].resetFields();
        },
        // 点击搜索
        handleSearch() {
            const searchInfo = [];
            const tableDataLeftNew = this.tableDataLeft;
            console.log(252523636252536, tableDataLeftNew);
            if (this.tableDataName === ``) {
                this.tableDataLeft = [];
                for (const item1 of tableDataLeftNew) {
                    let bl = false;
                    for (const item2 of this.tableDataRight) {
                        if (item1.contactsId === item2.contactsId) {
                            bl = true;
                            break;
                        }
                    }
                    if (!bl) {
                        this.tableDataLeft.push(item1);
                    }
                }
                // this.tableDataLeft = tableDataLeftNew;
                //  this.tableData = tableDataLeftNew;
            } else {
                for (const item of this.tableDataLeft) {
                    if (item.mobile.indexOf(this.tableDataName) > -1) {
                        searchInfo.push(item);
                    }
                    if (item.contactsName.indexOf(this.tableDataName) > -1) {
                        searchInfo.push(item);
                    }
                }
                this.tableDataLeft = searchInfo;
                this.tableData = searchInfo;
            }
        }
    }
};
</script>

<style lang="scss">
.transferDiv {
  padding: 10px;
  border: 1px solid #ccc;
}

.input {
  width: 240px;
}

.elColSpan4 {
  margin-top: 50%;

  .elButton {
    margin-top: 10%;
  }
}

.elTable {
  width: 100%;
  margin-bottom: 0;
  overflow-y: auto;
}

.moviesTable2 {
  width: 100%;
  margin-bottom: 0;
}

.rightTitle,
.leftTitle {
  position: relative !important;
  width: 100%;
  height: 45px;
  margin-bottom: 5px;
  line-height: 45px;
}

.leftTitleLeft {
  position: absolute !important;
  top: 0;
  left: 5px;
  font-weight: 700;
}

.leftTitleRight {
  position: absolute !important;
  top: 0;
  right: 0;
}

.rightTitle {
  div {
    position: absolute;
    top: 0;
    left: 0;
    font-weight: 700;
  }

  span {
    position: absolute;
    top: 0;
    right: 5px;
    font-weight: 700;
    color: #409eff;
  }
}
</style>
