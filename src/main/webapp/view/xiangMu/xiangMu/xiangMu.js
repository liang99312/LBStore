var xiangMus;
var bbXiangMu;
var xiangMuFeis;
var feiOptFlag = -1;
var optFlag = 1;
var editIndex = -1;
var editType;
var xmmx = [];
var optMxFlag = 1;
var editMxIndex = -1;
var editFeiIndex = -1;
var tgIndex = 0;
var selWzzd;
var editWzzd;
var editXhgg;
var editLeiBie;
var editXuQiu;
var selKeHu;
var editKeHu;
var selKuWei;
var editA01;
var editFeiA01;
var selBaoBiao;
var tsType = [{id: 1, mc: "文本"}, {id: 2, mc: "数字"}];
var tysx = [];
var optTsFlag = 1;
var editTsIndex = -1;
var tgIndex = 0;

$(document).ready(function () {
    $('#inpKdsj,#inpFeiRq').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd hh:ii', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, startView: 2, forceParse: 0, showMeridian: 1});
    $('#inpJhsj,#inpSelQrq,#inpSelZrq').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, minView: 2, startView: 2, forceParse: 0, showMeridian: 1});
    $('#inpTsType').AutoComplete({'data': tsType, 'paramName': 'editType'});
    getAllA01s(setTrager_a01);
    getKeHus(setTrager_keHu);
    getWuZiZiDians(setTrager_ziDian);
    getWuZiLeiBies(setTrager_leiBie);
    getAllXuQius(setTrager_xuQiu);
    getBaoBiaosByMk("503", setTrager_baoBiao);
});

function refreshWuZiZiDian() {
    getWuZiZiDians(setTrager_ziDian);
}

function setTrager_a01() {
    $('#inpKdr').AutoComplete({'data': lb_allA01s, 'paramName': 'editA01'});
    $('#inpFeiSkr').AutoComplete({'data': lb_allA01s, 'paramName': 'editFeiA01'});
}

function setTrager_keHu() {
    $('#inpSelKh').AutoComplete({'data': lb_keHus, 'paramName': 'selKeHu'});
    $('#inpKh').AutoComplete({'data': lb_keHus, 'paramName': 'editKeHu'});
}

function setTrager_ziDian() {
    $('#inpSelWz').AutoComplete({'data': lb_wuZiZiDians, 'paramName': 'selWzzd'});
    $('#selWzmc').AutoComplete({'data': lb_wuZiZiDians});
    $('#inpMxWz').AutoComplete({'data': lb_wuZiZiDians, 'afterSelectedHandler': selectWuZiZiDian});
    var temp_wuZiZiDians = $.extend(true, [], lb_wuZiZiDians);
    $('#inpMxWzbm').AutoComplete({'data': temp_wuZiZiDians, 'fieldName': 'bm', 'afterSelectedHandler': selectWuZiZiDian});
}

function setTrager_leiBie() {
    $('#inpMxLb').AutoComplete({'data': lb_wuZiLeiBies, 'paramName': 'editLeiBie'});
}

function setTrager_xuQiu() {
    $('#inpMxXq').AutoComplete({'data': lb_xuQius, 'afterSelectedHandler': selectXuQiu});
}

function setTrager_baoBiao() {
    $('#inpSelBb').AutoComplete({'data': lb_baoBiaos, 'paramName': 'selBaoBiao'});
}

function selectXuQiu(json) {
    editXuQiu = json;
    $("#inpMxXq").val(editXuQiu.mc);
    if (editXuQiu.tysx && editXuQiu.tysx !== null && editXuQiu.tysx !== "") {
        editXuQiu.tysx = JSON.parse(editXuQiu.tysx);
    } else {
        editXuQiu.tysx = [];
    }
    $.extend(true, tysx, editXuQiu.tysx);
    buildTysx(editXuQiu.tysx);
}

function selectXiangMu_m() {
    $("#xiangMuSelectModal").modal({backdrop: 'static'});
}

function selectWuZiZiDian(json) {
    editWzzd = json;
    $("#inpMxWzbm").val(editWzzd.bm);
    $("#inpMxWz").val(editWzzd.mc);
    if (json.id > -1) {
        $.ajax({
            url: "/LBStore/wuZiZiDian/getWuZiZiDianById.do?id=" + json.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {

            },
            success: function (json) {
                if (json.result === 0) {
                    $('#inpMxXhgg').AutoComplete({'data': json.wuZiZiDian.xhggs, 'paramName': 'editXhgg'});
                    selectWuZiLeiBie(json.wuZiZiDian.wzlb);
                }
            }
        });
        $('#inpMxCkdh').val("");
        selectXiangMuDetailsTop100(json.id);
    } else {
        $('#inpMxXhgg').AutoComplete({'data': [], 'paramName': 'editXhgg'});
    }
}

