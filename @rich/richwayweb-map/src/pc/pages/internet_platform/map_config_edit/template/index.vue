<template>
	<div class="content content-map-config_edit">
		<div class="map-config-panel">
			<div class="map-config-content">
				<el-tabs v-model="activeName">
					<el-tab-pane
						label="地图基础配置"
						name="init" />
					<el-tab-pane
						label="地图底图"
						name="baseLayers" />
					<el-tab-pane
						label="地图业务图层"
						name="businessLayers" />
					<el-tab-pane
						label="地图控制按钮"
						name="controls" />
					<el-tab-pane
						label="地图插件"
						name="plugins" />
					<el-tab-pane
						label="地图业务监视面板"
						name="businessPanel" />
				</el-tabs>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-card
							v-if="activeName==='init'"
							class="panel">
							<div
								slot="header"
								class="clearfix">
								<span>地图基础配置数据编辑</span>
							</div>
							<div class="panel-content">
								<el-form
									:model="mapView"
									label-width="6rem"
									label-position="left">
									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="默认级别:">
												<el-input-number
													v-model="mapView.zoom"
													:min="1"
													:max="20"
													size="mini" />
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="最小级别:">
												<el-input-number
													v-model="mapView.minZoom"
													:min="1"
													:max="20"
													size="mini" />
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="最大级别:">
												<el-input-number
													v-model="mapView.maxZoom"
													:min="1"
													:max="20"
													size="mini" />
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="中心坐标:">
												<el-input
													v-model="mapView.lttd"
													maxlength="100"
													size="mini" />
												<el-input
													v-model="mapView.lgtd"
													maxlength="100"
													size="mini" />
											</el-form-item>
										</el-col>
									</el-row>
								</el-form>
							</div>
						</el-card>
						<el-card
							v-else-if="activeName==='baseLayers'"
							class="panel">
							<div
								slot="header"
								class="clearfix">
								<span>底层地图数据编辑</span>
								<i
									class="el-icon-plus richway-right"
									@click="handleAdd(0, 'baseLayers')" />
							</div>
							<div class="panel-content">
								<el-tabs
									v-model="activeTabsName"
									@tab-click="handleTabsClick">
									<el-tab-pane
										v-for="(item, index) in mapView.regions[0].components"
										:label="item.title"
										:name="item.type"
										:key="index" />
								</el-tabs>
								<el-collapse accordion>
									<el-collapse-item
										v-for="(item, index) in mapView.regions[0].components[activeTabsIndex].list"
										:name="index"
										:key="index">
										<template slot="title">
											<span>{{ getCollapseTitle((item.config || {}).title, index) }}</span>
											<i
												class="header-close el-icon-close"
												@click.stop="handleRemove(0, 'baseLayers', index)" />
										</template>
										<el-form
											:model="item.config"
											label-width="6rem"
											label-position="left">
											<el-row :gutter="20">
												<el-col :span="12">
													<el-form-item label="别名:">
														<el-input
															v-model="item.config.title"
															maxlength="100"
															size="mini" />
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="排序:">
														<el-input-number
															v-model="item.config.sort"
															:min="1"
															:max="100"
															size="mini" />
													</el-form-item>
												</el-col>
											</el-row>
											<el-row :gutter="20">
												<el-col :span="12">
													<el-form-item label="最大层级:">
														<el-input-number
															v-model="item.config.maxZoom"
															:min="1"
															:max="20"
															size="mini" />
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="最小层级:">
														<el-input-number
															v-model="item.config.minZoom"
															:min="1"
															:max="20"
															size="mini" />
													</el-form-item>
												</el-col>
											</el-row>
											<el-row :gutter="20">
												<el-col :span="12">
													<el-form-item label="是否默认展示:">
														<el-switch
															v-model="item.config.active"
															active-text="是"
															inactive-text="否" />
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="地图服务类型:">
														<el-select
															v-model="item.config.type"
															size="mini">
															<el-option
																v-for="(item, index) in mapConfig.mapServiceType"
																:label="item.title"
																:value="item.code"
																:key="index" />
														</el-select>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row :gutter="20">
												<el-col :span="24">
													<el-form-item
														v-if="item.config.type"
														label="地图服务地址:">
														<el-input
															v-model="item.config.url"
															maxlength="100"
															size="mini" />
													</el-form-item>
												</el-col>
											</el-row>
											<el-row :gutter="20">
												<el-col :span="24">
													<el-form-item label="背景图片:">
														<el-input
															v-model="item.config.icon"
															maxlength="100"
															size="mini" />
													</el-form-item>
												</el-col>
											</el-row>
										</el-form>
									</el-collapse-item>
								</el-collapse>
							</div>
						</el-card>
						<el-card
							v-else-if="activeName==='businessLayers'"
							class="panel">
							<div
								slot="header"
								class="clearfix">
								<span>地图业务图层数据编辑</span>
								<i
									class="el-icon-plus richway-right"
									@click="handleAdd(1, 'businessLayers')" />
							</div>
							<div class="panel-content">
								<el-collapse accordion>
									<el-collapse-item
										v-for="(item, index) in mapView.regions[1].components"
										:name="index"
										:key="index">
										<template slot="title">
											<span>{{ getCollapseTitle((item.config || {}).title, index) }}</span>
											<span
												class="head-legend"
												v-html="getIconHtml(item.config.icon)" />
											<i
												class="header-close el-icon-close"
												@click.stop="handleRemove(1, 'businessLayers', index)" />
										</template>
										<el-form
											:model="item.config"
											label-width="6rem"
											label-position="left">
											<el-row :gutter="20">
												<el-col :span="12">
													<el-form-item label="别名:">
														<el-input
															v-model="item.config.title"
															maxlength="100"
															size="mini" />
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="地图服务类型:">
														<el-select
															v-model="item.config.type"
															size="mini">
															<el-option
																v-for="(item, index) in mapConfig.mapServiceType"
																:label="item.title"
																:value="item.code"
																:key="index" />
														</el-select>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row :gutter="20">
												<el-col :span="24">
													<el-form-item
														v-if="item.config.type"
														label="地图服务地址:">
														<el-input
															v-model="item.config.url"
															maxlength="100"
															size="mini" />
													</el-form-item>
												</el-col>
											</el-row>
											<el-row :gutter="20">
												<el-col :span="12">
													<el-form-item label="是否初始化:">
														<el-switch
															v-model="item.config.init"
															active-text="是"
															inactive-text="否" />
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="是否聚合:">
														<el-switch
															v-model="item.config.cluster.isCluster"
															active-text="是"
															inactive-text="否" />
													</el-form-item>
												</el-col>
											</el-row>
											<el-row :gutter="20">
												<el-col :span="12">
													<el-form-item label="是否显示在图层:">
														<el-switch
															v-model="item.config.controllByLayer"
															active-text="是"
															inactive-text="否" />
													</el-form-item>
													<el-form-item
														v-if="item.config.controllByLayer"
														label="图层排序">
														<el-input-number
															v-model="item.config.layerSort"
															:min="1"
															:max="100"
															size="mini" />
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="是否显示在图例:">
														<el-switch
															v-model="item.config.controllByLegend"
															active-text="是"
															inactive-text="否" />
													</el-form-item>
													<el-form-item
														v-if="item.config.controllByLegend"
														label="图例排序">
														<el-input-number
															v-model="item.config.legendSort"
															:min="1"
															:max="100"
															size="mini" />
													</el-form-item>
												</el-col>
											</el-row>
											<el-row :gutter="20">
												<el-col :span="12">
													<el-form-item label="颜色:">
														<el-color-picker
															v-model="item.config.color"
															size="mini" />
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="大小:">
														<el-input-number
															v-model="item.config.fontSize"
															:min=".6"
															:max="2"
															:step=".1"
															size="mini" />
													</el-form-item>
												</el-col>
											</el-row>
											<el-row :gutter="20">
												<el-col :span="12">
													<el-form-item label="图例类型:">
														<el-select
															v-model="item.config.icon"
															placeholder="请选择图例"
															size="mini"
															filterable>
															<span
																slot="prefix"
																v-html="getIconHtml(item.config.icon)" />
															<el-option
																v-for="(item, index) in mapConfig.iconList"
																:label="item.title"
																:value="item.componentName"
																:key="index">
																<span v-html="getIconHtml(item.componentName)" /><span>{{ item.title }}</span>
															</el-option>
														</el-select>
													</el-form-item>
												</el-col>
											</el-row>
										</el-form>
									</el-collapse-item>
								</el-collapse>
							</div>
						</el-card>
						<el-card
							v-else-if="activeName==='controls'"
							class="panel">
							<div
								slot="header"
								class="clearfix">
								<span>地图控制按钮数据编辑</span>
								<i
									class="el-icon-plus richway-right"
									@click="handleAdd(2, `controls`)" />
							</div>
							<div class="panel-content">
								<el-collapse accordion>
									<el-collapse-item
										v-for="(item, index) in mapView.regions[2].components"
										:name="index"
										:key="index">
										<template slot="title">
											<span>{{ getCollapseTitle((item.config || {}).title, index) }}</span>
											<span
												:class="[item.config.icon]"
												class="head-legend" />
											<i
												class="header-close el-icon-close"
												@click.stop="handleRemove(2, 'controls', index)" />
										</template>
										<el-form
											:model="item.config"
											label-width="6rem"
											label-position="left">
											<el-row :gutter="20">
												<el-col :span="12">
													<el-form-item label="位置:">
														<el-select
															v-model="item.config.position"
															size="mini">
															<el-option
																v-for="(item, index) in mapConfig.positionList"
																:label="item.title"
																:value="item.code"
																:key="index" />
														</el-select>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="排序:">
														<el-input-number
															v-model="item.config.sort"
															:min="1"
															:max="100"
															size="mini" />
													</el-form-item>
												</el-col>
											</el-row>
											<el-row :gutter="20">
												<el-col :span="12">
													<el-form-item label="是否展开:">
														<el-switch
															v-model="item.config.toggle"
															active-text="是"
															active-value="show"
															inactive-text="否"
															inactive-value="hide" />
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="图标:">
														<el-input
															v-model="item.config.icon"
															maxlength="100"
															size="mini" />
													</el-form-item>
												</el-col>
											</el-row>
										</el-form>
									</el-collapse-item>
								</el-collapse>
							</div>
						</el-card>
						<el-card
							v-else-if="activeName==='plugins'"
							class="panel">
							<div
								slot="header"
								class="clearfix">
								<span>地图插件数据编辑</span>
								<i
									class="el-icon-plus richway-right"
									@click="handleAdd(3, `plugins`)" />
							</div>
							<div class="panel-content">
								<el-collapse accordion>
									<el-collapse-item
										v-for="(item, index) in mapView.regions[3].components"
										:name="index"
										:key="index">
										<template slot="title">
											<span>{{ getCollapseTitle((item.config || {}).title, index) }}</span>
											<i
												class="header-close el-icon-close"
												@click.stop="handleRemove(3, 'plugins', index)" />
										</template>
                                        <el-form
                                            :model="item.config"
                                            label-width="6rem"
                                            label-position="left">
                                            <template v-if="item.id==='MapPluginsBoundary'">
                                                <el-row :gutter="10">
                                                    <el-col :span="4">
                                                        <el-form-item label-width="0">
                                                            <el-checkbox v-model="item.config.inside.active">内线</el-checkbox>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="10">
                                                        <el-form-item label="线条颜色:">
                                                            <el-color-picker
                                                                v-model="item.config.inside.color"
                                                                size="mini" />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="10">
                                                        <el-form-item label="线条宽度:">
                                                            <el-input-number
                                                                v-model="item.config.inside.weight"
                                                                :min="1"
                                                                :max="100"
                                                                size="mini" />
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                                <hr>
                                                <el-row :gutter="10">
                                                    <el-col :span="4">
                                                        <el-form-item label-width="0">
                                                            <el-checkbox v-model="item.config.outside.active">外线</el-checkbox>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="10">
                                                        <el-form-item label="线条颜色:">
                                                            <el-color-picker
                                                                v-model="item.config.outside.color"
                                                                size="mini" />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="10">
                                                        <el-form-item label="线条宽度:">
                                                            <el-input-number
                                                                v-model="item.config.outside.weight"
                                                                :min="1"
                                                                :max="100"
                                                                size="mini" />
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                                <hr>
                                                <el-row :gutter="10">
                                                    <el-col :span="4">
                                                        <el-form-item label-width="0">
                                                            <el-checkbox v-model="item.config.hole.active">孔</el-checkbox>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="10">
                                                        <el-form-item label="线条颜色:">
                                                            <el-color-picker
                                                                v-model="item.config.hole.color"
                                                                size="mini" />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="10">
                                                        <el-form-item label="线条宽度:">
                                                            <el-input-number
                                                                v-model="item.config.hole.weight"
                                                                :min="1"
                                                                :max="100"
                                                                size="mini" />
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                                <el-row :gutter="10">
                                                    <el-col :span="4">&nbsp;</el-col>
                                                    <el-col :span="10">
                                                        <el-form-item label="填充颜色:">
                                                            <el-color-picker
                                                                v-model="item.config.hole.fillColor"
                                                                size="mini" />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="10">
                                                        <el-form-item label="填充透明度:">
                                                            <el-input-number
                                                                v-model="item.config.hole.fillOpacity"
                                                                :min="0"
                                                                :max="1"
                                                                :step="0.1"
                                                                size="mini" />
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                            </template>
                                            <template v-else-if="item.id==='MapPluginsDangerZone'">
                                                <el-row :gutter="20">
                                                    <el-col :span="12">
                                                        <el-form-item label="线条颜色:">
                                                            <el-color-picker
                                                                v-model="item.config.color"
                                                                size="mini" />
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                                <el-row :gutter="20">
                                                    <el-col :span="12">
                                                        <el-form-item label="填充颜色:">
                                                            <el-color-picker
                                                                v-model="item.config.fillColor"
                                                                size="mini" />
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <el-form-item label="填充透明度:">
                                                            <el-input-number
                                                                v-model="item.config.fillOpacity"
                                                                :min="0"
                                                                :max="1"
                                                                :step="0.1"
                                                                size="mini" />
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                            </template>
                                        </el-form>
									</el-collapse-item>
								</el-collapse>
							</div>
						</el-card>
						<el-card
							v-else-if="activeName==='businessPanel'"
							class="panel">
							<div
								slot="header"
								class="clearfix">
								<span>地图业务监视面板数据编辑</span>
								<i
									class="el-icon-plus richway-right"
									@click="handleAdd(999, `mapBusiness`)" />
							</div>
							<div class="panel-content">
								<el-collapse accordion>
									<el-collapse-item
										v-for="(item, index) in mapBusiness.components"
										:name="index"
										:key="index">
										<template slot="title">
											<span>{{ getCollapseTitle((item.config || {}).title, index) }}</span>
											<i
												class="header-close el-icon-close"
												@click.stop="handleRemove(999, 'mapBusiness', index)" />
										</template>
										<el-form
											:model="item.config"
											label-width="6rem"
											label-position="left">
											<el-row :gutter="20">
												<el-col :span="12">
													<el-form-item label="位置:">
														<el-select
															v-model="item.config.position"
															size="mini">
															<el-option
																label="左边"
																value="left" />
															<el-option
																label="右边"
																value="right" />
														</el-select>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="排序:">
														<el-input-number
															v-model="item.config.sort"
															:min="1"
															:max="100"
															size="mini" />
													</el-form-item>
												</el-col>
											</el-row>
											<el-row :gutter="20">
												<el-col :span="24">
													<el-card>
														<div
															slot="header"
															class="clearfix">
															<span>面板栏目</span>
															<i
																class="el-icon-plus richway-right"
																@click="handleAddSubComponents(index)" />
														</div>
														<el-collapse accordion>
															<el-collapse-item
																v-for="(o, i) in item.subComponents"
																:name="i"
																:key="i">
																<template slot="title">
																	<span>{{ getCollapseTitle(o.config.title, i) }}</span>
																	<span
																		:class="[o.config.icon]"
																		class="head-legend" />
																	<i
																		class="header-close el-icon-close"
																		@click.stop="handleRemoveSubComponents(index, i)" />
																</template>
																<el-row
																	:gutter="20"
																	:key="i+'a'">
																	<el-col :span="12">
																		<el-form-item label="图标:">
																			<el-input
																				v-model="o.config.icon"
																				maxlength="100"
																				size="mini" />
																		</el-form-item>
																	</el-col>
																	<el-col :span="12">
																		<el-form-item label="排序:">
																			<el-input-number
																				v-model="o.config.sort"
																				:min="1"
																				:max="100"
																				size="mini" />
																		</el-form-item>
																	</el-col>
																</el-row>
															</el-collapse-item>
														</el-collapse>
													</el-card>
												</el-col>
											</el-row>
										</el-form>
									</el-collapse-item>
								</el-collapse>
							</div>
						</el-card>
					</el-col>
					<el-col :span="16">
						<el-card class="panel">
							<div
								slot="header"
								class="clearfix">
								<span>{{ switchTitle }}</span>
								<i
									class="el-icon-refresh richway-right"
									@click="handleRefresh" />
								<i
									:class="[showSwitch==='json' ? 'el-icon-location' : 'el-icon-tickets']"
									class="richway-right"
									@click="handleSwitch" />
							</div>
							<div class="panel-content">
								<json-viewer
								v-if="showSwitch==='json'"
								:value="{config: [mapView, mapBusiness]}" />
								<p v-else>实时地图展示功能正在开发中</p >
							</div>
						</el-card>
					</el-col>
				</el-row>
				<!--<el-input-->
				<!--type="textarea"-->
				<!--:rows="22"-->
				<!--placeholder="请输入内容"-->
				<!--v-model="textarea">-->
				<!--</el-input>-->
			</div>
			<div class="map-config-footer">
				<el-button
					type="primary"
					round
					@click="handleSave">保存</el-button>
				<el-button
					round
					@click="handleNonSave">取消</el-button>
			</div>

		</div>

        <el-dialog
            width="35rem"
            :close-on-click-modal="!1"
            :close-on-press-escape="!1"
            :modal-append-to-body="!1"
            :visible.sync="dialogVisible"
            title="选择组件">
            <div
                class="map-config-slsect">
                <div class="content">
                    <el-checkbox-group v-model="hasChooseMapConfigSelect">
                        <el-checkbox
                            v-for="(item, index) in currentMapConfigSelect"
                            :key="index"
                            :label="item.id">{{ item.title || (item.config || {}).title }}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="footer richway-pull-right">
                    <el-button
                        size="small"
                        type="primary"
                        round
                        @click="handleSure">确定</el-button>
                    <el-button
                        size="small"
                        round
                        @click="handleCancel">取消</el-button>
                </div>
            </div>
        </el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';
