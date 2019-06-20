var huanKus;
var bbHuanKu;
var optFlag = 1;
var editIndex = -1;
var editType;
var hkmx = [];
var optMxFlag = 1;
var editMxIndex = -1;
var tgIndex = 0;
var selWzzd;
var editWzzd;
var editXhgg;
var editLeiBie;
var selLeiBie;
var selCangKu;
var selKeHu;
var selGongYingShang;
var selKuWei;
var editCangKu;
var editA01;
var selA01;
var curLingLiaoDetail;
var selBaoBiao;
var dymx_opt = {data: [], yxData: [], func: calcDymx};
var tysx_opt = {data: [], ls: 3, lw: 70, upeditable: 1};

$(document).ready(function () {
    $('#inpSj').val(dateFormat(new Date()));
    $('#inpSj').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd hh:ii', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, startView: 2, forceParse: 0, showMeridian: 1});
    $('#inpSelQrq,#inpSelZrq,#inpMxScrq,#inpLldSelQrq,#inpLldSelZrq').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, minView: 2, startView: 2, forceParse: 0, showMeridian: 1});
    getAllA01s(setTrager_a01);
    getCangKus(setTrager_cangKu);
    getKeHus(setTrager_keHu);
    getWuZiZiDians(setTrager_ziDian);
    getWuZiLeiBies(setTrager_leiBie);
    getGongYingShangs(setTrager_gongYingShang);
    getBaoBiaosByMk("507", setTrager_baoBiao);
    $("#inpMxScrq").datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, minView: 2, startView: 2, forceParse: 0, showMeridian: 1});

    $("#inpMxHkl").keyup(function () {
        if (curLingLiaoDetail && curLingLiaoDetail.jlfs === "zl") {
            var temp_hkl = parseFloat($("#inpMxHkl").val());
            var temp_hkzl = temp_hkl * curLingLiaoDetail.bzgg;
            $("#inpMxHkzl").val(temp_hkzl.toFixed(3));
        }
    });
    $("#inpMxHkzl").keyup(function () {
        if (curLingLiaoDetail && curLingLiaoDetail.jlfs === "zl") {
            var temp_hkzl = parseFloat($("#inpMxHkzl").val());
            var temp_hkl = temp_hkzl / curLingLiaoDetail.bzgg;
            $("#inpMxHkl").val(temp_hkl.toFixed(3));
        }
    });
});

function setTrager_a01() {
    $('#inpHkr').AutoComplete({'data': lb_allA01s, 'paramName': 'editA01'});
    $('#inpLldSelLlr').AutoComplete({'data': lb_allA01s, 'paramName': 'selA01'});
}

function setTrager_cangKu() {
    $('#selCangKu').AutoComplete({'data': lb_cangKus, 'paramName': 'selCangKu'});
    $('#inpSelCk').AutoComplete({'data': lb_cangKus, 'paramName': 'selCangKu'});
    $('#inpCk').AutoComplete({'data': lb_cangKus, 'afterSelectedHandler': selectCangKu});
}

function setTrager_keHu() {
    $('#inpLldSelKh').AutoComplete({'data': lb_keHus, 'paramName': 'selKeHu'});
}

function setTrager_ziDian() {
    $('#inpLldSelWz').AutoComplete({'data': lb_wuZiZiDians, 'afterSelectedHandler': selectWuZiZiDian});
    $('#inpSelWz').AutoComplete({'data': lb_wuZiZiDians});
    $('#selWzmc').AutoComplete({'data': lb_wuZiZiDians});
}

function setTrager_leiBie() {
    $('#inpLldSelWzlb').AutoComplete({'data': lb_wuZiLeiBies, 'afterSelectedHandler': selectWuZiLeiBie});
}

function setTrager_gongYingShang() {
    $('#inpLldSelGys').AutoComplete({'data': lb_gongYingShangs, 'paramName': 'selGongYingShang'});
}

function setTrager_baoBiao() {
    $('#inpSelBb').AutoComplete({'data': lb_baoBiaos, 'paramName': 'selBaoBiao'});
}

