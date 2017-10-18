function setmenu() {
    var localurl = pageName();
    $("#menu").empty();
    for (var i = 0; i < outmenu.length; i++) {
        $("#menu").append("<li id=\"" + outmenu[i].id + "\" class=\"nav-item\" ><a href=\"" + outmenu[i].href + "\" class=\"nav-link nav-toggle\"><span class=\"title\" style=\"font-weight: bold\">" + outmenu[i].title + "</span><span class=\"arrow \"></span> </a>");
        if (outmenu[i].ul != null) {
            $("#" + outmenu[i].id).append("<ul class=\"sub-menu\" id=\"ul_" + outmenu[i].id + "\"></ul>");
            for (var j = 0; j < outmenu[i].ul.length; j++) {
                if (localurl == outmenu[i].ul[j].href) {
                    $("#ul_" + outmenu[i].id).append("<li id=\"" + outmenu[i].ul[j].id + "\" class=\"nav-item  active\"><a href=\"" + outmenu[i].ul[j].href + "\" class=\"nav-link nav-toggle\"><i class=\"icon-diamond\"></i><span class=\"title\">" + outmenu[i].ul[j].title + "</span></a></li>");
                    $("#" + outmenu[i].id).attr("class", "nav-item active open");
                    //$("#ul_" + outmenu[i].id).append("<li id=\"" + outmenu[i].ul[j].id + "\" class=\"nav-item  \"><a href=\"" + outmenu[i].ul[j].href + "\" class=\"nav-link nav-toggle\"><i class=\"icon-diamond\"></i><span class=\"title\">" + outmenu[i].ul[j].title + "</span></a></li>");
                }
                else {
                    $("#ul_" + outmenu[i].id).append("<li id=\"" + outmenu[i].ul[j].id + "\" class=\"nav-item  \"><a href=\"" + outmenu[i].ul[j].href + "\" class=\"nav-link nav-toggle\"><i class=\"icon-diamond\"></i><span class=\"title\">" + outmenu[i].ul[j].title + "</span></a></li>");
                }
                if (outmenu[i].ul[j].ul != null) {
                     $("#" + outmenu[i].ul[j].id).append("<ul class=\"sub-menu\" id=\"ul_" + outmenu[i].ul[j].id + "\"></ul>");
                    for (var k = 0; k < outmenu[i].ul[j].ul.length; k++) {
                        $("#ul_" + outmenu[i].ul[j].id).append("<li id=\"" + outmenu[i].ul[j].ul[k].id + "\" class=\"nav-item  \"><a href=\"" + outmenu[i].ul[j].ul[k].href + "\" class=\"nav-link nav-toggle\"><i class=\"icon-diamond\"></i><span class=\"title\">" + outmenu[i].ul[j].ul[k].title + "</span></a></li>");
                          if (localurl == outmenu[i].ul[j].ul[k].href)
                          {
                         $("#" + outmenu[i].id).attr("class", "nav-item active open");
                          $("#" + outmenu[i].ul[j].id).attr("class", "nav-item active open");
                           $("#" + outmenu[i].ul[j].ul[k].id).attr("class", "nav-item active open");
                           }
                    }
                }
            }
        }
    }
}

function bind_menu_data() {
    var userstoken = getCookie("userstoken");
    var id = getQueryStringByName(location.search, "id");
    //alert(id);
    $.ajax({
        type: "get",
        url: "http://121.41.27.107:8000/dispatch-mgr/authority?startIndex=0&pageSize=100&authType=2",
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", userstoken);
        },
        success: function (data) {
            if (data.code == 200) {
                bind_mission_data_item(data);
                bind_detail_data_item(data);
                bind_mission_step(data, "");
                if (showtype == "self") {
                    bind_submit_text_byself(data, controlid);
                }
                else {
                    bind_submit_text_byadmin(data, controlid, cancelid, finishid);
                }
            }
            else {
                alert(data.message);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        },

    });
}

