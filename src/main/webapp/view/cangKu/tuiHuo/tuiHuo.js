var tuiHuos;
var bbTuiHuo;
var tuiHuoFeis;
var feiOptFlag = -1;
var optFlag = 1;
var editIndex = -1;
var editType;
var thmx = [];
var optMxFlag = 1;
var editMxIndex = -1;
var xhggEditIndex = -1;
var tgIndex = 0;
var selWzzd;
var editWzzd;
var editXhgg;
var editLeiBie;
var selLeiBie;
var selCangKu;
var editKeHu;
var selKeHu;
var selGongYingShang;
var selKuWei;
var editCangKu;
var editA01;
var editFeiA01;
var selA01;
var curFaHuoDetail;
var selBaoBiao;
var dymx_opt = {data: [], yxData: [], func: calcDymx};
var tysx_opt = {data: [], ls: 3, lw: 70, upeditable: 1};

$(document).ready(function () {
    $('#inpSj').val(dateFormat(new Date()));
    $('#inpSj,#inpFeiRq').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd hh:ii', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, startView: 2, forceParse: 0, showMeridian: 1});
    $('#inpSelQrq,#inpSelZrq,#inpMxScrq,#inpFhdSelQrq,#inpFhdSelZrq').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, minView: 2, startView: 2, forceParse: 0, showMeridian: 1});
    getAllA01s(setTrager_a01);
    getCangKus(setTrager_cangKu);
    getKeHus(setTrager_keHu);
    getWuZiZiDians(setTrager_ziDian);
    getWuZiLeiBies(setTrager_leiBie);
    getGongYingShangs(setTrager_gongYingShang);
    getBaoBiaosByMk("5010", setTrager_baoBiao);
    $("#inpMxScrq").datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, minView: 2, startView: 2, forceParse: 0, showMeridian: 1});

    $("#inpMxThl").keyup(function () {
        if (curFaHuoDetail && curFaHuoDetail.jlfs === "zl") {
            var temp_thl = parseFloat($("#inpMxThl").val());
            var temp_thzl = temp_thl * curFaHuoDetail.bzgg;
            $("#inpMxThzl").val(temp_thzl.toFixed(3));
        }
    });
    $("#inpMxThzl").keyup(function () {
        if (curFaHuoDetail && curFaHuoDetail.jlfs === "zl") {
            var temp_thzl = parseFloat($("#inpMxThzl").val());
            var temp_thl = temp_thzl / curFaHuoDetail.bzgg;
            $("#inpMxThl").val(temp_thl.toFixed(3));
        }
    });
});

function setTrager_a01() {
    $('#inpThr').AutoComplete({'data': lb_allA01s, 'paramName': 'editA01'});
    $('#inpFeiSkr').AutoComplete({'data': lb_allA01s, 'paramName': 'editFeiA01'});
    $('#inpFhdSelLlr').AutoComplete({'data': lb_allA01s, 'paramName': 'selA01'});
}

function setTrager_cangKu() {
    $('#selCangKu').AutoComplete({'data': lb_cangKus, 'paramName': 'selCangKu'});
    $('#inpSelCk').AutoComplete({'data': lb_cangKus, 'paramName': 'selCangKu'});
    $('#inpCk').AutoComplete({'data': lb_cangKus, 'afterSelectedHandler': selectCangKu});
}

function setTrager_keHu() {
    $('#inpSelKh').AutoComplete({'data': lb_keHus, 'paramName': 'selKeHu'});
    $('#inpKh').AutoComplete({'data': lb_keHus, 'paramName': 'editKeHu'});
    $('#inpFhdSelKh').AutoComplete({'data': lb_keHus, 'paramName': 'selKeHu'});
}

function setTrager_ziDian() {
    $('#inpFhdSelWz').AutoComplete({'data': lb_wuZiZiDians, 'afterSelectedHandler': selectWuZiZiDian});
    $('#inpSelWz').AutoComplete({'data': lb_wuZiZiDians});
    $('#selWzmc').AutoComplete({'data': lb_wuZiZiDians});
}

function setTrager_leiBie() {
    $('#inpFhdSelWzlb').AutoComplete({'data': lb_wuZiLeiBies, 'afterSelectedHandler': selectWuZiLeiBie});
}

function setTrager_gongYingShang() {
    $('#inpFhdSelGys').AutoComplete({'data': lb_gongYingShangs, 'paramName': 'selGongYingShang'});
}

function setTrager_baoBiao() {
    $('#inpSelBb').AutoComplete({'data': lb_baoBiaos, 'paramName': 'selBaoBiao'});
}

