const L = require(`leaflet`);

L.Control.SiteMarkerPanel = L.Control.extend({
    // 在此定义参数
    options: {
        // 初始位置
        position: `bottomright`
    },
    // 在此初始化
    initialize(options) {
        L.Util.extend(this.options, options);
    },
    // 可在此添加控件内容
    onAdd() {
        // 创建一个class为leaflet-control-clegend的div
        this._container = L.DomUtil.create(`div`, `site-panel-info`);
        // 创建一个关闭控件的按钮
        const closeButton = document.createElement(`i`);
        closeButton.className = `richway-icon icon-close`;
        this._closebutton = closeButton;

        this._container.appendChild(this._closebutton);
        // 注册关闭事件
        L.DomEvent.addListener(this._closebutton, `click`, this._onCloseControl, this);

        return this._container;
    },
    _onCloseControl() {
        this._map.options.Legend = false;
        this.removeFrom(this._map);
    }
});
