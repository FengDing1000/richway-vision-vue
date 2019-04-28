const menuDetail = {
    code: null,
    data: {
        appId: `admin661001`,
        children: [],
        cmptId: null,
        config: [
            {
                id: `site_mgmt.site_mgmt_tree`,
                module: `site_mgmt/siteTree/defaultView`,
                widget_id: `site_mgmt.site_mgmt_tree`,
                order: 0,
                container: `Base.site_mgmtBootstrapLayout2`,
                parameters: {
                    region: `left`,
                    assetSelectionTopicString: `/rich/iot/site_mgmt/deviceTree/assetSelect`,
                    deleteGroupTopicString: `/rich/iot/site_mgmt/deviceTree/deleteGroup`,
                    deleteAssetTopicString: `/rich/iot/site_mgmt/deviceTree/deleteAsset`,
                    groupRefreshTopicString: `/rich/iot/site_mgmt/deviceTree/groupRefresh`,
                    assetRefreshTopicString: `/rich/iot/site_mgmt/deviceTree/assetRefresh`,
                    groupSelectionTopicString: `/rich/iot/site_mgmt/deviceTree/groupSelect`
                }
            }, {
                id: `site_mgmt.site_mgmt_content`,
                module: `site_mgmt/siteContent/defaultView`,
                widget_id: `site_mgmt.site_mgmt_content`,
                order: 0,
                container: `Base.site_mgmtBootstrapLayout2`,
                parameters: {
                    region: `main`,
                    assetSelectionTopicString: `/rich/iot/site_mgmt/deviceTree/assetSelect`,
                    deleteGroupTopicString: `/rich/iot/site_mgmt/deviceTree/deleteGroup`,
                    deleteAssetTopicString: `/rich/iot/site_mgmt/deviceTree/deleteAsset`,
                    groupRefreshTopicString: `/rich/iot/site_mgmt/deviceTree/groupRefresh`,
                    assetRefreshTopicString: `/rich/iot/site_mgmt/deviceTree/assetRefresh`,
                    groupSelectionTopicString: `/rich/iot/site_mgmt/deviceTree/groupSelect`
                }
            }, {
                id: `Base.site_mgmtBootstrapLayout2`,
                module: `base/layout/BootstrapLayout`,
                widget_id: `Base.BootstrapLayout`,
                container: `main`,
                parameters: { left_width: 250 },
                regions: [`left`, `main`]
            }
        ],
        converMarks: `j`,
        crtDt: null,
        layoutId: `Base.site_mgmtBootstrapLayout2`,
        menuLogo: null,
        nt: null,
        pageId: `admin66100174ae2a9f97`,
        pageNm: `测站管理`,
        pageType: `page`,
        parentId: `admin661001e42919f2e5`,
        sortId: 2,
        target: null,
        updDt: `2018-08-22 15:10:52`,
        url: `www.baidu.com`,
        visible: 1
    },
    message: null,
    pages: 0,
    stackTrace: null,
    success: true,
    total: 1
};

module.exports = {
    menuDetail
};
