//对于所有有下拉菜单控件的页面进行下拉菜单的绑定
//questurl请求的地址
//droplisrid下拉菜单的编号
//dictgroup分组编号
//showall是否有全部选项
function DropListBind(questurl, droplisrid, dictGroup, showall)
{
var userstoken= getCookie("userstoken");
    var url = questurl + "/" + dictGroup;
    $.ajax({
        type: "get",
        url: "http://121.41.27.107:8000/dispatch-mgr/dictionary/group/"+dictGroup,
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", userstoken);
        },
        success: function (dataString) {
            if (showall == true) {
                $("#" + droplisrid).append("<option value=''>全部</option>");
            }
            for (var i = 0; i < dataString.rows.length; i++) {
                $("#" + droplisrid).append("<option value='" + dataString.rows[i].dictValue + "'>" + dataString.rows[i].dictValueName + "</option>");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        },

    });
    //var dataString = GetJson(url, "", returnJson);

    
}

function returnJson(datastring)
{
    return datastring;
}

function selectbindgroupall(droplisrid)
{
var  userstoken= getCookie("userstoken");
    $.ajax({
        type: "get",
        url: "http://121.41.27.107:8000/dispatch-mgr/dictionary/groupAll",
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", userstoken);
        },
        success: function (dataString) {
         $("#" + droplisrid).append("<option value=''>全部</option>");
            for (var i = 0; i < dataString.rows.length; i++) {
                $("#" + droplisrid).append("<option value='" + dataString.rows[i].dictGroup + "'>" + dataString.rows[i].dictGroupName + "</option>");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        },

    });
}

function selectbindtypeAll(droplisrid) {

var  userstoken= getCookie("userstoken");
    $.ajax({
        type: "get",
        url: "http://121.41.27.107:8000/dispatch-mgr/dictionary/typeAll",
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", userstoken);
        },
        success: function (dataString) {
         $("#" + droplisrid).append("<option value=''>全部</option>");
            for (var i = 0; i < dataString.rows.length; i++) {
                $("#" + droplisrid).append("<option value='" + dataString.rows[i].dictValue + "'>" + dataString.rows[i].dictValueName + "</option>");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        },

    });
}

function RoleDropListBind(droplisrid) {
var  userstoken= getCookie("userstoken");
    $.ajax({
        type: "get",
        url: "http://121.41.27.107:8000/dispatch-mgr/role?startIndex=0&pageSize=100",
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", userstoken);
        },
        success: function (dataString) {
            $("#" + droplisrid).append("<option value=''>全部</option>");
            for (var i = 0; i < dataString.rows.length; i++) {
                $("#" + droplisrid).append("<option value='" + dataString.rows[i].roleName + "'>" + dataString.rows[i].roleName + "</option>");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        },

    });
    //var dataString = GetJson(url, "", returnJson);


}

function selectbindforcompany(conpanyid)
{
var userstoken= getCookie("userstoken");
    $.ajax({
        type: "get",
        url: "http://121.41.27.107:8000/dispatch-mgr/company?startIndex=0&pageSize=100",
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", userstoken);
        },
        success: function (dataString) {
       $("#" + conpanyid).append("<option value='0'>无上级公司</option>");
            for (var i = 0; i < dataString.rows.length; i++) {
                $("#" + conpanyid).append("<option value='" + dataString.rows[i].id + "'>" + dataString.rows[i].companyName + "</option>");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        },

    });
    //var dataString = GetJson(url, "", returnJson);

    
}