function selectCangKu(json) {
    if (json.id !== editCangKu.id) {
        if (hkmx.length > 0) {
            $("#inpCk").val(editCangKu.mc);
            return alert("已选择其他仓库的领料");
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
                    $('#inpLldSelWz').AutoComplete({'data': json.sz, 'afterSelectedHandler': selectWuZiZiDian});
                }
            }
        });
    } else {
        $('#inpLldSelWz').AutoComplete({'data': [], 'afterSelectedHandler': selectWuZiZiDian});
    }
}

function selectHuanKu_m() {
    $("#huanKuSelectModal").modal({backdrop:'static'});
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
                    if ($('#inpLldSelWzlb').val() !== json.wuZiZiDian.wzlb.mc) {
                        selectWuZiLeiBie(json.wuZiZiDian.wzlb);
                        $('#inpLldSelWzlb').val(json.wuZiZiDian.wzlb.mc);
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
    $("#dvMxZl").hide();
    $("#divMxDymx").hide();
    if (val === "zl") {
        $(".form-MxBzgg").show();
        $("#dvMxZl").show();
    } else if (val === "mx") {
        $(".form-MxBzgg").show();
        $("#dvMxZl").show();
        $("#divMxDymx").show();
        buildDymx();
    }
}

function jxHuanKu(json) {
    $("#data_table_body tr").remove();
    huanKus = [];
    huanKus = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if (item.state === -1) {
            classStr = ' class="danger"';
        }
        item.lsh = item.lsh === undefined || item.lsh === null ? "" : item.lsh;
        var readStr = '<button class="btn btn-info btn-xs icon-file-alt" onclick="readHuanKu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var editStr = '<button class="btn btn-info btn-xs icon-edit" onclick="editHuanKu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var dealStr = '<button class="btn btn-info btn-xs icon-legal" onclick="dealHuanKu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var delStr = '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteHuanKu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var trStr = '<tr' + classStr + '><td>' + item.ckmc + '</td><td>' + item.lsh + '</td><td>' + item.dh + '</td><td>' + item.wz + '</td><td>' + item.sj + '</td><td>' + item.sl + '</td><td>'
                + readStr
                + (item.state === 0 ? editStr : "")
                + (item.state === 0 ? dealStr : "")
                + (item.state === 0 || item.state === -1 ? delStr : "") + '</td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function showSelectHuanKu() {
    $("#huanKuSelectModal").modal({backdrop:'static'});
}

function selectHuanKu() {
    var huanKu = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selLsh").val() !== "") {
        huanKu.lsh = $("#selLsh").val();
    }
    if ($('#selWzmc').val() !== "") {
        huanKu.wz = $('#selWzmc').val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        huanKu.state = parseInt($("#selState").val());
    }
    if ($("#selCangKu").val() !== "" && $("#selCangKu").val() === selCangKu.mc) {
        huanKu.ck_id = selCangKu.id;
    }
    tj.paramters = huanKu;
    var options = {};
    options.url = "/LBStore/huanKu/listHuanKusByPage.do";
    options.tj = tj;
    options.func = jxHuanKu;
    options.ul = "#example";
    queryPaginator(options);
}

function selectHuanKu_m() {
    var huanKu = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#inpSelWz").val() !== "") {
        huanKu.wz = $("#inpSelWz").val();
    }
    if ($("#inpSelState").val() !== '' && $("#inpSelState").val() !== "-9") {
        huanKu.state = parseInt($("#inpSelState").val());
    }
    if ($("#inpSelCk").val() !== "" && $("#inpSelCk").val() === selCangKu.mc) {
        huanKu.ck_id = selCangKu.id;
    }
    if ($("#inpSelQrq").val() !== "") {
        huanKu.qrq = $("#inpSelQrq").val();
    }
    if ($("#inpSelZrq").val() !== "") {
        huanKu.zrq = $("#inpSelZrq").val();
    }
    tj.paramters = huanKu;
    var options = {};
    options.url = "/LBStore/huanKu/listHuanKusByPage.do";
    options.tj = tj;
    options.func = jxHuanKu;
    options.ul = "#example";
    queryPaginator(options);
    $("#huanKuSelectModal").modal("hide");
}

