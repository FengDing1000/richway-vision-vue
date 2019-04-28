<template>
	<div class="map-range-panel">
		<ul>
			<li>
				<span>影响范围：</span>
			</li>
			<li class="li-radio">
				<el-radio-group
					v-model="rangeType"
					@change="handleRadioChange">
					<el-radio :label="1">小流域</el-radio>
					<el-radio :label="2">自定义</el-radio>
				</el-radio-group>
			</li>
			<template v-if="rangeType === 2">
				<li class="li-icon">
					<span @click="handleChooseSelectionType('polyline')">测距<i class="richway-icon icon-distance" /></span>
				</li>
				<li class="li-icon">
					<!--<i class="richway-icon icon-area"></i>-->
					<!--<span>框选统计</span>-->
					<el-dropdown
						trigger="click"
						@command="handleChooseSelectionType">
						<span class="el-dropdown-link">框选统计<i class="el-icon-arrow-down el-icon--right" /></span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item
								v-for="(item, index) in selectionTypeList"
								:key="index"
								:command="item.code"
								:class="[item.code === currentSelectionType ? 'active' : '']">{{ item.name }}</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</li>
			</template>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
import positionFun from "../js/position.js";

const L = require(`leaflet`);
// const turf = require(`turf`);

export default {
    name: `RangeControl`,
    props: {
        position: {
            type: String,
            default: ``
        },
        map: {
            type: Object,
            default: () => ({})
        },
        mapOptions: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            layerGroup: null,
            rangeType: 1,
            zIndex: 1200,
            selectionTypeList: [
                {
                    code: `circular`,
                    name: `圆形`
                },
                {
                    code: `rectangle`,
                    name: `矩形`
                },
                {
                    code: `polygon`,
                    name: `多边形`
                }
            ],
            currentSelectionType: ``,
            //
            styleInfo: {
                color: `#fff`,
                fillColor: `#000`,
                fillOpacity: 0.3
            },
            // 原型
            circularOptions: {
                active: false,
                circularPoint: null,
                movePoint: null,
                radius: 0
            },
            // 矩形
            rectangleOptions: {
                active: false,
                startPoint: null,
                endPoint: null
            },
            // 多边形
            polygonOptions: {
                active: false,
                pointList: []
            },
            // 折线
            polylineOptions: {
                active: false,
                pointList: []
            },
            contextmenuLayer: null,
            lock: false,
            currentBounds: null
        };
    },
    computed: {
        placement() {
            return positionFun.getPlacementForTooltip(this.position);
        }
    },
    mounted() {
        this.$mapLayersFun.MapAttrListenFun(info => {
            this.attrHtml = info.html || ``;
        });

        this.$nextTick(() => {
            this.map.on(`mousedown`, this.onMouseDown);
            this.map.on(`mousemove`, this.onMouseMove);
            this.map.on(`mouseup`, this.onMouseUp);
            this.map.on(`contextmenu`, this.onContextmenu);
        });
    },
    destroyed() {
        this.map.off(`mousedown`, this.onMouseDown);
        this.map.off(`mousemove`, this.onMouseMove);
        this.map.off(`mouseup`, this.onMouseUp);
        this.map.off(`contextmenu`, this.onContextmenu);
    },
    methods: {
        handleRadioChange() {
            this.initSelectionTypeInfo();
        },
        handleChooseSelectionType(code) {
            this.initSelectionTypeInfo();
            this.currentSelectionType = code;
            if (code === `circular`) {
                this.circularOptions.active = true;
            } else if (code === `rectangle`) {
                this.rectangleOptions.active = true;
            } else if (code === `polygon`) {
                this.polygonOptions.active = true;
            } else if (code === `polyline`) {
                this.polylineOptions.active = true;
            }
        },
        initSelectionTypeInfo() {
            this.circularOptions.active = false;
            this.circularOptions.circularPoint = null;
            this.circularOptions.movePoint = null;
            this.circularOptions.radius = 0;

            this.rectangleOptions.active = false;
            this.rectangleOptions.startPoint = false;
            this.rectangleOptions.endPoint = false;

            this.polygonOptions.active = false;
            this.polygonOptions.pointList = [];

            this.polylineOptions.active = false;
            this.polylineOptions.pointList = [];
        },
        onMouseDown(e) {
            if (e.originalEvent.button === 0 && !this.lock) {
                if (this.circularOptions.active) {
                    this.map.dragging.disable();
                    this.circularOptions.circularPoint = e.latlng;
                } else if (this.rectangleOptions.active) {
                    this.map.dragging.disable();
                    this.rectangleOptions.startPoint = e.latlng;
                } else if (this.polygonOptions.active) {
                    this.polygonOptions.pointList.push(e.latlng);
                    this.polygonFun();
                } else if (this.polylineOptions.active) {
                    this.polylineOptions.pointList.push(e.latlng);
                    this.polylineFun();
                }
            }
        },
        onMouseMove(e) {
            if (!this.lock) {
                if (this.circularOptions.active) {
                    if (this.circularOptions.circularPoint) {
                        this.circularOptions.movePoint = e.latlng;
                        this.circleFun();
                    }
                } else if (this.rectangleOptions.active) {
                    if (this.rectangleOptions.startPoint) {
                        this.rectangleOptions.endPoint = e.latlng;
                        this.rectangleFun();
                    }
                }
            }
        },
        onMouseUp() {
            if (!this.lock) {
                // this.circularOptions.circularPoint = null;
                // this.circularOptions.movePoint = null;

                // this.circularOptions.active = false;
                // this.rectangleOptions.active = false;

                this.map.dragging.enable();
            }
        },
        onContextmenu(e) {
            this.clearContextmenuLayer();
            if (this.layerGroup && this.layerGroup.getLayers().length) {
                this.contextmenuLayer = this.drawContextmenuPanel(e.latlng);
                this.layerGroup.addLayer(this.contextmenuLayer);
                this.lock = true;
            }
        },
        // 画圆形
        circleFun() {
            if (this.circularOptions.active) {
                this.clearFun();
                if (this.circularOptions.circularPoint && this.circularOptions.movePoint) {
                    // 计算半径
                    this.circularOptions.radius = L.latLng(this.circularOptions.movePoint).distanceTo(this.circularOptions.circularPoint);
                    const circle = L.circle(this.circularOptions.circularPoint, Object.assign({
                        radius: this.circularOptions.radius
                    }, this.styleInfo));

                    const pointAndArea = this.drawCirclePointAndArea(this.circularOptions.circularPoint, this.circularOptions.movePoint);
                    this.layerGroup = L.layerGroup([circle].concat(pointAndArea)).setZIndex(this.zIndex).addTo(this.map);

                    this.currentBounds = null;
                }
            }
        },
        // 画矩形
        rectangleFun() {
            if (this.rectangleOptions.active) {
                this.clearFun();
                if (this.rectangleOptions.startPoint && this.rectangleOptions.endPoint) {
                    const bounds = [];
                    bounds.push(this.rectangleOptions.startPoint);
                    bounds.push(this.rectangleOptions.endPoint);

                    const pointAndArea = this.drawRectanglePointAndArea(this.rectangleOptions.startPoint, this.rectangleOptions.endPoint);
                    const rectangle = L.rectangle(bounds, this.styleInfo);
                    this.layerGroup = L.layerGroup([rectangle].concat(pointAndArea)).setZIndex(this.zIndex).addTo(this.map);

                    this.currentBounds = null;
                }
            }
        },
        // 画多边形
        polygonFun() {
            if (this.polygonOptions.active) {
                this.clearFun();
                if (this.polygonOptions.pointList.length) {
                    const polygon = L.polygon(this.polygonOptions.pointList, this.styleInfo);
                    const points1 = this.drawPointFun(this.polygonOptions.pointList);
                    this.layerGroup = L.layerGroup([polygon].concat(points1)).setZIndex(this.zIndex).addTo(this.map);

                    this.currentBounds = null;
                }
            }
        },
        // 画折线
        polylineFun() {
            if (this.polylineOptions.active) {
                this.clearFun();
                if (this.polylineOptions.pointList.length) {
                    const polyline = L.polyline(this.polylineOptions.pointList, this.styleInfo);
                    const points1 = this.drawPointFun(this.polylineOptions.pointList);
                    const points2 = this.drawTipsFun(this.polylineOptions.pointList, `add`);
                    this.layerGroup = L.layerGroup([polyline].concat(points1, points2)).setZIndex(this.zIndex).addTo(this.map);

                    this.currentBounds = null;
                }
            }
        },
        // 画鼠标点击位置的圆点
        drawPointFun(markerList) {
            const layers = [];
            for (const item of markerList) {
                const options = {
                    icon: L.divIcon({
                        iconSize: [10, 10],
                        iconAnchor: [5, 5],
                        className: `map-range-marker-point`,
                        html: `<span></span>`
                    })
                };
                const marker = L.marker(item, options);
                layers.push(marker);
            }
            return layers;
        },
        // 画两点之间的弹窗提示
        drawTipsFun(markerList, type) {
            const layers = [];
            let prevPoint = null;
            let totalDistance = 0;
            for (const item of markerList) {
                // 计算距离
                let distance = 0;
                let targetPoint = null;
                let tipsDistance = 0;
                if (prevPoint) {
                    distance = L.latLng(item).distanceTo(prevPoint);
                    targetPoint = this.getCenterPoint(prevPoint, item);
                    totalDistance += distance;
                    tipsDistance = distance;

                    if (type === `add`) {
                        targetPoint = item;
                        tipsDistance = totalDistance;
                    }

                    const options = {
                        icon: L.divIcon({
                            iconSize: [100, 20],
                            iconAnchor: [50, 30],
                            className: `map-range-marker-panel`,
                            html: `<span>${this.toKilometre(tipsDistance)} km</span>`
                        })
                    };

                    const marker = L.marker(targetPoint, options);
                    layers.push(marker);
                }
                prevPoint = item;
            }
            return layers;
        },
        // 以两点为半径的圆形
        drawCirclePointAndArea(point1, point2) {
            const pointList = [point1, point2];
            const points1 = this.drawPointFun(pointList);
            const points2 = this.drawTipsFun(pointList);
            const polyline = L.polyline(pointList, this.styleInfo);

            const distance = L.latLng(point1).distanceTo(point2);
            const options = {
                icon: L.divIcon({
                    iconSize: [140, 20],
                    iconAnchor: [70, 30],
                    className: `map-range-marker-panel`,
                    html: `<span>${this.toSquareKilometre(distance * distance * Math.PI)} km2</span>`
                })
            };
            const areaMarker = L.marker(point1, options);

            return [areaMarker].concat(points1, points2, polyline);
        },
        // 以两点为对角线的矩形
        drawRectanglePointAndArea(point1, point2) {
            const rectanglePoints = this.getRectanglePoints(this.rectangleOptions);
            const points = this.drawPointFun(rectanglePoints);

            const centerPoint = this.getCenterPoint(point1, point2);
            const distance1 = L.latLng(rectanglePoints[0]).distanceTo(rectanglePoints[1]);
            const distance2 = L.latLng(rectanglePoints[1]).distanceTo(rectanglePoints[2]);
            const options = {
                icon: L.divIcon({
                    iconSize: [140, 20],
                    iconAnchor: [70, 10],
                    className: `map-range-marker-panel`,
                    html: `<span>${this.toSquareKilometre(distance1 * distance2)} km2</span>`
                })
            };
            const areaMarker = L.marker(centerPoint, options);

            return [areaMarker].concat(points);
        },
        // 画右键提示
        drawContextmenuPanel(point) {
            let html = ``;
            if (this.currentSelectionType !== `polyline`) {
                html += `<div class="menu-btn-sure">确定</div>`;
            }
            html += `<div class="menu-btn-cancel">取消</div>`;

            const options = {
                icon: L.divIcon({
                    iconSize: [60, 60],
                    iconAnchor: [0, 0],
                    className: `map-range-marker-menu`,
                    html
                })
            };

            const marker = L.marker(point, options).on(`click`, e => {
                const { target } = e.originalEvent;
                this.lock = false;
                if (L.DomUtil.hasClass(target, `menu-btn-sure`)) {
                    this.contextmenuSureFun();
                } else if (L.DomUtil.hasClass(target, `menu-btn-cancel`)) {
                    this.contextmenuCancelFun();
                }
            });
            return marker;
        },
        // 右键 确定按钮
        contextmenuSureFun() {
            let bounds = [];
            if (this.currentBounds) {
                bounds = this.currentBounds;
            } else {
                let arr = [];
                if (this.currentSelectionType === `circular`) {
                    arr = this.getcirclePoints(this.circularOptions);
                } else if (this.currentSelectionType === `rectangle`) {
                    arr = this.getRectanglePoints(this.rectangleOptions);
                } else if (this.currentSelectionType === `polygon`) {
                    arr = this.polygonOptions.pointList;
                }
                for (const item of arr) {
                    bounds.push([item.lng, item.lat]);
                }

                this.currentBounds = bounds;
            }

            this.clearContextmenuLayer();
            this.initSelectionTypeInfo();

            this.$mapLayersFun.MapBaseLayersBoundsBroadcastFun({
                bounds
            });
        },
        // 右键 取消按钮
        contextmenuCancelFun() {
            this.clearFun();
            this.handleChooseSelectionType(this.currentSelectionType);
        },
        // 获取两点之间的中心点
        getCenterPoint(point1, point2) {
            return L.latLng((point1.lat + point2.lat) / 2, (point1.lng + point2.lng) / 2);
        },
        // 获取圆形的边界
        getcirclePoints(info = {}) {
            const pointCount = 50;
            const radian = 360 / pointCount;
            const point1 = info.circularPoint;
            const point2 = info.movePoint;
            const radius = Math.sqrt((point2.lat - point1.lat) ** 2 + (point2.lng - point1.lng) ** 2);

            const arr = [];
            for (let index = 0; index < pointCount; index++) {
                const angle = (2 * Math.PI / 360) * radian * index;
                const lat = point1.lat + Math.sin(angle) * radius;
                const lng = point1.lng - Math.cos(angle) * radius;
                arr.push({
                    lat,
                    lng
                });
            }
            return arr;
        },
        // 获取矩形的4个坐标点
        getRectanglePoints(info = {}) {
            return [info.startPoint, L.latLng(info.startPoint.lat, info.endPoint.lng), info.endPoint, L.latLng(info.endPoint.lat, info.startPoint.lng)];
        },
        toKilometre(m) {
            return ((m || 0) / 1000).toFixed(2);
        },
        toSquareKilometre(mm) {
            return ((mm || 0) / 1000000).toFixed(2);
        },
        // 清除图层
        clearFun() {
            if (this.layerGroup && typeof (this.layerGroup.clearLayers) === `function`) {
                this.layerGroup.clearLayers();
            }
        },
        // 移除右键弹窗图层
        clearContextmenuLayer() {
            if (this.layerGroup && typeof (this.layerGroup.removeLayer) === `function` && this.contextmenuLayer) {
                this.layerGroup.removeLayer(this.contextmenuLayer);
            }
        }
    }
};
</script>

