var ruKus;
var bbRuKu;
var ruKuFeis;
var feiOptFlag = -1;
var optFlag = 1;
var editIndex = -1;
var editType;
var rkmx = [];
var optMxFlag = 1;
var editMxIndex = -1;
var editFeiIndex = -1;
var tgIndex = 0;
var selWzzd;
var editWzzd;
var editXhgg;
var editLeiBie;
var selCangKu;
var selKeHu;
var editKeHu;
var selKuWei;
var selGongYingShang;
var editGongYingShang;
var editCangKu;
var editA01;
var editFeiA01;
var dymx_opt = {data: [], yxData: [], func: calcDymx};
var tysx_opt = {data: [], ls: 2, lw: 70};

$(document).ready(function () {
    $('#inpSj').val(dateFormat(new Date()));
    $('#inpSj,#inpFeiRq').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd hh:ii', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, startView: 2, forceParse: 0, showMeridian: 1});
    $('#inpSelQrq,#inpSelZrq,#inpMxScrq').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, minView: 2, startView: 2, forceParse: 0, showMeridian: 1});
    getAllA01s(setTrager_a01);
    getCangKus(setTrager_cangKu);
    getKeHus(setTrager_keHu);
    getGongYingShangs(setTrager_gongYingShang);
    getWuZiZiDians(setTrager_ziDian);
    getWuZiLeiBies(setTrager_leiBie);
    $("#inpMxScrq").datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, minView: 2, startView: 2, forceParse: 0, showMeridian: 1});
    $("#inpMxJlfs").change(function () {
        $("#tblMxDymx input:last").blur();
        selectMxJlfs();
    });
    $(".rk_kh").hide();
    $("#inpLy").change(function () {
        if ($("#inpLy").val() === "供应商") {
            $(".rk_gys").removeAttr("disabled").show();
            $(".rk_kh").hide();
        } else if ($("#inpLy").val() === "客户") {
            $(".rk_gys").hide();
            $(".rk_kh").show();
        } else {
            $(".rk_gys").val("").attr("disabled", "disabled").show();
            $(".rk_kh").hide();
        }
    });
});

function refreshWuZiZiDian(){
    getWuZiZiDians(setTrager_ziDian);
}

function setTrager_a01() {
    $('#inpRkr').AutoComplete({'data': lb_allA01s, 'paramName': 'editA01'});
    $('#inpFeiSkr').AutoComplete({'data': lb_allA01s, 'paramName': 'editFeiA01'});
}

function setTrager_cangKu() {
    $('#selCangKu').AutoComplete({'data': lb_cangKus, 'paramName': 'selCangKu'});
    $('#inpSelCk').AutoComplete({'data': lb_cangKus, 'paramName': 'selCangKu'});
    $('#inpCk').AutoComplete({'data': lb_cangKus, 'afterSelectedHandler': selectCangKu});
}

function setTrager_keHu() {
    $('#inpSelKh').AutoComplete({'data': lb_keHus, 'paramName': 'selKeHu'});
    $('#inpKh').AutoComplete({'data': lb_keHus, 'paramName': 'editKeHu'});
}

function setTrager_gongYingShang() {
    $('#inpSelGys').AutoComplete({'data': lb_gongYingShangs, 'paramName': 'selGongYingShang'});
    $('#inpGys').AutoComplete({'data': lb_gongYingShangs, 'paramName': 'editGongYingShang'});
}

function setTrager_ziDian() {
    $('#inpSelWz').AutoComplete({'data': lb_wuZiZiDians, 'paramName': 'selWzzd'});
    $('#selWzmc').AutoComplete({'data': lb_wuZiZiDians});
    $('#inpMxWz').AutoComplete({'data': lb_wuZiZiDians, 'afterSelectedHandler': selectWuZiZiDian});
    var temp_wuZiZiDians = $.extend(true, [], lb_wuZiZiDians);
    $('#inpMxWzbm').AutoComplete({'data': temp_wuZiZiDians, 'fieldName':'bm', 'afterSelectedHandler': selectWuZiZiDian});
}

function setTrager_leiBie() {
    $('#inpMxLb').AutoComplete({'data': lb_wuZiLeiBies, 'afterSelectedHandler': selectWuZiLeiBie});
}