function addHuanKu() {
    optFlag = 1;
    hkmx = [];
    editCangKu = {};
    $("#huanKuModel_title").html("新增还库单");
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
    jxHuanKuMingXi();
    $("#huanKuModal").modal({backdrop:'static'});
}

function editHuanKu(index) {
    optFlag = 2;
    if (huanKus[index] === undefined) {
        optFlag = 1;
        return alert("请选择还库单");
    }
    $("#huanKuModel_title").html("修改还库单");
    $("#btnOk").html("保存");
    $("#divXzmx").show();
    $("#divSpr").hide();
    $(".bb-element").hide();
    var huanKu = huanKus[index];
    editIndex = index;
    selectHuanKuDetail(huanKu.id);
}

function readHuanKu(index) {
    optFlag = 4;
    if (huanKus[index] === undefined) {
        optFlag = 1;
        return alert("请选择还库单");
    }
    $("#huanKuModel_title").html("查看还库单");
    $("#btnOk").html("关闭");
    $("#divXzmx").hide();
    $("#divSpr").show();
    $(".bb-element").show();
    var huanKu = huanKus[index];
    editIndex = index;
    selectHuanKuDetail(huanKu.id);
}

function selectHuanKuDetail(id) {
    $.ajax({
        url: "/LBStore/huanKu/getHuanKuDetailById.do?id=" + id,
        contentType: "application/json",
        type: "get",
        cache: false,
        error: function (msg, textStatus) {
            alert("获取还库单信息失败");
        },
        success: function (json) {
            if (json.result === 0) {
                var huanKu = json.huanKu;
                bbHuanKu = huanKu;
                hkmx = huanKu.details;
                $("#inpCk").val(huanKu.ckmc);
                editCangKu = {"id": huanKu.ck_id, "mc": huanKu.ckmc};
                $("#inpHkr").val(huanKu.hkrmc);
                editA01 = {"id": huanKu.hkr_id, "mc": huanKu.hkrmc};
                selectCangKu(editCangKu);
                $("#inpDh").val(huanKu.dh);
                $("#inpYy").val(huanKu.yy);
                $("#inpBz").val(huanKu.bz);
                $("#inpSl").val(huanKu.sl);
                $("#inpJe").val(huanKu.je);
                $("#inpSj").val(huanKu.sj);
                $("#inpSpr").val(huanKu.sprmc);
                $("#inpSpsj").val(huanKu.spsj);
                jxHuanKuMingXi();
                $("#huanKuModal").modal({backdrop:'static'});
            } else
                alert("获取还库单信息失败:" + json.msg !== undefined ? json.msg : "");
        }
    });
}

function dealHuanKu(index) {
    optFlag = 3;
    if (huanKus[index] === undefined) {
        optFlag = 1;
        return alert("请选择还库单");
    }
    $("#huanKuModel_title").html("办理还库单");
    $("#btnOk").html("办理");
    $("#divXzmx").hide();
    $("#divSpr").hide();
    $(".bb-element").hide();
    var huanKu = huanKus[index];
    editIndex = index;
    selectHuanKuDetail(huanKu.id);
}

