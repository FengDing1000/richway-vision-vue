const path = require(`path`);
const InterfaceDemoUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.interfaceDemo);
// const InterfaceCloudFilterUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.interfaceCloudFilter);

module.exports = {
    prefix: `/communication`,
    baseUrl: ``,
    list: [
        // 发送列表页-发送列表的信息
        {
            node: {
                url: `/getSendList`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetSendList`,
                description: `发送列表页-数据列表`
            },
            data: {
                cloud: {
                    url: `/base/api/pubMsg/sms/msgs`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/sendList`,
                    handler: `GetSendList`
                }
            }
        },
        // 发送列表页-补发短信成功提示
        {
            node: {
                url: `/reissue`,
                method: `post`,
                mustLogin: true,
                fetchName: `Reissue`,
                description: `发送列表页-数据列表`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/base/api/pubMsg/reissue/msgs/{id}`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/sendList`,
                    handler: `Reissue`
                }
            }
        },
        // 发送列表页-删除短信列表
        {
            node: {
                url: `/deleteSMSList`,
                method: `post`,
                mustLogin: true,
                fetchName: `DeleteSMSList`,
                description: `发送列表页-数据列表`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/base/api/pubMsg/sms/msgs/{msgId}`,
                    method: `delete`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/sendList`,
                    handler: `DeleteSMSList`
                }
            }
        },
        // 发送列表页-点击状态，发送数据请求
        {
            node: {
                url: `/sendListStateTableInfo`,
                method: `post`,
                mustLogin: true,
                fetchName: `SendListStateTableInfo`,
                description: `发送列表页-点击状态，发送数据请求`,
            },
            data: {
                cloud: {
                    url: `/base/api/pubMsg/sms/msglist/{id}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/sendList`,
                    handler: `SendListStateTableInfo`
                }
            }
        },
        // 发送列表页-点击补发，发送数据请求
        {
            node: {
                url: `/sendListStateReplacement`,
                method: `post`,
                mustLogin: true,
                fetchName: `SendListStateReplacement`,
                description: `发送列表页-点击补发，发送数据请求`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/base/api/pubMsg/reissue/msg/{id}`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/sendList`,
                    handler: `SendListStateReplacement`
                }
            }
        },
        // 编辑短信页-左侧联系人列表
        {
            node: {
                url: `/getContactList`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetContactList`,
                description: `编辑短信页-左侧联系人列表`
            },
            data: {
                cloud: {
                    url: `/base/api/contacts/tree`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/editShortMessage`,
                    handler: `GetContactList`
                }
            }
        },
        // 编辑短信页-左侧联系人防汛列表
        {
            node: {
                url: `/getFloodControlList`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetFloodControlList`,
                description: `编辑短信页-左侧联系人防汛列表`
            },
            data: {
                cloud: {
                    url: `/base/api/contacts/tree`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/editShortMessage`,
                    handler: `GetFloodControlList`
                }
            }
        },
        // 编辑短信页-点击tree，显示穿梭宽的信息
        {
            node: {
                url: `/getcontactsList`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetcontactsList`,
                description: `编辑短信页-点击tree，显示穿梭宽的信息`
            },
            data: {
                cloud: {
                    url: `/base/api/contacts/list`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/editShortMessage`,
                    handler: `GetcontactsList`
                }
            }
        },
        // 编辑短信页-右侧头部信息发送签名方式
        {
            node: {
                url: `/gettypes`,
                method: `post`,
                mustLogin: true,
                fetchName: `Gettypes`,
                description: `编辑短信页-右侧头部信息发送签名方式`
            },
            data: {
                cloud: {
                    url: `/base/api/pubMsg/sign/types`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/editShortMessage`,
                    handler: `Gettypes`
                }
            }
        },
        //  编辑短信页-点击确认发送
        {
            node: {
                url: `/sendOut`,
                method: `post`,
                mustLogin: true,
                fetchName: `SendOut`,
                description: `编辑短信页-点击确认发送`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/base/api/pubMsg/new/savePubMsg`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/editShortMessage`,
                    handler: `SendOut`
                }
            }
        },
        //通讯录页面-联系人人数
        {
            node: {
                url: `/getCount`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetCount`,
                description: `通讯录页面-联系人人数`
            },
            data: {
                cloud: {
                    url: `/base/api/contacts/count`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/mailList`,
                    handler: `GetCount`
                }
            }
        },
        // 通讯录页面-表格信息
        {
            node: {
                url: `/getContactTable`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetContactTable`,
                description: `通讯录页面-表格信息`
            },
            data: {
                cloud: {
                    url: `/base/api/contacts/list`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/mailList`,
                    handler: `GetContactTable`
                }
            }
        },
        // 通讯录页面-tree的添加成功提示
        {
            node: {
                url: `/addAContact`,
                method: `post`,
                mustLogin: true,
                fetchName: `AddAContact`,
                description: `通讯录页面-tree的添加成功提示`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/base/api/sysmana/dept/dept`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/mailList`,
                    handler: `AddAContact`
                }
            }
        },
        // 通讯录页面-删除联系人信息
        {
            node: {
                url: `/deleteContact`,
                method: `post`,
                mustLogin: true,
                fetchName: `DeleteContact`,
                description: `通讯录页面-删除联系人信息`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/base/api/contacts/del`,
                    method: `delete`,
                    postType: `body`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/mailList`,
                    handler: `DeleteContact`
                }
            }
        },
        // 通讯录页面-添加编辑联系人
        {
            node: {
                url: `/addEditContact`,
                method: `post`,
                mustLogin: true,
                fetchName: `AddEditContact`,
                description: `通讯录页面-添加编辑联系人`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/base/api/contacts/save`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/mailList`,
                    handler: `AddEditContact`
                }
            }
        },
        // 通讯录页面-成功删除一行tree
        {
            node: {
                url: `/deleteTreelist`,
                method: `post`,
                mustLogin: true,
                fetchName: `DeleteTreelist`,
                description: `通讯录页面-成功删除一行tree`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/base/api/contacts/dept/{deptCd}`,
                    method: `delete`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/mailList`,
                    handler: `DeleteTreelist`
                }
            }
        },
        // 通讯录页面-赋值到组
        {
            node: {
                url: `/copyToGrp`,
                method: `post`,
                mustLogin: true,
                fetchName: `CopyToGrp`,
                description: `通讯录页面-移动到组`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/base/api/contacts/copytogrp`,
                    method: `post`,
                    postType: `body`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/mailList`,
                    handler: `CopyToGrp`
                }
            }
        },
        //
        // 通讯录页面-移动到组
        {
            node: {
                url: `/moveToGrp`,
                method: `post`,
                mustLogin: true,
                fetchName: `MoveToGrp`,
                description: `通讯录页面-移动到组`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/base/api/contacts/movetogrp`,
                    method: `post`,
                    postType: `body`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/mailList`,
                    handler: `MoveToGrp`
                }
            }
        },
        // 通讯录页面-导入联系人
        {
            node: {
                url: `/importContacts`,
                method: `post`,
                mustLogin: true,
                fetchName: `ImportContacts`,
                description: `通讯录页面-导入联系人`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/base/api/contacts/saveContact`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/mailList`,
                    handler: `ImportContacts`
                }
            }
        },
        // 编辑短信页-左侧列表防汛联系人
        {
            node: {
                url: `/personIncharge`,
                method: `post`,
                mustLogin: true,
                fetchName: `PersonIncharge`,
                description: `编辑短信页-左侧列表防汛联系人`
            },
            data: {
                cloud: {
                    url: `/shzh/warning/personIncharge/tree/{adcd}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/editShortMessage`,
                    handler: `PersonIncharge`
                }
            }
        },
        // 编辑短信页-组里面的防汛通讯人
        {
            node: {
                url: `/personInchargeGroup`,
                method: `post`,
                mustLogin: true,
                fetchName: `PersonInchargeGroup`,
                description: `编辑短信页-组里面的防汛通讯人`
            },
            data: {
                cloud: {
                    url: `/shzh/warning/personIncharge/person/{adcd}/{chargeType}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/communication/editShortMessage`,
                    handler: `PersonInchargeGroup`
                }
            }
        },

    ]
}
