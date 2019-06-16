var faHuos;
var faHuoFeis;
var feiOptFlag = -1;
var optFlag = 1;
var editIndex = -1;
var editType;
var fhmx = [];
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
var selKeHu;
var editKeHu;
var selGongYingShang;
var selKuWei;
var editCangKu;
var editA01;
var editFeiA01;
var selA01;
var curKuCun;
var curFaHuo;
var bbFaHuo;
var selBaoBiao;
var dymx_opt = {data: [], yxData: [], func: calcDymx};
var tysx_opt = {data: [], ls: 3, lw: 70, upeditable: 1};

$(document).ready(function () {
    $('#inpSj').val(dateFormat(new Date()));
    $('#inpSj,#inpFeiRq').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd hh:ii', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, startView: 2, forceParse: 0, showMeridian: 1});
    $('#inpSelQrq,#inpSelZrq,#inpMxScrq,#inpKcSelQrq,#inpKcSelZrq').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, minView: 2, startView: 2, forceParse: 0, showMeridian: 1});
    getAllA01s(setTrager_a01);
    getCangKus(setTrager_cangKu);
    getKeHus(setTrager_keHu);
    getWuZiZiDians(setTrager_ziDian);
    getWuZiLeiBies(setTrager_leiBie);
    getGongYingShangs(setTrager_gongYingShang);
    getBaoBiaosByMk("505", setTrager_baoBiao);
    $("#inpMxScrq").datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, minView: 2, startView: 2, forceParse: 0, showMeridian: 1});

    $("#inpMxFhl").keyup(function () {
        if (curKuCun && curKuCun.jlfs === "zl") {
            var temp_fhl = parseFloat($("#inpMxFhl").val());
            var temp_fhzl = temp_fhl * curKuCun.bzgg;
            $("#inpMxFhzl").val(temp_fhzl.toFixed(3));
        }
    });
    $("#inpMxFhzl").keyup(function () {
        if (curKuCun && curKuCun.jlfs === "zl") {
            var temp_fhzl = parseFloat($("#inpMxFhzl").val());
            var temp_fhl = temp_fhzl / curKuCun.bzgg;
            $("#inpMxFhl").val(temp_fhl.toFixed(3));
        }
    });
});

function setTrager_a01() {
    $('#inpFhr').AutoComplete({'data': lb_allA01s, 'paramName': 'editA01'});
    $('#inpFeiSkr').AutoComplete({'data': lb_allA01s, 'paramName': 'editFeiA01'});
    $('#inpKcSelRkr').AutoComplete({'data': lb_allA01s, 'paramName': 'selA01'});
}

function setTrager_cangKu() {
    $('#selCangKu').AutoComplete({'data': lb_cangKus, 'paramName': 'selCangKu'});
    $('#inpSelCk').AutoComplete({'data': lb_cangKus, 'paramName': 'selCangKu'});
    $('#inpCk').AutoComplete({'data': lb_cangKus, 'afterSelectedHandler': selectCangKu});
}

function setTrager_keHu() {
    $('#inpSelKh').AutoComplete({'data': lb_keHus, 'paramName': 'selKeHu'});
    $('#inpKcSelKh').AutoComplete({'data': lb_keHus, 'paramName': 'selKeHu'});
    $('#inpKh').AutoComplete({'data': lb_keHus, 'paramName': 'editKeHu'});
}

function setTrager_ziDian() {
    $('#inpKcSelWz').AutoComplete({'data': lb_wuZiZiDians, 'afterSelectedHandler': selectWuZiZiDian});
    $('#inpSelWz').AutoComplete({'data': lb_wuZiZiDians});
    $('#selWzmc').AutoComplete({'data': lb_wuZiZiDians});
}

function setTrager_leiBie() {
    $('#inpKcSelWzlb').AutoComplete({'data': lb_wuZiLeiBies, 'afterSelectedHandler': selectWuZiLeiBie});
}

