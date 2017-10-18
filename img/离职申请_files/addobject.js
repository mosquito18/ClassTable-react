//所有添加、修改对象在按钮点击的时候执行这个方法
//questurl请求的地址
//userstoken用户的token
//页面成功之后的跳转页面
function addObject(questurl, nexturl,divid) {

 var userstoken= getCookie("userstoken");
    var msg = "您真的确定要添加吗？\n\n请确认！"; 
    if (confirm(msg) == true) {
        var datajson = searchobject(divid);
        $.ajax({
            type: "post",
            url: questurl,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(datajson),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", userstoken);
            },
            success: function (data) {
                sucesshandle(datajson, nexturl);
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

function deleteObject(questurl, id, nexturl)
{
 var userstoken= getCookie("userstoken");
    var msg = "您真的确定要删除吗？\n\n请确认！"; 
    if (confirm(msg) == true) {
        $.ajax({
            type: "delete",
            url: questurl + "/" + id,
            contentType: "application/json",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", userstoken);
            },
            success: function (data) {
            alert("操作成功");
                location.replace(location.href);
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

function editObject(questurl, nexturl,divid)
{

 var userstoken= getCookie("userstoken");
    var id=getQueryStringByName(location.search, "id");
    var msg = "您真的确定要修改吗？\n\n请确认！"; 
    if (confirm(msg) == true) {
        
       var datajson = searchobject(divid);
        $.ajax({
            type: "put",
            url: questurl + "/" + id,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(datajson),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", userstoken);
            },
            success: function (data) {
                sucesshandle(data, nexturl);
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

function sucesshandle(datajson,nexturl)
{
    if (datajson.code == 201 || datajson.code == 200)
    {
        alert("操作成功");
        window.location.href=nexturl;
    }
    else
    {
        alert(datajson.message);
    }
}

function initpasswod(id)
{
 var userstoken= getCookie("userstoken");
    var msg = "您真的确定要重置密码吗？\n\n请确认！"; 
    if (confirm(msg) == true) {
        $.ajax({
            type: "put",
            url: "http://121.41.27.107:8000/dispatch-mgr/user/initPwd/" + id,
            contentType: "application/json",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", userstoken);
            },
            success: function (data) {
            alert("操作成功");
                location.replace(location.href);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("操作失败");
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


