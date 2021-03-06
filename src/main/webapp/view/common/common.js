var lb_moKuais = [{id: '503', mc: '入库管理'}, {id: '504', mc: '领料管理'}, {id: '505', mc: '发货管理'}, {id: '506', mc: '损耗管理'}, {id: '507', mc: '还库管理'}, {id: '509', mc: '仓库统计'}, {id: '601', mc: '需求管理'}, {id: '602', mc: '项目管理'}, {id: '603', mc: '项目明细'}, {id: '609', mc: '项目统计'}];
var lb_allMoKuais = [
    {id: '101', mc: '部门管理'}, {id: '102', mc: '人员管理'},
    {id: '201', mc: '客户管理'},
    {id: '301', mc: '供应商管理'},
    {id: '401', mc: '仓库管理'}, {id: '402', mc: '物资类别'}, {id: '403', mc: '物资字典'},
    {id: '503', mc: '入库管理'}, {id: '504', mc: '领料管理'}, {id: '505', mc: '发货管理'}, {id: '506', mc: '损耗管理'}, {id: '507', mc: '还库管理'}, {id: '5010', mc: '退货管理'}, {id: '508', mc: '库存管理'}, {id: '509', mc: '仓库统计'},
    {id: '601', mc: '需求管理'}, {id: '602', mc: '项目管理'}, {id: '603', mc: '项目明细'}, {id: '609', mc: '项目统计'},
    {id: '701', mc: '字典类别'}, {id: '702', mc: '企业字典'},
    {id: '801', mc: '报表管理'},
    {id: '901', mc: '修改密码'}];
var lb_allA01s;
var lb_baoBiaos;
var lb_qiYes;
var lb_ziDianFenLeis;
var lb_wuZiLeiBies;
var lb_ziDian4fl;
var lb_wuZiZiDians;
var lb_cangKus;
var lb_keHus;
var lb_gongYingShangs;
var lb_xuQius;
var lb_xiangMuDetails1;

function getAllA01s(func) {
    hajax("/LBStore/a01/getAllA01s.do", {}, "lb_allA01s", func);
}

function getBaoBiaosByMk(mkdm, func) {
    hajax("/LBStore/baoBiao/getBaoBiaosByMk.do", {mkdm: mkdm}, "lb_baoBiaos", func);
}

function getQiYes(func) {
    hajax("/LBStore/qiYe/getAllQiYes.do", {}, "lb_qiYes", func);
}

function getZiDianFenLeis(func) {
    hajax("/LBStore/ziDianFenLei/getAllZiDianFenLeis.do", {}, "lb_ziDianFenLeis", func);
}

function getWuZiLeiBies(func) {
    hajax("/LBStore/wuZiLeiBie/getAllWuZiLeiBies.do", {}, "lb_wuZiLeiBies", func);
}

function getZiDian4FenLei(id, func) {
    hajax("/LBStore/ziDian/getAllZiDians4fl.do", {id: 0, qy_id: 0, zdfl_id: id}, "lb_ziDian4fl", func);
}

function getWuZiZiDians(func) {
    hajax("/LBStore/wuZiZiDian/getAllWuZiZiDians.do", {}, "lb_wuZiZiDians", func);
}

function getCangKus(func) {
    hajax("/LBStore/cangKu/getAllCangKus.do", {}, "lb_cangKus", func);
}

function getKeHus(func) {
    hajax("/LBStore/keHu/getAllKeHus.do", {}, "lb_keHus", func);
}

function getGongYingShangs(func) {
    hajax("/LBStore/gongYingShang/getAllGongYingShangs.do", {}, "lb_gongYingShangs", func);
}

function getAllXuQius(func) {
    hajax("/LBStore/xuQiu/getAllXuQius.do", {}, "lb_xuQius", func);
}

function getXiangMuDetail1(func) {
    gajax("/LBStore/xiangMuDetail/getXiangMuDetailsByState.do?state=1", "", "lb_xiangMuDetails1", func);
}

function findCode(list, id) {
    var e;
    for (var i = 0; i < list.length; i++) {
        e = list[i];
        if (e.id === id) {
            break;
        }
    }
    return e;
}

function hajax(url, d, result, func) {
    $.ajax({
        url: url,
        data: JSON.stringify(d),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("查询数据失败");
        },
        success: function (json) {
            if (json.result === 0) {
                eval(result + " = json.sz");
                if (func) {
                    func();
                }
            }
        }
    });
}

function gajax(url, d, result, func) {
    $.ajax({
        url: url,
        data: JSON.stringify(d),
        contentType: "application/json",
        type: "get",
        cache: false,
        error: function (msg, textStatus) {
            alert("查询数据失败");
        },
        success: function (json) {
            if (json.result === 0) {
                eval(result + " = json.sz");
                if (func) {
                    func();
                }
            }
        }
    });
}