function setTrager_gongYingShang() {
    $('#inpKcSelGys').AutoComplete({'data': lb_gongYingShangs, 'paramName': 'selGongYingShang'});
}

function setTrager_baoBiao() {
    $('#inpSelBb').AutoComplete({'data': lb_baoBiaos, 'paramName': 'selBaoBiao'});
}

function selectCangKu(json) {
    if (json.id !== editCangKu.id) {
        if (fhmx.length > 0) {
            $("#inpCk").val(editCangKu.mc);
            return alert("已选择其他仓库的库存");
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
                    $('#inpKcSelWz').AutoComplete({'data': json.sz, 'afterSelectedHandler': selectWuZiZiDian});
                }
            }
        });
    } else {
        $('#inpKcSelWz').AutoComplete({'data': [], 'afterSelectedHandler': selectWuZiZiDian});
    }
}

function selectFaHuo_m() {
    $("#faHuoSelectModal").modal({backdrop: 'static'});
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
                    if ($('#inpKcSelWzlb').val() !== json.wuZiZiDian.wzlb.mc) {
                        selectWuZiLeiBie(json.wuZiZiDian.wzlb);
                        $('#inpKcSelWzlb').val(json.wuZiZiDian.wzlb.mc);
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

function jxFaHuo(json) {
    $("#data_table_body tr").remove();
    faHuos = [];
    faHuos = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if (item.state === -1) {
            classStr = ' class="danger"';
        }
        item.lsh = item.lsh === undefined || item.lsh === null ? "" : item.lsh;
        var readStr = '<button class="btn btn-info btn-xs icon-file-alt" onclick="readFaHuo(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var editStr = '<button class="btn btn-info btn-xs icon-edit" onclick="editFaHuo(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var dealStr = '<button class="btn btn-info btn-xs icon-legal" onclick="dealFaHuo(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var delStr = '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteFaHuo(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var feiStr = '<button class="btn btn-info btn-xs icon-money" onclick="feiFaHuo(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var trStr = '<tr' + classStr + '><td>' + item.ckmc + '</td><td>' + item.lsh + '</td><td>' + item.dh + '</td><td class="longText">' + item.wz + '</td><td>' + item.sj + '</td><td>' + item.sl + '</td><td>'
                + readStr
                + (item.state === 0 ? editStr : "")
                + (item.state === 0 ? dealStr : "")
                + (item.state === 0 || item.state === -1 ? delStr : "")
                + (item.state > 0 ? feiStr : "")
                + '</td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function showSelectFaHuo() {
    $("#faHuoSelectModal").modal({backdrop: 'static'});
}

function selectFaHuo() {
    var faHuo = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selLsh").val() !== "") {
        faHuo.lsh = $("#selLsh").val();
    }
    if ($('#selWzmc').val() !== "") {
        faHuo.wz = $('#selWzmc').val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        faHuo.state = $("#selState").val();
    }
    if ($("#selCangKu").val() !== "" && $("#selCangKu").val() === selCangKu.mc) {
        faHuo.ck_id = selCangKu.id;
    }
    tj.paramters = faHuo;
    var options = {};
    options.url = "/LBStore/faHuo/listFaHuosByPage.do";
    options.tj = tj;
    options.func = jxFaHuo;
    options.ul = "#example";
    queryPaginator(options);
}

function selectFaHuo_m() {
    var faHuo = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#inpSelWz").val() !== "") {
        faHuo.wz = $("#inpSelWz").val();
    }
    if ($("#inpSelState").val() !== '' && $("#inpSelState").val() !== "-9") {
        faHuo.state = $("#inpSelState").val();
    }
    if ($("#inpSelCk").val() !== "" && $("#inpSelCk").val() === selCangKu.mc) {
        faHuo.ck_id = selCangKu.id;
    }
    if ($("#inpSelKh").val() !== "" && $("#inpSelKh").val() === selKeHu.mc) {
        faHuo.kh_id = selKeHu.id;
    }
    if ($("#inpSelQrq").val() !== "") {
        faHuo.qrq = $("#inpSelQrq").val();
    }
    if ($("#inpSelZrq").val() !== "") {
        faHuo.zrq = $("#inpSelZrq").val();
    }
    tj.paramters = faHuo;
    var options = {};
    options.url = "/LBStore/faHuo/listFaHuosByPage.do";
    options.tj = tj;
    options.func = jxFaHuo;
    options.ul = "#example";
    queryPaginator(options);
    $("#faHuoSelectModal").modal("hide");
}

function addFaHuo() {
    optFlag = 1;
    fhmx = [];
    editCangKu = {};
    editKeHu = {};
    $("#faHuoModel_title").html("新增发货单");
    $(".bb-element").hide();
    $("#btnOk").html("保存");
    $("#divXzmx").show();
    $("#divSpr").hide();
    $("#inpGys").val("");
    $("#inpKh").val("");
    $("#inpDh").val("");
    $("#inpBz").val("");
    $("#inpSl").val(0);
    $("#inpJe").val(0);
    jxFaHuoMingXi();
    $("#faHuoModal").modal({backdrop: 'static'});
}

function editFaHuo(index) {
    optFlag = 2;
    if (faHuos[index] === undefined) {
        optFlag = 1;
        return alert("请选择发货单");
    }
    $("#faHuoModel_title").html("修改发货单");
    $(".bb-element").hide();
    $("#btnOk").html("保存");
    $("#divXzmx").show();
    $("#divSpr").hide();
    var faHuo = faHuos[index];
    editIndex = index;
    editFeiIndex(faHuo.id, jxReadFaHuo);
}

function readFaHuo(index) {
    optFlag = 4;
    if (faHuos[index] === undefined) {
        optFlag = 1;
        return alert("请选择发货单");
    }
    $("#faHuoModel_title").html("查看发货单");
    $(".bb-element").show();
    $("#btnOk").html("关闭");
    $("#divXzmx").hide();
    $("#divSpr").show();
    var faHuo = faHuos[index];
    editIndex = index;
    editFeiIndex(faHuo.id, jxReadFaHuo);
}

function jxReadFaHuo(faHuo) {
    bbFaHuo = faHuo;
    fhmx = faHuo.details;
    $("#inpKh").val(faHuo.khmc);
    $("#inpCk").val(faHuo.ckmc);
    editCangKu = {"id": faHuo.ck_id, "mc": faHuo.ckmc};
    editKeHu = {"id": faHuo.kh_id, "mc": faHuo.khmc};
    $("#inpFhr").val(faHuo.fhrmc);
    editA01 = {"id": faHuo.fhr_id, "mc": faHuo.fhrmc};
    selectCangKu(editCangKu);
    $("#inpDh").val(faHuo.dh);
    $("#inpBz").val(faHuo.bz);
    $("#inpSl").val(faHuo.sl);
    $("#inpJe").val(faHuo.je);
    $("#inpSj").val(faHuo.sj);
    $("#inpSpr").val(faHuo.sprmc);
    $("#inpSpsj").val(faHuo.spsj);
    jxFaHuoMingXi();
    $("#faHuoModal").modal({backdrop: 'static'});
}

function editFeiIndex(id, func) {
    $.ajax({
        url: "/LBStore/faHuo/getFaHuoWithDetailById.do?id=" + id,
        contentType: "application/json",
        type: "get",
        cache: false,
        error: function (msg, textStatus) {
            alert("获取发货单信息失败");
        },
        success: function (json) {
            if (json.result === 0) {
                if (func) {
                    func(json.faHuo);
                }
            } else
                alert("获取发货单信息失败:" + json.msg !== undefined ? json.msg : "");
        }
    });
}

function dealFaHuo(index) {
    optFlag = 3;
    if (faHuos[index] === undefined) {
        optFlag = 1;
        return alert("请选择发货单");
    }
    $("#faHuoModel_title").html("办理发货单");
    $(".bb-element").hide();
    $("#btnOk").html("办理");
    $("#divXzmx").hide();
    $("#divSpr").hide();
    var faHuo = faHuos[index];
    editIndex = index;
    editFeiIndex(faHuo.id, jxReadFaHuo);
}

function saveFaHuo() {
    if (optFlag === 4) {
        $("#faHuoModal").modal("hide");
        return;
    }
    if (fhmx.length < 1) {
        return alert("请增加发货明细！");
    }
    var faHuo = {};
    var url = "";
    if (optFlag === 3) {
        if (faHuos[editIndex] === undefined) {
            return;
        }
        if (!confirm("确定办理发货单?")) {
            return;
        }
        faHuo = faHuos[editIndex];
        url = "/LBStore/faHuo/dealFaHuo.do";
    } else if (optFlag === 2) {
        if (faHuos[editIndex] === undefined) {
            return;
        }
        faHuo = faHuos[editIndex];
        url = "/LBStore/faHuo/updateFaHuo.do";
    } else if (optFlag === 1) {
        url = "/LBStore/faHuo/saveFaHuo.do";
    }
    if ($("#inpCk").val() === "") {
        return alert("请输入仓库信息");
    } else {
        if ($("#inpCk").val() !== editCangKu.mc) {
            return alert("请输入仓库信息");
        } else {
            faHuo.ck_id = editCangKu.id;
        }
    }
    if ($("#inpKh").val() === "") {
        return alert("请输入客户信息");
    } else {
        if ($("#inpKh").val() !== editKeHu.mc) {
            return alert("请输入客户信息");
        } else {
            faHuo.kh_id = editKeHu.id;
        }
    }
    if ($("#inpFhr").val() === "") {
        return alert("请输入发货人信息");
    } else {
        if ($("#inpFhr").val() !== editA01.mc) {
            return alert("请输入发货人信息");
        } else {
            faHuo.fhr_id = editA01.id;
        }
    }
    var wz = "";
    var wzs = [];
    for (var i = 0; i < fhmx.length; i++) {
        var e = fhmx[i];
        if (e.ck_id !== faHuo.ck_id) {
            return alert("发货明细仓库和发货单仓库不匹配！");
        }
        if (optFlag === 3) {
            if (e.kw === undefined || e.kw === null || e.kw === "") {
                return alert("发货单明细需要设置库位！");
            }
            if (e.dj === undefined || e.dj === null || e.dj === "") {
                return alert("发货单明细需要设置单价！");
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
    faHuo.details = fhmx;
    faHuo.wz = wz;
    faHuo.dh = $("#inpDh").val();
    faHuo.bz = $("#inpBz").val();
    faHuo.sl = $("#inpSl").val();
    faHuo.je = $("#inpJe").val();
    faHuo.sj = $("#inpSj").val();
    faHuo.state = 0;
    var tsStr = optFlag === 3 ? "办理" : "保存";
    $.ajax({
        url: url,
        data: JSON.stringify(faHuo),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert(tsStr + "失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#faHuoModal").modal("hide");
                selectFaHuo();
            } else {
                alert(tsStr + "失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteFaHuo(index) {
    if (faHuos[index] === undefined) {
        return alert("请选择发货单");
    }
    var faHuo = faHuos[index];
    if (confirm("确定删除发货单：" + faHuo.dh + "?")) {
        $.ajax({
            url: "/LBStore/faHuo/deleteFaHuo.do?id=" + faHuo.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectFaHuo();
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
        $("#inpMxFhl").val(dymx_opt.yxData.length);
        $("#inpMxFhzl").val(zl.toFixed(3));
    }
}

function jxFaHuoMingXi() {
    $("#tblWuZiMingXi_body tr").remove();
    $.each(fhmx, function (index, item) { //遍历返回的json
        if (item.tysx && item.tysx !== null && item.tysx !== "" && typeof item.tysx === 'string') {
            item.tysx = JSON.parse(item.tysx);
        } else if (item.tysx && typeof item.tysx === 'object') {

        } else {
            item.tysx = [];
        }
        var je = parseFloat(item.fhl) * parseFloat(item.fhdj);
        var bj = optFlag === 3 || optFlag === 4 ? '' : '<button class="btn btn-info btn-xs icon-edit" onclick="editFaHuoMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var cz = optFlag === 3 || optFlag === 4 ? '' : '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteFaHuoMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var trStr = '<tr><td>' + item.wzmc + '</td><td>' + item.pp + '</td><td>' + item.xhgg + '</td><td>' + item.fhl + '</td><td>' + je + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-file-alt" onclick="readFaHuoMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + bj
                + cz + '</td></tr>';
        $("#tblWuZiMingXi_body").append(trStr);
    });
}

function addFaHuoMingXi() {
    if ($("#inpCk").val() === "" || $("#inpCk").val() !== editCangKu.mc) {
        return alert("请选择发货仓库");
    }
    optMxFlag = 1;
    dymx_opt = {data: [], yxData: [], func: calcDymx};
    editLeiBie = null;
    $("#faHuoMingXiModal_title").html("增加明细");
    $("#selKuCunModal").modal({backdrop: 'static'});
}

function editFaHuoMingXi(index) {
    if (fhmx[index]) {
        optMxFlag = 2;
        editMxIndex = index;
        $("#faHuoMingXiModal_title").html("修改明细");
        $("#btnMxOk").html("保存");
        var temp = fhmx[index];
        cxKuCunById(temp.kc_id, index);
    }
}

function readFaHuoMingXi(index) {
    if (fhmx[index]) {
        optMxFlag = 4;
        editMxIndex = index;
        $("#faHuoMingXiModal_title").html("查看明细");
        $("#btnMxOk").html("关闭");
        var temp = fhmx[index];
        cxKuCunById(temp.kc_id, index);
    }
}

function deleteFaHuoMingXi(index) {
    if (fhmx[index]) {
        if (confirm("确定删除明细：" + fhmx[index].wzmc + "?")) {
            fhmx.splice(index, 1);
            jxFaHuoMingXi();
        }
    }
}

function saveFaHuoMingXi() {
    if (optMxFlag === 4) {
        $("#faHuoMingXiModal").modal("hide");
        return;
    }
    if (!editLeiBie || editLeiBie === null) {
        return alert("物资类别不能为空");
    }
    if ($("#inpMxFhl").val() === "") {
        return alert("请输入发货数量");
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
    mx.bzgg = $("#inpMxBzgg").val();
    mx.zldw = $("#inpMxZldw").val();
    mx.kw = $("#inpMxKwh").val();
    mx.dymx = JSON.stringify(dymx_opt.yxData);
    mx.tysx = JSON.stringify(tysx_opt.data);
    mx.fhl = parseFloat($("#inpMxFhl").val());
    mx.fhzl = parseFloat($("#inpMxFhzl").val());
    mx.fhdj = parseFloat($("#inpMxFhdj").val());
    if ("pt" === $("#inpMxJlfs").val()) {
        mx.slzl = mx.sll;
    } else {
        if (mx.fhzl === undefined || mx.fhzl === "" || mx.fhzl < 0.001) {
            mx.fhzl = mx.fhl;
        }
    }
    mx.kc_id = curKuCun.id;
    mx.gys_id = curKuCun.gys_id;
    mx.ck_id = curKuCun.ck_id;
    if (optMxFlag === 1) {
        fhmx.push(mx);
    } else if (optMxFlag === 2) {
        fhmx[editMxIndex] = mx;
    }
    jxFaHuoMingXi();
    var zsl = 0;
    var zje = 0;
    for (var i = 0; i < fhmx.length; i++) {
        var e = fhmx[i];
        zsl = e.fhl + zsl;
        zje = e.fhl * e.fhdj + zje;
    }
    $("#inpSl").val(zsl);
    $("#inpJe").val(zje.toFixed(3));
    $("#faHuoMingXiModal").modal("hide");
    curKuCun = null;
}

function cxKuCun() {
    var kuCun = {};
    kuCun.ck_id = editCangKu.id;
    if ($("#inpKcSelWzlb").val() !== "" && $("#inpKcSelWzlb").val() === selLeiBie.mc) {
        kuCun.wzlb_id = selLeiBie.id;
    }
    if ($("#inpKcSelWz").val() !== "") {
        kuCun.wzmc = $("#inpKcSelWz").val();
    }
    if ($("#inpKcSelXhgg").val() !== "") {
        kuCun.xhgg = $("#inpKcSelXhgg").val();
    }
    if ($("#inpKcSelKh").val() !== "" && $("#inpKcSelKh").val() === selKeHu.mc) {
        kuCun.kh_id = selKeHu.id;
    }
    if ($("#inpKcSelGys").val() !== "" && $("#inpKcSelGys").val() === selGongYingShang.mc) {
        kuCun.gys_id = selGongYingShang.id;
    }
    if ($("#inpKcSelRkr").val() !== "" && $("#inpKcSelRkr").val() === selA01.mc) {
        kuCun.rkr_id = selA01.id;
    }
    if ($("#inpKcSelQrq").val() !== "") {
        kuCun.qrq = $("#inpKcSelQrq").val();
    }
    if ($("#inpKcSelZrq").val() !== "") {
        kuCun.zrq = $("#inpKcSelZrq").val();
    }
    $.ajax({
        url: "/LBStore/kuCun/getKuCunTop100.do?",
        data: JSON.stringify(kuCun),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("查询库存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                var sz = json.sz;
                jxKuCun(sz);
            } else {
                alert("查询库存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function jxKuCun(sz) {
    $("#tblKuCun_body tr").remove();
    kuCuns = [];
    kuCuns = sz;
    $.each(sz, function (index, item) { //遍历返回的json
        var trStr = '<tr><td>' + item.wzmc + '</td><td>' + item.pp + '</td><td>' + item.xhgg + '</td><td>' + item.zl + '</td><td>' + item.syzl + '</td><td>' + item.kw + '</td><td>' + item.rksj + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-plus" onclick="selKuCun(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#tblKuCun_body").append(trStr);
    });
}

function selKuCun(index) {
    curKuCun = null;
    if (kuCuns.length <= index) {
        return;
    }
    var kc = kuCuns[index];
    for (var i = 0; i < fhmx.length; i++) {
        var e = fhmx[i];
        if (e.kc_id === kc.id) {
            return alert("该库存物资已选择");
        }
    }
    setKcCunData(kc);
}

function setKcCunData(kc, index) {
    curKuCun = kc;
    var m = fhmx[index];
    m = m ? m : {};
    if (m.dymx) {
        if (typeof m.dymx === "string") {
            m.dymx = JSON.parse(m.dymx);
        }
    } else {
        m.dymx = [];
    }
    m.fhl = m.fhl ? m.fhl : 0;
    m.fhzl = m.fhzl ? m.fhzl : 0;
    if (kc.dymx && typeof kc.dymx === "string") {
        kc.dymx = JSON.parse(kc.dymx);
    }
    dymx_opt = {data: kc.dymx, yxData: m.dymx, func: calcDymx};
    editWzzd = {"id": kc.wzzd_id, "mc": kc.wzmc, "bm": kc.wzbm};
    $("#inpMxWz").val(kc.wzmc);
    $("#inpMxWzbm").val(kc.wzbm);
    $("#inpMxBzrq").val(kc.bzrq);
    editLeiBie = {"id": kc.wzlb_id, "mc": kc.wzlb};
    $("#inpMxLb").val(kc.wzlb);
    $("#inpMxPp").val(kc.pp);
    editXhgg = {"id": kc.xhgg_id, "mc": kc.xhgg};
    $("#inpMxXhgg").val(kc.xhgg);
    $("#inpMxScc").val(kc.scc);
    $("#inpMxBz").val(kc.bz);
    $("#inpMxTxm").val(kc.txm);
    $("#inpMxPc").val(kc.pc);
    $("#inpMxScrq").val(kc.scrq);
    $("#inpMxBzq").val(kc.bzq);
    $("#inpMxDj").val(kc.dj);
    $("#inpMxDw").val(kc.dw);
    $("#inpMxSl").val(kc.sl);
    $("#inpMxJlfs").val(kc.jlfs);
    $("#inpMxBzgg").val(kc.bzgg);
    $("#inpMxZldw").val(kc.zldw);
    $("#inpMxZl").val(kc.zl);
    $("#inpMxKwh").val(kc.kw);
    buildTysx(kc.tysx);
    $("#inpMxSyl").val(kc.syl);
    $("#inpMxFhl").val(m.fhl);
    $("#inpMxFhzl").val(m.fhzl);
    $("#inpMxFhdj").val(m.fhdj ? m.fhdj : kc.ckdj);
    buildDymx();
    if (kc.jlfs === "mx") {
        $("#divMxDymx").show();
    } else {
        $("#divMxDymx").hide();
    }
    selectMxJlfs();
    $("#selKuCunModal").modal("hide");
    $("#faHuoMingXiModal").modal({backdrop: 'static'});
}

function cxKuCunById(id, index) {
    $.ajax({
        url: "/LBStore/kuCun/getKuCunById.do?id=" + id,
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("查询库存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                var kc = json.kuCun;
                setKcCunData(kc, index);
            } else {
                alert("查询库存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function feiFaHuo(index) {
    $("#tblFaHuoFei_body tr").remove();
    if (faHuos[index] === undefined) {
        return alert("请选择发货单");
    }
    editIndex = index;
    var faHuo = faHuos[index];
    editFeiIndex(faHuo.id, selectFaHuoFei);
}

function jxFaHuoFei(json) {
    $("#tblFaHuoFei_body tr").remove();
    faHuoFeis = [];
    faHuoFeis = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var trStr = '<tr><td>' + item.rq + '</td><td>' + item.je + '</td><td>' + item.skrmc + '</td><td>' + item.bz + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editFaHuoFei(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="delFaHuoFei(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#tblFaHuoFei_body").append(trStr);
    });
}

function selectFaHuoFei(json) {
    curFaHuo = json;
    var jexx = "总金额：￥" + curFaHuo.je + "&ensp;&ensp;&ensp;&ensp;已付：￥" + curFaHuo.yfje + "&ensp;&ensp;&ensp;&ensp;待付：<span style='color:red'>￥" + curFaHuo.dfje + "</span>";
    $("#faHuoJexx").html(jexx);
    var faHuoFei = {};
    var tj = {"pageSize": 10, "currentPage": 1};
    faHuoFei.fh_id = json.id;
    tj.paramters = faHuoFei;
    var options = {};
    options.url = "/LBStore/faHuo/listFaHuoFeisByPage.do";
    options.tj = tj;
    options.func = jxFaHuoFei;
    options.ul = "#example2";
    queryPaginator(options);
    $("#faHuoFeiModal").modal({backdrop: 'static'});
}

function addFaHuoFei(type) {
    feiOptFlag = 1;
    if (!curFaHuo) {
        return;
    }
    editFeiA01 = undefined;
    $("#faHuoFeiEditModel_title").html("新增记录");
    if (type === 1) {
        $("#inpFeiRq").val(dateFormat_f(new Date()));
        $("#inpFeiJe").val(curFaHuo.dfje);
        $("#inpFeiSkr").val("");
        $("#inpFeiBz").val("");
    } else {
        $("#inpFeiRq").val(dateFormat_f(new Date()));
        $("#inpFeiJe").val(0);
        $("#inpFeiSkr").val("");
        $("#inpFeiBz").val("");
    }
    $("#faHuoFeiEditModal").modal({backdrop: 'static'});
}

function editFaHuoFei(index) {
    if (!curFaHuo) {
        return;
    }
    feiOptFlag = 2;
    if (faHuoFeis[index] === undefined) {
        feiOptFlag = 1;
        return alert("请选择记录");
    }
    var faHuoFei = faHuoFeis[index];
    xhggEditIndex = index;
    editFeiA01 = {id: faHuoFei.skr_id, mc: faHuoFei.skrmc};
    $("#faHuoFeiEditModel_title").html("修改记录");
    $("#inpFeiRq").val(faHuoFei.rq);
    $("#inpFeiJe").val(faHuoFei.je);
    $("#inpFeiSkr").val(faHuoFei.skrmc);
    $("#inpFeiBz").val(faHuoFei.bz);
    $("#faHuoFeiEditModal").modal({backdrop: 'static'});
}

function checkFei(type, index, je) {
    var zje = 0;
    if (type === 1) {
        for (var i = 0; i < faHuoFeis.length; i++) {
            zje = zje + faHuoFeis[i].je;
        }
    } else if (type === 2) {
        for (var i = 0; i < faHuoFeis.length; i++) {
            if (i !== index) {
                zje = zje + faHuoFeis[i].je;
            }
        }
    }
    zje = zje + je;
    if (zje > curFaHuo.je) {
        alert("付款金额超过了订单金额");
        return false;
    }
    return true;
}

function saveFaHuoFei() {
    if (!curFaHuo) {
        return;
    }
    var faHuoFei = {};
    var url = "";
    var je = parseFloat($("#inpFeiJe").val());
    if (feiOptFlag === 2) {
        if (faHuoFeis[xhggEditIndex] === undefined) {
            return;
        }
        faHuoFei = faHuoFeis[xhggEditIndex];
        url = "/LBStore/faHuo/updateFaHuoFei.do";
    } else if (feiOptFlag === 1) {
        url = "/LBStore/faHuo/saveFaHuoFei.do";
        faHuoFei.fh_id = curFaHuo.id;

    }
    if (!checkFei(feiOptFlag, xhggEditIndex, je)) {
        return;
    }
    if (!editFeiA01 || editFeiA01.mc === '' || editFeiA01.mc !== $("#inpFeiSkr").val()) {
        return alert("请选择收款人");
    }
    faHuoFei.rq = $("#inpFeiRq").val();
    faHuoFei.je = je;
    faHuoFei.skr_id = editFeiA01.id;
    faHuoFei.kh_id = curFaHuo.kh_id;
    faHuoFei.bz = $("#inpFeiBz").val();
    $.ajax({
        url: url,
        data: JSON.stringify(faHuoFei),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#faHuoFeiEditModal").modal("hide");
                editFeiIndex(curFaHuo.id, selectFaHuoFei);
            } else {
                alert("保存失败：" + json.msg ? json.msg : "");
            }
        }
    });
}

function delFaHuoFei(index) {
    if (faHuoFeis[index] === undefined) {
        return alert("请选择记录");
    }
    var faHuoFei = faHuoFeis[index];
    if (confirm("确定删除记录?")) {
        $.ajax({
            url: "/LBStore/faHuo/deleteFaHuoFei.do?id=" + faHuoFei.id + "&fh_id=" + curFaHuo.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0) {
                    editFeiIndex(curFaHuo.id, selectFaHuoFei);
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