function selectWuZiLeiBie(json) {
    editLeiBie = json;
    $("#inpMxLb").val(editLeiBie.mc);
    if (editLeiBie.tysx && editLeiBie.tysx !== null && editLeiBie.tysx !== "") {
        editLeiBie.tysx = JSON.parse(editLeiBie.tysx);
    } else {
        editLeiBie.tysx = [];
    }
    buildTysx(editLeiBie.tysx);
}

function selectRuKu_m() {
    $("#ruKuSelectModal").modal({backdrop:'static'});
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
        selectRuKuDetailsTop100(json.id);
    } else {
        $('#inpMxXhgg').AutoComplete({'data': [], 'paramName': 'editXhgg'});
    }
}

function selectCangKu(json) {
    var id = json.id;
    $.ajax({
        url: "/LBStore/cangKu/getCangKuById.do?id=" + id,
        contentType: "application/json",
        type: "get",
        cache: false,
        error: function (msg, textStatus) {
            alert("获取仓库信息失败");
        },
        success: function (json) {
            if (json.result === 0) {
                editCangKu = json.cangKu;
                setCangKuKuWei();
            }
        }
    });
}

function selectRuKuDetailsTop100(id) {
    $.ajax({
        url: "/LBStore/ruKu/getRuKuByWzid_100.do?id=" + id,
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
    if (typeof m.dymx === "string") {
        m.dymx = JSON.parse(m.dymx);
    }
    dymx_opt = {data: [], yxData: [], func: calcDymx};
    editWzzd = {"id": m.wzzd_id, "mc": m.wzmc};
    editLeiBie = {"id": m.wzlb_id, "mc": m.wzlb};
    $("#inpMxPp").val(m.pp);
    editXhgg = {"id": m.xhgg_id, "mc": m.xhgg};
    $("#inpMxXhgg").val(m.xhgg);
    $("#inpMxScc").val(m.scc);
    $("#inpMxBz").val(m.bz);
    $("#inpMxTxm").val(m.txm);
    $("#inpMxPc").val(m.pc);
    $("#inpMxScrq").val(m.scrq);
    $("#inpMxBzq").val(m.bzq);
    $("#inpMxDj").val(m.dj);
    $("#inpMxDw").val(m.dw);
    $("#inpMxSl").val(m.sl);
    $("#inpMxJlfs").val(m.jlfs);
    $("#inpMxBzgg").val(m.bzgg);
    $("#inpMxZldw").val(m.zldw);
    $("#inpMxZl").val(m.zl);
    $("#inpMxKwh").val(m.kw);
    buildTysx(m.tysx);
    buildDymx();
    if (m.jlfs === "mx") {
        $("#divMxDymx").show();
    } else {
        $("#divMxDymx").hide();
    }
}

function setCangKuKuWei() {
    for (var i = 0; i < editCangKu.kws.length; i++) {
        var e = editCangKu.kws[i];
        e.id = i + 1;
    }
    selKuWei = null;
    $('#inpMxKw').AutoComplete({'data': editCangKu.kws, 'paramName': 'selKuWei', 'afterSelectedHandler': setKuWeiHao});
}

function setKuWeiHao(json) {
    var array = getKuWeiHao(json.mc, json.qsh, json.jsh);
    $('#inpMxKwh').AutoComplete({'data': array});
}

function selectMxJlfs() {
    var val = $("#inpMxJlfs").val();
    $("#dvMxBzgg").hide();
    $("#dvMxZl").hide();
    $("#divMxDymx").hide();
    if (val === "zl") {
        $("#dvMxBzgg").show();
        $("#dvMxZl").show();
    } else if (val === "mx") {
        $("#dvMxBzgg").val("1").show();
        $("#dvMxZl").show();
        $("#divMxDymx").show();
        if ($("#dvMxBzgg").val() === "") {
            $("#dvMxBzgg").val(1);
        }
        buildDymx();
    }
}

function jxRuKu(json) {
    $("#data_table_body tr").remove();
    ruKus = [];
    ruKus = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if (item.state === -1) {
            classStr = ' class="danger"';
        }
        item.lsh = item.lsh === undefined || item.lsh === null ? "" : item.lsh;
        item.gysmc = item.gysmc === undefined || item.gysmc === null ? "" : item.gysmc;
        item.khmc = item.khmc === undefined || item.khmc === null ? "" : item.khmc;
        var readStr = '<button class="btn btn-info btn-xs icon-file-alt" onclick="readRuKu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var editStr = '<button class="btn btn-info btn-xs icon-edit" onclick="editRuKu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var dealStr = '<button class="btn btn-info btn-xs icon-legal" onclick="dealRuKu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var delStr = '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteRuKu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var feiStr = '<button class="btn btn-info btn-xs icon-money" onclick="feiRuKu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var trStr = '<tr' + classStr + '><td>' + item.ckmc + '</td><td>' + item.lsh + '</td><td>' + item.gysmc + '</td><td>' + item.khmc + '</td><td>' + item.wz + '</td><td>' + item.sj + '</td><td>' + item.sl + '</td><td>'
                + readStr
                + (item.state === 0 ? editStr : "")
                + (item.state === 0 ? dealStr : "")
                + (item.state === 0 || item.state === -1 ? delStr : "")
                + (item.state > 0 ? feiStr : "")
                + '</td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function showSelectRuKu() {
    $("#ruKuSelectModal").modal({backdrop:'static'});
}

function selectRuKu() {
    var ruKu = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selLsh").val() !== "") {
        ruKu.lsh = $("#selLsh").val();
    }
    if ($('#selWzmc').val() !== "") {
        ruKu.wz = $('#selWzmc').val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        ruKu.state = $("#selState").val();
    }
    if ($("#selCangKu").val() !== "" && $("#selCangKu").val() === selCangKu.mc) {
        ruKu.ck_id = selCangKu.id;
    }
    tj.paramters = ruKu;
    var options = {};
    options.url = "/LBStore/ruKu/listRuKusByPage.do";
    options.tj = tj;
    options.func = jxRuKu;
    options.ul = "#example";
    queryPaginator(options);
}

function selectRuKu_m() {
    var ruKu = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#inpSelWz").val() !== "") {
        ruKu.wz = $("#inpSelWz").val();
    }
    if ($("#inpSelState").val() !== '' && $("#inpSelState").val() !== "-9") {
        ruKu.state = $("#inpSelState").val();
    }
    if ($("#inpSelCk").val() !== "" && $("#inpSelCk").val() === selCangKu.mc) {
        ruKu.ck_id = selCangKu.id;
    }
    if ($("#inpSelKh").val() !== "" && $("#inpSelKh").val() === selKeHu.mc) {
        ruKu.kh_id = selKeHu.id;
    }
    if ($("#inpSelGys").val() !== "" && $("#inpSelGys").val() === selGongYingShang.mc) {
        ruKu.gys_id = selGongYingShang.id;
    }
    if ($("#inpSelQrq").val() !== "") {
        ruKu.qrq = $("#inpSelQrq").val();
    }
    if ($("#inpSelZrq").val() !== "") {
        ruKu.zrq = $("#inpSelZrq").val();
    }
    tj.paramters = ruKu;
    var options = {};
    options.url = "/LBStore/ruKu/listRuKusByPage.do";
    options.tj = tj;
    options.func = jxRuKu;
    options.ul = "#example";
    queryPaginator(options);
    $("#ruKuSelectModal").modal("hide");
}

