var addemployeeleave=[
    {
        "table": "d_mission",
        "operMethod": "POST",
        "values": [
{
    "objectColumn": "dept_id",
    "objectColumnName": "所属部门",
    "objectColumnValue": 1
},
{
    "objectColumn": "mission_type",
    "objectColumnName": "任务类型",
    "objectColumnValue": 6
},
{
    "objectColumn": "dispatch_type",
    "objectColumnName": "调度类型",
    "objectColumnValue": 1
},
{
    "objectColumn": "mission_content",
    "objectColumnName": "任务内容",
    "objectColumnValue": "离职申请"
},
                {
                    "objectColumn": "mission_keyword",
                    "objectColumnName": "任务关键字",
                    "objectColumnValue": "离职,主动"
                },
                {
                    "objectColumn": "mission_emergency_level",
                    "objectColumnName": "任务紧急程度",
                    "objectColumnValue": "level_5.0"
                },
                {
                    "objectColumn": "create_user",
                    "objectColumnName": "创建人",
                    "objectColumnValue": "tester"
                }
        ],
        "subDatas": [
            {
                "table": "d_employee_leave",
                "isDetail": true,
                "operMethod": "POST",
                "values": [
                    {
                        "objectColumn": "employee_id",
                        "objectColumnName": "员工id",
                        "objectColumnValue": 3
                    },
                    {
                        "objectColumn": "leave_type",
                        "objectColumnName": "离职类型（0被动离职，1主动离职）",
                        "objectColumnValue": 1
                    },
                    {
                        "objectColumn": "submit_user_id",
                        "objectColumnName": "申请人用户id",
                        "objectColumnValue": 3
                    },
                    {
                        "objectColumn": "leave_reason",
                        "objectColumnName": "离职理由",
                        "objectColumnValue": "呆得不开心了"
                    },
                    {
                        "objectColumn": "submit_time",
                        "objectColumnName": "提交时间（当前时间）",
                        "objectColumnType": "TIMESTAMP",
                        "objectColumnValue": 1503909350000
                    },
                    {
                        "objectColumn": "description",
                        "objectColumnName": "描述",
                        "objectColumnValue": "测试离职"
                    },
                    {
                        "objectColumn": "append_file_ids",
                        "objectColumnName": "附件",
                        "objectColumnValue": "[]"
                    }
                ]
            }
        ]
    }
]

function add_employee_leave(employeetype)
{
var userstoken = getCookie("userstoken");
    if (employeetype == "self") {
        addemployeeleave[0].values[0].objectColumnValue = getCookie("deptId");
        addemployeeleave[0].values[3].objectColumnValue = getCookie("realname") + "的离职申请";
        addemployeeleave[0].values[6].objectColumnValue = getCookie("username");
        addemployeeleave[0].subDatas[0].values[2].objectColumnValue = getCookie("user_id");
        addemployeeleave[0].subDatas[0].values[0].objectColumnValue = getCookie("employee_id");
        addemployeeleave[0].subDatas[0].values[3].objectColumnValue = $("#leave_reason").val();
        addemployeeleave[0].subDatas[0].values[4].objectColumnValue = Date.parse(new Date());
        addemployeeleave[0].subDatas[0].values[5].objectColumnValue = $("#description").val();
    }
    else
    {
        addemployeeleave[0].values[0].objectColumnValue = getCookie("deptId");
        addemployeeleave[0].values[3].objectColumnValue = $("#leaveuser").val() + "的离职申请";
        addemployeeleave[0].values[6].objectColumnValue = getCookie("username");
        addemployeeleave[0].subDatas[0].values[2].objectColumnValue = getCookie("user_id");
        addemployeeleave[0].subDatas[0].values[0].objectColumnValue = $("#employee_id").val();
        addemployeeleave[0].subDatas[0].values[3].objectColumnValue = $("#leave_reason").val();
        addemployeeleave[0].subDatas[0].values[4].objectColumnValue = Date.parse(new Date());
        addemployeeleave[0].subDatas[0].values[5].objectColumnValue = $("#description").val();
    }
alert(JSON.stringify(addemployeeleave));
    var msg = "确认提交离职申请";
    if (confirm(msg) == true) {
        //var datajson = searchobject("form-body");
        $.ajax({
            type: "post",
            url: "http://121.41.27.107:8000/dispatch-mgr/action/d_employee_leave",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(addemployeeleave),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", userstoken);
            },
            success: function (data) {
                //sucesshandle(datajson, nexturl);
                alert("操作成功");
                location.href="lizhichakan.html";
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            },

        });
    }
    else {
        return false;
    }
}