import mapConfig from '../../../../../constants/mapConfig';
import iconList from '../../../../components/map/icon';

const { deepClone } = RichWayWebUtils;
const mapViewDefault = {
    id: `MapView`,
    title: `地图配置信息`,
    center: ``,
    lttd: ``,
    lgtd: ``,
    zoom: 8,
    minZoom: 1,
    maxZoom: 18,
    regions: [
        {
            id: `BaseLayers`,
            title: `地图底图`,
            components: [
                {
                    title: `自定义地图`,
                    sort: 1,
                    list: [],
                    type: `custom`
                },
                {
                    title: `谷歌地图`,
                    sort: 1,
                    list: [],
                    type: `google`
                },
                {
                    title: `天地图地图`,
                    sort: 1,
                    list: [],
                    type: `tianditu`
                }
            ]
        },
        {
            id: `BusinessLayers`,
            title: `地图业务图层`,
            components: []
        },
        {
            id: `Controls`,
            title: `地图控制按钮`,
            components: []
        },
        {
            id: `Plugins`,
            title: `地图插件`,
            components: []
        }
    ]
};
const mapBusinessDefault = {
    id: `MapBusiness`,
    title: `地图业务面板`,
    components: []
};

export default {
    name: `MenuConfig`,
    components: {},
    props: {
        menuConfig: {
            type: String,
            default: ``
        }
    },
    data() {
        return {
            dialogVisible: false,
            activeName: `init`,
            mapView: mapViewDefault,
            mapBusiness: mapBusinessDefault,
            textarea: ``,
            activeTabsName: `custom`,
            currentMapConfigType: ``,
            currentMapConfigIndex: ``,
            currentMapConfigSelect: [],
            hasChooseMapConfigSelect: [],
            showSwitch: `json`
        };
    },
    computed: {
        mapConfig() {
            return mapConfig;
        },
        activeTabsIndex() {
            let index = 0;
            const { components } = this.mapView.regions[0];
            for (let a = 0, a1 = components.length; a < a1; a++) {
                if (components[a].type === this.activeTabsName) {
                    index = a;
                    break;
                }
            }
            return index;
        },
        switchTitle() {
            return this.showSwitch === `json` ? `地图配置JSON数据展示` : `地图配置实时展示`;
        }
    },
    watch: {
        menuConfig() {
            this.init();
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.mapView = mapViewDefault;
            this.mapBusiness = mapBusinessDefault;
            this.textarea = this.menuConfig;
            let menuConfig = [];
            try {
                menuConfig = JSON.parse(this.menuConfig);
            } catch (e) {
                this._log(88888, e);
            }

            for (const item of menuConfig) {
                if (item.id === `MapView`) {
                    this.mapView.center = item.center;
                    this.mapView.zoom = item.zoom;
                    this.mapView.minZoom = item.minZoom;
                    this.mapView.maxZoom = item.maxZoom;
                    for (const subItem of item.regions) {
                        for (const o of this.mapView.regions) {
                            if (subItem.id === o.id) {
                                o.components = [];
                                for (const oo of subItem.components) {
                                    if (subItem.id === `BaseLayers`) {
                                        for (const ooo of oo.list) {
                                            ooo.config = new mapConfig.BaseLayersConfig(ooo.config);
                                        }
                                    } else if (subItem.id === `BusinessLayers`) {
                                        oo.config = new mapConfig.BusinessLayersConfig(oo.config);
                                        if (!oo.config.title) {
                                            oo.config.title = mapConfig.getBusinessLayersConfigTitle(oo.componentName);
                                        }
                                    } else if (subItem.id === `Controls`) {
                                        oo.config = new mapConfig.MapControlsConfig(oo.config);
                                        if (!oo.config.title) {
                                            oo.config.title = mapConfig.getMapControlsConfigTitle(oo.componentName);
                                        }
                                    } else if (subItem.id === `Plugins`) {
                                        oo.config = new mapConfig.MapPluginsConfig(oo.config);
                                        if (!oo.config.title) {
                                            oo.config.title = mapConfig.getMapPluginsConfigTitle(oo.componentName);
                                        }
                                    }
                                    o.components.push(oo);
                                }
                                break;
                            }
                        }
                    }
                } else if (item.id === `MapBusiness`) {
                    this.mapBusiness.components = [];
                    for (const subItem of item.components) {
                        if (!subItem.config.title) {
                            subItem.config.title = mapConfig.getMapBusinessConfigTitle(subItem.componentName);
                        }
                        this.mapBusiness.components.push(subItem);
                    }
                }
            }
        },
        handleSave() {
            this.$emit(`on-save`, JSON.stringify([this.mapView, this.mapBusiness]));
        },
        handleNonSave() {
            this.$emit(`on-cancel`);
        },
        handleAdd(index, type) {
            this.currentMapConfigType = type;
            this.currentMapConfigIndex = index;
            const components = deepClone((this.mapConfig[type] || {}).components) || [];
            if (type === `baseLayers`) {
                for (const item of components) {
                    if (item.type === this.activeTabsName) {
                        this.currentMapConfigSelect.push(item);
                    }
                }
                for (const item of this.mapView.regions[0].components[this.activeTabsIndex].list) {
                    this.hasChooseMapConfigSelect.push(item.id);
                }
            } else {
                this.currentMapConfigSelect = components;
                let arr = [];
                if (type === `mapBusiness`) {
                    arr = this.mapBusiness.components;
                } else {
                    arr = this.mapView.regions[this.currentMapConfigIndex].components;
                }
                for (const item of arr) {
                    this.hasChooseMapConfigSelect.push(item.id);
                }
            }

            this.dialogVisible = true;
        },
        handleAddSubComponents(index) {
            this.currentMapConfigType = `subComponents`;
            this.currentMapConfigIndex = index;
            this.currentMapConfigSelect = deepClone((this.mapConfig.mapBusiness || {}).components[index].subComponents) || [];

            const arr = this.mapBusiness.components[index].subComponents;
            for (const item of arr) {
                this.hasChooseMapConfigSelect.push(item.id);
            }
        },
        handleRemove(index, type, subIndex) {
            if (type !== `baseLayers`) {
                if (index === 999) {
                    this.mapBusiness.components.splice(subIndex, 1);
                } else {
                    this.mapView.regions[index].components.splice(subIndex, 1);
                }
            } else {
                this.mapView.regions[index].components[this.activeTabsIndex].list.splice(subIndex, 1);
            }
        },
        handleRemoveSubComponents(index, subIndex) {
            this.mapBusiness.components[index].subComponents.splice(subIndex, 1);
        },
        handleSure() {
            const items = this.getItemsByIdList(this.hasChooseMapConfigSelect, this.currentMapConfigSelect);
            if (this.currentMapConfigType === `baseLayers`) {
                if (this.activeTabsName === `custom`) {
                    const { list } = this.mapView.regions[this.currentMapConfigIndex].components[this.activeTabsIndex];
                    this.mapView.regions[this.currentMapConfigIndex].components[this.activeTabsIndex].list = list.concat(items);
                } else {
                    this.mapView.regions[this.currentMapConfigIndex].components[this.activeTabsIndex].list = items;
                }
            } else if (this.currentMapConfigType === `subComponents`) {
                this.mapBusiness.components[this.currentMapConfigIndex].subComponents = items;
            } else if (this.currentMapConfigIndex === 999) {
                this.mapBusiness.components = items;
            } else {
                this.mapView.regions[this.currentMapConfigIndex].components = items;
            }

            this.currentMapConfigSelect = [];
            this.hasChooseMapConfigSelect = [];

            this.dialogVisible = false;
        },
        handleCancel() {
            this.currentMapConfigSelect = [];
            this.hasChooseMapConfigSelect = [];

            this.dialogVisible = false;
        },
        handleTabsClick(tab) {
            this._log(12333, tab);
        },
        handleRefresh() {},
        handleSwitch() {
            if (this.showSwitch === `json`) {
                this.showSwitch = `map`;
            } else {
                this.showSwitch = `json`;
            }
        },
        getItemById(id = ``, arr = []) {
            let info = null;
            for (const item of arr) {
                if (item.id === id) {
                    info = item;
                    break;
                }
            }
            return info;
        },
        getItemsByIdList(idList = [], arr = []) {
            const list = [];
            for (const id of idList) {
                const info = this.getItemById(id, arr);
                if (info) {
                    const sort = list.length + 1;
                    if (info.config) {
                        if (Object.hasOwnProperty.call(info.config, `sort`)) {
                            info.config.sort = sort;
                        }
                        if (Object.hasOwnProperty.call(info.config, `layerSort`)) {
                            info.config.layerSort = sort;
                        }
                        if (Object.hasOwnProperty.call(info.config, `legendSort`)) {
                            info.config.legendSort = sort;
                        }
                    } else if (Object.hasOwnProperty.call(info, `sort`)) {
                        info.sort = sort;
                    }
                    list.push(info);
                }
            }
            return list;
        },
        getIconHtml(componentName) {
            let info = {};
            if (typeof (iconList[componentName]) === `function`) {
                info = iconList[componentName]();
            }
            return info.legend || info.html || ``;
        },
        getCollapseTitle(title, index) {
            return `${(index + 1)}. ${title}`;
        }
    }
};
</script>

