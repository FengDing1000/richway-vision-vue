const path = require(`path`);
const InterfaceDemoUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.interfaceDemo);
const InterfaceCloudFilterUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.interfaceCloudFilter);

module.exports = {
    prefix: `/duty`,
    baseUrl: ``,
    list: [
        // 值班安排页-值班人员信息列表
        {
            node: {
                url: `/getDutyList`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetDutyList`,
                description: `值班安排页-值班人员信息列表`
            },
            data: {
                cloud: {
                    url: `/duty/schedule/dutySchedules`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty`,
                    handler: `GetDutyList`
                }
            },
            // handler: {
            //     url: `${InterfaceCloudFilterUrl}/duty`,
            //     processParametersHandler: `FilterDutyParametersFun`
            // }
        },
        // 值班安排页-添加新值班人员成功
        {
            node: {
                url: `/addDuty`,
                method: `post`,
                mustLogin: true,
                fetchName: `AddDuty`,
                description: `值班安排页-添加新值班人员成功`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/duty/schedule/dutySchedule`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty`,
                    handler: `AddDuty`
                }
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/duty`,
                processParametersHandler: `FilterAddDutyParametersFun`
            }
        },
        // 值班安排页-编辑值班人员成功提示
        {
            node: {
                url: `/updateDuty`,
                method: `post`,
                mustLogin: true,
                fetchName: `UpdateDuty`,
                description: `值班安排页-编辑值班人员成功提示`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/duty/schedule/dutySchedule`,
                    method: `post`,
                    postType: `body`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty`,
                    handler: `UpdateDuty`
                }
            }
        },
        // 值班安排页-删除值班人员信息
        {
            node: {
                url: `/deleteDuty`,
                method: `post`,
                mustLogin: true,
                fetchName: `DeleteDuty`,
                description: `值班安排页-删除值班人员信息`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/duty/schedule/dutySchedule/{scheduleIds}`,
                    method: `delete`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty`,
                    handler: `DeleteDuty`
                }
            }
        },
        // 值班安排页-添加弹框里面的时段请求
        {
            node: {
                url: `/getTimeInterval`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetTimeInterval`,
                description: `值班安排页-添加弹框里面的时段请求`
            },
            data: {
                cloud: {
                    url: `/duty/period/listByUser`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty`,
                    handler: `GetTimeInterval`
                }
            }
        },
        // 值班安排页-添加弹框里面的值班人员请求/1,2,3,4/
        {
            node: {
                url: `/getDutyManagePersonRole`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetDutyManagePersonRole`,
                description: `值班安排页-添加弹框里面的值班人员请求`
            },
            data: {
                cloud: {
                    url: `/duty/person/dutyPersonsByRole/{number}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty`,
                    handler: `GetDutyManagePersonRole`
                }
            }
        },
        // 值班安排页-获取编辑弹框里面值班人员的信息 参数：isPlan=1
        {
            node: {
                url: `/getDutyManagementPerson`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetDutyManagementPerson`,
                description: `值班安排页-获取编辑弹框里面值班人员的信息`
            },
            data: {
                cloud: {
                    url: `/duty/scheduleperson/schedulepersons/{scheduleId}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/duty`,
                    handler: `GetDutyManagementPerson`
                }
            }
        },
        // 值班安排页-下载值班导入模版
        {
            node: {
                url: `/downloadTemplate`,
                method: `post`,
                mustLogin: true,
                fetchName: `DownloadTemplate`,
                description: `值班安排页-下载值班导入模版`
            },
            data: {
                cloud: {
                    url: `/duty/schedule/downloadTemplate`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/duty`,
                    handler: `DownloadTemplate`
                }
            }
        },
        // 值班安排页-导入excel表格，参数名字：files
        {
            node: {
                url: `/importSchedulee`,
                method: `post`,
                mustLogin: true,
                fetchName: `ImportSchedulee`,
                description: `值班安排页-下载值班导入模版`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/duty/schedule/importSchedule`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty`,
                    handler: `ImportSchedulee`
                }
            }
        },
        // 值班登记页-获取所有值班人员信息
        {
            node: {
                url: `/getAllPerson`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetAllPerson`,
                description: `获取所有值班人员信息`
            },
            data: {
                cloud: {
                    url: `/duty/person/allperson`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty/dutyRegister`,
                    handler: `GetAllPerson`
                }
            }
        },
        // 值班登记页-页面头部时间段信息
        {
            node: {
                url: `/getDutyTime`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetDutyTime`,
                description: `值班登记页-页面头部时间段信息`,
            },
            data: {
                cloud: {
                    url: `/duty/schedule/dutySchedule/{scheduleId}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/duty/dutyRegister`,
                    handler: `GetDutyTime`
                }
            }
        },
        // 值班登记页-提交值班信息
        {
            node: {
                url: `/addRegister`,
                method: `post`,
                mustLogin: true,
                fetchName: `AddRegister`,
                description: `提交值班信息`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/duty/scheduleperson/person`,
                    method: `post`,
                    postType: `body`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty/dutyRegister`,
                    handler: `AddRegister`
                }
            },
            // handler: {
            //     url: `${InterfaceCloudFilterUrl}/duty/dutyRegister`,
            //     processParametersHandler: `FilterAddRegisterParametersFun`,
            //     // processResultsHandler: `FilteAddRegisterResultFun`
            // }
        },
        // 值班登记页-值班报告底部折叠版表格数据
        {
            node: {
                url: `/getDutyReportForm`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetDutyReportForm`,
                description: `值班登记页-值班报告底部折叠版表格数据`
            },
            data: {
                cloud: {
                    url: `/duty/schedule/scheduleDetail`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/duty/dutyRegister`,
                    handler: `GetDutyReportForm`
                }
            }
        },
        // 值班登记页-值班报告的汛情表
        {
            node: {
                url: `/getFloodSeasonTable`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetFloodSeasonTable`,
                description: `值班登记页-值班报告的汛情表`,
            },
            data: {
                cloud: {
                    url: `/duty/report/report/{scheduleId}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/duty/dutyRegister`,
                    handler: `GetFloodSeasonTable`
                }
            }
        },
        // 值班登记页-值班报告的保存
        {
            node: {
                url: `/getReportReport`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetReportReport`,
                description: `值班登记页-值班报告的保存`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/duty/report/report`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `/duty/dutyRegister`,
                    handler: `GetReportReport`
                }
            }
        },
        // 值班登记页-保存排班安排记录
        {
            node: {
                url: `/addDutyRecord`,
                method: `post`,
                mustLogin: true,
                fetchName: `AddDutyRecord`,
                description: `值班登记页-保存排班安排记录`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/duty/record/dutyRecord`,
                    method: `post`,
                    // postType: `body`,
                    accessToken: true
                },
                demo: {
                    url: `/duty/dutyRegister`,
                    handler: `AddDutyRecord`
                }
            }
        },
        // 值班登记页-底部标签的删除
        {
            node: {
                url: `/deleteDutyRecord`,
                method: `post`,
                mustLogin: true,
                fetchName: `DeleteDutyRecord`,
                description: `值班登记页-底部标签的删除`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/duty/record/dutyRecord/{id}`,
                    method: `put`,
                    accessToken: true
                },
                demo: {
                    url: `/duty/dutyRegister`,
                    handler: `DeleteDutyRecord`
                }
            }
        },
        // 值班登记页-获取值班登记页面的scheduleId
        {
            node: {
                url: `/getScheduleId`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetScheduleId`,
                description: `获取值班登记页面的scheduleId`
            },
            data: {
                cloud: {
                    url: `/duty/schedule/registerSchedule`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty/dutyRegister`,
                    handler: `GetScheduleId`
                }
            }
        },
        // 值班登记页-获取值班人员登记页面右侧日历下方的显示信息参数-如果今日有值班登记了
        {
            node: {
                url: `/getDutyPersonnel`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetDutyPersonnel`,
                description: `获取值班人员登记页面右侧日历下方的显示信息`
            },
            data: {
                cloud: {
                    url: `/duty/scheduleperson/schedulepersons/{scheduleId}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty/dutyRegister`,
                    handler: `GetDutyPersonnel`
                }
            }
        },
        // 值班登记页-获取值班人员登记页面右侧日历下方的显示信息2
        {
            node: {
                url: `/getDutyPersonnelInfo`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetDutyPersonnelInfo`,
                description: `获取值班人员登记页面右侧日历下方的显示信息2`
            },
            data: {
                cloud: {
                    url: `/duty/schedule/currScheduleData`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty/dutyRegister`,
                    handler: `GetDutyPersonnelInfo`
                }
            }
        },
        {
            node: {
                url: `/getDutyRecordInfo`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetDutyRecordInfo`,
                description: `值班记录页-获取值班记录列表`
            },
            data: {
                cloud: {
                    url: `/duty/schedule/dutySchedules`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty/dutyRecord`,
                    handler: `GetDutyRecordInfo`
                }
            },
            // handler: {
            //     url: `${InterfaceCloudFilterUrl}/duty`,
            //     processParametersHandler: `FilterDutyParametersFun`
            // }
        },
        // 值班记录页-值班记录的详细记录（弹框里面的信息）
        {
            node: {
                url: `/getQueryDutyRecordDetails`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetQueryDutyRecordDetails`,
                description: `值班记录页-值班记录的详细记录（弹框里面的信息）`
            },
            data: {
                cloud: {
                    url: `/duty/record/list/{scheduleId}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty/dutyRecord`,
                    handler: `GetQueryDutyRecordDetails`
                }
            }
        },
        // 值班快报页-列表数据
        {
            node: {
                url: `/getDutyBulletinList`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetDutyBulletinList`,
                description: `值班快报页-列表数据`
            },
            data: {
                cloud: {
                    url: `/duty/person/dutyPersons`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty/dutyRecord`,
                    handler: `GetDutyBulletinList`
                }
            }
        },
        // 值班快报页-提交添加的值班人员信息
        {
            node: {
                url: `/expressSubmitInfo`,
                method: `post`,
                mustLogin: true,
                fetchName: `ExpressSubmitInfo`,
                description: `值班快报页-提交添加的值班人员信息`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/duty/person/dutyPerson`,
                    method: `post`,
                    postType: `formData`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty/dutyRecord`,
                    handler: `ExpressSubmitInfo`
                }
            }
        },
        // 值班快报页-点击删除
        {
            node: {
                url: `/expressDeleteInfo`,
                method: `post`,
                mustLogin: true,
                fetchName: `ExpressDeleteInfo`,
                description: `值班快报页-点击删除`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/duty/person/dutyPersons/{personId}`,
                    method: `delete`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty/dutyRecord`,
                    handler: `ExpressDeleteInfo`
                }
            }
        },
        //值班快报页-表格信息
        {
            node: {
                url: `/getFastReport`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetFastReport`,
                description: `值班快报页-请求表格数据`
            },
            data: {
                cloud: {
                    url: `/zhyj/busi/reportlist`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty`,
                    handler: `GetFastReport`
                }
            }
        },
        // 值班快报页-新增保存
        {
            node: {
                url: `/reportSave`,
                method: `post`,
                mustLogin: true,
                fetchName: `ReportSave`,
                description: `值班快报页-新增保存`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/zhyj/busi/report`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty`,
                    handler: `ReportSave`
                }
            }
        },
        // 值班快报页 - 删除
        {
            node: {
                url: `/reportDelete`,
                method: `post`,
                mustLogin: true,
                fetchName: `ReportDelete`,
                description: `值班快报页-删除`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/zhyj/busi/{fastReportId}`,
                    method: `delete`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty`,
                    handler: `ReportDelete`
                }
            }
        },
        // 值班快报页 - echart请求
        {
            node: {
                url: `/getReportEchartInfo`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetReportEchartInfo`,
                description: `值班快报页-echart请求`
            },
            data: {
                cloud: {
                    url: `/zhyj/busi/reportcount`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty`,
                    handler: `GetReportEchartInfo`
                }
            }
        },
    ]
};