function selectCangKu(json) {
    if (json.id !== editCangKu.id) {
        if (thmx.length > 0) {
            $("#inpCk").val(editCangKu.mc);
            return alert("已选择其他仓库的发货");
        }
        editCangKu = json;
        $("#inpCk").val(editCangKu.mc);
    }
}

function selectWuZiLeiBie(json) {
    selLeiBie = json;
    if (json.id > -1) {
        $.ajax({
            url: "/LBStore/wuZiZiDian/getWuZiZiDianByWzlbId.do?id=" + json.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {

            },
            success: function (json) {
                if (json.result === 0) {
                    $('#inpFhdSelWz').AutoComplete({'data': json.sz, 'afterSelectedHandler': selectWuZiZiDian});
                }
            }
        });
    } else {
        $('#inpFhdSelWz').AutoComplete({'data': [], 'afterSelectedHandler': selectWuZiZiDian});
    }
}

function selectTuiHuo_m() {
    $("#tuiHuoSelectModal").modal({backdrop: 'static'});
}

function selectWuZiZiDian(json) {
    selWzzd = json;
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
                    if ($('#inpFhdSelWzlb').val() !== json.wuZiZiDian.wzlb.mc) {
                        selectWuZiLeiBie(json.wuZiZiDian.wzlb);
                        $('#inpFhdSelWzlb').val(json.wuZiZiDian.wzlb.mc);
                    }
                }
            }
        });
    } else {
        $('#inpMxXhgg').AutoComplete({'data': [], 'paramName': 'editXhgg'});
    }
}

function selectMxJlfs() {
    var val = $("#inpMxJlfs").val();
    $(".form-MxBzgg").hide();
    $(".mxZlGroup").hide();
    $("#divMxDymx").hide();
    if (val === "zl") {
        $(".form-MxBzgg").show();
        $(".mxZlGroup").show();
    } else if (val === "mx") {
        $(".form-MxBzgg").show();
        $(".mxZlGroup").show();
        $("#divMxDymx").show();
        buildDymx();
    }
}

function jxTuiHuo(json) {
    $("#data_table_body tr").remove();
    tuiHuos = [];
    tuiHuos = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if (item.state === -1) {
            classStr = ' class="danger"';
        }
        item.lsh = item.lsh === undefined || item.lsh === null ? "" : item.lsh;
        var readStr = '<button class="btn btn-info btn-xs icon-file-alt" onclick="readTuiHuo(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var editStr = '<button class="btn btn-info btn-xs icon-edit" onclick="editTuiHuo(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var dealStr = '<button class="btn btn-info btn-xs icon-legal" onclick="dealTuiHuo(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var feiStr = '<button class="btn btn-info btn-xs icon-money" onclick="feiTuiHuo(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var delStr = '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteTuiHuo(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var trStr = '<tr' + classStr + '><td>' + item.ckmc + '</td><td>' + item.lsh + '</td><td>' + item.dh + '</td><td>' + item.wz + '</td><td>' + item.sj + '</td><td>' + item.sl + '</td><td>'
                + readStr
                + (item.state === 0 ? editStr : "")
                + (item.state === 0 ? dealStr : "")
                + (item.state === 0 || item.state === -1 ? delStr : "")
                + (item.state > 0 ? feiStr : "")
                + '</td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function showSelectTuiHuo() {
    $("#tuiHuoSelectModal").modal({backdrop: 'static'});
}

function selectTuiHuo() {
    var tuiHuo = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selLsh").val() !== "") {
        tuiHuo.lsh = $("#selLsh").val();
    }
    if ($('#selWzmc').val() !== "") {
        tuiHuo.wz = $('#selWzmc').val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        tuiHuo.state = $("#selState").val();
    }
    if ($("#selCangKu").val() !== "" && $("#selCangKu").val() === selCangKu.mc) {
        tuiHuo.ck_id = selCangKu.id;
    }
    tj.paramters = tuiHuo;
    var options = {};
    options.url = "/LBStore/tuiHuo/listTuiHuosByPage.do";
    options.tj = tj;
    options.func = jxTuiHuo;
    options.ul = "#example";
    queryPaginator(options);
}

function selectTuiHuo_m() {
    var tuiHuo = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#inpSelWz").val() !== "") {
        tuiHuo.wz = $("#inpSelWz").val();
    }
    if ($("#inpSelState").val() !== '' && $("#inpSelState").val() !== "-9") {
        tuiHuo.state = $("#inpSelState").val();
    }
    if ($("#inpSelCk").val() !== "" && $("#inpSelCk").val() === selCangKu.mc) {
        tuiHuo.ck_id = selCangKu.id;
    }
    if ($("#inpSelKh").val() !== "" && $("#inpSelKh").val() === selKeHu.mc) {
        tuiHuo.kh_id = selKeHu.id;
    }
    if ($("#inpSelQrq").val() !== "") {
        tuiHuo.qrq = $("#inpSelQrq").val();
    }
    if ($("#inpSelZrq").val() !== "") {
        tuiHuo.zrq = $("#inpSelZrq").val();
    }
    tj.paramters = tuiHuo;
    var options = {};
    options.url = "/LBStore/tuiHuo/listTuiHuosByPage.do";
    options.tj = tj;
    options.func = jxTuiHuo;
    options.ul = "#example";
    queryPaginator(options);
    $("#tuiHuoSelectModal").modal("hide");
}

