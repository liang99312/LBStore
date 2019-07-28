var xiangMuDetails;
var bbXiangMuDetail;
var xiangMuFeis;
var feiOptFlag = -1;
var optFlag = 1;
var editIndex = -1;
var editFeiIndex = -1;
var selKeHu;
var editA01;
var editFeiA01;
var selBaoBiao;
var tysx = [];

$(document).ready(function () {
    $('#inpFeiRq').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd hh:ii', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, startView: 2, forceParse: 0, showMeridian: 1});
    $('#inpSelQrq,#inpSelZrq').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, minView: 2, startView: 2, forceParse: 0, showMeridian: 1});
    getAllA01s(setTrager_a01);
    getKeHus(setTrager_keHu);
    getBaoBiaosByMk("603", setTrager_baoBiao);
});

function setTrager_a01() {
    $('#inpFeiSkr').AutoComplete({'data': lb_allA01s, 'paramName': 'editFeiA01'});
}

function setTrager_keHu() {
    $('#inpSelKh').AutoComplete({'data': lb_keHus, 'paramName': 'selKeHu'});
    $('#inpKh').AutoComplete({'data': lb_keHus, 'paramName': 'editKeHu'});
}

function setTrager_baoBiao() {
    $('#inpSelBb').AutoComplete({'data': lb_baoBiaos, 'paramName': 'selBaoBiao'});
}

function showXiangMuDetail_m() {
    $("#xiangMuDetailSelectModal").modal({backdrop: 'static'});
}

function jxXiangMuDetail(json) {
    $("#data_table_body tr").remove();
    xiangMuDetails = [];
    xiangMuDetails = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if (item.state === -1) {
            classStr = ' class="danger"';
        }
        item.lsh = item.lsh === undefined || item.lsh === null ? "" : item.lsh;
        item.khmc = item.khmc === undefined || item.khmc === null ? "" : item.khmc;
        var readStr = '<button class="btn btn-info btn-xs icon-file-alt" onclick="readXiangMuDetail(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var finishStr = '<button class="btn btn-info btn-xs icon-ok-sign" onclick="finishXiangMuDetail(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var trStr = '<tr' + classStr + '><td>' + item.xmmc + '</td><td>' + item.xmlsh + '</td><td>' + item.khmc + '</td><td>' + item.lsh + '</td><td>' + item.wzmc + '</td><td>' + item.xhgg + '</td><td>' + item.jhsl + '</td><td>' + item.dj + '</td><td>' + (item.jhsl*item.dj).toFixed(2) + '</td><td>'
                + readStr
                + (item.state > 0 ? finishStr : "")
                + '</td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectXiangMuDetail() {
    var xiangMuDetail = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selMc").val() !== "") {
        xiangMuDetail.mc = $("#selMc").val();
    }
    if ($("#selLsh").val() !== "") {
        xiangMuDetail.lsh = $("#selLsh").val();
    }
    if ($('#selWzmc').val() !== "") {
        xiangMuDetail.wz = $('#selWzmc').val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        xiangMuDetail.state = parseInt($("#selState").val());
    }
    tj.paramters = xiangMuDetail;
    var options = {};
    options.url = "/LBStore/xiangMuDetail/listXiangMuDetailsByPage.do";
    options.tj = tj;
    options.func = jxXiangMuDetail;
    options.ul = "#example";
    queryPaginator(options);
}

function selectXiangMuDetail_m() {
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
    options.url = "/LBStore/xiangMuDetail/listXiangMuDetailsByPage.do";
    options.tj = tj;
    options.func = jxXiangMuDetail;
    options.ul = "#example";
    queryPaginator(options);
    $("#xiangMuDetailSelectModal").modal("hide");
}

function readXiangMuDetail(index) {
    optFlag = 4;
    if (xiangMuDetails[index] === undefined) {
        optFlag = 1;
        return alert("请选择项目");
    }
    $("#xiangMuModel_title").html("查看项目");
    $("#btnOk").html("关闭");
    $("#divXzmx").hide();
    $("#divSpr").show();
    $(".bb-element").show();
    $(".item-view").show();
    $("#btnStop").hide();
    var xiangMuDetail = xiangMuDetails[index];
    editIndex = index;
    $("#dvMxCanKao").hide();
    selectXiangMuDetail(xiangMuDetail.id, jxReadXiangMuDetail);
}

function jxReadXiangMuDetail(xiangMuDetail) {
    bbXiangMu = xiangMuDetail;
    $("#inpMc").val(xiangMuDetail.mc);
    $("#inpKh").val(xiangMuDetail.khmc);
    editKeHu = {"id": xiangMuDetail.kh_id, "mc": xiangMuDetail.khmc};
    $("#inpKdr").val(xiangMuDetail.kdrmc);
    editA01 = {"id": xiangMuDetail.kdr_id, "mc": xiangMuDetail.kdrmc};
    $("#inpDh").val(xiangMuDetail.dh);
    $("#inpBz").val(xiangMuDetail.bz);
    $("#inpJhsl").val(xiangMuDetail.sl);
    $("#inpJhje").val(xiangMuDetail.je);
    $("#inpSj").val(xiangMuDetail.sj);
    $("#inpSpr").val(xiangMuDetail.sprmc);
    $("#inpSpsj").val(xiangMuDetail.spsj);
    $("#inpJhsl").val(xiangMuDetail.jhsl);
    $("#inpJhje").val(xiangMuDetail.jhje);
    $("#inpJhsj").val(xiangMuDetail.jhsj);
    $("#inpKdsj").val(xiangMuDetail.kdsj);
    jxXiangMuMingXi();
    $("#xiangMuDetailModal").modal({backdrop: 'static'});
}

function stopXiangMuDetail() {
    changeState("终止","/LBStore/xiangMuDetail/stopXiangMuDetial.do?");
}

function wancXiangMuDetail(){
    changeState("完成","/LBStore/xiangMuDetail/finishXiangMuDetail.do?");
}

function changeState(cz, url) {
    var xiangMuDetail = {};
    if (optFlag === 5) {
        if (xiangMuDetails[editIndex] === undefined) {
            return;
        }
        if (!confirm("确定" + cz + "项目?")) {
            return;
        }
        xiangMuDetail = xiangMuDetails[editIndex];
        $.ajax({
            url: url+"id=" + xiangMuDetail.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert(cz + "失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectXiangMu();
                else
                    alert(cz + "失败:" + json.msg ? json.msg : "");
            }
        });
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
}