function selectXiangMuDetailsTop100(id) {
    $.ajax({
        url: "/LBStore/xiangMu/getXiangMuByWzid_100.do?id=" + id,
        contentType: "application/json",
        type: "get",
        cache: false,
        error: function (msg, textStatus) {
            $('#inpMxCkdh').AutoComplete({'data': [], 'afterSelectedHandler': setDetails});
        },
        success: function (json) {
            if (json.result === 0) {
                var editDetails = [];
                for (var i = 0; i < json.details.length; i++) {
                    var e = json.details[i];
                    e.mc = e.dh;
                    editDetails.push(e);
                }
                $('#inpMxCkdh').AutoComplete({'data': editDetails, 'afterSelectedHandler': setDetails});
            }
        }
    });
}

function setDetails(m) {
    editWzzd = {"id": m.wzzd_id, "mc": m.wzmc, "bm": m.wzbm};
    editLeiBie = {"id": m.wzlb_id, "mc": m.wzlb};
    editXhgg = {"id": m.xhgg_id, "mc": m.xhgg};
    editXuQiu = {"id": m.xq_id, "mc": m.xqmc, "tysx": m.xq};
    $("#inpMxXhgg").val(m.xhgg);
    $("#inpMxBz").val(m.bz);
    $("#inpMxDj").val(m.dj);
    $("#inpMxDw").val(m.dw);
    $("#inpMxJhsl").val(m.jhsl);
    $("#inpMxLb").val(m.wzlb);
    $("#inpMxXq").val(m.xqmc);
    tysx = [];
    if (m.xq && m.xq !== null && m.xq !== "" && typeof m.xq === 'string') {
        m.xq = JSON.parse(m.xq);
    }
    $.extend(true, tysx, m.xq);
    buildTysx(m.xq);
}

function jxXiangMu(json) {
    $("#data_table_body tr").remove();
    xiangMus = [];
    xiangMus = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if (item.state === -1) {
            classStr = ' class="danger"';
        }
        item.lsh = item.lsh === undefined || item.lsh === null ? "" : item.lsh;
        item.khmc = item.khmc === undefined || item.khmc === null ? "" : item.khmc;
        var readStr = '<button class="btn btn-info btn-xs icon-file-alt" onclick="readXiangMu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var editStr = '<button class="btn btn-info btn-xs icon-edit" onclick="editXiangMu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var dealStr = '<button class="btn btn-info btn-xs icon-legal" onclick="dealXiangMu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var delStr = '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteXiangMu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var feiStr = '<button class="btn btn-info btn-xs icon-money" onclick="feiXiangMu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var finishStr = '<button class="btn btn-info btn-xs icon-ok-sign" onclick="finishXiangMu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var trStr = '<tr' + classStr + '><td>' + item.mc + '</td><td>' + item.lsh + '</td><td>' + item.khmc + '</td><td>' + item.wz + '</td><td>' + item.jhsj + '</td><td>' + item.jhsl + '</td><td>'
                + readStr
                + (item.state === 0 ? editStr : "")
                + (item.state === 0 ? dealStr : "")
                + (item.state === 0 || item.state === -1 || item.state === 4 ? delStr : "")
                + (item.state > 0 && item.state !== 4 ? finishStr : "")
                + (item.state > 0 && item.state !== 4 ? feiStr : "")
                + '</td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function showSelectXiangMu() {
    $("#xiangMuSelectModal").modal({backdrop: 'static'});
}

function selectXiangMu() {
    var xiangMu = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selMc").val() !== "") {
        xiangMu.mc = $("#selMc").val();
    }
    if ($("#selLsh").val() !== "") {
        xiangMu.lsh = $("#selLsh").val();
    }
    if ($('#selWzmc').val() !== "") {
        xiangMu.wz = $('#selWzmc').val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        xiangMu.state = parseInt($("#selState").val());
    }
    tj.paramters = xiangMu;
    var options = {};
    options.url = "/LBStore/xiangMu/listXiangMusByPage.do";
    options.tj = tj;
    options.func = jxXiangMu;
    options.ul = "#example";
    queryPaginator(options);
}

function selectXiangMu_m() {
    var xiangMu = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#inpSelMc").val() !== "") {
        xiangMu.mc = $("#inpSelMc").val();
    }
    if ($("#inpSelLsh").val() !== "") {
        xiangMu.lsh = $("#inpSelLsh").val();
    }
    if ($("#inpSelWz").val() !== "") {
        xiangMu.wz = $("#inpSelWz").val();
    }
    if ($("#inpSelState").val() !== '' && $("#inpSelState").val() !== "-9") {
        xiangMu.state = parseInt($("#inpSelState").val());
    }
    if ($("#inpSelKh").val() !== "" && $("#inpSelKh").val() === selKeHu.mc) {
        xiangMu.kh_id = selKeHu.id;
    }
    if ($("#inpSelQrq").val() !== "") {
        xiangMu.qrq = $("#inpSelQrq").val();
    }
    if ($("#inpSelZrq").val() !== "") {
        xiangMu.zrq = $("#inpSelZrq").val();
    }
    tj.paramters = xiangMu;
    var options = {};
    options.url = "/LBStore/xiangMu/listXiangMusByPage.do";
    options.tj = tj;
    options.func = jxXiangMu;
    options.ul = "#example";
    queryPaginator(options);
    $("#xiangMuSelectModal").modal("hide");
}