function addRuKu() {
    optFlag = 1;
    rkmx = [];
    editCangKu = {};
    editGongYingShang = {};
    editKeHu = {};
    $("#ruKuModel_title").html("新增入库单");
    $("#btnOk").html("保存");
    $("#divXzmx").show();
    $("#dvMxCanKao").show();
    $("#divSpr").hide();
    $("#inpGys").val("");
    $("#inpKh").val("");
    $("#inpDh").val("");
    $("#inpBz").val("");
    $("#inpSl").val(0);
    $("#inpJe").val(0);
    jxRuKuMingXi();
    $("#ruKuModal").modal({backdrop:'static'});
}

function editRuKu(index) {
    optFlag = 2;
    if (ruKus[index] === undefined) {
        optFlag = 1;
        return alert("请选择入库单");
    }
    $("#ruKuModel_title").html("修改入库单");
    $("#btnOk").html("保存");
    $("#divXzmx").show();
    $("#dvMxCanKao").show();
    $("#divSpr").hide();
    var ruKu = ruKus[index];
    editIndex = index;
    selectRuKuDetail(ruKu.id, jxReadRuKu);
}

function readRuKu(index) {
    optFlag = 4;
    if (ruKus[index] === undefined) {
        optFlag = 1;
        return alert("请选择入库单");
    }
    $("#ruKuModel_title").html("查看入库单");
    $("#btnOk").html("关闭");
    $("#divXzmx").hide();
    $("#divSpr").show();
    var ruKu = ruKus[index];
    editIndex = index;
    $("#dvMxCanKao").hide();
    selectRuKuDetail(ruKu.id, jxReadRuKu);
}

