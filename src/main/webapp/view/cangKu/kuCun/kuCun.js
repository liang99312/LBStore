var kuCuns;
var optFlag = 1;
var editIndex = -1;
var selA01;
var selCangKu;
var selKeHu;
var selGongYingShang;
var selWzlb;
var tysx_opt = {data: [], ls: 2, lw: 70};
var dymx_opt = {data: [], yxData: [], func: calcDymx};

$(document).ready(function () {
    $('#inpSelQrq,#inpSelZrq').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, minView: 2, startView: 2, forceParse: 0, showMeridian: 1});
    getAllA01s(setTrager_a01);
    getCangKus(setTrager_cangKu);
    getKeHus(setTrager_keHu);
    getGongYingShangs(setTrager_gongYingShang);
    getWuZiZiDians(setTrager_ziDian);
    getWuZiLeiBies(setTrager_leiBie);
});

function setTrager_a01() {
    $('#inpSelRkr').AutoComplete({'data': lb_allA01s, 'paramName': 'selA01'});
}

function setTrager_cangKu() {
    $('#inpSelCk').AutoComplete({'data': lb_cangKus, 'paramName': 'selCangKu'});
}

function setTrager_keHu() {
    $('#inpSelKh').AutoComplete({'data': lb_keHus, 'paramName': 'selKeHu'});
}

function setTrager_gongYingShang() {
    $('#inpSelGys').AutoComplete({'data': lb_gongYingShangs, 'paramName': 'selGongYingShang'});
}

function setTrager_ziDian() {
    $('#inpSelWz,#selName').AutoComplete({'data': lb_wuZiZiDians});
}

function setTrager_leiBie() {
    $('#inpSelWzlb').AutoComplete({'data': lb_wuZiLeiBies, 'paramName': 'selWzlb'});
}

function jxKuCun(json) {
    $("#data_table_body tr").remove();
    kuCuns = [];
    kuCuns = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var trStr = '<tr><td>' + item.ckmc + '</td><td>' + item.wzmc + '</td><td>' + item.pp + '</td><td>' + item.xhgg + '</td><td>' + item.zl + '</td><td>' + item.syzl + '</td><td>' + item.kw + '</td><td>' + item.rksj + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-file-alt" onclick="readKuCun(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editKuCun(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function showSelectKuCun() {
    $("#kuCunSelectModal").modal("show");
}

function selectKuCun() {
    var kuCun = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        kuCun.mc = $("#selName").val();
    }
    if ($("#selTxm").val() !== '') {
        kuCun.txm = $("#selTxm").val();
    }
    tj.paramters = kuCun;
    var options = {};
    options.url = "/LBStore/kuCun/listKuCunsByPage.do";
    options.tj = tj;
    options.func = jxKuCun;
    options.ul = "#example";
    queryPaginator(options);
}

function selectKuCun_m() {
    var kuCun = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#inpSelWz").val() !== "") {
        kuCun.wzmc = $("#inpSelWz").val();
    }
    if ($("#inpSelXhgg").val() !== "") {
        kuCun.xhgg = $("#inpSelXhgg").val();
    }
    if ($("#inpSelWzlb").val() !== "" && $("#inpSelWzlb").val() === selWzlb.mc) {
        kuCun.wzlb_id = selWzlb.id;
    }
    if ($("#inpSelRkr").val() !== "" && $("#inpSelRkr").val() === selA01.mc) {
        kuCun.rkr_id = selA01.id;
    }
    if ($("#inpSelCk").val() !== "" && $("#inpSelCk").val() === selCangKu.mc) {
        kuCun.ck_id = selCangKu.id;
    }
    if ($("#inpSelKh").val() !== "" && $("#inpSelKh").val() === selKeHu.mc) {
        kuCun.kh_id = selKeHu.id;
    }
    if ($("#inpSelGys").val() !== "" && $("#inpSelGys").val() === selGongYingShang.mc) {
        kuCun.gys_id = selGongYingShang.id;
    }
    if ($("#inpSelQrq").val() !== "") {
        kuCun.qrq = $("#inpSelQrq").val();
    }
    if ($("#inpSelZrq").val() !== "") {
        kuCun.zrq = $("#inpSelZrq").val();
    }
    tj.paramters = kuCun;
    var options = {};
    options.url = "/LBStore/kuCun/listKuCunsByPage.do";
    options.tj = tj;
    options.func = jxKuCun;
    options.ul = "#example";
    queryPaginator(options);
    $("#kuCunSelectModal").modal("hide");
}

function editKuCun(index) {
    optFlag = 2;
    if (kuCuns[index] === undefined) {
        optFlag = 1;
        return alert("请选择库存");
    }
    $("#kuCunModal_title").html("修改库存记录");
    $("#btnOk").html("保存");
    var m = kuCuns[index];
    setKuCunData(m);
    $(".form-uneditable input").attr("readonly","readonly");
    $(".form-editable input").removeAttr("readonly");
}

function saveKuCun() {
    var kuCun = {};
    var url = "";
    if (optFlag === 2) {
        if (kuCuns[editIndex] === undefined) {
            return;
        }
        kuCun = kuCuns[editIndex];
        url = "/LBStore/kuCun/updateKuCun.do";
    } else if (optFlag === 1) {
        url = "/LBStore/kuCun/saveKuCun.do";
    }
    kuCun.mc = $("#inpMc").val();
    kuCun.dm = $("#inpDm").val();
    kuCun.dz = $("#inpDz").val();
    kuCun.lxr = $("#inpLxr").val();
    kuCun.lxdh = $("#inpLxdh").val();
    kuCun.bz = $("#inpBz").val();
    $.ajax({
        url: url,
        data: JSON.stringify(kuCun),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#kuCunModal").modal("hide");
                selectKuCun();
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function readKuCun(index){
    optFlag = 0;
    if (kuCuns[index] === undefined) {
        optFlag = 1;
        return alert("请选择库存");
    }
    $("#kuCunModal_title").html("查看库存记录");
    $("#btnOk").html("关闭");
    var m = kuCuns[index];
    setKuCunData(m);
    $(".form-uneditable input").attr("readonly","readonly");
    $(".form-editable input").attr("readonly","readonly");
}

function setKuCunData(m){
    dymx_opt = {data: [], yxData: m.dymx, func: calcDymx};
    selWzzd = {"id": m.wzzd_id, "mc": m.wzmc};
    $("#inpMxWz").val(m.wzmc);
    selLeiBie = {"id": m.wzlb_id, "mc": m.wzlb};
    $("#inpMxLb").val(m.wzlb);
    $("#inpMxPp").val(m.pp);
    selXhgg = {"id": m.xhgg_id, "mc": m.xhgg};
    $("#inpMxXhgg").val(m.xhgg);
    $("#inpMxScc").val(m.scc);
    $("#inpMxTxm").val(m.txm);
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
    $("#kuCunModal").modal("show");
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
    $("#tblMxDymx").setDetailTableData(dymx_opt);
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