function addXiangMu() {
    optFlag = 1;
    xmmx = [];
    editKeHu = {};
    $("#xiangMuModel_title").html("新增项目");
    $("#btnOk").html("保存");
    $("#divXzmx").show();
    $("#dvMxCanKao").show();
    $("#divSpr").hide();
    $(".bb-element").hide();
    $(".item-view").hide();
    $("#btnFinish").hide();
    $("#btnStop").hide();
    $("#inpMc").val("");
    $("#inpKh").val("");
    $("#inpDh").val("");
    $("#inpBz").val("");
    $("#inpJhsl").val(0);
    $("#inpJhje").val(0);
    $('#inpKdsj').val(dateFormat(new Date()));
    $('#inpJhsj').val(dateFormat_d(new Date()));
    jxXiangMuMingXi();
    $("#xiangMuModal").modal({backdrop: 'static'});
}

function editXiangMu(index) {
    optFlag = 2;
    if (xiangMus[index] === undefined) {
        optFlag = 1;
        return alert("请选择项目");
    }
    $("#xiangMuModel_title").html("修改项目");
    $("#btnOk").html("保存");
    $("#divXzmx").show();
    $("#dvMxCanKao").show();
    $("#divSpr").hide();
    $(".bb-element").hide();
    $(".item-view").hide();
    $("#btnStop").hide();
    $("#btnFinish").hide();
    var xiangMu = xiangMus[index];
    editIndex = index;
    selectXiangMuDetail(xiangMu.id, jxReadXiangMu);
}

function readXiangMu(index) {
    optFlag = 4;
    if (xiangMus[index] === undefined) {
        optFlag = 1;
        return alert("请选择项目");
    }
    $("#xiangMuModel_title").html("查看项目");
    $("#btnOk").html("关闭");
    $("#divXzmx").hide();
    $("#divSpr").show();
    $(".bb-element").show();
    $(".item-view").show();
    $("#btnFinish").hide();
    $("#btnStop").hide();
    var xiangMu = xiangMus[index];
    editIndex = index;
    $("#dvMxCanKao").hide();
    selectXiangMuDetail(xiangMu.id, jxReadXiangMu);
}

function finishXiangMu(index) {
    optFlag = 5;
    if (xiangMus[index] === undefined) {
        optFlag = 1;
        return alert("请选择项目");
    }
    $("#xiangMuModel_title").html("管理项目");
    $("#btnOk").html("关闭");
    $("#divXzmx").hide();
    $("#divSpr").show();
    $(".bb-element").hide();
    $(".item-view").hide();
    $("#btnFinish").show();
    $("#btnStop").show();
    var xiangMu = xiangMus[index];
    editIndex = index;
    $("#dvMxCanKao").hide();
    selectXiangMuDetail(xiangMu.id, jxReadXiangMu);
}

function jxReadXiangMu(xiangMu) {
    bbXiangMu = xiangMu;
    xmmx = xiangMu.details;
    $("#inpMc").val(xiangMu.mc);
    $("#inpKh").val(xiangMu.khmc);
    editKeHu = {"id": xiangMu.kh_id, "mc": xiangMu.khmc};
    $("#inpKdr").val(xiangMu.kdrmc);
    editA01 = {"id": xiangMu.kdr_id, "mc": xiangMu.kdrmc};
    $("#inpDh").val(xiangMu.dh);
    $("#inpBz").val(xiangMu.bz);
    $("#inpJhsl").val(xiangMu.sl);
    $("#inpJhje").val(xiangMu.je);
    $("#inpSj").val(xiangMu.sj);
    $("#inpSpr").val(xiangMu.sprmc);
    $("#inpSpsj").val(xiangMu.spsj);
    $("#inpJhsl").val(xiangMu.jhsl);
    $("#inpJhje").val(xiangMu.jhje);
    $("#inpJhsj").val(xiangMu.jhsj);
    $("#inpKdsj").val(xiangMu.kdsj);
    jxXiangMuMingXi();
    $("#xiangMuModal").modal({backdrop: 'static'});
}

function selectXiangMuDetail(id, func) {
    $.ajax({
        url: "/LBStore/xiangMu/getXiangMuWithDetailById.do?id=" + id,
        contentType: "application/json",
        type: "get",
        cache: false,
        error: function (msg, textStatus) {
            alert("获取项目信息失败");
        },
        success: function (json) {
            if (json.result === 0) {
                if (func) {
                    func(json.xiangMu);
                }
            } else
                alert("获取项目信息失败:" + json.msg !== undefined ? json.msg : "");
        }
    });
}

function dealXiangMu(index) {
    optFlag = 3;
    if (xiangMus[index] === undefined) {
        optFlag = 1;
        return alert("请选择项目");
    }
    $("#xiangMuModel_title").html("办理项目");
    $("#btnOk").html("办理");
    $("#divXzmx").hide();
    $("#divSpr").hide();
    $("#dvMxCanKao").hide();
    $(".bb-element").hide();
    $(".item-view").hide();
    $("#btnFinish").hide();
    $("#btnStop").hide();
    var xiangMu = xiangMus[index];
    editIndex = index;
    selectXiangMuDetail(xiangMu.id, jxReadXiangMu);
}