function addTuiHuo() {
    optFlag = 1;
    thmx = [];
    editCangKu = {};
    $("#tuiHuoModel_title").html("新增退货单");
    $("#btnOk").html("保存");
    $("#divXzmx").show();
    $("#divSpr").hide();
    $(".bb-element").hide();
    $("#inpGys").val("");
    $("#inpDh").val("");
    $("#inpYy").val("");
    $("#inpBz").val("");
    $("#inpSl").val(0);
    $("#inpJe").val(0);
    jxTuiHuoMingXi();
    $("#tuiHuoModal").modal({backdrop: 'static'});
}

function editTuiHuo(index) {
    optFlag = 2;
    if (tuiHuos[index] === undefined) {
        optFlag = 1;
        return alert("请选择退货单");
    }
    $("#tuiHuoModel_title").html("修改退货单");
    $("#btnOk").html("保存");
    $("#divXzmx").show();
    $("#divSpr").hide();
    $(".bb-element").hide();
    var tuiHuo = tuiHuos[index];
    editIndex = index;
    editFeiIndex(tuiHuo.id, jxReadTuiHuo);
}

function readTuiHuo(index) {
    optFlag = 4;
    if (tuiHuos[index] === undefined) {
        optFlag = 1;
        return alert("请选择退货单");
    }
    $("#tuiHuoModel_title").html("查看退货单");
    $("#btnOk").html("关闭");
    $("#divXzmx").hide();
    $("#divSpr").show();
    $(".bb-element").show();
    var tuiHuo = tuiHuos[index];
    editIndex = index;
    editFeiIndex(tuiHuo.id, jxReadTuiHuo);
}

function jxReadTuiHuo(tuiHuo) {
    bbTuiHuo = tuiHuo;
    thmx = tuiHuo.details;
    $("#inpCk").val(tuiHuo.ckmc);
    editCangKu = {"id": tuiHuo.ck_id, "mc": tuiHuo.ckmc};
    editKeHu = {"id": tuiHuo.kh_id, "mc": tuiHuo.khmc};
    $("#inpThr").val(tuiHuo.thrmc);
    editA01 = {"id": tuiHuo.thr_id, "mc": tuiHuo.thrmc};
    selectCangKu(editCangKu);
    $("#inpDh").val(tuiHuo.dh);
    $("#inpYy").val(tuiHuo.yy);
    $("#inpBz").val(tuiHuo.bz);
    $("#inpSl").val(tuiHuo.sl);
    $("#inpJe").val(tuiHuo.je);
    $("#inpSj").val(tuiHuo.sj);
    $("#inpSpr").val(tuiHuo.sprmc);
    $("#inpSpsj").val(tuiHuo.spsj);
    jxTuiHuoMingXi();
    $("#tuiHuoModal").modal({backdrop: 'static'});
}

function editFeiIndex(id, func) {
    $.ajax({
        url: "/LBStore/tuiHuo/getTuiHuoDetailById.do?id=" + id,
        contentType: "application/json",
        type: "get",
        cache: false,
        error: function (msg, textStatus) {
            alert("获取发货单信息失败");
        },
        success: function (json) {
            if (json.result === 0) {
                if (func) {
                    func(json.tuiHuo);
                }
            } else
                alert("获取发货单信息失败:" + json.msg !== undefined ? json.msg : "");
        }
    });
}

function dealTuiHuo(index) {
    optFlag = 3;
    if (tuiHuos[index] === undefined) {
        optFlag = 1;
        return alert("请选择退货单");
    }
    $("#tuiHuoModel_title").html("办理退货单");
    $("#btnOk").html("办理");
    $("#divXzmx").hide();
    $("#divSpr").hide();
    $(".bb-element").hide();
    var tuiHuo = tuiHuos[index];
    editIndex = index;
    editFeiIndex(tuiHuo.id, jxReadTuiHuo);
}