function jxReadRuKu(ruKu) {
    bbRuKu = ruKu;
    rkmx = ruKu.details;
    if ("供应商" === ruKu.ly) {
        $("#inpGys").val(ruKu.gysmc);
        editGongYingShang = {"id": ruKu.gys_id, "mc": ruKu.gysmc};
    } else if ("客户" === ruKu.ly) {
        $("#inpKh").val(ruKu.khmc);
        editKeHu = {"id": ruKu.kh_id, "mc": ruKu.khmc};
    } else if ("生产" === ruKu.ly) {
        $(".rk_gys").val("").attr("disabled", "disabled").show();
        $(".rk_kh").hide();
    }
    $("#inpCk").val(ruKu.ckmc);
    editCangKu = {"id": ruKu.ck_id, "mc": ruKu.ckmc};
    $("#inpRkr").val(ruKu.rkrmc);
    editA01 = {"id": ruKu.rkr_id, "mc": ruKu.rkrmc};
    selectCangKu(editCangKu);
    $("#inpDh").val(ruKu.dh);
    $("#inpBz").val(ruKu.bz);
    $("#inpSl").val(ruKu.sl);
    $("#inpJe").val(ruKu.je);
    $("#inpSj").val(ruKu.sj);
    $("#inpSpr").val(ruKu.sprmc);
    $("#inpSpsj").val(ruKu.spsj);
    jxRuKuMingXi();
    $("#ruKuModal").modal({backdrop:'static'});
}

function selectRuKuDetail(id, func) {
    $.ajax({
        url: "/LBStore/ruKu/getRuKuWithDetailById.do?id=" + id,
        contentType: "application/json",
        type: "get",
        cache: false,
        error: function (msg, textStatus) {
            alert("获取入库单信息失败");
        },
        success: function (json) {
            if (json.result === 0) {
                if (func) {
                    func(json.ruKu);
                }
            } else
                alert("获取入库单信息失败:" + json.msg !== undefined ? json.msg : "");
        }
    });
}

function dealRuKu(index) {
    optFlag = 3;
    if (ruKus[index] === undefined) {
        optFlag = 1;
        return alert("请选择入库单");
    }
    $("#ruKuModel_title").html("办理入库单");
    $("#btnOk").html("办理");
    $("#divXzmx").hide();
    $("#divSpr").hide();
    $("#dvMxCanKao").hide();
    var ruKu = ruKus[index];
    editIndex = index;
    selectRuKuDetail(ruKu.id,jxReadRuKu);
}