function saveXiangMu() {
    if (optFlag === 4) {
        $("#xiangMuModal").modal("hide");
        return;
    }
    if (xmmx.length < 1) {
        return alert("请增加项目明细！");
    }
    var xiangMu = {};
    var url = "";
    if (optFlag === 3) {
        if (xiangMus[editIndex] === undefined) {
            return;
        }
        if (!confirm("确定办理项目?")) {
            return;
        }
        xiangMu = xiangMus[editIndex];
        url = "/LBStore/xiangMu/dealXiangMu.do";
    } else if (optFlag === 2) {
        if (xiangMus[editIndex] === undefined) {
            return;
        }
        xiangMu = xiangMus[editIndex];
        url = "/LBStore/xiangMu/updateXiangMu.do";
    } else if (optFlag === 1) {
        url = "/LBStore/xiangMu/saveXiangMu.do";
    }
    if ($("#inpKh").val() === "") {
        return alert("请输入客户信息");
    } else {
        if ($("#inpKh").val() !== editKeHu.mc) {
            return alert("请输入客户信息");
        } else {
            xiangMu.kh_id = editKeHu.id;
        }
    }
    if ($("#inpKdr").val() === "") {
        return alert("请输入开单人信息");
    } else {
        if ($("#inpKdr").val() !== editA01.mc) {
            return alert("请输入开单人信息");
        } else {
            xiangMu.kdr_id = editA01.id;
        }
    }
    if ($("#inpDh").val() === "") {
        return alert("请输入项目单号，可用于下次录入相同产品项目，可节省部分信息录入");
    }
    var wz = "";
    var wzs = [];
    for (var i = 0; i < xmmx.length; i++) {
        var e = xmmx[i];
        if (optFlag === 3) {
            if (e.dj === undefined || e.dj === null || e.dj === "") {
                return alert("项目明细需要设置单价！");
            }
        }
        if (typeof e.xq !== "string") {
            e.xq = JSON.stringify(e.xq);
        }
        if (wzs.indexOf(e.wzmc) > -1) {
            continue;
        } else {
            wzs.push(e.wzmc);
        }
    }
    for (var i = 0; i < wzs.length; i++) {
        var e = wzs[i];
        wz += e + ";";
    }
    xiangMu.mc = $("#inpMc").val();
    xiangMu.details = xmmx;
    xiangMu.wz = wz;
    xiangMu.dh = $("#inpDh").val();
    xiangMu.bz = $("#inpBz").val();
    xiangMu.jhsl = parseFloat($("#inpJhsl").val());
    xiangMu.jhje = parseFloat($("#inpJhje").val());
    xiangMu.kdsj = $("#inpKdsj").val();
    xiangMu.jhsj = $("#inpJhsj").val();
    xiangMu.state = 0;
    var tsStr = optFlag === 3 ? "办理" : "保存";
    $.ajax({
        url: url,
        data: JSON.stringify(xiangMu),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert(tsStr + "失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#xiangMuModal").modal("hide");
                selectXiangMu();
            } else {
                alert(tsStr + "失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function stopXiangMu() {
    changeState("终止","/LBStore/xiangMu/stopXiangMu.do?");
}

function wancXiangMu(){
    changeState("完成","/LBStore/xiangMu/finishXiangMu.do?");
}

function changeState(cz, url) {
    var xiangMu = {};
    if (optFlag === 5) {
        if (xiangMus[editIndex] === undefined) {
            return;
        }
        if (!confirm("确定" + cz + "项目?")) {
            return;
        }
        xiangMu = xiangMus[editIndex];
        $.ajax({
            url: url+"id=" + xiangMu.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert(cz + "失败");
            },
            success: function (json) {
                if (json.result === 0){
                    $("#xiangMuModal").modal("hide");
                    selectXiangMu();
                } else
                    alert(cz + "失败:" + json.msg ? json.msg : "");
            }
        });
    }
}

function deleteXiangMu(index) {
    if (xiangMus[index] === undefined) {
        return alert("请选择项目");
    }
    var xiangMu = xiangMus[index];
    if (confirm("确定删除项目：" + xiangMu.wz + "?")) {
        $.ajax({
            url: "/LBStore/xiangMu/deleteXiangMu.do?id=" + xiangMu.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectXiangMu();
                else
                    alert("删除失败:" + json.msg ? json.msg : "");
            }
        });
    }
}

function jxXiangMuMingXi() {
    $("#tblWuZiMingXi_body tr").remove();
    $.each(xmmx, function (index, item) { //遍历返回的json
        if (item.xq && item.xq !== null && item.xq !== "" && typeof item.xq === 'string') {
            item.xq = JSON.parse(item.xq);
        } else if (item.xq && typeof item.xq === 'object') {

        } else {
            item.xq = [];
        }
        var jhje = parseFloat(item.jhsl) * parseFloat(item.dj);
        var cp = optFlag === 3 || optFlag === 4 ? '' : '<button class="btn btn-info btn-xs icon-copy" onclick="copyXiangMuMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var bj = optFlag === 4 ? '' : '<button class="btn btn-info btn-xs icon-edit" onclick="editXiangMuMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var wc = optFlag === 5 ? '' : '<button class="btn btn-info btn-xs icon-ok-sign" onclick="finishXiangMuMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var cz = optFlag === 3 || optFlag === 4 ? '' : '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteXiangMuMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var trStr = '<tr><td>' + item.wzmc + '</td><td>' + item.xhgg + '</td><td>' + item.jhsl + '</td><td>' + item.dj + '</td><td>' + jhje + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-file-alt" onclick="readXiangMuMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + bj
                + cp;
        +cz + '</td></tr>';
        $("#tblWuZiMingXi_body").append(trStr);
    });
}

function addXiangMuMingXi() {
    if ($("#inpKh").val() === "") {
        return alert("请输入客户信息");
    } else {
        if ($("#inpKh").val() !== editKeHu.mc) {
            return alert("请输入客户信息");
        }
    }
    editXuQiu = {};
    optMxFlag = 1;
    editLeiBie = {};
    $("#xiangMuMingXiModal_title").html("增加明细");
    $("#btnMxOk").html("保存");
    $("#inpMxWz").val("");
    $("#inpMxWzbm").val("");
    $("#inpMxLb").val("");
    $("#inpMxXhgg").val("");
    $("#inpMxBz").val("");
    $("#inpMxDj").val("1");
    $("#inpMxDw").val("");
    $("#inpMxJhsl").val("0");
    tysx = [];
    buildTysx([]);
    $("#dvMxBzgg").hide();
    $("#dvMxZl").hide();
    $("#xiangMuMingXiModal").modal({backdrop: 'static'});
}

function editXiangMuMingXi(index) {
    if (xmmx[index]) {
        optMxFlag = 2;
        editMxIndex = index;
        $("#xiangMuMingXiModal_title").html("修改明细");
        $("#btnMxOk").html("保存");
        setXiangMuMingXiData(index);
    }
}

function copyXiangMuMingXi(index) {
    if (xmmx[index]) {
        optMxFlag = 1;
        editMxIndex = index;
        $("#xiangMuMingXiModal_title").html("修改明细");
        $("#btnMxOk").html("保存");
        setXiangMuMingXiData(index);
    }
}

function readXiangMuMingXi(index) {
    if (xmmx[index]) {
        optMxFlag = 4;
        editMxIndex = index;
        $("#xiangMuMingXiModal_title").html("查看明细");
        $("#btnMxOk").html("关闭");
        setXiangMuMingXiData(index);
    }
}

function readXiangMuMingXi(index) {
    if (xmmx[index]) {
        optMxFlag = 5;
        editMxIndex = index;
        $("#xiangMuMingXiModal_title").html("查看明细");
        $("#btnMxOk").html("关闭");
        setXiangMuMingXiData(index);
    }
}

function setXiangMuMingXiData(index) {
    editXuQiu = {};
    var m = xmmx[index];
    editWzzd = {"id": m.wzzd_id, "mc": m.wzmc, "bm": m.wzbm};
    $("#inpMxWz").val(m.wzmc);
    $("#inpMxWzbm").val(m.wzbm);
    editLeiBie = {"id": m.wzlb_id, "mc": m.wzlb};
    $("#inpMxLb").val(m.wzlb);
    editXhgg = {"id": m.xhgg_id, "mc": m.xhgg};
    $("#inpMxXhgg").val(m.xhgg);
    $("#inpMxBz").val(m.bz);
    $("#inpMxDj").val(m.dj);
    $("#inpMxDw").val(m.dw);
    $("#inpMxJhsl").val(m.jhsl);
    if (m.xq_id !== null && m.xq_id > 0) {
        fetchXuQiuById(m.xq_id);
    }
    tysx = [];
    $.extend(true, tysx, m.xq);
    buildTysx(tysx);
    $("#xiangMuMingXiModal").modal({backdrop: 'static'});
}

function fetchXuQiuById(id) {
    $.ajax({
        url: "/LBStore/xuQiu/getXuQiuById.do?id=" + id,
        contentType: "application/json",
        type: "get",
        dataType: "json",
        cache: false,
        error: function (msg, textStatus) {
            alert("获取需求详细信息");
        },
        success: function (json) {
            if (json.result === 0) {
                editXuQiu = json.xuQiu;
                $("#inpMxXq").val(editXuQiu.mc);
            } else
                alert("获取需求详细信息:" + json.msg ? json.msg : "");
        }
    });
}

function deleteXiangMuMingXi(index) {
    if (xmmx[index]) {
        if (confirm("确定删除明细：" + xmmx[index].wzmc + "?")) {
            xmmx.splice(index, 1);
            jxXiangMuMingXi();
        }
    }
}

function resetXiangMuMingXi() {
    addXiangMuMingXi();
}

function saveXiangMuMingXi() {
    if (optMxFlag === 4) {
        $("#xiangMuMingXiModal").modal("hide");
        return;
    }
    if (!editLeiBie || editLeiBie === null) {
        return alert("产品类别不能为空");
    }
    if ($("#inpMxJhsl").val() === "") {
        return alert("请输入产品名称");
    }
    var mx = {};
    if (optFlag === 3) {
        mx = xmmx[editMxIndex];
    }
    if ($("#inpMxWz").val() === "") {
        return alert("请输入产品名称");
    } else if ($("#inpMxWzbm").val() === "") {
        return alert("请输入产品编码");
    } else {
        if (!editWzzd || $("#inpMxWz").val() !== editWzzd.mc || $("#inpMxWzbm").val() !== editWzzd.bm) {
            mx.wzzd_id = -1;
        } else {
            mx.wzzd_id = editWzzd.id;
        }
    }
    mx.wzlb_id = editLeiBie.id;
    mx.wzmc = $("#inpMxWz").val();
    mx.wzbm = $("#inpMxWzbm").val();
    mx.wzlb = $("#inpMxLb").val();
    if ($("#inpMxXhgg").val() === "") {
        return alert("请输入产品型号规格");
    } else {
        if (!editXhgg || $("#inpMxXhgg").val() !== editXhgg.mc) {
            mx.xhgg_id = -1;
        } else {
            mx.xhgg_id = editXhgg.id;
        }
    }
    if ($("#inpMxDw").val() === '') {
        return alert("请输入单位");
    }
    mx.xhgg = $("#inpMxXhgg").val();
    mx.bz = $("#inpMxBz").val();
    mx.dj = parseFloat($("#inpMxDj").val());
    mx.dw = $("#inpMxDw").val();
    mx.jhsl = parseFloat($("#inpMxJhsl").val());
    if (!editXuQiu || $("#inpMxXq").val() !== editXuQiu.mc) {
        mx.xq_id = -1;
    } else {
        mx.xq_id = editXuQiu.id;
    }
    setTysx();
    mx.xq = JSON.stringify(tysx);
    if (optMxFlag === 1) {
        xmmx.push(mx);
    } else if (optMxFlag === 2) {
        xmmx[editMxIndex] = mx;
    }
    jxXiangMuMingXi();
    var zsl = 0;
    var zje = 0;
    for (var i = 0; i < xmmx.length; i++) {
        var e = xmmx[i];
        zsl = e.jhsl + zsl;
        zje = e.jhsl * e.dj + zje;
    }
    $("#inpJhsl").val(zsl);
    $("#inpJhje").val(zje.toFixed(3));
    $("#xiangMuMingXiModal").modal("hide");
}

function feiXiangMu(index) {
    $("#tblXiangMuFei_body tr").remove();
    if (xiangMus[index] === undefined) {
        return alert("请选择发货单");
    }
    editIndex = index;
    var xiangMu = xiangMus[index];
    selectXiangMuDetail(xiangMu.id, selectXiangMuFei);
}

function jxXiangMuFei(json) {
    $("#tblXiangMuFei_body tr").remove();
    xiangMuFeis = [];
    xiangMuFeis = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var trStr = '<tr><td>' + item.rq + '</td><td>' + item.je + '</td><td>' + item.skrmc + '</td><td>' + item.bz + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editXiangMuFei(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="delXiangMuFei(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#tblXiangMuFei_body").append(trStr);
    });
}