function saveTuiHuo() {
    if (optFlag === 4) {
        $("#tuiHuoModal").modal("hide");
        return;
    }
    if (thmx.length < 1) {
        return alert("请增加退货明细！");
    }
    var tuiHuo = {};
    var url = "";
    if (optFlag === 3) {
        if (tuiHuos[editIndex] === undefined) {
            return;
        }
        if (!confirm("确定办理退货单?")) {
            return;
        }
        tuiHuo = tuiHuos[editIndex];
        url = "/LBStore/tuiHuo/dealTuiHuo.do";
    } else if (optFlag === 2) {
        if (tuiHuos[editIndex] === undefined) {
            return;
        }
        tuiHuo = tuiHuos[editIndex];
        url = "/LBStore/tuiHuo/updateTuiHuo.do";
    } else if (optFlag === 1) {
        url = "/LBStore/tuiHuo/saveTuiHuo.do";
    }
    if ($("#inpCk").val() === "") {
        return alert("请输入仓库信息");
    } else {
        if ($("#inpCk").val() !== editCangKu.mc) {
            return alert("请输入仓库信息");
        } else {
            tuiHuo.ck_id = editCangKu.id;
        }
    }
    if ($("#inpKh").val() === "") {
        return alert("请输入客户信息");
    } else {
        if ($("#inpKh").val() !== editKeHu.mc) {
            return alert("请输入客户信息");
        } else {
            tuiHuo.kh_id = editKeHu.id;
        }
    }
    if ($("#inpThr").val() === "") {
        return alert("请输入退货人信息");
    } else {
        if ($("#inpThr").val() !== editA01.mc) {
            return alert("请输入退货人信息");
        } else {
            tuiHuo.thr_id = editA01.id;
        }
    }
    var wz = "";
    var wzs = [];
    for (var i = 0; i < thmx.length; i++) {
        var e = thmx[i];
        if (e.ck_id !== tuiHuo.ck_id) {
            return alert("退货明细仓库和退货单仓库不匹配！");
        }
        if (e.kh_id !== tuiHuo.kh_id) {
            return alert("退货明细客户和退货单客户不匹配！");
        }
        if (optFlag === 3) {
            if (e.kw === undefined || e.kw === null || e.kw === "") {
                return alert("退货单明细需要设置库位！");
            }
            if (e.dj === undefined || e.dj === null || e.dj === "") {
                return alert("退货单明细需要设置单价！");
            }
        }
        if (typeof e.dymx !== "string") {
            e.dymx = JSON.stringify(e.dymx);
        }
        if (typeof e.tysx !== "string") {
            e.tysx = JSON.stringify(e.tysx);
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
    tuiHuo.details = thmx;
    tuiHuo.wz = wz;
    tuiHuo.dh = $("#inpDh").val();
    tuiHuo.yy = $("#inpYy").val();
    tuiHuo.bz = $("#inpBz").val();
    tuiHuo.sl = $("#inpSl").val();
    tuiHuo.je = $("#inpJe").val();
    tuiHuo.sj = $("#inpSj").val();
    tuiHuo.state = 0;
    var tsStr = optFlag === 3 ? "办理" : "保存";
    $.ajax({
        url: url,
        data: JSON.stringify(tuiHuo),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert(tsStr + "失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#tuiHuoModal").modal("hide");
                selectTuiHuo();
            } else {
                alert(tsStr + "失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteTuiHuo(index) {
    if (tuiHuos[index] === undefined) {
        return alert("请选择退货单");
    }
    var tuiHuo = tuiHuos[index];
    if (confirm("确定删除退货单：" + tuiHuo.dh + "?")) {
        $.ajax({
            url: "/LBStore/tuiHuo/deleteTuiHuo.do?id=" + tuiHuo.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectTuiHuo();
                else
                    alert("删除失败:" + json.msg ? json.msg : "");
            }
        });
    }
}

function buildTysx(data) {
    if (data && "" !== data) {
        if (typeof data === "string") {
            data = JSON.parse(data);
        }
        if (data.length === 0) {
            $("#divMxTysx").hide();
            return;
        }
        $("#divMxTysx").show();
        tysx_opt.data = data;
        $("#divMxTysx").empty();
        $("#divMxTysx").setTysxDiv(tysx_opt);
    }
}

function buildDymx() {
    $("#tblMxDymx").selectDetailTable(dymx_opt);
    $("#tblMxDymx input:last").focus();
}

function calcDymx() {
    if (dymx_opt.yxData) {
        var zl = 0;
        for (var i = 0; i < dymx_opt.yxData.length; i++) {
            zl += parseFloat(dymx_opt.yxData[i].val);
        }
        $("#inpMxThl").val(dymx_opt.yxData.length);
        $("#inpMxThzl").val(zl.toFixed(3));
    }
}

function jxTuiHuoMingXi() {
    $("#tblWuZiMingXi_body tr").remove();
    $.each(thmx, function (index, item) { //遍历返回的json
        if (item.tysx && item.tysx !== null && item.tysx !== "" && typeof item.tysx === 'string') {
            item.tysx = JSON.parse(item.tysx);
        } else if (item.tysx && typeof item.tysx === 'object') {

        } else {
            item.tysx = [];
        }
        var je = parseFloat(item.thl) * parseFloat(item.fhdj);
        var bj = optFlag === 3 || optFlag === 4 ? '' : '<button class="btn btn-info btn-xs icon-edit" onclick="editTuiHuoMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var cz = optFlag === 3 || optFlag === 4 ? '' : '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteTuiHuoMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var trStr = '<tr><td>' + item.wzmc + '</td><td>' + item.pp + '</td><td>' + item.xhgg + '</td><td>' + item.thl + '</td><td>' + je + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-file-alt" onclick="readTuiHuoMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + bj
                + cz + '</td></tr>';
        $("#tblWuZiMingXi_body").append(trStr);
    });
}

function addTuiHuoMingXi() {
    if ($("#inpCk").val() === "" || $("#inpCk").val() !== editCangKu.mc) {
        return alert("请选择退货仓库");
    }
    if ($("#inpKh").val() === "" || $("#inpKh").val() !== editKeHu.mc) {
        return alert("请选择退货客户");
    }
    optMxFlag = 1;
    dymx_opt = {data: [], yxData: [], func: calcDymx};
    editLeiBie = null;
    $("#tuiHuoMingXiModal_title").html("增加明细");
    $("#selFaHuoDetailModal").modal({backdrop: 'static'});
}

function editTuiHuoMingXi(index) {
    if (thmx[index]) {
        optMxFlag = 2;
        editMxIndex = index;
        $("#tuiHuoMingXiModal_title").html("修改明细");
        $("#btnMxOk").html("保存");
        var temp = thmx[index];
        cxFaHuoDetailById(temp.fhd_id, index);
    }
}

function readTuiHuoMingXi(index) {
    if (thmx[index]) {
        optMxFlag = 4;
        editMxIndex = index;
        $("#tuiHuoMingXiModal_title").html("查看明细");
        $("#btnMxOk").html("关闭");
        var temp = thmx[index];
        cxFaHuoDetailById(temp.fhd_id, index);
    }
}

function deleteTuiHuoMingXi(index) {
    if (thmx[index]) {
        if (confirm("确定删除明细：" + thmx[index].wzmc + "?")) {
            thmx.splice(index, 1);
            jxTuiHuoMingXi();
        }
    }
}

function saveTuiHuoMingXi() {
    if (optMxFlag === 4) {
        $("#tuiHuoMingXiModal").modal("hide");
        return;
    }
    if (!editLeiBie || editLeiBie === null) {
        return alert("物资类别不能为空");
    }
    if ($("#inpMxThl").val() === "") {
        return alert("请输入退货数量");
    }
    if(curFaHuoDetail.kh_id !== editKeHu.id){
        return alert("明细客户和当前客户不一致");
    }
    var mx = {};
    if ($("#inpMxWz").val() === "") {
        return alert("请选择发货物资");
    } else if ($("#inpMxWzbm").val() === "") {
        return alert("请选择发货物资");
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
    mx.pp = $("#inpMxPp").val();
    if ($("#inpMxXhgg").val() === "") {
        return alert("请输入物资型号规格");
    } else {
        if (!editXhgg || $("#inpMxXhgg").val() !== editXhgg.mc) {
            mx.xhgg_id = -1;
        } else {
            mx.xhgg_id = editXhgg.id;
        }
    }
    mx.xhgg = $("#inpMxXhgg").val();
    mx.scc = $("#inpMxScc").val();
    mx.bz = $("#inpMxBz").val();
    mx.txm = $("#inpMxTxm").val();
    mx.pc = $("#inpMxPc").val();
    mx.scrq = $("#inpMxScrq").val();
    mx.bzq = $("#inpMxBzq").val();
    mx.dj = parseFloat($("#inpMxDj").val());
    mx.fhdj = parseFloat($("#inpMxFhdj").val());
    mx.dw = $("#inpMxDw").val();
    mx.jlfs = $("#inpMxJlfs").val();
    mx.bzgg = $("#inpMxBzgg").val();
    mx.zldw = $("#inpMxZldw").val();
    mx.kw = $("#inpMxKwh").val();
    mx.dymx = JSON.stringify(dymx_opt.yxData);
    mx.tysx = JSON.stringify(tysx_opt.data);
    mx.thl = parseFloat($("#inpMxThl").val());
    mx.thzl = parseFloat($("#inpMxThzl").val());
    if (mx.jlfs === "pt") {
        mx.thzl = mx.thl;
    } else {
        if (mx.thzl === undefined || mx.thzl === "" || mx.thzl < 0.001) {
            mx.thzl = mx.thl;
        }
    }
    mx.fhd_id = curFaHuoDetail.id;
    mx.kc_id = curFaHuoDetail.kc_id;
    mx.gys_id = curFaHuoDetail.gys_id;
    mx.ck_id = curFaHuoDetail.ck_id;
    mx.kh_id = curFaHuoDetail.kh_id;
    if (optMxFlag === 1) {
        thmx.push(mx);
    } else if (optMxFlag === 2) {
        thmx[editMxIndex] = mx;
    }
    jxTuiHuoMingXi();
    var zsl = 0;
    var zje = 0;
    for (var i = 0; i < thmx.length; i++) {
        var e = thmx[i];
        zsl = e.thl + zsl;
        zje = e.thl * e.fhdj + zje;
    }
    $("#inpSl").val(zsl);
    $("#inpJe").val(zje.toFixed(3));
    $("#tuiHuoMingXiModal").modal("hide");
    curFaHuoDetail = null;
}

function cxFaHuoDetail() {
    var faHuoDetail = {};
    faHuoDetail.ck_id = editCangKu.id;
    faHuoDetail.kh_id = editKeHu.id;
    if ($("#inpFhdSelWzlb").val() !== "" && $("#inpFhdSelWzlb").val() === selLeiBie.mc) {
        faHuoDetail.wzlb_id = selLeiBie.id;
    }
    if ($("#inpFhdSelWz").val() !== "") {
        faHuoDetail.wzmc = $("#inpFhdSelWz").val();
    }
    if ($("#inpFhdSelXhgg").val() !== "") {
        faHuoDetail.xhgg = $("#inpFhdSelXhgg").val();
    }
    if ($("#inpFhdSelKh").val() !== "" && $("#inpFhdSelKh").val() === selKeHu.mc) {
        faHuoDetail.kh_id = selKeHu.id;
    }
    if ($("#inpFhdSelGys").val() !== "" && $("#inpFhdSelGys").val() === selGongYingShang.mc) {
        faHuoDetail.gys_id = selGongYingShang.id;
    }
    if ($("#inpFhdSelLlr").val() !== "" && $("#inpFhdSelLlr").val() === selA01.mc) {
        faHuoDetail.llr_id = selA01.id;
    }
    if ($("#inpFhdSelQrq").val() !== "") {
        faHuoDetail.qrq = $("#inpFhdSelQrq").val();
    }
    if ($("#inpFhdSelZrq").val() !== "") {
        faHuoDetail.zrq = $("#inpFhdSelZrq").val();
    }
    if ($("#inpFhdSelLsh").val() !== "") {
        faHuoDetail.lsh = $("#inpFhdSelLsh").val();
    }
    if ($("#inpFhdSelTxm").val() !== "") {
        faHuoDetail.txm = $("#inpFhdSelTxm").val();
    }
    $.ajax({
        url: "/LBStore/faHuo/getFaHuoDetailTop100.do?",
        data: JSON.stringify(faHuoDetail),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("查询发货失败");
        },
        success: function (json) {
            if (json.result === 0) {
                var sz = json.sz;
                jxFaHuoDetail(sz);
            } else {
                alert("查询发货失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function jxFaHuoDetail(sz) {
    $("#tblFaHuoDetail_body tr").remove();
    faHuoDetails = [];
    faHuoDetails = sz;
    $.each(sz, function (index, item) { //遍历返回的json
        var trStr = '<tr><td>' + item.lsh + '</td><td>' + item.wzmc + '</td><td>' + item.pp + '</td><td>' + item.xhgg + '</td><td>' + item.fhzl + '</td><td>' + item.sj + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-plus" onclick="selFaHuoDetail(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#tblFaHuoDetail_body").append(trStr);
    });
}

function selFaHuoDetail(index) {
    curFaHuoDetail = null;
    if (faHuoDetails.length <= index) {
        return;
    }
    var detail = faHuoDetails[index];
    for (var i = 0; i < thmx.length; i++) {
        var e = thmx[i];
        if (e.kc_id === detail.id) {
            return alert("该发货物资已选择");
        }
    }
    setFhdData(detail);
}

function setFhdData(detail, index) {
    curFaHuoDetail = detail;
    var m = thmx[index];
    m = m ? m : {};
    if (m.dymx) {
        if (typeof m.dymx === "string") {
            m.dymx = JSON.parse(m.dymx);
        }
    } else {
        m.dymx = [];
    }
    m.thl = m.thl ? m.thl : 0;
    m.thzl = m.thzl ? m.thzl : 0;
    if (detail.dymx && typeof detail.dymx === "string") {
        detail.dymx = JSON.parse(detail.dymx);
    } else {
        detail.dymx = [];
    }
    dymx_opt = {data: detail.dymx, yxData: m.dymx, func: calcDymx};
    editWzzd = {"id": detail.wzzd_id, "mc": detail.wzmc, "bm": detail.wzbm};
    $("#inpMxWz").val(detail.wzmc);
    $("#inpMxWzbm").val(detail.wzbm);
    editLeiBie = {"id": detail.wzlb_id, "mc": detail.wzlb};
    $("#inpMxLb").val(detail.wzlb);
    $("#inpMxPp").val(detail.pp);
    editXhgg = {"id": detail.xhgg_id, "mc": detail.xhgg};
    $("#inpMxXhgg").val(detail.xhgg);
    $("#inpMxScc").val(detail.scc);
    $("#inpMxBz").val(detail.bz);
    $("#inpMxTxm").val(detail.txm);
    $("#inpMxPc").val(detail.pc);
    $("#inpMxScrq").val(detail.scrq);
    $("#inpMxBzq").val(detail.bzq);
    $("#inpMxDj").val(detail.dj);
    $("#inpMxFhdj").val(detail.fhdj);
    $("#inpMxDw").val(detail.dw);
    $("#inpMxSl").val(detail.sl);
    $("#inpMxJlfs").val(detail.jlfs);
    $("#inpMxBzgg").val(detail.bzgg);
    $("#inpMxFhl").val(detail.fhl);
    $("#inpMxFhzlDw").val(detail.zldw);
    $("#inpMxFhzl").val(detail.fhzl);
    $("#inpMxKwh").val(detail.kw);
    $("#inpMxFhr").val(detail.fhrmc);
    buildTysx(detail.tysx);
    $("#inpMxThl").val(m.thl);
    $("#inpMxThzl").val(m.thzl);
    buildDymx();
    if (detail.jlfs === "mx") {
        $("#divMxDymx").show();
    } else {
        $("#divMxDymx").hide();
    }
    selectMxJlfs();
    $("#selFaHuoDetailModal").modal("hide");
    $("#tuiHuoMingXiModal").modal({backdrop: 'static'});
}

function cxFaHuoDetailById(id, index) {
    $.ajax({
        url: "/LBStore/faHuo/getFaHuoDetailById.do?id=" + id,
        contentType: "application/json",
        type: "get",
        cache: false,
        error: function (msg, textStatus) {
            alert("查询发货失败");
        },
        success: function (json) {
            if (json.result === 0) {
                var fhd = json.faHuoDetail;
                setFhdData(fhd, index);
            } else {
                alert("查询发货失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function feiTuiHuo(index) {
    $("#tblTuiHuoFei_body tr").remove();
    if (tuiHuos[index] === undefined) {
        return alert("请选择发货单");
    }
    editIndex = index;
    var tuiHuo = tuiHuos[index];
    editFeiIndex(tuiHuo.id, selectTuiHuoFei);
}

function jxTuiHuoFei(json) {
    $("#tblTuiHuoFei_body tr").remove();
    tuiHuoFeis = [];
    tuiHuoFeis = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var trStr = '<tr><td>' + item.rq + '</td><td>' + item.je + '</td><td>' + item.skrmc + '</td><td>' + item.bz + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editTuiHuoFei(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="delTuiHuoFei(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#tblTuiHuoFei_body").append(trStr);
    });
}

function selectTuiHuoFei(json) {
    curTuiHuo = json;
    var jexx = "总金额：￥" + curTuiHuo.je + "&ensp;&ensp;&ensp;&ensp;已付：￥" + curTuiHuo.yfje + "&ensp;&ensp;&ensp;&ensp;待付：<span style='color:red'>￥" + curTuiHuo.dfje + "</span>";
    $("#tuiHuoJexx").html(jexx);
    var tuiHuoFei = {};
    var tj = {"pageSize": 10, "currentPage": 1};
    tuiHuoFei.th_id = json.id;
    tj.paramters = tuiHuoFei;
    var options = {};
    options.url = "/LBStore/tuiHuo/listTuiHuoFeisByPage.do";
    options.tj = tj;
    options.func = jxTuiHuoFei;
    options.ul = "#example2";
    queryPaginator(options);
    $("#tuiHuoFeiModal").modal({backdrop: 'static'});
}

function addTuiHuoFei(type) {
    feiOptFlag = 1;
    if (!curTuiHuo) {
        return;
    }
    editFeiA01 = undefined;
    $("#tuiHuoFeiEditModel_title").html("新增记录");
    if (type === 1) {
        $("#inpFeiRq").val(dateFormat_f(new Date()));
        $("#inpFeiJe").val(curTuiHuo.dfje);
        $("#inpFeiSkr").val("");
        $("#inpFeiBz").val("");
    } else {
        $("#inpFeiRq").val(dateFormat_f(new Date()));
        $("#inpFeiJe").val(0);
        $("#inpFeiSkr").val("");
        $("#inpFeiBz").val("");
    }
    $("#tuiHuoFeiEditModal").modal({backdrop: 'static'});
}

function editTuiHuoFei(index) {
    if (!curTuiHuo) {
        return;
    }
    feiOptFlag = 2;
    if (tuiHuoFeis[index] === undefined) {
        feiOptFlag = 1;
        return alert("请选择记录");
    }
    var tuiHuoFei = tuiHuoFeis[index];
    xhggEditIndex = index;
    editFeiA01 = {id: tuiHuoFei.skr_id, mc: tuiHuoFei.skrmc};
    $("#tuiHuoFeiEditModel_title").html("修改记录");
    $("#inpFeiRq").val(tuiHuoFei.rq);
    $("#inpFeiJe").val(tuiHuoFei.je);
    $("#inpFeiSkr").val(tuiHuoFei.skrmc);
    $("#inpFeiBz").val(tuiHuoFei.bz);
    $("#tuiHuoFeiEditModal").modal({backdrop: 'static'});
}

function checkFei(type, index, je) {
    var zje = 0;
    if (type === 1) {
        for (var i = 0; i < tuiHuoFeis.length; i++) {
            zje = zje + tuiHuoFeis[i].je;
        }
    } else if (type === 2) {
        for (var i = 0; i < tuiHuoFeis.length; i++) {
            if (i !== index) {
                zje = zje + tuiHuoFeis[i].je;
            }
        }
    }
    zje = zje + je;
    if (zje > curTuiHuo.je) {
        alert("付款金额超过了订单金额");
        return false;
    }
    return true;
}

function saveTuiHuoFei() {
    if (!curTuiHuo) {
        return;
    }
    var tuiHuoFei = {};
    var url = "";
    var je = parseFloat($("#inpFeiJe").val());
    if (feiOptFlag === 2) {
        if (tuiHuoFeis[xhggEditIndex] === undefined) {
            return;
        }
        tuiHuoFei = tuiHuoFeis[xhggEditIndex];
        url = "/LBStore/tuiHuo/updateTuiHuoFei.do";
    } else if (feiOptFlag === 1) {
        url = "/LBStore/tuiHuo/saveTuiHuoFei.do";
        tuiHuoFei.th_id = curTuiHuo.id;

    }
    if (!checkFei(feiOptFlag, xhggEditIndex, je)) {
        return;
    }
    if (!editFeiA01 || editFeiA01.mc === '' || editFeiA01.mc !== $("#inpFeiSkr").val()) {
        return alert("请选择收款人");
    }
    tuiHuoFei.rq = $("#inpFeiRq").val();
    tuiHuoFei.je = je;
    tuiHuoFei.skr_id = editFeiA01.id;
    tuiHuoFei.kh_id = curTuiHuo.kh_id;
    tuiHuoFei.bz = $("#inpFeiBz").val();
    $.ajax({
        url: url,
        data: JSON.stringify(tuiHuoFei),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#tuiHuoFeiEditModal").modal("hide");
                editFeiIndex(curTuiHuo.id, selectTuiHuoFei);
            } else {
                alert("保存失败：" + json.msg ? json.msg : "");
            }
        }
    });
}

function delTuiHuoFei(index) {
    if (tuiHuoFeis[index] === undefined) {
        return alert("请选择记录");
    }
    var tuiHuoFei = tuiHuoFeis[index];
    if (confirm("确定删除记录?")) {
        $.ajax({
            url: "/LBStore/tuiHuo/deleteTuiHuoFei.do?id=" + tuiHuoFei.id + "&th_id=" + curTuiHuo.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0) {
                    editFeiIndex(curTuiHuo.id, selectTuiHuoFei);
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