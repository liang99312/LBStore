var xiangMuDetails;
var bbXiangMuDetail;
var xiangMuFeis;
var curXiangMuDetail;
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
        var liaoStr = '<button class="btn btn-info btn-xs icon-shopping-cart" onclick="liaoXiangMuDetail(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var finishStr = '<button class="btn btn-info btn-xs icon-ok-sign" onclick="chanXiangMuDetail(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var trStr = '<tr' + classStr + '><td>' + item.xmmc + '</td><td>' + item.xmlsh + '</td><td>' + item.khmc + '</td><td>' + item.lsh + '</td><td>' + item.wzmc + '</td><td>' + item.xhgg + '</td><td>' + item.jhsl + '</td><td>' + item.dj + '</td><td>' + (item.jhsl * item.dj).toFixed(2) + '</td><td>'
                + readStr
                + liaoStr
                + finishStr
                + '</td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectXiangMuDetail() {
    var xiangMuDetail = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selMc").val() !== "") {
        xiangMuDetail.xmmc = $("#selMc").val();
    }
    if ($("#selLsh").val() !== "") {
        xiangMuDetail.lsh = $("#selLsh").val();
    }
    if ($('#selWzmc').val() !== "") {
        xiangMuDetail.wzmc = $('#selWzmc').val();
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
    var xiangMuDetail = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#inpSelXmmc").val() !== "") {
        xiangMuDetail.xmmc = $("#inpSelXmmc").val();
    }
    if ($("#inpSelXmlsh").val() !== "") {
        xiangMuDetail.xmlsh = $("#inpSelXmlsh").val();
    }
    if ($("#inpSelLsh").val() !== "") {
        xiangMuDetail.lsh = $("#inpSelLsh").val();
    }
    if ($("#inpSelWz").val() !== "") {
        xiangMuDetail.wzmc = $("#inpSelWz").val();
    }
    if ($("#inpSelState").val() !== '' && $("#inpSelState").val() !== "-9") {
        xiangMuDetail.state = parseInt($("#inpSelState").val());
    }
    if ($("#inpSelKh").val() !== "" && $("#inpSelKh").val() === selKeHu.mc) {
        xiangMuDetail.kh_id = selKeHu.id;
    }
    if ($("#inpSelQrq").val() !== "") {
        xiangMuDetail.qrq = $("#inpSelQrq").val();
    }
    if ($("#inpSelZrq").val() !== "") {
        xiangMuDetail.zrq = $("#inpSelZrq").val();
    }
    tj.paramters = xiangMuDetail;
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
    $("#xiangMuDetailModel_title").html("查看项目");
    $("#btnOk").html("关闭");
    var xiangMuDetail = xiangMuDetails[index];
    editIndex = index;
    $("#dvMxCanKao").hide();
    jxReadXiangMuDetail(xiangMuDetail);
}

function jxReadXiangMuDetail(xiangMuDetail) {
    bbXiangMu = xiangMuDetail;
    $("#inpWzbm").val(xiangMuDetail.wzbm);
    $("#inpWz").val(xiangMuDetail.wzmc);
    $("#inpLb").val(xiangMuDetail.wzlb);
    $("#inpXhgg").val(xiangMuDetail.xhgg);
    $("#inpDj").val(xiangMuDetail.dj);
    $("#inpDw").val(xiangMuDetail.dw);
    $("#inpJhsl").val(xiangMuDetail.jhsl);
    $("#inpLsh").val(xiangMuDetail.lsh);
    $("#inpWcsj").val(xiangMuDetail.wcsj);
    $("#inpWcsl").val(xiangMuDetail.wcsl);
    $("#inpFhsj").val(xiangMuDetail.fhsj);
    $("#inpFhsl").val(xiangMuDetail.jhsl);
    $("#inpBz").val(xiangMuDetail.bz);
    tysx = [];
    if (xiangMuDetail.xq && xiangMuDetail.xq !== null && xiangMuDetail.xq !== "" && typeof xiangMuDetail.xq === 'string') {
        xiangMuDetail.xq = JSON.parse(xiangMuDetail.xq);
    }
    $.extend(true, tysx, xiangMuDetail.xq);
    buildTysx(tysx);
    $("#xiangMuDetailModal").modal({backdrop: 'static'});
}

function stopXiangMuDetail() {
    changeState("终止", "/LBStore/xiangMuDetail/stopXiangMuDetial.do?");
}