function selectXiangMuFei(json) {
    curXiangMu = json;
    var jexx = "总金额：￥" + curXiangMu.je + "&ensp;&ensp;&ensp;&ensp;已付：￥" + curXiangMu.yfje + "&ensp;&ensp;&ensp;&ensp;待付：<span style='color:red'>￥" + curXiangMu.dfje + "</span>";
    $("#xiangMuJexx").html(jexx);
    var xiangMuFei = {};
    var tj = {"pageSize": 10, "currentPage": 1};
    xiangMuFei.xm_id = json.id;
    tj.paramters = xiangMuFei;
    var options = {};
    options.url = "/LBStore/xiangMu/listXiangMuFeisByPage.do";
    options.tj = tj;
    options.func = jxXiangMuFei;
    options.ul = "#example2";
    queryPaginator(options);
    $("#xiangMuFeiModal").modal({backdrop: 'static'});
}

function addXiangMuFei(type) {
    feiOptFlag = 1;
    if (!curXiangMu) {
        return;
    }
    editFeiA01 = undefined;
    $("#xiangMuFeiEditModel_title").html("新增记录");
    if (type === 1) {
        $("#inpFeiRq").val(dateFormat_f(new Date()));
        $("#inpFeiJe").val(curXiangMu.dfje);
        $("#inpFeiSkr").val("");
        $("#inpFeiBz").val("");
    } else {
        $("#inpFeiRq").val(dateFormat_f(new Date()));
        $("#inpFeiJe").val(0);
        $("#inpFeiSkr").val("");
        $("#inpFeiBz").val("");
    }
    $("#xiangMuFeiEditModal").modal({backdrop: 'static'});
}