var outmenu = [
    {
        "href": "javascript:;",
        "title": "工作管理",
        "id": "job_manage",
        "ul": [
            {
                "href": "wait_task.html",
                "title": "待办任务",
                "id": "wait_task"
            },
            {
                "href": "already_task.html",
                "title": "已办任务",
                "id": "already_task"
            },
            {
                "href": "history_task.html",
                "title": "任务历史",
                "id": "history_task"
            },
            {
                "href": "release_task.html",
                "title": "发布任务",
                "id": "release_task"
            },
            {
                "href": "task_detail.html",
                "title": "任务详情",
                "id": "task_detail"
            }
        ]
    },
    {
        "href": "javascript:;",
        "title": "系统管理",
        "id": "manage_system",
        "ul": [
            {
                "href": "yonghuguanli.html",
                "title": "用户管理",
                "id": "manage_users"
            },
            {
                "href": "gongsiguanli.html",
                "title": "公司管理",
                "id": "manage_company"
            },
            {
                "href": "rizhiguanli.html",
                "title": "日志管理",
                "id": "manage_log"
            },
            {
                "href": "zidianguanli.html",
                "title": "字典管理",
                "id": "manage_dictionary"
            },
            {
                "href": "jueseguanli.html",
                "title": "角色管理",
                "id": "manage_role"
            },
            {
                "href": "quanxianguanli.html",
                "title": "权限管理",
                "id": "auth_role"
            }
        ]
    },
       {
           "href": "javascript:;",
           "title": "人事服务",
           "id": "employee_service",
           "ul": [
               {
                   "href": "javascript:;",
                   "title": "事务服务",
                   "id": "employeeaffair_service",
                   "ul": [
                       {
                           "href": "zhaopinchakan.html",
                           "title": "招聘申请",
                           "id": "recruit_apply"
                       },
                       {
                           "href": "diaodongchakan.html",
                           "title": "调动申请",
                           "id": "move_apply"
                       },
                       {
                           "href": "lizhichakan.html",
                           "title": "离职申请",
                           "id": "leave_apply"
                       },
                       {
                           "href": "qingjiachakan.html",
                           "title": "请假申请",
                           "id": "rest_apply"
                       },
                       {
                           "href": "shengzhichakan.html",
                           "title": "升职/升薪申请",
                           "id": "levelup_apply"
                       },
                       {
                           "href": "jiaoyuchakan.html",
                           "title": "教育培训申请",
                           "id": "train_apply"
                       }
                   ]
               },
           {
               "href": "javascript:;",
               "title": "制度服务",
               "id": "employeesystem_service",
               "ul": [
                   {
                       "href": "renshizhidu.html",
                       "title": "人事制度",
                       "id": "personnel_system"
                   },
               ]
           }
           ]
       },
       {
           "href": "javascript:;",
           "title": "人事管理",
           "id": "manage_personmatters",
           "ul": [
               {
                   "href": "javascript:;",
                   "title": "人员管理",
                   "id": "manage_Person",
                   "ul": [
           {
               "href": "renyuanguanli.html",
               "title": "基本人员管理",
               "id": "manage_basicPerson"
           }
                   ]
               },
               {
                   "href": "javascript:;",
                   "title": "事务管理",
                   "id": "manage_event",
                   "ul": [
                       {
                           "href": "qingjiaguanli.html",
                           "title": "请假管理",
                           "id": "manage_leave"
                       },

                       {
                           "href": "lizhiguanli.html",
                           "title": "离职管理",
                           "id": "manage_dimission"
                       },
                       {
                           "href": "zhaopinguanli.html",
                           "title": "招聘管理",
                           "id": "manage_recruit"
                       },
                       {
                           "href": "diaodongguanli.html",
                           "title": "调动管理",
                           "id": "manage_mobilization"
                       },
                       {
                           "href": "peixunguanli.html",
                           "title": "培训管理",
                           "id": "manage_cultivate"
                       }
                   ]
               },
                {
                    "href": "javascript:;",
                    "title": "制度管理",
                    "id": "manage_systerm",
                    "ul": [
               {
                   "href": "zhiduguanli.html",
                   "title": "人事制度",
                   "id": "personnel_system"
               }
                    ]
                }
           ]
       },
    {
        "href": "javascript:;",
        "title": "调度中心",
        "id": "control_cneter",
        "ul": [
            {
                "href": "renwudiaodu.html",
                "title": "任务调度",
                "id": "control_task"
            },
            {
                "href": "yingjitongdao.html",
                "title": "应急通道",
                "id": "rescue_path"
            },
            {
                "href": "gongsiziyuan.html",
                "title": "公司资源",
                "id": "company_resource"
            },
            {
                "href": "renyuanxinxi.html",
                "title": "人员信息",
                "id": "personnel_information"
            },
            {
                "href": "renwuqingdan.html",
                "title": "任务清单",
                "id": "task_list"
            }
        ]
    },
    {
        "href": "javascript:;",
        "title": "部门管理",
        "id": "manage_department",
        "ul": [
            {
                "href": "bumenrenwu.html",
                "title": "部门任务",
                "id": "department_task"
            },
            {
                "href": "chengyuanzhuangtai.html",
                "title": "成员状态",
                "id": "member_condition"
            },
            {
                "href": "gongzuoqingkuang.html",
                "title": "工作情况",
                "id": "work_situation"
            }
        ]
    },

    {
        "href": "javascript:;",
        "title": "项目管理",
        "id": "manage_project",
        "ul": [
            {
                "href": "hetongguanli.html",
                "title": "合同管理",
                "id": "manage_agreement"
            },
            {
                "href": "javascript:;",
                "title": "市场管理",
                "id": "manage_market",
                "ul": [
                    {
                        "href": "kehuguanli.html",
                        "title": " 客户管理 ",
                        "id": "manage_client"
                    },
                    {
                        "href": "shichangquyuguanli.html",
                        "title": " 市场区域管理 ",
                        "id": "manage_marketArea"
                    }
                ]
            },
            {
                "href": "xiangmuguanli.html",
                "title": "项目管理",
                "id": "manage_item"
            },
            {
                "href": "javascript:;",
                "title": "任务管理",
                "id": "manage_task",
                "ul": [
                    {
                        "href": "add_task.html",
                        "title": " 添加任务 ",
                        "id": "add_task"
                    },
                    {
                        "href": "send_task.html",
                        "title": " 下发任务 ",
                        "id": "send_task"
                    },
                    {
                        "href": "sent_task.html",
                        "title": " 已发任务 ",
                        "id": "sent_task"
                    }
                ]
            }
        ]
    },
    {
        "href": "javascript:;",
        "title": "文档管理",
        "id": "manage_document",
        "ul": [
            {
                "href": "dangankuguanli.html",
                "title": "档案库管理",
                "id": "manage_archivalRepository"
            },
            {
                "href": "mobankuguanli.html",
                "title": "模板库管理",
                "id": "manage_templateBase"
            }
        ]
    },
    {
        "href": "javascript:;",
        "title": "党务管理",
        "id": "manage_partyWork",
        "ul": [
            {
                "href": "javascript:;",
                "title": "党员组织管理",
                "id": "manage_partyMemberOrganization",
                "ul": [
                    {
                        "href": "dangyuanguanli.html",
                        "title": " 党员管理 ",
                        "id": "manage_partymember"
                    },
                    {
                        "href": "dangwupeixunguanli.html",
                        "title": " 党员变动管理 ",
                        "id": "manage_partychange"
                    },
                    {
                        "href": "zuzhijijianguanli.html",
                        "title": " 党员奖惩管理 ",
                        "id": "manage_grade"
                    },
                   
                ]
            },
            {
                "href": "dangzhibuguanli.html",
                "title": "党支部管理",
                "id": "manage_partyBranch"
            },
            {
                "href": "difangdangweiduijiexiangqing.html",
                "title": "总支管理",
                "id": "manage_generalBranch"
            },
            {
                "href": "javascript:;",
                "title": "总支班子管理",
                "id": "manage_generalBranchTeam",
                "ul": [
                    {
                        "href": "zuzhishenghuoguanli.html",
                        "title": " 组织生活管理 ",
                        "id": "manage_organizationalLife"
                    },
                    {
                        "href": "dangwupeixunguanli.html",
                        "title": " 党务培训管理 ",
                        "id": "manage_partyTraining"
                    },
                    {
                        "href": "zuzhijijianguanli.html",
                        "title": " 组织纪检管理 ",
                        "id": "manage_organizeDisciplineInspection"
                    },
                    {
                        "href": "jijifenziguanli.html",
                        "title": " 积极分子管理 ",
                        "id": "manage_activist"
                    }
                ]
            }
        ]
    },
    {
        "href": "javascript:;",
        "title": "资产管理",
        "id": "manage_property",
        "ul": [
            {
                "href": "zichanxiangmuguanli.html",
                "title": "资产项目管理",
                "id": "manage_assetColumn"
            },
            {
                "href": "gudingzichanguanli.html",
                "title": "固定资产管理",
                "id": "manage_equipment"
            },
            {
                "href": "jinrongguanli.html",
                "title": "金融管理",
                "id": "manage_finance"
            },
            {
                "href": "neibusimuguanli.html",
                "title": "内部私募管理",
                "id": "manage_privatePlacement"
            }
        ]
    },
    {
        "href": "javascript:;",
        "title": "机电中心",
        "id": "electromechanical_center",
        "ul": [
            {
                "href": "tezhongchanpinguanli.html",
                "title": "特种产品管理",
                "id": "manage_specialtyProduct"
            },
            {
                "href": "marketing-manage.html",
                "title": "营销管理",
                "id": "manage_marketing"
            }
        ]
    },
    {
        "href": "javascript:;",
        "title": "综合总办",
        "id": "comprehensive_department",
        "ul": [
            {
                "href": "javascript:;",
                "title": "办公室管理",
                "id": "manage_office",
                "ul": [
                    {
                        "href": "jiedaiguanli.html",
                        "title": " 接待管理 ",
                        "id": "manage_receive"
                    },
                    {
                        "href": "anquanbaozhangguanli.html",
                        "title": " 安全保障管理 ",
                        "id": "manage_insurance"
                    },
                    {
                        "href": "purchase-manage.html",
                        "title": " 物品采购管理 ",
                        "id": "manage_purchase"
                    },
                    {
                        "title": " 行政环境管理 ",
                        "id": "manage_administrativeEnvironment"
                    },
                    {
                        "href": "xuanchuancehuaguanli.html",
                        "title": "宣传策划管理",
                        "id": "manage_promotionPlanning"
                    }
                ]
            }
        ]
    },
    {
        "href": "javascript:;",
        "title": "软件管理",
        "id": "manage_software",
        "ul": [
            {
                "href": "javascript:;",
                "title": "项目管理",
                "id": "manage_project",
                "ul": [
                    {
                        "href": "chanpinguanli.html",
                        "title": " 产品管理 ",
                        "id": "manage_product"
                    },
                    {
                        "href": "chanpinxiangqing.html",
                        "title": " 产品详情 ",
                        "id": "product_detail"
                    }
                ]
            }
        ]
    }
]