//页面载入的时候这行这个方法，实现表格和分页的绑定
//questurl所对应的接口地址
//当前用户的token
//tableid表格的id，如果表格没有id要设置一下
//setstring单行表格的样式，所要显示的内容用$+字段代替，在js中会通过获取的json去替换的
//datajson是输入的json字符串
function showTableDataByGetContainHead(questurl, userstoken, tableid, setstring, datajson) {
    userstoken= getCookie("userstoken");
    var parastring = location.search;
    var setpage = getQueryStringByName(parastring, "pageSize");
    if (parastring == "") {
        parastring = "?startIndex=0&pageSize=10";
    }
    else
    {
        if(setpage==null)
            parastring = parastring+"&pageSize=10";
    }

    $.ajax({
        type: "get",
        url: questurl + parastring,
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", userstoken);
        },
        success: function (data) {
            binddata(tableid, setstring, data);
            pageNavBind(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        },

    });
}

function binddata(tableid, setstring, datajson)
{
    //alert(JSON.stringify(datajson));
    var tb1 = $("#" + tableid+" tbody");
    for (var i=0; i < datajson.rows.length; i++) {
        var rowsString = setstring;
        for (var prop in datajson.rows[i]) {
            if (prop.indexOf("Time") > 0) {
                rowsString = rowsString.replace("$" + prop + "$", timestamptotime(datajson.rows[i][prop]));
               
            }
            else {
                rowsString = rowsString.replace("$" + prop + "$", datajson.rows[i][prop]);
            }
            if(prop=="id")
            {
            
            rowsString = rowsString.replace("$"+prop + "$", datajson.rows[i][prop]);
            rowsString = rowsString.replace("$"+prop + "$", datajson.rows[i][prop]);
            rowsString = rowsString.replace("$"+prop + "$", datajson.rows[i][prop]);
            rowsString = rowsString.replace("$"+prop + "$", datajson.rows[i][prop]);
            rowsString = rowsString.replace("$"+prop + "$", datajson.rows[i][prop]);
            
            rowsString = rowsString.replace("$"+prop + "$", datajson.rows[i][prop]);
            rowsString = rowsString.replace("$"+prop + "$", datajson.rows[i][prop]);
            rowsString = rowsString.replace("$"+prop + "$", datajson.rows[i][prop]);
            }
        }
        tb1.append(rowsString);
    }
    
}

function pageNavBind(datajson) {
    var url = window.location.search;
    var setpage = getQueryStringByName(url, "pageSize");
    var startIndex = 0;
    var pageSize = 10;
    if (url == "") {
        startIndex = 1;
        pageSize = 10;
    }
    else
    {
        if (setpage == null)
            startIndex = parseInt(getQueryStringByName(url, "startIndex")) + 1;

        else {
            startIndex = parseInt(getQueryStringByName(url, "startIndex")) + 1;
            pageSize = getQueryStringByName(url, "pageSize");
        }
    }
    var endIndex = parseInt(startIndex) + parseInt(pageSize) - 1;
    //var jsondata = { "code": 200, "message": "查询成功", "rows": [{ "id": 6, "delFlag": 0, "dictGroup": "authType", "dictGroupName": "权限类型", "dictType": "int", "dictTypeName": "整数", "dictValue": "1", "dictValueName": "菜单", "isEnable": 1, "createTime": 1500517879000, "createUser": "admin", "updateTime": null, "updateUser": "", "orderBy": 1, "startIndex": null, "pageSize": null }, { "id": 7, "delFlag": 0, "dictGroup": "authType", "dictGroupName": "权限类型", "dictType": "int", "dictTypeName": "整数", "dictValue": "2", "dictValueName": "接口", "isEnable": 1, "createTime": 1500517902000, "createUser": "admin", "updateTime": null, "updateUser": "", "orderBy": 2, "startIndex": null, "pageSize": null }], "total": 20 };
    var totalitem = datajson.total;
    if (startIndex >= 0 || startIndex < totalitem) {
        if (totalitem < endIndex)
            endIndex = totalitem;
        $("#sample_1_info").text("当前显示第" + startIndex + "到" + endIndex + "条数据，共有" + totalitem + "条数据");
        if (startIndex == 1) {
            $("#firstpage").addClass();//设置首页不显示
            $("#prepage").addClass();
        }
        else {
            $("#firstpage").attr("href", ChangeParam("startIndex", 0));
            var preStartIndex = parseInt(startIndex) - parseInt(pageSize);
            $("#prepage").attr("href", ChangeParam("startIndex", preStartIndex));
        }
        var maxpage = parseInt(parseInt(totalitem) / parseInt(pageSize));
        var setnum = parseInt(totalitem) % parseInt(pageSize);
        var maxStartIndex = parseInt(maxpage) * parseInt(parseInt(pageSize)) + 1;
        if (setnum > 0) {
            maxpage = maxpage + 1;
        }

        if (startIndex == maxStartIndex) {
            $("#firstpage").addClass();//设置首页不显示
            $("#prepage").addClass();
        }
        else {
            $("#lastpage").attr("href", ChangeParam("startIndex", parseInt(maxStartIndex) - 1));
            $("#lastpage").attr("href", ChangeParam("pageSize", parseInt(maxStartIndex) - 1));
            var nextStartIndex = parseInt(startIndex) + parseInt(pageSize);
            $("#nextpage").attr("href", ChangeParam("startIndex", parseInt(nextStartIndex) - 1));
        }
        var localpage = parseInt(parseInt(startIndex) / parseInt(pageSize)) + 1;
        for (var i = 1; i < maxpage+1; i++) {
            if ((i + 1) == localpage) {
                $("#nextpage").before("<li><a href=\"" + ChangeParam("startIndex", parseInt(pageSize) * (i - 1)) + "\">" + i + "</a></li>");
            }
            else {
                $("#nextpage").before("<li><a href=\"" + ChangeParam("startIndex", parseInt(pageSize) * (i - 1)) + "\">" + i + "</a></li>");
            }
        }
    }
    else {
        alert("超出页面范围");
        window.history.go(-1); 
    }
}

function searchbuttonclick(divid)
{
var submitdata=searchresultbydiv(divid);
    var localurl = pageName() + "?startIndex=0&pageSize=10" + searchresultbydiv(divid);
    window.location.href = localurl;

}

function searchresultbydiv(divid) {
    var setstring = "";
    $("#" + divid+" input").each(function () {
        if ($(this).val() != "")
            setstring = setstring + "&" + $(this).attr("id") + "=" + $(this).val();
    });
    $("#" + divid+" select").each(function () {
        if ($(this).val() != "")
            setstring = setstring + "&" + $(this).attr("id") + "=" + $(this).val();
    });
    
    return setstring;
}

function resetsubmit()
{
    var urlname = pageName();
    window.location.href=urlname + "?startIndex=0&pageSize=10";
}