function saveHuanKu() {
    if (optFlag === 4) {
        $("#huanKuModal").modal("hide");
        return;
    }
    if (hkmx.length < 1) {
        return alert("请增加还库明细！");
    }
    var huanKu = {};
    var url = "";
    if (optFlag === 3) {
        if (huanKus[editIndex] === undefined) {
            return;
        }
        if (!confirm("确定办理还库单?")) {
            return;
        }
        huanKu = huanKus[editIndex];
        url = "/LBStore/huanKu/dealHuanKu.do";
    } else if (optFlag === 2) {
        if (huanKus[editIndex] === undefined) {
            return;
        }
        huanKu = huanKus[editIndex];
        url = "/LBStore/huanKu/updateHuanKu.do";
    } else if (optFlag === 1) {
        url = "/LBStore/huanKu/saveHuanKu.do";
    }
    if ($("#inpCk").val() === "") {
        return alert("请输入仓库信息");
    } else {
        if ($("#inpCk").val() !== editCangKu.mc) {
            return alert("请输入仓库信息");
        } else {
            huanKu.ck_id = editCangKu.id;
        }
    }
    if ($("#inpHkr").val() === "") {
        return alert("请输入还库人信息");
    } else {
        if ($("#inpHkr").val() !== editA01.mc) {
            return alert("请输入还库人信息");
        } else {
            huanKu.hkr_id = editA01.id;
        }
    }
    var wz = "";
    var wzs = [];
    for (var i = 0; i < hkmx.length; i++) {
        var e = hkmx[i];
        if (e.ck_id !== huanKu.ck_id) {
            return alert("还库明细仓库和还库单仓库不匹配！");
        }
        if (optFlag === 3) {
            if (e.kw === undefined || e.kw === null || e.kw === "") {
                return alert("还库单明细需要设置库位！");
            }
            if (e.dj === undefined || e.dj === null || e.dj === "") {
                return alert("还库单明细需要设置单价！");
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
    huanKu.details = hkmx;
    huanKu.wz = wz;
    huanKu.dh = $("#inpDh").val();
    huanKu.yy = $("#inpYy").val();
    huanKu.bz = $("#inpBz").val();
    huanKu.sl = parseFloat($("#inpSl").val());
    huanKu.je = parseFloat($("#inpJe").val());
    huanKu.sj = $("#inpSj").val();
    huanKu.state = 0;
    var tsStr = optFlag === 3 ? "办理" : "保存";
    $.ajax({
        url: url,
        data: JSON.stringify(huanKu),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert(tsStr + "失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#huanKuModal").modal("hide");
                selectHuanKu();
            } else {
                alert(tsStr + "失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteHuanKu(index) {
    if (huanKus[index] === undefined) {
        return alert("请选择还库单");
    }
    var huanKu = huanKus[index];
    if (confirm("确定删除还库单：" + huanKu.dh + "?")) {
        $.ajax({
            url: "/LBStore/huanKu/deleteHuanKu.do?id=" + huanKu.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectHuanKu();
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
        $("#inpMxHkl").val(dymx_opt.yxData.length);
        $("#inpMxHkzl").val(zl.toFixed(3));
    }
}

function jxHuanKuMingXi() {
    $("#tblWuZiMingXi_body tr").remove();
    $.each(hkmx, function (index, item) { //遍历返回的json
        if (item.tysx && item.tysx !== null && item.tysx !== "" && typeof item.tysx === 'string') {
            item.tysx = JSON.parse(item.tysx);
        } else if (item.tysx && typeof item.tysx === 'object') {

        } else {
            item.tysx = [];
        }
        var je = parseFloat(item.hkl) * parseFloat(item.dj);
        var bj = optFlag === 3 || optFlag === 4 ? '' : '<button class="btn btn-info btn-xs icon-edit" onclick="editHuanKuMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var cz = optFlag === 3 || optFlag === 4 ? '' : '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteHuanKuMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var trStr = '<tr><td>' + item.wzmc + '</td><td>' + item.pp + '</td><td>' + item.xhgg + '</td><td>' + item.hkl + '</td><td>' + je + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-file-alt" onclick="readHuanKuMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + bj
                + cz + '</td></tr>';
        $("#tblWuZiMingXi_body").append(trStr);
    });
}

function addHuanKuMingXi() {
    if ($("#inpCk").val() === "" || $("#inpCk").val() !== editCangKu.mc) {
        return alert("请选择还库仓库");
    }
    optMxFlag = 1;
    dymx_opt = {data: [], yxData: [], func: calcDymx};
    editLeiBie = null;
    $("#huanKuMingXiModal_title").html("增加明细");
    $("#selLingLiaoDetailModal").modal({backdrop:'static'});
}

function editHuanKuMingXi(index) {
    if (hkmx[index]) {
        optMxFlag = 2;
        editMxIndex = index;
        $("#huanKuMingXiModal_title").html("修改明细");
        $("#btnMxOk").html("保存");
        var temp = hkmx[index];
        cxLingLiaoDetailById(temp.lld_id, index);
    }
}

function readHuanKuMingXi(index) {
    if (hkmx[index]) {
        optMxFlag = 4;
        editMxIndex = index;
        $("#huanKuMingXiModal_title").html("查看明细");
        $("#btnMxOk").html("关闭");
        var temp = hkmx[index];
        cxLingLiaoDetailById(temp.lld_id, index);
    }
}

function deleteHuanKuMingXi(index) {
    if (hkmx[index]) {
        if (confirm("确定删除明细：" + hkmx[index].wzmc + "?")) {
            hkmx.splice(index, 1);
            jxHuanKuMingXi();
        }
    }
}

function saveHuanKuMingXi() {
    if (optMxFlag === 4) {
        $("#huanKuMingXiModal").modal("hide");
        return;
    }
    if (!editLeiBie || editLeiBie === null) {
        return alert("物资类别不能为空");
    }
    if ($("#inpMxHkl").val() === "") {
        return alert("请输入还库数量");
    }
    var mx = {};
    if ($("#inpMxWz").val() === "") {
        return alert("请选择库存");
    } else if ($("#inpMxWzbm").val() === "") {
        return alert("请选择库存");
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
    mx.dw = $("#inpMxDw").val();
    mx.jlfs = $("#inpMxJlfs").val();
    mx.bzgg = parseFloat($("#inpMxBzgg").val());
    mx.zldw = $("#inpMxZldw").val();
    mx.kw = $("#inpMxKwh").val();
    mx.dymx = JSON.stringify(dymx_opt.yxData);
    mx.tysx = JSON.stringify(tysx_opt.data);
    mx.hkl = parseFloat($("#inpMxHkl").val());
    mx.hkzl = parseFloat($("#inpMxHkzl").val());
    if(mx.jlfs === "pt"){
        mx.hkzl = mx.hkl;
    }else{
        if (mx.hkzl === undefined || mx.hkzl === "" || mx.hkzl < 0.001) {
            mx.hkzl = mx.hkl;
        }
    }
    mx.lld_id = curLingLiaoDetail.id;
    mx.kc_id = curLingLiaoDetail.kc_id;
    mx.gys_id = curLingLiaoDetail.gys_id;
    mx.ck_id = curLingLiaoDetail.ck_id;
    if (optMxFlag === 1) {
        hkmx.push(mx);
    } else if (optMxFlag === 2) {
        hkmx[editMxIndex] = mx;
    }
    jxHuanKuMingXi();
    var zsl = 0;
    var zje = 0;
    for (var i = 0; i < hkmx.length; i++) {
        var e = hkmx[i];
        zsl = e.hkl + zsl;
        zje = e.hkl * e.dj + zje;
    }
    $("#inpSl").val(zsl);
    $("#inpJe").val(zje.toFixed(3));
    $("#huanKuMingXiModal").modal("hide");
    curLingLiaoDetail = null;
}

function cxLingLiaoDetail() {
    var lingLiaoDetail = {};
    lingLiaoDetail.ck_id = editCangKu.id;
    if ($("#inpLldSelWzlb").val() !== "" && $("#inpLldSelWzlb").val() === selLeiBie.mc) {
        lingLiaoDetail.wzlb_id = selLeiBie.id;
    }
    if ($("#inpLldSelWz").val() !== "") {
        lingLiaoDetail.wzmc = $("#inpLldSelWz").val();
    }
    if ($("#inpLldSelXhgg").val() !== "") {
        lingLiaoDetail.xhgg = $("#inpLldSelXhgg").val();
    }
    if ($("#inpLldSelKh").val() !== "" && $("#inpLldSelKh").val() === selKeHu.mc) {
        lingLiaoDetail.kh_id = selKeHu.id;
    }
    if ($("#inpLldSelGys").val() !== "" && $("#inpLldSelGys").val() === selGongYingShang.mc) {
        lingLiaoDetail.gys_id = selGongYingShang.id;
    }
    if ($("#inpLldSelLlr").val() !== "" && $("#inpLldSelLlr").val() === selA01.mc) {
        lingLiaoDetail.llr_id = selA01.id;
    }
    if ($("#inpLldSelQrq").val() !== "") {
        lingLiaoDetail.qrq = $("#inpLldSelQrq").val();
    }
    if ($("#inpLldSelZrq").val() !== "") {
        lingLiaoDetail.zrq = $("#inpLldSelZrq").val();
    }
    if ($("#inpLldSelLsh").val() !== "") {
        lingLiaoDetail.lsh = $("#inpLldSelLsh").val();
    }
    if ($("#inpLldSelTxm").val() !== "") {
        lingLiaoDetail.txm = $("#inpLldSelTxm").val();
    }
    $.ajax({
        url: "/LBStore/lingLiao/getLingLiaoDetailTop100.do?",
        data: JSON.stringify(lingLiaoDetail),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("查询领料失败");
        },
        success: function (json) {
            if (json.result === 0) {
                var sz = json.sz;
                jxLingLiaoDetail(sz);
            } else {
                alert("查询领料失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function jxLingLiaoDetail(sz) {
    $("#tblLingLiaoDetail_body tr").remove();
    lingLiaoDetails = [];
    lingLiaoDetails = sz;
    $.each(sz, function (index, item) { //遍历返回的json
        var trStr = '<tr><td>' + item.lsh + '</td><td>' + item.wzmc + '</td><td>' + item.pp + '</td><td>' + item.xhgg + '</td><td>' + item.slzl + '</td><td>' + item.sj + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-plus" onclick="selLingLiaoDetail(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#tblLingLiaoDetail_body").append(trStr);
    });
}

function selLingLiaoDetail(index) {
    curLingLiaoDetail = null;
    if (lingLiaoDetails.length <= index) {
        return;
    }
    var detail = lingLiaoDetails[index];
    for (var i = 0; i < hkmx.length; i++) {
        var e = hkmx[i];
        if (e.kc_id === detail.id) {
            return alert("该领料物资已选择");
        }
    }
    setLldData(detail);
}

function setLldData(detail, index) {
    curLingLiaoDetail = detail;
    var m = hkmx[index];
    m = m ? m : {};
    if (m.dymx) {
        if(typeof m.dymx === "string"){
            m.dymx = JSON.parse(m.dymx);
        }
    } else {
        m.dymx = [];
    }
    m.hkl = m.hkl ? m.hkl : 0;
    m.hkzl = m.hkzl ? m.hkzl : 0;
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
    $("#inpMxBzrq").val(getAddDate(detail.scrq,detail.bzq));
    $("#inpMxDj").val(detail.dj);
    $("#inpMxDw").val(detail.dw);
    $("#inpMxSl").val(detail.sl);
    $("#inpMxJlfs").val(detail.jlfs);
    $("#inpMxBzgg").val(detail.bzgg);
    $("#inpMxSll").val(detail.sll);
    $("#inpMxSlzlDw").val(detail.zldw);
    $("#inpMxSlzl").val(detail.slzl);
    $("#inpMxKwh").val(detail.kw);
    $("#inpMxLlr").val(detail.llrmc);
    buildTysx(detail.tysx);
    $("#inpMxHkl").val(m.hkl);
    $("#inpMxHkzl").val(m.hkzl);
    buildDymx();
    if (detail.jlfs === "mx") {
        $("#divMxDymx").show();
    } else {
        $("#divMxDymx").hide();
    }
    selectMxJlfs();
    $("#selLingLiaoDetailModal").modal("hide");
    $("#huanKuMingXiModal").modal({backdrop:'static'});
}

function cxLingLiaoDetailById(id, index) {
    $.ajax({
        url: "/LBStore/lingLiao/getLingLiaoDetailById.do?id=" + id,
        contentType: "application/json",
        type: "get",
        cache: false,
        error: function (msg, textStatus) {
            alert("查询领料失败");
        },
        success: function (json) {
            if (json.result === 0) {
                var lld = json.lingLiaoDetail;
                setLldData(lld, index);
            } else {
                alert("查询领料失败:" + json.msg ? json.msg : "");
            }
        }
    });
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