function editXiangMuFei(index) {
    if (!curXiangMu) {
        return;
    }
    feiOptFlag = 2;
    if (xiangMuFeis[index] === undefined) {
        feiOptFlag = 1;
        return alert("请选择记录");
    }
    var xiangMuFei = xiangMuFeis[index];
    editFeiIndex = index;
    editFeiA01 = {id: xiangMuFei.skr_id, mc: xiangMuFei.skrmc};
    $("#xiangMuFeiEditModel_title").html("修改记录");
    $("#inpFeiRq").val(xiangMuFei.rq);
    $("#inpFeiJe").val(xiangMuFei.je);
    $("#inpFeiSkr").val(xiangMuFei.skrmc);
    $("#inpFeiBz").val(xiangMuFei.bz);
    $("#xiangMuFeiEditModal").modal({backdrop: 'static'});
}

function checkFei(type, index, je) {
    var zje = 0;
    if (type === 1) {
        for (var i = 0; i < xiangMuFeis.length; i++) {
            zje = zje + xiangMuFeis[i].je;
        }
    } else if (type === 2) {
        for (var i = 0; i < xiangMuFeis.length; i++) {
            if (i !== index) {
                zje = zje + xiangMuFeis[i].je;
            }
        }
    }
    zje = zje + je;
    if (zje > curXiangMu.je) {
        alert("收款金额超过了订单金额");
        return false;
    }
    return true;
}