function queryPaginator(options) {
    var tj = options.tj;
    var url = options.url;
    var func = options.func;
    var ul = options.ul;

    $.ajax({
        url: url,
        data: JSON.stringify(tj),
        contentType: "application/json",
        type: "POST",
        cache: false,
        error: function (msg, textStatus) {
        },
        success: function (json) {
            if (json !== null) {
                func(json);
                var count = json.rows;
                var pageCount = json.totalPage; //取到pageCount的值(把返回数据转成object类型)
                var currentPage = json.currentPage; //得到urrentPage
                var options = {
                    bootstrapMajorVersion: 3, //版本
                    currentPage: currentPage, //当前页数
                    totalPages: pageCount, //总页数
                    count: count,
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev5":
                                return "<<";
                            case "prev":
                                return "<";
                            case "next":
                                return ">";
                            case "next5":
                                return ">>";
                            case "last":
                                return "末页";
                            case "page":
                                return page;
                        }
                    }, //点击事件，用于通过Ajax来刷新整个list列表
                    onPageClicked: function (event, originalEvent, type, page) {
                        if (page === 0) {
                            return;
                        }
                        tj.currentPage = page;
                        $.ajax({
                            url: url,
                            data: JSON.stringify(tj),
                            contentType: "application/json",
                            type: "post",
                            cache: false,
                            error: function (msg, textStatus) {
                            },
                            success: function (json1) {
                                if (json1 !== null) {
                                    func(json1);
                                }
                            }
                        });
                    }
                };
                $(ul).bootstrapPaginator(options);
            }
        }
    });
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

function dateFormat(longTypeDate) {
    var datetimeType = "";
    var date = new Date();
    date.setTime(longTypeDate);
    datetimeType += date.getFullYear();   //年
    datetimeType += "-" + getMonth(date); //月
    datetimeType += "-" + getDay(date);   //日
    datetimeType += " " + getHours(date);   //时
    datetimeType += ":" + getMinutes(date);      //分
    datetimeType += ":" + getSeconds(date);      //分
    return datetimeType;
}

function dateFormat_d(longTypeDate) {
    var datetimeType = "";
    var date = new Date();
    date.setTime(longTypeDate);
    datetimeType += date.getFullYear();   //年
    datetimeType += "-" + getMonth(date); //月
    datetimeType += "-" + getDay(date);   //日
    return datetimeType;
}

function dateFormat_f(longTypeDate) {
    var datetimeType = "";
    var date = new Date();
    date.setTime(longTypeDate);
    datetimeType += date.getFullYear();   //年
    datetimeType += "-" + getMonth(date); //月
    datetimeType += "-" + getDay(date);   //日
    datetimeType += " " + getHours(date);   //时
    datetimeType += ":" + getMinutes(date);      //分
    return datetimeType;
}

//返回 01-12 的月份值
function getMonth(date) {
    var month = "";
    month = date.getMonth() + 1; //getMonth()得到的月份是0-11
    if (month < 10) {
        month = "0" + month;
    }
    return month;
}
//返回01-30的日期
function getDay(date) {
    var day = "";
    day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    return day;
}
//返回小时
function getHours(date) {
    var hours = "";
    hours = date.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }
    return hours;
}
//返回分
function getMinutes(date) {
    var minute = "";
    minute = date.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }
    return minute;
}
//返回秒
function getSeconds(date) {
    var second = "";
    second = date.getSeconds();
    if (second < 10) {
        second = "0" + second;
    }
    return second;
}

function getKuWeiHao(mc, qsh, jsh) {
    var array = [];
    if (!qsh || "" === qsh || !jsh || "" === jsh) {
        return array;
    }
    var reg = /^[A-Za-z]+$/;
    if (!isNaN(qsh) && !isNaN(jsh)) {
        var begin = parseInt(qsh);
        var end = parseInt(jsh);
        for (var i = begin; i <= end; i++) {
            var s = mc + i;
            var o = {id: i, mc: s};
            array.push(o);
        }
    } else if (reg.test(qsh) && reg.test(jsh)) {
        var begin = qsh.charCodeAt(0);
        var end = jsh.charCodeAt(0);
        for (var i = begin; i <= end; i++) {
            var s = mc + String.fromCharCode(i);
            var o = {id: i, mc: s};
            array.push(o);
        }
    }
    return array;
}

function getDateFromString(dateStr, separator) {
    if (!separator) {
        separator = "-";
    }
    var dateArr = dateStr.split(separator);
    var year = parseInt(dateArr[0]);
    var month;
    //处理月份为04这样的情况                         
    if (dateArr[1].indexOf("0") === 0) {
        month = parseInt(dateArr[1].substring(1));
    } else {
        month = parseInt(dateArr[1]);
    }
    var day = parseInt(dateArr[2]);
    var date = new Date(year, month - 1, day);
    return date;
}

function getAddDate(dateStr, days) {
    var date = getDateFromString(dateStr, "-");
    date.setDate(date.getDate() + days);
    return dateFormat_d(date);
}

function GetUrlParam(paraName) {
    var url = document.location.toString();
    var arrObj = url.split("?");

    if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;

        for (var i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=");

            if (arr != null && arr[0] == paraName) {
                return arr[1];
            }
        }
        return "";
    } else {
        return "";
    }
}