function saveRuKu() {
    if (optFlag === 4) {
        $("#ruKuModal").modal("hide");
        return;
    }
    if (rkmx.length < 1) {
        return alert("请增加入库明细！");
    }
    var ruKu = {};
    var url = "";
    if (optFlag === 3) {
        if (ruKus[editIndex] === undefined) {
            return;
        }
        if (!confirm("确定办理入库单?")) {
            return;
        }
        ruKu = ruKus[editIndex];
        url = "/LBStore/ruKu/dealRuKu.do";
    } else if (optFlag === 2) {
        if (ruKus[editIndex] === undefined) {
            return;
        }
        ruKu = ruKus[editIndex];
        url = "/LBStore/ruKu/updateRuKu.do";
    } else if (optFlag === 1) {
        url = "/LBStore/ruKu/saveRuKu.do";
    }
    if ($("#inpCk").val() === "") {
        return alert("请输入仓库信息");
    } else {
        if ($("#inpCk").val() !== editCangKu.mc) {
            return alert("请输入仓库信息");
        } else {
            ruKu.ck_id = editCangKu.id;
        }
    }
    ruKu.ly = $("#inpLy").val();
    if ("供应商" === $("#inpLy").val()) {
        if ($("#inpGys").val() === "") {
            return alert("请输入供应商信息");
        } else {
            if ($("#inpGys").val() !== editGongYingShang.mc) {
                return alert("请输入供应商信息");
            } else {
                ruKu.gys_id = editGongYingShang.id;
            }
        }
    } else if ("客户" === $("#inpLy").val()) {
        if ($("#inpKh").val() === "") {
            return alert("请输入客户信息");
        } else {
            if ($("#inpKh").val() !== editKeHu.mc) {
                return alert("请输入客户信息");
            } else {
                ruKu.kh_id = editKeHu.id;
            }
        }
    }
    if ($("#inpRkr").val() === "") {
        return alert("请输入入库人信息");
    } else {
        if ($("#inpRkr").val() !== editA01.mc) {
            return alert("请输入入库人信息");
        } else {
            ruKu.rkr_id = editA01.id;
        }
    }
    if ($("#inpDh").val() === "") {
        return alert("请输入入库单号，可用于下次录入相同物资入库，可节省部分信息录入");
    }
    var wz = "";
    var wzs = [];
    for (var i = 0; i < rkmx.length; i++) {
        var e = rkmx[i];
        if (optFlag === 3) {
            if (e.kw === undefined || e.kw === null || e.kw === "") {
                return alert("入库单明细需要设置库位！");
            }
            if (e.dj === undefined || e.dj === null || e.dj === "") {
                return alert("入库单明细需要设置单价！");
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
    ruKu.details = rkmx;
    ruKu.wz = wz;
    ruKu.dh = $("#inpDh").val();
    ruKu.bz = $("#inpBz").val();
    ruKu.sl = $("#inpSl").val();
    ruKu.je = $("#inpJe").val();
    ruKu.sj = $("#inpSj").val();
    ruKu.state = 0;
    var tsStr = optFlag === 3 ? "办理" : "保存";
    $.ajax({
        url: url,
        data: JSON.stringify(ruKu),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert(tsStr + "失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#ruKuModal").modal("hide");
                selectRuKu();
            } else {
                alert(tsStr + "失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteRuKu(index) {
    if (ruKus[index] === undefined) {
        return alert("请选择入库单");
    }
    var ruKu = ruKus[index];
    if (confirm("确定删除入库单：" + ruKu.wz + "?")) {
        $.ajax({
            url: "/LBStore/ruKu/deleteRuKu.do?id=" + ruKu.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectRuKu();
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
    $("#tblMxDymx").setDetailTable(dymx_opt);
    $("#tblMxDymx input:last").focus();
}

function calcDymx() {
    if (dymx_opt.yxData) {
        var zl = 0;
        for (var i = 0; i < dymx_opt.yxData.length; i++) {
            zl += parseFloat(dymx_opt.yxData[i].val);
        }
        $("#inpMxSl").val(dymx_opt.yxData.length);
        $("#inpMxZl").val(zl.toFixed(3));
    }
}

function jxRuKuMingXi() {
    $("#tblWuZiMingXi_body tr").remove();
    $.each(rkmx, function (index, item) { //遍历返回的json
        if (item.tysx && item.tysx !== null && item.tysx !== "" && typeof item.tysx === 'string') {
            item.tysx = JSON.parse(item.tysx);
        } else if (item.tysx && typeof item.tysx === 'object') {

        } else {
            item.tysx = [];
        }
        var je = parseFloat(item.sl) * parseFloat(item.dj);
        var bj = optFlag === 4 ? '' : '<button class="btn btn-info btn-xs icon-edit" onclick="editRuKuMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var cz = optFlag === 3 || optFlag === 4 ? '' : '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteRuKuMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var trStr = '<tr><td>' + item.wzmc + '</td><td>' + item.pp + '</td><td>' + item.xhgg + '</td><td>' + item.sl + '</td><td>' + je + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-file-alt" onclick="readRuKuMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + bj
                + cz + '</td></tr>';
        $("#tblWuZiMingXi_body").append(trStr);
    });
}

function addRuKuMingXi() {
    optMxFlag = 1;
    dymx_opt = {data: [], yxData: [], func: calcDymx};
    editLeiBie = null;
    $("#ruKuMingXiModal_title").html("增加明细");
    $("#btnMxOk").html("保存");
    $("#inpMxWz").val("");
    $("#inpMxWzbm").val("");
    $("#inpMxLb").val("");
    $("#inpMxPp").val("");
    $("#inpMxXhgg").val("");
    $("#inpMxScc").val("");
    $("#inpMxBz").val("");
    $("#inpMxTxm").val("");
    $("#inpMxPc").val("");
    $("#inpMxScrq").val("");
    $("#inpMxBzq").val("0");
    $("#inpMxDj").val("1");
    $("#inpMxDw").val("");
    $("#inpMxSl").val("0");
    $("#inpMxJlfs").val("pt");
    $("#inpMxBzgg").val("");
    $("#inpMxZldw").val("");
    $("#inpMxZl").val("");
    buildTysx([]);
    buildDymx();
    $("#divMxDymx").hide();
    $("#dvMxBzgg").hide();
    $("#dvMxZl").hide();
    $("#ruKuMingXiModal").modal({backdrop:'static'});
}

function editRuKuMingXi(index) {
    if (rkmx[index]) {
        optMxFlag = 2;
        editMxIndex = index;
        $("#ruKuMingXiModal_title").html("修改明细");
        $("#btnMxOk").html("保存");
        setRuKuMingXiData(index);
    }
}

function readRuKuMingXi(index) {
    if (rkmx[index]) {
        optMxFlag = 4;
        editMxIndex = index;
        $("#ruKuMingXiModal_title").html("查看明细");
        $("#btnMxOk").html("关闭");
        setRuKuMingXiData(index);
    }
}

function setRuKuMingXiData(index) {
    var m = rkmx[index];
    if (typeof m.dymx === "string") {
        m.dymx = JSON.parse(m.dymx);
    }
    dymx_opt = {data: [], yxData: m.dymx, func: calcDymx};
    editWzzd = {"id": m.wzzd_id, "mc": m.wzmc, "bm":m.wzbm};
    $("#inpMxWz").val(m.wzmc);
    $("#inpMxWzbm").val(m.wzbm);
    editLeiBie = {"id": m.wzlb_id, "mc": m.wzlb};
    $("#inpMxLb").val(m.wzlb);
    $("#inpMxPp").val(m.pp);
    editXhgg = {"id": m.xhgg_id, "mc": m.xhgg};
    $("#inpMxXhgg").val(m.xhgg);
    $("#inpMxScc").val(m.scc);
    $("#inpMxBz").val(m.bz);
    $("#inpMxTxm").val(m.txm);
    $("#inpMxPc").val(m.pc);
    $("#inpMxScrq").val(m.scrq);
    $("#inpMxBzq").val(m.bzq);
    $("#inpMxDj").val(m.dj);
    $("#inpMxDw").val(m.dw);
    $("#inpMxSl").val(m.sl);
    $("#inpMxJlfs").val(m.jlfs);
    $("#inpMxBzgg").val(m.bzgg);
    $("#inpMxZldw").val(m.zldw);
    $("#inpMxZl").val(m.zl);
    $("#inpMxKwh").val(m.kw);
    buildTysx(m.tysx);
    buildDymx();
    if (rkmx[index].jlfs === "mx") {
        $("#divMxDymx").show();
    } else {
        $("#divMxDymx").hide();
    }
    if (m.jlfs === "zl" || m.jlfs === "mx") {
        $("#dvMxBzgg").show();
        $("#dvMxZl").show();
    } else {
        $("#dvMxBzgg").hide();
        $("#dvMxZl").hide();
    }
    $("#ruKuMingXiModal").modal({backdrop:'static'});
}

function deleteRuKuMingXi(index) {
    if (rkmx[index]) {
        if (confirm("确定删除明细：" + rkmx[index].wzmc + "?")) {
            rkmx.splice(index, 1);
            jxRuKuMingXi();
        }
    }
}

function resetRuKuMingXi() {
    addRuKuMingXi();
}

function saveRuKuMingXi() {
    if (optMxFlag === 4) {
        $("#ruKuMingXiModal").modal("hide");
        return;
    }
    if (!editLeiBie || editLeiBie === null) {
        return alert("物资类别不能为空");
    }
    if ($("#inpMxSl").val() === "") {
        return alert("请输入物资名称");
    }
    var mx = {};
    if (optFlag === 3) {
        mx = rkmx[editMxIndex];
    }
    if ($("#inpMxWz").val() === "") {
        return alert("请输入物资名称");
    } else if ($("#inpMxWzbm").val() === "") {
        return alert("请输入物资编码");
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
    if ($("#inpMxDw").val() === '') {
        return alert("请输入单位");
    }
    if ($("#inpMxBzq").val() === '') {
        mx.bzq = -1;
    } else {
        mx.bzq = parseInt($("#inpMxBzq").val());
    }
    mx.xhgg = $("#inpMxXhgg").val();
    mx.scc = $("#inpMxScc").val();
    mx.bz = $("#inpMxBz").val();
    mx.txm = $("#inpMxTxm").val();
    mx.pc = $("#inpMxPc").val();
    mx.scrq = $("#inpMxScrq").val();
    mx.dj = parseFloat($("#inpMxDj").val());
    mx.dw = $("#inpMxDw").val();
    mx.sl = parseFloat($("#inpMxSl").val());
    mx.jlfs = $("#inpMxJlfs").val();
    mx.bzgg = $("#inpMxBzgg").val();
    mx.zldw = $("#inpMxZldw").val();
    mx.zl = $("#inpMxZl").val();
    mx.kw = $("#inpMxKwh").val();
    mx.dymx = JSON.stringify(dymx_opt.yxData);
    mx.tysx = JSON.stringify(tysx_opt.data);
    if("pt" === $("#inpMxJlfs").val()){
        mx.zl = mx.sl;
    }
    if (optMxFlag === 1) {
        rkmx.push(mx);
    } else if (optMxFlag === 2) {
        rkmx[editMxIndex] = mx;
    }
    jxRuKuMingXi();
    var zsl = 0;
    var zje = 0;
    for (var i = 0; i < rkmx.length; i++) {
        var e = rkmx[i];
        zsl = e.sl + zsl;
        zje = e.sl * e.dj + zje;
    }
    $("#inpSl").val(zsl);
    $("#inpJe").val(zje.toFixed(3));
    $("#ruKuMingXiModal").modal("hide");
}

function feiRuKu(index) {
    $("#tblRuKuFei_body tr").remove();
    if (ruKus[index] === undefined) {
        return alert("请选择发货单");
    }
    editIndex = index;
    var ruKu = ruKus[index];
    selectRuKuDetail(ruKu.id, selectRuKuFei);
}

function jxRuKuFei(json) {
    $("#tblRuKuFei_body tr").remove();
    ruKuFeis = [];
    ruKuFeis = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var trStr = '<tr><td>' + item.rq + '</td><td>' + item.je + '</td><td>' + item.skrmc + '</td><td>' + item.bz + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editRuKuFei(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="delRuKuFei(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#tblRuKuFei_body").append(trStr);
    });
}

function selectRuKuFei(json) {
    curRuKu = json;
    var jexx = "总金额：￥" + curRuKu.je + "&ensp;&ensp;&ensp;&ensp;已付：￥" + curRuKu.yfje + "&ensp;&ensp;&ensp;&ensp;待付：<span style='color:red'>￥" + curRuKu.dfje + "</span>";
    $("#ruKuJexx").html(jexx);
    var ruKuFei = {};
    var tj = {"pageSize": 10, "currentPage": 1};
    ruKuFei.rk_id = json.id;
    tj.paramters = ruKuFei;
    var options = {};
    options.url = "/LBStore/ruKu/listRuKuFeisByPage.do";
    options.tj = tj;
    options.func = jxRuKuFei;
    options.ul = "#example2";
    queryPaginator(options);
    $("#ruKuFeiModal").modal({backdrop:'static'});
}

function addRuKuFei(type) {
    feiOptFlag = 1;
    if (!curRuKu) {
        return;
    }
    editFeiA01 = undefined;
    $("#ruKuFeiEditModel_title").html("新增记录");
    if (type === 1) {
        $("#inpFeiRq").val(dateFormat_f(new Date()));
        $("#inpFeiJe").val(curRuKu.dfje);
        $("#inpFeiSkr").val("");
        $("#inpFeiBz").val("");
    } else {
        $("#inpFeiRq").val(dateFormat_f(new Date()));
        $("#inpFeiJe").val(0);
        $("#inpFeiSkr").val("");
        $("#inpFeiBz").val("");
    }
    $("#ruKuFeiEditModal").modal({backdrop:'static'});
}

function editRuKuFei(index) {
    if (!curRuKu) {
        return;
    }
    feiOptFlag = 2;
    if (ruKuFeis[index] === undefined) {
        feiOptFlag = 1;
        return alert("请选择记录");
    }
    var ruKuFei = ruKuFeis[index];
    editFeiIndex = index;
    editFeiA01 = {id: ruKuFei.skr_id, mc: ruKuFei.skrmc};
    $("#ruKuFeiEditModel_title").html("修改记录");
    $("#inpFeiRq").val(ruKuFei.rq);
    $("#inpFeiJe").val(ruKuFei.je);
    $("#inpFeiSkr").val(ruKuFei.skrmc);
    $("#inpFeiBz").val(ruKuFei.bz);
    $("#ruKuFeiEditModal").modal({backdrop:'static'});
}

function checkFei(type, index, je) {
    var zje = 0;
    if (type === 1) {
        for (var i = 0; i < ruKuFeis.length; i++) {
            zje = zje + ruKuFeis[i].je;
        }
    } else if (type === 2) {
        for (var i = 0; i < ruKuFeis.length; i++) {
            if (i !== index) {
                zje = zje + ruKuFeis[i].je;
            }
        }
    }
    zje = zje + je;
    if (zje > curRuKu.je) {
        alert("付款金额超过了订单金额");
        return false;
    }
    return true;
}

function saveRuKuFei() {
    if (!curRuKu) {
        return;
    }
    var ruKuFei = {};
    var url = "";
    var je = parseFloat($("#inpFeiJe").val());
    if (feiOptFlag === 2) {
        if (ruKuFeis[editFeiIndex] === undefined) {
            return;
        }
        ruKuFei = ruKuFeis[editFeiIndex];
        url = "/LBStore/ruKu/updateRuKuFei.do";
    } else if (feiOptFlag === 1) {
        url = "/LBStore/ruKu/saveRuKuFei.do";
        ruKuFei.rk_id = curRuKu.id;

    }
    if (!checkFei(feiOptFlag, editFeiIndex, je)) {
        return;
    }
    if (!editFeiA01 || editFeiA01.mc === '' || editFeiA01.mc !== $("#inpFeiSkr").val()) {
        return alert("请选择收款人");
    }
    ruKuFei.rq = $("#inpFeiRq").val();
    ruKuFei.je = je;
    ruKuFei.skr_id = editFeiA01.id;
    ruKuFei.kh_id = curRuKu.kh_id;
    ruKuFei.gys_id = curRuKu.gys_id;
    ruKuFei.bz = $("#inpFeiBz").val();
    $.ajax({
        url: url,
        data: JSON.stringify(ruKuFei),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#ruKuFeiEditModal").modal("hide");
                selectRuKuDetail(curRuKu.id, selectRuKuFei);
            } else {
                alert("保存失败：" + json.msg ? json.msg : "");
            }
        }
    });
}

function delRuKuFei(index) {
    if (ruKuFeis[index] === undefined) {
        return alert("请选择记录");
    }
    var ruKuFei = ruKuFeis[index];
    if (confirm("确定删除记录?")) {
        $.ajax({
            url: "/LBStore/ruKu/deleteRuKuFei.do?id=" + ruKuFei.id + "&rk_id=" + curRuKu.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0) {
                    selectRuKuDetail(curRuKu.id, selectRuKuFei);
                } else {
                    alert("删除失败：" + json.msg ? json.msg : "");
                }
            }
        });
    }
}
