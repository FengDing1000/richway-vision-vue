<template>
	<div class="richway-data-report">
		<div class="report-query richway-shadow">
			<el-form
				slot="query"
				ref="dt_query"
				:inline="true"
				:model="reportInfo.queryInfo"
				label-width="80px"
				label-position="left"
				class="demo-form-inline">
				<el-row
					v-for="(item, index) in (reportInfo.query || {}).fieldList"
					:key="index"
					:gutter="20">
					<el-col
						v-for="(subItem, subIndex) in item"
						:key="subIndex"
						:span="12">
						<el-form-item v-if="subItem.key && subItem.visibility">
							<div slot="label"><span v-html="subItem.label" /><em class="richway-right">:</em></div>
							<template v-if="subItem.type==='input'">
								<el-input
									v-model="reportInfo.queryInfo[subItem.key]"
									:placeholder="subItem.placeholder"
									:maxlength="subItem.maxlength"
									clearable
									@change="handleQueryInfoChange(subItem)" />
							</template>
							<template v-else-if="subItem.type==='radio'">
								<el-radio
									v-for="(o, i) in subItem.options"
									v-model="reportInfo.queryInfo[subItem.key]"
									:key="i"
									:label="o.value"
									@change="handleQueryInfoChange(subItem)">{{ o.label }}
								</el-radio>
							</template>

							<template v-else-if="subItem.type==='checkbox'">
								<el-checkbox-group v-model="reportInfo.queryInfo[subItem.key]">
									<el-checkbox
										v-for="(o, i) in subItem.options"
										:key="i"
										:label="o.value"
										@change="handleQueryInfoChange(subItem)">{{ o.label }}
									</el-checkbox>
								</el-checkbox-group>
							</template>

							<template v-else-if="subItem.type==='select'">
								<el-select
									v-model="reportInfo.queryInfo[subItem.key]"
									:placeholder="subItem.placeholder"
									:multiple="subItem.multiple"
									collapse-tags
									filterable
									@change="handleQueryInfoChange(subItem)">
									<el-option
										v-for="(o,i) in subItem.options"
										:key="i"
										:label="o.label"
										:value="o.value" />
								</el-select>
							</template>

							<template v-else-if="subItem.type==='date'">
								<el-date-picker
									v-model="reportInfo.queryInfo[subItem.key]"
									:placeholder="subItem.placeholder"
									:start-placeholder="subItem.startPlaceholder"
									:end-placeholder="subItem.endPlaceholder"
									:type="subItem.pickerType"
									:format="subItem.format"
									:default-value="subItem.defaultValue"
									:value-format="subItem.valueFormat"
									range-separator="到"
									@change="handleQueryInfoChange(subItem)" />
							</template>
						</el-form-item>
					</el-col>
					<el-col
						:span="12"
						class="richway-right">
						<!--查询面板里面的按钮组-->
						<el-form-item
							class="richway-right">
							<el-button-group>
								<el-button
									v-for="(btnItem,btnIndex) in reportInfo.query.btnList"
									:key="btnIndex"
									:disabled="!!reportInfo.loading && btnItem.type==='query'"
									:type="btnItem.btnType"
									iocn="richway-icon"
									size="mini"
									@click="handleQueryBtnClick(btnItem.type)">
									<i
										:class="btnItem.icon"
										class="richway-icon" />
									<span>{{ btnItem.label }}</span>
								</el-button>
							</el-button-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div
			v-loading="loading"
			style="height: 86%; width: 100%;">
			<iframe
				id="myfarme"
				:src="iframeSrc"
				class="report-iframe richway-shadow"
				style="height: 100%; width: 100%;"
				@load="handleIframeLoad" />
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import DataReport from './index.js';

export default {
    props: {
        config: {
            type: Object,
            default: () => {
            }
        },
        iframeSrc: {
            type: String,
            default: ``
        }
    },
    data() {
        return {
            reportInfo: {},
            loading: false
        };
    },
    watch: {
        iframeSrc() {
            this.loading = true;
        }
    },
    beforeMount() {
        this.reportInfo = new DataReport(this.config);
    },
    mounted() {
        this.$emit(`on-query`, {
            queryInfo: this.reportInfo.queryInfo
        });
    },
    methods: {
        handleQueryBtnClick() {
            this.$emit(`on-query`, {
                queryInfo: this.reportInfo.queryInfo
            });
        },
        handleQueryInfoChange(item) {
            this.$emit(`on-query-change`, {
                queryInfo: this.reportInfo.queryInfo,
                field: item
            });
        },
        handleIframeLoad() {
            this.loading = false;
        }
    }
};
</script>

<style lang="scss" scoped>
    .richway-data-report{
        position: relative;
        overflow-y: hidden !important;
        height: 100%;
        .report-query {
            background-color: #fff;
            padding: .6rem;
            margin-bottom: 1.2rem;
        }
        .report-iframe {
            padding: .6rem 0;
            border: 0;
            background-color: #fff;
        }
    }
</style>