function wancXiangMuDetail() {
    changeState("完成", "/LBStore/xiangMuDetail/finishXiangMuDetail.do?");
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
            url: url + "id=" + xiangMuDetail.id,
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
    $("#divTysx").empty();
    for (var i = 0; i < data.length; i++) {
        var e = data[i];
        if (!e.value || e.value === null) {
            e.value = "";
        }
        var s = "<div class='form-group'><label for='edts_inp_" + e.id + "'>" + e.mc + "：</label>\n\
                <input type='text' id='edts_inp_" + e.id + "' value='" + e.value + "' />\n\
                <button class='btn btn-info btn-xs icon-edit ts_edit'></button><button class='btn btn-danger btn-xs icon-minus ts_del'></div>";
        $("#divTysx").append(s);
    }
}

function saveXiangMuDetail() {
    if (optFlag === 4) {
        $("#xiangMuDetailModal").modal("hide");
        return;
    }
}

function addXiangMuDetailLiao() {
    if (xiangMuDetails[editIndex] === undefined) {
        return;
    }
    var xmd_id = xiangMuDetails[editIndex].id;
    var xmd_mc = xiangMuDetails[editIndex].lsh;
    window.top.addTabs({id:'504',title: '领料管理',close: true,url: '/LBStore/view/cangKu/lingLiao/lingLiao.html?xmd_id=' + xmd_id+'&xmd_mc='+xmd_mc,'refresh_flag':true});
}

function refreshXiangMuDetailLiao(){
    liaoXiangMuDetail(editIndex);
}

function liaoXiangMuDetail(index){
    if (xiangMuDetails[index] === undefined) {
        return;
    }
    editIndex = index;
    curXiangMuDetail = xiangMuDetails[index];
    var lingLiao = {};
    var tj = {"pageSize": 10, "currentPage": 1};
    lingLiao.xmd_id = curXiangMuDetail.id;
    tj.paramters = lingLiao;
    var options = {};
    options.url = "/LBStore/lingLiao/listLingLiaoDetailsByPage.do";
    options.tj = tj;
    options.func = jxXiangMuDetailLiao;
    options.ul = "#example2";
    queryPaginator(options);
    $("#xiangMuLiaoModal").modal({backdrop: 'static'});
}

function jxXiangMuDetailLiao(json) {
    $("#tblXiangMuLiao_body tr").remove();
    $.each(json.list, function (index, item) { //遍历返回的json
        var trStr = '<tr><td>' + item.wzmc + '</td><td>' + item.xhgg + '</td><td>' + item.dj + '</td><td>' + item.sll + '</td><td>' + (item.sll*item.dj).toFixed(2) + '</td><td>' + (item.state === 0?"未办理":"已办理") + '</td></tr>';
        $("#tblXiangMuLiao_body").append(trStr);
    });
}

function addXiangMuDetailChan() {
    if (xiangMuDetails[editIndex] === undefined) {
        return;
    }
    var xmd_id = xiangMuDetails[editIndex].id;
    var xmd_mc = xiangMuDetails[editIndex].lsh;
    window.top.addTabs({id:'503',title: '入库管理',close: true,url: '/LBStore/view/cangKu/ruKu/ruKu.html?xmd_id=' + xmd_id+'&xmd_mc='+xmd_mc,'refresh_flag':true});
}

function refreshXiangMuDetailChan(){
    chanXiangMuDetail(editIndex);
}

function chanXiangMuDetail(index){
    if (xiangMuDetails[index] === undefined) {
        return;
    }
    editIndex = index;
    curXiangMuDetail = xiangMuDetails[index];
    var ruKu = {};
    var tj = {"pageSize": 10, "currentPage": 1};
    ruKu.xmd_id = curXiangMuDetail.id;
    tj.paramters = ruKu;
    var options = {};
    options.url = "/LBStore/ruKu/listRuKuDetailsByPage.do";
    options.tj = tj;
    options.func = jxXiangMuDetailChan;
    options.ul = "#example3";
    queryPaginator(options);
    $("#xiangMuChanModal").modal({backdrop: 'static'});
}

function jxXiangMuDetailChan(json) {
    $("#tblXiangMuChan_body tr").remove();
    $.each(json.list, function (index, item) { //遍历返回的json
        var trStr = '<tr><td>' + item.wzmc + '</td><td>' + item.xhgg + '</td><td>' + item.dj + '</td><td>' + item.sl + '</td><td>' + (item.sl*item.dj).toFixed(2) + '</td><td>' + (item.state === 0?"未办理":"已办理") + '</td></tr>';
        $("#tblXiangMuChan_body").append(trStr);
    });
}