function saveXiangMuFei() {
    if (!curXiangMu) {
        return;
    }
    var xiangMuFei = {};
    var url = "";
    var je = parseFloat($("#inpFeiJe").val());
    if (feiOptFlag === 2) {
        if (xiangMuFeis[editFeiIndex] === undefined) {
            return;
        }
        xiangMuFei = xiangMuFeis[editFeiIndex];
        url = "/LBStore/xiangMu/updateXiangMuFei.do";
    } else if (feiOptFlag === 1) {
        url = "/LBStore/xiangMu/saveXiangMuFei.do";
        xiangMuFei.xm_id = curXiangMu.id;

    }
    if (!checkFei(feiOptFlag, editFeiIndex, je)) {
        return;
    }
    if (!editFeiA01 || editFeiA01.mc === '' || editFeiA01.mc !== $("#inpFeiSkr").val()) {
        return alert("请选择收款人");
    }
    xiangMuFei.rq = $("#inpFeiRq").val();
    xiangMuFei.je = je;
    xiangMuFei.skr_id = editFeiA01.id;
    xiangMuFei.kh_id = curXiangMu.kh_id;
    xiangMuFei.bz = $("#inpFeiBz").val();
    $.ajax({
        url: url,
        data: JSON.stringify(xiangMuFei),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#xiangMuFeiEditModal").modal("hide");
                selectXiangMuDetail(curXiangMu.id, selectXiangMuFei);
            } else {
                alert("保存失败：" + json.msg ? json.msg : "");
            }
        }
    });
}

function delXiangMuFei(index) {
    if (xiangMuFeis[index] === undefined) {
        return alert("请选择记录");
    }
    var xiangMuFei = xiangMuFeis[index];
    if (confirm("确定删除记录?")) {
        $.ajax({
            url: "/LBStore/xiangMu/deleteXiangMuFei.do?id=" + xiangMuFei.id + "&xm_id=" + curXiangMu.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0) {
                    selectXiangMuDetail(curXiangMu.id, selectXiangMuFei);
                } else {
                    alert("删除失败：" + json.msg ? json.msg : "");
                }
            }
        });
    }
}

function execBaoBiao() {
    if (selBaoBiao === undefined) {
        return alert("请选择报表");
    }
    $.ajax({
        url: "/LBStore/baoBiao/getBaoBiaoNrById.do?id=" + selBaoBiao.id,
        contentType: "application/json",
        type: "get",
        dataType: "html",
        cache: false,
        error: function (msg, textStatus) {
            alert("读取报表失败");
        },
        success: function (text) {
            $("#dvBbnr").html(text);
            $("#baoBiaoModal").modal({backdrop: 'static'});
        }
    });
}

function buildTysx(data) {
    $("#divMxTysx").empty();
    for (var i = 0; i < data.length; i++) {
        var e = data[i];
        if (!e.value || e.value === null) {
            e.value = "";
        }
        var s = "<div class='form-group'><label for='edts_inp_" + e.id + "'>" + e.mc + "：</label>\n\
                <input type='text' id='edts_inp_" + e.id + "' value='" + e.value + "' />\n\
                <button class='btn btn-info btn-xs icon-edit ts_edit'></button><button class='btn btn-danger btn-xs icon-minus ts_del'></div>";
        $("#divMxTysx").append(s);
    }
    tgIndex = 0;
    setEvent(data);
    $("#divMxTysx .ts_edit").each(function (i) {
        $(this).click(function () {
            editTeYouShuXing(i);
        });
    });
    $("#divMxTysx .ts_del").each(function (i) {
        $(this).click(function () {
            delTeYouShuXing(i);
        });
    });
}

