//获取QueryString的数组

function getQueryString() {
    var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
    if (result == null) {
        return "";
    }

    for (var i = 0; i < result.length; i++) {
        result[i] = result[i].substring(1);
    }

    return result;
}
function ChangeParam(name, value) {
    var url = window.location.href;
    var newUrl = "";
    var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
    var tmp = name + "=" + value;
    if (url.match(reg) != null) {
        newUrl = url.replace(eval(reg), tmp);
    }
    else {
        if (url.match("[\?]")) {
            newUrl = url + "&" + tmp;
        }
        else {
            newUrl = url + "?" + tmp;
        }
    }
    return newUrl;
}
function removeParam(name) {
    var url = window.location.href;
    var reg = new RegExp("\\\?|&" + name + "= ([^&]+)(&|&)", "i");
    return url.replace(reg, "");
}

//根据QueryString参数名称获取值
function getQueryStringByName(locationString, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = locationString.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
    //var result = locationString.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));

    //if (result == null || result.length < 1) {
    //    return "";
    //}

    //return result[0];
}

//根据QueryString参数索引获取值

function getQueryStringByIndex(index) {

    if (index == null) {
        return "";
    }

    var queryStringList = getQueryString();
    if (index >= queryStringList.length) {
        return "";
    }

    var result = queryStringList[index];
    var startIndex = result.indexOf("=") + 1;
    result = result.substring(startIndex);
    return result;
}

// 取当前页面名称(不带后缀名)
function pageNameNo() {
    var a = location.href;
    var b = a.split("/");
    var c = b.slice(b.length - 1, b.length).toString(String).split(".");
    return c.slice(0, 1);
}

//取当前页面名称(带后缀名)
function pageName() {
    var strUrl = location.href.replace(location.search, "");
    var arrUrl = strUrl.split("/");
    var strPage = arrUrl[arrUrl.length - 1];
    return strPage;
}

function timetotimestamp(timestring)
{
    var timestamp2 = Date.parse(new Date(timestring));
    return timestamp2;
}

function timestamptotime(timestamp)
{
    var newDate = new Date();
    if (timestamp == null) {
        return "";
    }
    else {
        newDate.setTime(timestamp);
        // Wed Jun 18 2014
        var outdate = newDate.toLocaleString();
        return outdate;
    }
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        if (name == "userstoken")
        return "Bearer " + unescape(arr[2]);
    else
        return unescape(arr[2]);
    else
        return null;
}