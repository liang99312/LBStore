var tuiGongs;
var optFlag = 1;
var editIndex = -1;
var editType;
var tgmx = [];
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
var curKuCunDetail;
var dymx_opt = {data: [], yxData: [], func: calcDymx};
var tysx_opt = {data: [], ls: 3, lw: 70, upeditable: 1};

$(document).ready(function () {
    $('#inpSj').val(dateFormat(new Date()));
    $('#inpSj').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd hh:ii', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, startView: 2, forceParse: 0, showMeridian: 1});
    $('#inpSelQrq,#inpSelZrq,#inpMxScrq,#inpKcdSelQrq,#inpKcdSelZrq').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, minView: 2, startView: 2, forceParse: 0, showMeridian: 1});
    getAllA01s(setTrager_a01);
    getCangKus(setTrager_cangKu);
    getKeHus(setTrager_keHu);
    getWuZiZiDians(setTrager_ziDian);
    getWuZiLeiBies(setTrager_leiBie);
    getGongYingShangs(setTrager_gongYingShang);
    $("#inpMxScrq").datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, minView: 2, startView: 2, forceParse: 0, showMeridian: 1});

    $("#inpMxTgl").keyup(function () {
        if (curKuCunDetail && curKuCunDetail.jlfs === "zl") {
            var temp_tgl = parseFloat($("#inpMxTgl").val());
            var temp_tgzl = temp_tgl * curKuCunDetail.bzgg;
            $("#inpMxTgzl").val(temp_tgzl.toFixed(3));
        }
    });
    $("#inpMxTgzl").keyup(function () {
        if (curKuCunDetail && curKuCunDetail.jlfs === "zl") {
            var temp_tgzl = parseFloat($("#inpMxTgzl").val());
            var temp_tgl = temp_tgzl / curKuCunDetail.bzgg;
            $("#inpMxTgl").val(temp_tgl.toFixed(3));
        }
    });
});

function setTrager_a01() {
    $('#inpTgr').AutoComplete({'data': lb_allA01s, 'paramName': 'editA01'});
    $('#inpKcdSelRkr').AutoComplete({'data': lb_allA01s, 'paramName': 'selA01'});
}

function setTrager_cangKu() {
    $('#selCangKu').AutoComplete({'data': lb_cangKus, 'paramName': 'selCangKu'});
    $('#inpSelCk').AutoComplete({'data': lb_cangKus, 'paramName': 'selCangKu'});
    $('#inpCk').AutoComplete({'data': lb_cangKus, 'afterSelectedHandler': selectCangKu});
}

function setTrager_keHu() {
    $('#inpSelKh').AutoComplete({'data': lb_keHus, 'paramName': 'selKeHu'});
    $('#inpKcdSelKh').AutoComplete({'data': lb_keHus, 'paramName': 'selKeHu'});
}

function setTrager_ziDian() {
    $('#inpKcdSelWz').AutoComplete({'data': lb_wuZiZiDians, 'afterSelectedHandler': selectWuZiZiDian});
}

function setTrager_leiBie() {
    $('#inpKcdSelWzlb').AutoComplete({'data': lb_wuZiLeiBies, 'afterSelectedHandler': selectWuZiLeiBie});
}

function setTrager_gongYingShang() {
    $('#inpKcdSelGys').AutoComplete({'data': lb_gongYingShangs, 'paramName': 'selGongYingShang'});
}

function selectCangKu(json) {
    if (json.id !== editCangKu.id) {
        if (tgmx.length > 0) {
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
                    $('#inpKcdSelWz').AutoComplete({'data': json.sz, 'afterSelectedHandler': selectWuZiZiDian});
                }
            }
        });
    } else {
        $('#inpKcdSelWz').AutoComplete({'data': [], 'afterSelectedHandler': selectWuZiZiDian});
    }
}