var editemployeeleave=[
    {
        "id": 4,
        "table": "d_employee_leave",
        "operMethod": "PUT",
"values": [
     {
         "objectColumn": "leave_reason",
         "objectColumnName": "离职理由",
         "objectColumnValue": "呆得不开心了修改"
         },
            {
                "objectColumn": "submit_time",
                "objectColumnName": "提交时间（当前时间）",
                "objectColumnType": "TIMESTAMP",
                "objectColumnValue": 1504077264000
            },
            {
                "objectColumn": "description",
                "objectColumnName": "描述",
                "objectColumnValue": "测试离职修改"
},
            {
                "objectColumn": "append_file_ids",
                "objectColumnName": "附件",
                "objectColumnValue": "[]"
            }
],
"subDatas": null
},
{
    "id": 5,
    "table": "d_mission",
    "operMethod": "PUT",
    "values": [
        {
            "objectColumn": "mission_status",
            "objectColumnName": "任务状态",
            "objectColumnValue": 0
        }
    ],
    "subDatas": null
}
]

function edit_employee_leave()
{
    editemployeeleave[1].id = getQueryStringByName(location.search, "id");
    editemployeeleave[0].id = getQueryStringByName(location.search, "detailId");
    editemployeeleave[0].values[0].objectColumnValue = $("#leave_reason").val();
    editemployeeleave[0].values[1].objectColumnValue = Date.parse(new Date());
    editemployeeleave[0].values[2].values[5].objectColumnValue = $("#description").val();

    var msg = "";
    if (confirm(msg) == true) {
        var datajson = searchobject();
        $.ajax({
            type: "post",
            url: "http://121.41.27.107:8000/dispatch-mgr/action/d_employee_leave",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(editemployeeleave),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", userstoken);
            },
            success: function (data) {
                //sucesshandle(datajson, nexturl);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            },

        });
    }
    else {
        return false;
    }
}

function submit_employee_leave()
{
    var msg = "";
    var id = getQueryStringByName(location.search, "id");
    if (confirm(msg) == true) {
        var datajson = searchobject();
        $.ajax({
            type: "put",
            url: "http://121.41.27.107:8000/dispatch-mgr/mission/submit/"+id,
            contentType: "application/json",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", userstoken);
            },
            success: function (data) {
                //sucesshandle(datajson, nexturl);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            },

        });
    }
    else {
        return false;
    }
}

function start_employee_leave() {
    var msg = "";
    var id = getQueryStringByName(location.search, "id");
    if (confirm(msg) == true) {
        var datajson = searchobject();
        $.ajax({
            type: "put",
            url: "http://121.41.27.107:8000/dispatch-mgr/mission/startHandle/" + id,
            contentType: "application/json",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", userstoken);
            },
            success: function (data) {
                //sucesshandle(datajson, nexturl);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            },

        });
    }
    else {
        return false;
    }
}

function cancel_employee_leave() {
    var msg = "";
    var id = getQueryStringByName(location.search, "id");
    if (confirm(msg) == true) {
        var datajson = searchobject();
        $.ajax({
            type: "put",
            url: "http://121.41.27.107:8000/dispatch-mgr/mission/cancelHandle/" + id,
            contentType: "application/json",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", userstoken);
            },
            success: function (data) {
                //sucesshandle(datajson, nexturl);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            },

        });
    }
    else {
        return false;
    }
}

var controlhandleemployeeleave=[
    {
        "missionContent": "人事审核",
        "missionKeyword": "离职,审核",
        "missionEmergencyLevel": "level_4.0",
        "handleUserId": 0,
        "handleDeptId": 10,
        "handleType": 3
    }
]

function control_handle_employee_leave() {
    controlhandleemployeeleave[0].missionEmergencyLevel = $("#missionEmergencyLevel").val();
    controlhandleemployeeleave[0].handleUserId = $("#handleUserId").val();
    controlhandleemployeeleave[0].handleDeptId = $("#handleDeptId").val();
    controlhandleemployeeleave[0].handleType = $("#handleType").val();

    var msg = "";
    var id = getQueryStringByName(location.search, "id");
    if (confirm(msg) == true) {
        var datajson = searchobject();
        $.ajax({
            type: "put",
            url: " http://121.41.27.107:8000/dispatch-mgr/mission/dispatch/" + id,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(controlhandleemployeeleave),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", userstoken);
            },
            success: function (data) {
                //sucesshandle(datajson, nexturl);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            },

        });
    }
    else {
        return false;
    }
}

var depthandleemployee={
    "handleResult": 1,
    "handleDetail": "审核通过测试"
}