<style lang="scss">
    .map-range-panel{
        background-color: rgb(71, 117, 202);
        color: #fff;
        padding: 0 .5rem;
        border-radius: 4px;
        pointer-events: auto;
        font-size: .7rem;
        ul {
            display: flex;
            align-items: center;
            justify-content:center;
            li {
                position: relative;
                width: 4.4rem;
                padding: .2rem .3rem;
                display: flex;
                align-items: center;
                justify-content:flex-start;
                &:after{
                    content: "";
                    display: inline-block;
                    position: absolute;
                    width: 1px;
                    top: 2px;
                    bottom: 2px;
                    right:0;
                    background-color: #fff;
                }

                &:last-child, &:first-child {
                    &:after{
                        display: none;
                    }
                }
            }

            .li-radio {
                width: 9rem;
                .el-radio,
                .el-radio__input.is-checked + .el-radio__label{
                    color: #fff !important;
                }
                .el-radio__input.is-checked .el-radio__inner {
                    border-color: #7ed321;
                    background: #7ed321;
                }
            }

            .li-icon {
                width: 4.4rem;
                justify-content: center;

                &:hover {
                    background-color: rgba(0,0,0,.1);
                }

                .el-dropdown-link{
                    color: #fff;
                }
            }
        }
    }

    .map-range-marker-panel{
        background-color: #fff;
        color: #000;
        font-size: 14px;
        text-align: center;
        border-radius: 4px;
        &:after{
            content: " ";
            position: absolute;
            width: 10px;
            height: 10px;
            bottom: -5px;
            left: 50%;
            margin-left: -5px;
            background-color: #fff;
            transform:rotate(45deg);
            z-index: -1;
        }
    }
    .map-range-marker-point{
        background-color: #fff;
        border-radius: 50%;
    }
    .map-range-marker-menu {
        background-color: #fff;
        color: #000;
        font-size: 14px;
        text-align: center;
        border-radius: 4px;
        >div {
            position: relative;
            height: 30px;
            line-height: 30px;
            &:after{
                content: " ";
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height:1px;
                background-color: #eee;
            }
            &:last-child:after{
                display: none;
            }
            &:hover{
                background-color: rgba(0,0,0,.1);
            }
        }
    }
</style>