function selectTuiGong_m() {
    $("#tuiGongSelectModal").modal({backdrop:'static'});
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
                    if ($('#inpKcdSelWzlb').val() !== json.wuZiZiDian.wzlb.mc) {
                        selectWuZiLeiBie(json.wuZiZiDian.wzlb);
                        $('#inpKcdSelWzlb').val(json.wuZiZiDian.wzlb.mc);
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

function jxTuiGong(json) {
    $("#data_table_body tr").remove();
    tuiGongs = [];
    tuiGongs = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if (item.state === -1) {
            classStr = ' class="danger"';
        }
        item.lsh = item.lsh === undefined || item.lsh === null ? "" : item.lsh;
        var readStr = '<button class="btn btn-info btn-xs icon-file-alt" onclick="readTuiGong(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var editStr = '<button class="btn btn-info btn-xs icon-edit" onclick="editTuiGong(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var dealStr = '<button class="btn btn-info btn-xs icon-legal" onclick="dealTuiGong(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var delStr = '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteTuiGong(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var trStr = '<tr' + classStr + '><td>' + item.ckmc + '</td><td>' + item.lsh + '</td><td>' + item.dh + '</td><td>' + item.wz + '</td><td>' + item.sj + '</td><td>' + item.sl + '</td><td>'
                + readStr
                + (item.state === 0 ? editStr : "")
                + (item.state === 0 ? dealStr : "")
                + (item.state === 0 || item.state === -1 ? delStr : "") + '</td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function showSelectTuiGong() {
    $("#tuiGongSelectModal").modal({backdrop:'static'});
}

function selectTuiGong() {
    var tuiGong = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selLsh").val() !== "") {
        tuiGong.lsh = $("#selLsh").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        tuiGong.state = $("#selState").val();
    }
    if ($("#selCangKu").val() !== "" && $("#selCangKu").val() === selCangKu.mc) {
        tuiGong.ck_id = selCangKu.id;
    }
    tj.paramters = tuiGong;
    var options = {};
    options.url = "/LBStore/tuiGong/listTuiGongsByPage.do";
    options.tj = tj;
    options.func = jxTuiGong;
    options.ul = "#example";
    queryPaginator(options);
}

function selectTuiGong_m() {
    var tuiGong = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#inpSelWz").val() !== "") {
        tuiGong.wzmc = $("#inpSelWz").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        tuiGong.state = $("#selState").val();
    }
    if ($("#inpSelCk").val() !== "" && $("#inpSelCk").val() === selCangKu.mc) {
        tuiGong.ck_id = selCangKu.id;
    }
    if ($("#inpSelKh").val() !== "" && $("#inpSelKh").val() === selKeHu.mc) {
        tuiGong.kh_id = selKeHu.id;
    }
    if ($("#inpSelQrq").val() !== "") {
        tuiGong.qrq = $("#inpSelQrq").val();
    }
    if ($("#inpSelZrq").val() !== "") {
        tuiGong.zrq = $("#inpSelZrq").val();
    }
    tj.paramters = tuiGong;
    var options = {};
    options.url = "/LBStore/tuiGong/listTuiGongsByPage.do";
    options.tj = tj;
    options.func = jxTuiGong;
    options.ul = "#example";
    queryPaginator(options);
    $("#tuiGongSelectModal").modal("hide");
}

function addTuiGong() {
    optFlag = 1;
    tgmx = [];
    editCangKu = {};
    $("#tuiGongModel_title").html("新增退供单");
    $("#btnOk").html("保存");
    $("#divXzmx").show();
    $("#divSpr").hide();
    $("#inpGys").val("");
    $("#inpDh").val("");
    $("#inpYy").val("");
    $("#inpBz").val("");
    $("#inpSl").val(0);
    $("#inpJe").val(0);
    jxTuiGongMingXi();
    $("#tuiGongModal").modal({backdrop:'static'});
}

function editTuiGong(index) {
    optFlag = 2;
    if (tuiGongs[index] === undefined) {
        optFlag = 1;
        return alert("请选择退供单");
    }
    $("#tuiGongModel_title").html("修改退供单");
    $("#btnOk").html("保存");
    $("#divXzmx").show();
    $("#divSpr").hide();
    var tuiGong = tuiGongs[index];
    editIndex = index;
    selectTuiGongDetail(tuiGong.id);
}

function readTuiGong(index) {
    optFlag = 4;
    if (tuiGongs[index] === undefined) {
        optFlag = 1;
        return alert("请选择退供单");
    }
    $("#tuiGongModel_title").html("查看退供单");
    $("#btnOk").html("关闭");
    $("#divXzmx").hide();
    $("#divSpr").show();
    var tuiGong = tuiGongs[index];
    editIndex = index;
    selectTuiGongDetail(tuiGong.id);
}

function selectTuiGongDetail(id) {
    $.ajax({
        url: "/LBStore/tuiGong/getTuiGongDetailById.do?id=" + id,
        contentType: "application/json",
        type: "get",
        cache: false,
        error: function (msg, textStatus) {
            alert("获取退供单信息失败");
        },
        success: function (json) {
            if (json.result === 0) {
                var tuiGong = json.tuiGong;
                tgmx = tuiGong.details;
                $("#inpCk").val(tuiGong.ckmc);
                editCangKu = {"id": tuiGong.ck_id, "mc": tuiGong.ckmc};
                $("#inpTgr").val(tuiGong.tgrmc);
                editA01 = {"id": tuiGong.tgr_id, "mc": tuiGong.tgrmc};
                selectCangKu(editCangKu);
                $("#inpDh").val(tuiGong.dh);
                $("#inpYy").val(tuiGong.yy);
                $("#inpBz").val(tuiGong.bz);
                $("#inpSl").val(tuiGong.sl);
                $("#inpJe").val(tuiGong.je);
                $("#inpSj").val(tuiGong.sj);
                $("#inpSpr").val(tuiGong.sprmc);
                $("#inpSpsj").val(tuiGong.spsj);
                jxTuiGongMingXi();
                $("#tuiGongModal").modal({backdrop:'static'});
            } else
                alert("获取退供单信息失败:" + json.msg !== undefined ? json.msg : "");
        }
    });
}

function dealTuiGong(index) {
    optFlag = 3;
    if (tuiGongs[index] === undefined) {
        optFlag = 1;
        return alert("请选择退供单");
    }
    $("#tuiGongModel_title").html("办理退供单");
    $("#btnOk").html("办理");
    $("#divXzmx").hide();
    $("#divSpr").hide();
    var tuiGong = tuiGongs[index];
    editIndex = index;
    selectTuiGongDetail(tuiGong.id);
}

function saveTuiGong() {
    if (optFlag === 4) {
        $("#tuiGongModal").modal("hide");
        return;
    }
    if (tgmx.length < 1) {
        return alert("请增加退供明细！");
    }
    var tuiGong = {};
    var url = "";
    if (optFlag === 3) {
        if (tuiGongs[editIndex] === undefined) {
            return;
        }
        if (!confirm("确定办理退供单?")) {
            return;
        }
        tuiGong = tuiGongs[editIndex];
        url = "/LBStore/tuiGong/dealTuiGong.do";
    } else if (optFlag === 2) {
        if (tuiGongs[editIndex] === undefined) {
            return;
        }
        tuiGong = tuiGongs[editIndex];
        url = "/LBStore/tuiGong/updateTuiGong.do";
    } else if (optFlag === 1) {
        url = "/LBStore/tuiGong/saveTuiGong.do";
    }
    if ($("#inpCk").val() === "") {
        return alert("请输入仓库信息");
    } else {
        if ($("#inpCk").val() !== editCangKu.mc) {
            return alert("请输入仓库信息");
        } else {
            tuiGong.ck_id = editCangKu.id;
        }
    }
    if ($("#inpTgr").val() === "") {
        return alert("请输入退供人信息");
    } else {
        if ($("#inpTgr").val() !== editA01.mc) {
            return alert("请输入退供人信息");
        } else {
            tuiGong.tgr_id = editA01.id;
        }
    }
    var wz = "";
    var wzs = [];
    for (var i = 0; i < tgmx.length; i++) {
        var e = tgmx[i];
        if (e.ck_id !== tuiGong.ck_id) {
            return alert("退供明细仓库和退供单仓库不匹配！");
        }
        if (optFlag === 3) {
            if (e.kw === undefined || e.kw === null || e.kw === "") {
                return alert("退供单明细需要设置库位！");
            }
            if (e.dj === undefined || e.dj === null || e.dj === "") {
                return alert("退供单明细需要设置单价！");
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
    tuiGong.details = tgmx;
    tuiGong.wz = wz;
    tuiGong.dh = $("#inpDh").val();
    tuiGong.yy = $("#inpYy").val();
    tuiGong.bz = $("#inpBz").val();
    tuiGong.sl = $("#inpSl").val();
    tuiGong.je = $("#inpJe").val();
    tuiGong.sj = $("#inpSj").val();
    tuiGong.state = 0;
    var tsStr = optFlag === 3 ? "办理" : "保存";
    $.ajax({
        url: url,
        data: JSON.stringify(tuiGong),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert(tsStr + "失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#tuiGongModal").modal("hide");
                selectTuiGong();
            } else {
                alert(tsStr + "失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteTuiGong(index) {
    if (tuiGongs[index] === undefined) {
        return alert("请选择退供单");
    }
    var tuiGong = tuiGongs[index];
    if (confirm("确定删除退供单：" + tuiGong.dh + "?")) {
        $.ajax({
            url: "/LBStore/tuiGong/deleteTuiGong.do?id=" + tuiGong.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectTuiGong();
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
        $("#inpMxTgl").val(dymx_opt.yxData.length);
        $("#inpMxTgzl").val(zl.toFixed(3));
    }
}

function jxTuiGongMingXi() {
    $("#tblWuZiMingXi_body tr").remove();
    $.each(tgmx, function (index, item) { //遍历返回的json
        if (item.tysx && item.tysx !== null && item.tysx !== "" && typeof item.tysx === 'string') {
            item.tysx = JSON.parse(item.tysx);
        } else if (item.tysx && typeof item.tysx === 'object') {

        } else {
            item.tysx = [];
        }
        var je = parseFloat(item.tgl) * parseFloat(item.dj);
        var bj = optFlag === 3 || optFlag === 4 ? '' : '<button class="btn btn-info btn-xs icon-edit" onclick="editTuiGongMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var cz = optFlag === 3 || optFlag === 4 ? '' : '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteTuiGongMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var trStr = '<tr><td>' + item.wzmc + '</td><td>' + item.pp + '</td><td>' + item.xhgg + '</td><td>' + item.tgl + '</td><td>' + je + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-file-alt" onclick="readTuiGongMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + bj
                + cz + '</td></tr>';
        $("#tblWuZiMingXi_body").append(trStr);
    });
}

function addTuiGongMingXi() {
    if ($("#inpCk").val() === "" || $("#inpCk").val() !== editCangKu.mc) {
        return alert("请选择退供仓库");
    }
    optMxFlag = 1;
    dymx_opt = {data: [], yxData: [], func: calcDymx};
    editLeiBie = null;
    $("#tuiGongMingXiModal_title").html("增加明细");
    $("#selKuCunDetailModal").modal({backdrop:'static'});
}

function editTuiGongMingXi(index) {
    if (tgmx[index]) {
        optMxFlag = 2;
        editMxIndex = index;
        $("#tuiGongMingXiModal_title").html("修改明细");
        $("#btnMxOk").html("保存");
        var temp = tgmx[index];
        cxKuCunDetailById(temp.lld_id, index);
    }
}

function readTuiGongMingXi(index) {
    if (tgmx[index]) {
        optMxFlag = 4;
        editMxIndex = index;
        $("#tuiGongMingXiModal_title").html("查看明细");
        $("#btnMxOk").html("关闭");
        var temp = tgmx[index];
        cxKuCunDetailById(temp.rkd_id, index);
    }
}

function deleteTuiGongMingXi(index) {
    if (tgmx[index]) {
        if (confirm("确定删除明细：" + tgmx[index].wzmc + "?")) {
            tgmx.splice(index, 1);
            jxTuiGongMingXi();
        }
    }
}

function saveTuiGongMingXi() {
    if (optMxFlag === 4) {
        $("#tuiGongMingXiModal").modal("hide");
        return;
    }
    if (!editLeiBie || editLeiBie === null) {
        return alert("物资类别不能为空");
    }
    if ($("#inpMxTgl").val() === "") {
        return alert("请输入退供数量");
    }
    var mx = {};
    if ($("#inpMxWz").val() === "") {
        return alert("请输入物资名称");
    } else {
        if (!editWzzd || $("#inpMxWz").val() !== editWzzd.mc) {
            mx.wzzd_id = -1;
        } else {
            mx.wzzd_id = editWzzd.id;
        }
    }
    mx.wzlb_id = editLeiBie.id;
    mx.wzmc = $("#inpMxWz").val();
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
    mx.tgl = parseFloat($("#inpMxTgl").val());
    mx.tgzl = parseFloat($("#inpMxTgzl").val());
    if(mx.jlfs === "pt"){
        mx.tgzl = mx.tgl;
    }else{
        if (mx.tgzl === undefined || mx.tgzl === "" || mx.tgzl < 0.001) {
            mx.tgzl = mx.tgl;
        }
    }
    mx.rkd_id = curKuCunDetail.rkd_id;
    mx.kc_id = curKuCunDetail.id;
    mx.gys_id = curKuCunDetail.gys_id;
    mx.ck_id = curKuCunDetail.ck_id;
    if (optMxFlag === 1) {
        tgmx.push(mx);
    } else if (optMxFlag === 2) {
        tgmx[editMxIndex] = mx;
    }
    jxTuiGongMingXi();
    var zsl = 0;
    var zje = 0;
    for (var i = 0; i < tgmx.length; i++) {
        var e = tgmx[i];
        zsl = e.tgl + zsl;
        zje = e.tgl * e.dj + zje;
    }
    $("#inpSl").val(zsl);
    $("#inpJe").val(zje.toFixed(3));
    $("#tuiGongMingXiModal").modal("hide");
    curKuCunDetail = null;
}

function cxKuCunDetail() {
    var ruKuDetail = {};
    ruKuDetail.ck_id = editCangKu.id;
    if ($("#inpKcdSelWzlb").val() !== "" && $("#inpKcdSelWzlb").val() === selLeiBie.mc) {
        ruKuDetail.wzlb_id = selLeiBie.id;
    }
    if ($("#inpKcdSelWz").val() !== "") {
        ruKuDetail.wzmc = $("#inpKcdSelWz").val();
    }
    if ($("#inpKcdSelXhgg").val() !== "") {
        ruKuDetail.xhgg = $("#inpKcdSelXhgg").val();
    }
    if ($("#inpKcdSelKh").val() !== "" && $("#inpKcdSelKh").val() === selKeHu.mc) {
        ruKuDetail.kh_id = selKeHu.id;
    }
    if ($("#inpKcdSelGys").val() !== "" && $("#inpKcdSelGys").val() === selGongYingShang.mc) {
        ruKuDetail.gys_id = selGongYingShang.id;
    }
    if ($("#inpKcdSelRkr").val() !== "" && $("#inpKcdSelRkr").val() === selA01.mc) {
        ruKuDetail.rkr_id = selA01.id;
    }
    if ($("#inpKcdSelQrq").val() !== "") {
        ruKuDetail.qrq = $("#inpKcdSelQrq").val();
    }
    if ($("#inpKcdSelZrq").val() !== "") {
        ruKuDetail.zrq = $("#inpKcdSelZrq").val();
    }
    if ($("#inpKcdSelLsh").val() !== "") {
        ruKuDetail.lsh = $("#inpKcdSelLsh").val();
    }
    if ($("#inpKcdSelTxm").val() !== "") {
        ruKuDetail.txm = $("#inpKcdSelTxm").val();
    }
    $.ajax({
        url: "/LBStore/kuCun/getKuCunTop100.do?",
        data: JSON.stringify(ruKuDetail),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("查询库存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                var sz = json.sz;
                jxKuCunDetail(sz);
            } else {
                alert("查询库存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function jxKuCunDetail(sz) {
    $("#tblKuCunDetail_body tr").remove();
    ruKuDetails = [];
    ruKuDetails = sz;
    $.each(sz, function (index, item) { //遍历返回的json
        var trStr = '<tr><td>' + item.dh + '</td><td>' + item.wzmc + '</td><td>' + item.pp + '</td><td>' + item.xhgg + '</td><td>' + item.zl + '</td><td>' + item.rksj + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-plus" onclick="selKuCunDetail(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#tblKuCunDetail_body").append(trStr);
    });
}

function selKuCunDetail(index) {
    curKuCunDetail = null;
    if (ruKuDetails.length <= index) {
        return;
    }
    var detail = ruKuDetails[index];
    for (var i = 0; i < tgmx.length; i++) {
        var e = tgmx[i];
        if (e.kc_id === detail.id) {
            return alert("该库存物资已选择");
        }
    }
    setKcdData(detail);
}

function setKcdData(detail, index) {
    curKuCunDetail = detail;
    var m = tgmx[index];
    m = m ? m : {};
    if (m.dymx) {
        if(typeof m.dymx === "string"){
            m.dymx = JSON.parse(m.dymx);
        }
    } else {
        m.dymx = [];
    }
    m.tgl = m.tgl ? m.tgl : 0;
    m.tgzl = m.tgzl ? m.tgzl : 0;
    if (detail.dymx && typeof detail.dymx === "string") {        
        detail.dymx = JSON.parse(detail.dymx);
    } else {
        detail.dymx = [];
    }
    dymx_opt = {data: detail.dymx, yxData: m.dymx, func: calcDymx};
    editWzzd = {"id": detail.wzzd_id, "mc": detail.wzmc};
    $("#inpMxWz").val(detail.wzmc);
    editLeiBie = {"id": detail.wzlb_id, "mc": detail.wzlb};
    $("#inpMxLb").val(detail.wzlb);
    $("#inpMxPp").val(detail.pp);
    editXhgg = {"id": detail.xhgg_id, "mc": detail.xhgg};
    $("#inpMxXhgg").val(detail.xhgg);
    $("#inpMxScc").val(detail.scc);
    $("#inpMxTxm").val(detail.txm);
    $("#inpMxPc").val(detail.pc);
    $("#inpMxScrq").val(detail.scrq);
    $("#inpMxBzq").val(detail.bzq);
    $("#inpMxDj").val(detail.dj);
    $("#inpMxDw").val(detail.dw);
    $("#inpMxJlfs").val(detail.jlfs);
    $("#inpMxBzgg").val(detail.bzgg);
    $("#inpMxSyl").val(detail.syl);
    $("#inpMxZlDw").val(detail.zldw);
    $("#inpMxSyzl").val(detail.syzl);
    $("#inpMxKwh").val(detail.kw);
    $("#inpMxRkr").val(detail.rkrmc);
    buildTysx(detail.tysx);
    $("#inpMxTgl").val(m.tgl);
    $("#inpMxTgzl").val(m.tgzl);
    buildDymx();
    if (detail.jlfs === "mx") {
        $("#divMxDymx").show();
    } else {
        $("#divMxDymx").hide();
    }
    selectMxJlfs();
    $("#selKuCunDetailModal").modal("hide");
    $("#tuiGongMingXiModal").modal({backdrop:'static'});
}

function cxKuCunDetailById(id, index) {
    $.ajax({
        url: "/LBStore/kuCun/getKuCunById.do?id=" + id,
        contentType: "application/json",
        type: "get",
        cache: false,
        error: function (msg, textStatus) {
            alert("查询库存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                var kuCun = json.kuCun;
                setKcdData(kuCun, index);
            } else {
                alert("查询库存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}