<style lang="scss">
    .content-map-config_edit{
        position: relative;
        .map-config-panel {
            background-color: #fff;
            padding: 1rem;
            .map-config-content {
                position: relative;
                overflow-x: hidden;
                overflow-y: auto;
                margin-bottom: 1rem;
            }
            .map-config-footer {
                text-align: right;
            }

            .panel {
                min-height: 10rem;
                border: 1px solid #eee;
                .el-card__header {
                    i {
                        position: relative;
                        font-size: 1rem;
                        padding: 0.4rem;
                        top: -.4rem;
                        &:hover {
                            background-color: rgba(0, 0, 0, .1);
                            border-radius: 50%;
                        }
                    }
                }
                .panel-content{
                    height: 20rem;
                    overflow-x: hidden;
                    overflow-y: auto;
                    .el-input-number{
                        width: 100%;
                    }
                    .el-form-item{
                        margin-bottom: .2rem;
                        &:last-child{
                            margin-bottom: 0;
                        }
                    }
                    .el-collapse-item__content{
                        padding: .4rem;
                        background-color: #f9f9f9;
                    }
                    .el-collapse-item__header {
                        position: relative;
                    }
                    .head-legend{
                        display: inline-block;
                        position: absolute;
                        right: 3rem;
                        top: 0.4rem;
                        width: 1.5rem;
                        height: 1.5rem;
                        line-height: 1.5rem;
                        text-align: center;
                        &:hover{
                            background-color: rgba(0,0,0,.1);
                            border-radius: 50%;
                        }
                    }
                    .header-close{
                        display: inline-block;
                        position: absolute;
                        right: 1.5rem;
                        top: 0.4rem;
                        width: 1.5rem;
                        height: 1.5rem;
                        text-align: center;
                        line-height: 1.5rem;
                        &:hover{
                            background-color: rgba(0,0,0,.1);
                            border-radius: 50%;
                        }
                    }
                }
            }
        }
    }


    .map-config-slsect{
        .el-checkbox-group{
            display: flex;
            flex-wrap: wrap;
        }

        .content{
            min-height: 10rem;
            max-height: 30rem;
            overflow-y: auto;
            overflow-x: hidden;
            margin: .5rem 0;
        }

        .footer{
            text-align: right;
            padding-top: .5rem;
            border-top: 1px solid #eee;
        }

        .el-checkbox{
            display: block;
            width: 33.33%;
        }
        .el-checkbox + .el-checkbox{
            margin-left: 0;
            margin-bottom: .5rem;
        }
    }
</style>