function dept_handle_employee_leave() {
    depthandleemployee.handleResult = $("#handleResult").val();
    depthandleemployee.handleDetail = $("#handleDetail").val();

    var msg = "";
    var id = getQueryStringByName(location.search, "id");
    if (confirm(msg) == true) {
        var datajson = searchobject();
        $.ajax({
            type: "put",
            url: " http://121.41.27.107:8000/dispatch-mgr/mission/review/" + id,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(depthandleemployeeleave),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", userstoken);
            },
            success: function (data) {
                //sucesshandle(datajson, nexturl);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            },

        });
    }
    else {
        return false;
    }
}

function finish_employee_leave() {
    var msg = "";
    var id = getQueryStringByName(location.search, "id");
    if (confirm(msg) == true) {
        var datajson = searchobject();
        $.ajax({
            type: "put",
            url: "http://121.41.27.107:8000/dispatch-mgr/mission/finish/" + id,
            contentType: "application/json",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", userstoken);
            },
            success: function (data) {
                //sucesshandle(datajson, nexturl);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            },

        });
    }
    else {
        return false;
    }
}

function return_employee_leave_byedit() {
    userstoken = getCookie("userstoken");
    var id = getQueryStringByName(location.search, "id");
    //alert(id);
    $.ajax({
        type: "get",
        url: "http://121.41.27.107:8000/dispatch-mgr/mission" + "/" + id,
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", userstoken);
        },
        success: function (data) {
            $("#leave_reason").val() = setdata.result.DetailDataTable.leave_reason;
            $("#description").val() = setdata.result.DetailDataTable.description;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        },

    });
}

function return_employee_leave_bydetail(objectid) {
    userstoken = getCookie("userstoken");
    var id = getQueryStringByName(location.search, "id");
    //alert(id);
    $.ajax({
        type: "get",
        url: "http://121.41.27.107:8000/dispatch-mgr/mission" + "/" + id,
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", userstoken);
        },
        success: function (data) {
            bind_employeeleave(data);
            bind_mission(data);
            bind_stepmission(data, objectid);
            check_employeeleave_detail(data.result.missionStatusName);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        },

    });
}

function bind_employeeleave(missionData)
{
    $("#update_Time").text(missionData.result.detailTableData.update_Time);
    if (missionData.result.detailTableData.leave_type == true) {
        $("#leave_type").text("主动离职");
    }
    else {
        $("#leave_type").text("被动离职");
    }
    $("#submit_time").text(missionData.result.detailTableData.submit_time);
    $("#leave_reason").text(missionData.result.detailTableData.leave_reason);
    $("#description").text(missionData.result.detailTableData.description);
}

//不同的页面采用不同的控制页面显示方法
function check_employeeleave_detail(missionStatus)
{
    switch (missionStatus)
    {
        case 0:
            break;
        case 1:
            break;
        default:
            break;
    }
}


function searchobject(divid) {
var openstr="";
    var setstring = "";
    
    $("#" + divid + " input").each(function () {
            try {
                openstr = $(this).attr("id");
                switch ($(this).attr("alt")) {
                    case "string":
                        setstring = setstring + ",\"" + $(this).attr("id") + "\":\"" + $(this).val() + "\"";
                        break;
                    case "datetime":
                        setstring = setstring + ",\"" + $(this).attr("id") + "\":" + "" + timetotimestamp($(this).val()) + "";
                        break;
                    case "int":
                        setstring = setstring + ",\"" + $(this).attr("id") + "\":" + $(this).val() + "";
                        break;
                    default:
                        break;

                }
            }
            catch (e) {
                alert(openstr);
            }
        });
    
    
    $("#" + divid + " select").each(function () {
            try {
                openstr= $(this).attr("id");
                switch($(this).attr("alt"))
                {
                    case "string":
                        setstring = setstring + ",\"" + $(this).attr("id") + "\":\"" + $(this).val() + "\"";
                        break;
                    case "datetime":
                        setstring = setstring + ",\"" + $(this).attr("id") + "\":" + "" + timetotimestamp($(this).val()) + "";
                        break;
                    case "int":
                        setstring = setstring + ",\"" + $(this).attr("id") + "\":" + $(this).val() + "";
                        break;
                    case "selectint":
                        setstring = setstring + ",\"" + $(this).attr("id") + "\":" + $(this).val() + "";
                        setstring = setstring + ",\"" + $(this).attr("id")+"Name" + "\":\"" + $(this).val() + "\"";
                        break;
                    case "selectstring":
                        setstring = setstring + ",\"" + $(this).attr("id") + "\":\"" + $(this).val() + "\"";
                        setstring = setstring + ",\"" + $(this).attr("id") + "Name" + "\":\"" + $(this).find("option:selected").text()+ "\"";
                        break;
                    default:
                        break;
                    
                }
            }
            catch (e) {
                alert(openstr);
            }

        });

  
    
    setstring = setstring.substring(1, setstring.length);
    setstring = "{" + setstring + "}";
    alert(setstring);
    return jQuery.parseJSON(setstring);
}