function setEvent(data) {
    var e = data[tgIndex];
    if (e) {
        if (e.zdfl && e.zdfl > 0) {
            getZiDian4FenLei(e.zdfl, function () {
                $("#edts_inp_" + e.id).AutoComplete({'data': lb_ziDian4fl});
                tgIndex++;
                setEvent(data);
            });
        } else {
            tgIndex++;
            setEvent(data);
        }
    }
}

function addTeYouShuXing() {
    setTysx();
    optTsFlag = 1;
    $("#xuQiuModel_title").html("增加条目");
    $("#inpTsMc").val("");
    editFenLei = null;
    $("#inpTsType").val("");
    $("#teYouShuXingModal").modal({backdrop: 'static'});
}

function editTeYouShuXing(index) {
    setTysx();
    if (tysx[index]) {
        optTsFlag = 2;
        editTsIndex = index;
        var t = tysx[index];
        $("#xuQiuModel_title").html("修改条目");
        $("#inpTsMc").val(t.mc);
        $("#inpTsType").val(t.type);
        if (t.zdfl && t.zdfl > 0) {
            editFenLei = {id: t.zdfl, mc: t.zdfl_mc};
            $("#inpTsZiDian").val(editFenLei.mc);
        }
        $("#teYouShuXingModal").modal({backdrop: 'static'});
    }
}

function delTeYouShuXing(index) {
    setTysx();
    if (tysx[index]) {
        if (confirm("确定删除条目：" + tysx[index].mc + "?")) {
            tysx.splice(index, 1);
            for (var i = 0; i < tysx.length; i++) {
                tysx[i].id = i;
            }
            buildTysx(tysx);
        }
    }
}

function saveTeYouShuXing() {
    if (optTsFlag === 1) {
        var ts = {};
        ts.id = tysx.length;
        ts.mc = $("#inpTsMc").val();
        ts.type = $("#inpTsType").val();
        if (editFenLei && editFenLei !== null) {
            ts.zdfl = editFenLei.id;
            ts.zdfl_mc = editFenLei.mc;
        }
        tysx.push(ts);
    } else if (optTsFlag === 2) {
        var ts = {};
        ts.mc = $("#inpTsMc").val();
        ts.type = $("#inpTsType").val();
        if (editFenLei && editFenLei !== null) {
            ts.zdfl = editFenLei.id;
            ts.zdfl_mc = editFenLei.mc;
        }
        tysx.splice(editTsIndex, 1, ts);
    }
    for (var i = 0; i < tysx.length; i++) {
        tysx[i].id = i;
    }
    buildTysx(tysx);
    $("#teYouShuXingModal").modal("hide");
}

function setTysx() {
    for (var i = 0; i < tysx.length; i++) {
        tysx[i].value = $("#edts_inp_" + i).val();
    }
}

function saveXuQiu() {
    if ($("#inpMxXq").val() === "") {
        return alert("请选择需求或者点击后面图标另存需求");
    } else {
        if ($("#inpMxXq").val() !== editXuQiu.mc) {
            return alert("请选择需求或者点击后面图标另存需求");
        }
    }
    if (confirm("确定保存需求?")) {
        var newTysx = [];
        $.extend(true, newTysx, tysx);
        for (var i = 0; i < tysx.length; i++) {
            newTysx[i].value = "";
        }
        var xuQiu = {};
        var url = "/LBStore/xuQiu/updateXuQiu.do";
        xuQiu.id = editXuQiu.id;
        xuQiu.qy_id = editXuQiu.qy_id;
        xuQiu.cjr_id = editXuQiu.cjr_id;
        xuQiu.mc = editXuQiu.mc;
        xuQiu.dm = editXuQiu.dm;
        xuQiu.bz = editXuQiu.bz;
        xuQiu.kh_id = editXuQiu.kh_id;
        xuQiu.tysx = JSON.stringify(newTysx);
        xuQiu.state = editXuQiu.state;
        $.ajax({
            url: url,
            data: JSON.stringify(xuQiu),
            contentType: "application/json",
            type: "post",
            cache: false,
            error: function (msg, textStatus) {
                alert("保存失败");
            },
            success: function (json) {
                if (json.result === 0) {
                    alert("保存成功");
                    getAllXuQius(setTrager_xuQiu);
                } else {
                    alert("保存失败:" + json.msg ? json.msg : "");
                }
            }
        });
    }
}

function saveasXuQiu() {
    var newTysx = [];
    $.extend(true, newTysx, tysx);
    for (var i = 0; i < tysx.length; i++) {
        newTysx[i].value = "";
    }
    var xuQiu = {};
    var url = "/LBStore/xuQiu/saveXuQiu.do";
    xuQiu.kh_id = editKeHu.id;
    xuQiu.tysx = JSON.stringify(newTysx);
    var name = prompt("请输入需求名称", "");
    if (name !== null && name !== "") {
        xuQiu.mc = name;
    } else {
        return;
    }
    $.ajax({
        url: url,
        data: JSON.stringify(xuQiu),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                alert("保存成功");
                getAllXuQius(setTrager_xuQiu);
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}
