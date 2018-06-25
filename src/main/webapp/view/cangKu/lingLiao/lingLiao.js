var lingLiaos;
var optFlag = 1;
var editIndex = -1;
var editType;
var rkmx = [];
var optMxFlag = 1;
var editMxIndex = -1;
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
var dymx_opt = {data: [], yxData: [], func: calcDymx};
var tysx_opt = {data: [], ls: 2, lw: 70};

$(document).ready(function () {
    $('#inpSj').val(dateFormat(new Date()));
    $('#inpSj').datetimepicker({language:  'zh-CN',format: 'yyyy-mm-dd hh:ii',weekStart: 7,todayBtn:  1,autoclose: 1,todayHighlight: 1,startView: 2,forceParse: 0,showMeridian: 1});
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

function setTrager_a01() {
    $('#inpRkr').AutoComplete({'data': lb_allA01s, 'paramName': 'editA01'});
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
    $('#inpMxWz').AutoComplete({'data': lb_wuZiZiDians, 'afterSelectedHandler': selectWuZiZiDian});
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

function selectLingLiao_m() {
    $("#lingLiaoSelectModal").modal("show");
}

function selectWuZiZiDian(json) {
    editWzzd = json;
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
        $("#dvMxBzgg").show();
        $("#dvMxZl").show();
        $("#divMxDymx").show();
        buildDymx();
    }
}

function jxLingLiao(json) {
    $("#data_table_body tr").remove();
    lingLiaos = [];
    lingLiaos = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if (item.state === -1) {
            classStr = ' class="danger"';
        }
        item.lsh = item.lsh === undefined || item.lsh === null ? "" : item.lsh;
        item.gysmc = item.gysmc === undefined || item.gysmc === null ? "" : item.gysmc;
        item.khmc = item.khmc === undefined || item.khmc === null ? "" : item.khmc;
        var readStr = '<button class="btn btn-info btn-xs icon-file-alt" onclick="readLingLiao(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var editStr = '<button class="btn btn-info btn-xs icon-edit" onclick="editLingLiao(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var dealStr = '<button class="btn btn-info btn-xs icon-legal" onclick="dealLingLiao(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var delStr = '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteLingLiao(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var trStr = '<tr' + classStr + '><td>' + item.ckmc + '</td><td>' + item.lsh + '</td><td>' + item.gysmc + '</td><td>' + item.khmc + '</td><td>' + item.wz + '</td><td>' + item.sj + '</td><td>' + item.sl + '</td><td>'
                + readStr
                + (item.state === 0 ? editStr : "")
                + (item.state === 0 ? dealStr : "")
                + (item.state === 0 || item.state === -1 ? delStr : "") + '</td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function showSelectLingLiao() {
    $("#lingLiaoSelectModal").modal("show");
}

function selectLingLiao() {
    var lingLiao = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selLsh").val() !== "") {
        lingLiao.lsh = $("#selLsh").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        lingLiao.state = $("#selState").val();
    }
    if ($("#selCangKu").val() !== "" && $("#selCangKu").val() === selCangKu.mc) {
        lingLiao.ck_id = selCangKu.id;
    }
    tj.paramters = lingLiao;
    var options = {};
    options.url = "/LBStore/lingLiao/listLingLiaosByPage.do";
    options.tj = tj;
    options.func = jxLingLiao;
    options.ul = "#example";
    queryPaginator(options);
}

function selectLingLiao_m() {
    var lingLiao = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#inpSelWz").val() !== "") {
        lingLiao.wzmc = $("#inpSelWz").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        lingLiao.state = $("#selState").val();
    }
    if ($("#inpSelCk").val() !== "" && $("#inpSelCk").val() === selCangKu.mc) {
        lingLiao.ck_id = selCangKu.id;
    }
    if ($("#inpSelKh").val() !== "" && $("#inpSelKh").val() === selKeHu.mc) {
        lingLiao.kh_id = selKeHu.id;
    }
    if ($("#inpSelGys").val() !== "" && $("#inpSelGys").val() === selGongYingShang.mc) {
        lingLiao.gys_id = selGongYingShang.id;
    }
    if ($("#inpSelQrq").val() !== "") {
        lingLiao.qrq = $("#inpSelQrq").val();
    }
    if ($("#inpSelZrq").val() !== "") {
        lingLiao.zrq = $("#inpSelZrq").val();
    }
    tj.paramters = lingLiao;
    var options = {};
    options.url = "/LBStore/lingLiao/listLingLiaosByPage.do";
    options.tj = tj;
    options.func = jxLingLiao;
    options.ul = "#example";
    queryPaginator(options);
    $("#lingLiaoSelectModal").modal("hide");
}

function addLingLiao() {
    optFlag = 1;
    rkmx = [];
    editCangKu = {};
    editGongYingShang = {};
    editKeHu = {};
    $("#lingLiaoModel_title").html("新增领料单");
    $("#btnOk").html("保存");
    $("#divXzmx").show();
    $("#divSpr").hide();
    $("#inpGys").val("");
    $("#inpKh").val("");
    $("#inpDh").val("");
    $("#inpBz").val("");
    $("#inpSl").val(0);
    $("#inpJe").val(0);
    jxLingLiaoMingXi();
    $("#lingLiaoModal").modal("show");
}

function editLingLiao(index) {
    optFlag = 2;
    if (lingLiaos[index] === undefined) {
        optFlag = 1;
        return alert("请选择领料单");
    }
    $("#lingLiaoModel_title").html("修改领料单");
    $("#btnOk").html("保存");
    $("#divXzmx").show();
    $("#divSpr").hide();
    var lingLiao = lingLiaos[index];
    editIndex = index;
    selectLingLiaoDetail(lingLiao.id);
}

function readLingLiao(index) {
    optFlag = 4;
    if (lingLiaos[index] === undefined) {
        optFlag = 1;
        return alert("请选择领料单");
    }
    $("#lingLiaoModel_title").html("查看领料单");
    $("#btnOk").html("关闭");
    $("#divXzmx").hide();
    $("#divSpr").show();
    var lingLiao = lingLiaos[index];
    editIndex = index;
    selectLingLiaoDetail(lingLiao.id);
}

function selectLingLiaoDetail(id) {
    $.ajax({
        url: "/LBStore/lingLiao/getLingLiaoDetailById.do?id=" + id,
        contentType: "application/json",
        type: "get",
        cache: false,
        error: function (msg, textStatus) {
            alert("获取领料单信息失败");
        },
        success: function (json) {
            if (json.result === 0) {
                var lingLiao = json.lingLiao;
                rkmx = lingLiao.details;
                if ("供应商" === lingLiao.ly) {
                    $("#inpGys").val(lingLiao.gysmc);
                    editGongYingShang = {"id": lingLiao.gys_id, "mc": lingLiao.gysmc};
                } else if ("客户" === lingLiao.ly) {
                    $("#inpKh").val(lingLiao.khmc);
                    editKeHu = {"id": lingLiao.kh_id, "mc": lingLiao.khmc};
                }
                $("#inpCk").val(lingLiao.ckmc);
                editCangKu = {"id": lingLiao.ck_id, "mc": lingLiao.ckmc};
                $("#inpRkr").val(lingLiao.rkrmc);
                editA01 = {"id": lingLiao.rkr_id, "mc": lingLiao.rkrmc};
                selectCangKu(editCangKu);
                $("#inpDh").val(lingLiao.dh);
                $("#inpBz").val(lingLiao.bz);
                $("#inpSl").val(lingLiao.sl);
                $("#inpJe").val(lingLiao.je);
                $("#inpSj").val(lingLiao.sj);
                $("#inpSpr").val(lingLiao.sprmc);
                $("#inpSpsj").val(lingLiao.spsj);
                jxLingLiaoMingXi();
                $("#lingLiaoModal").modal("show");
            } else
                alert("获取领料单信息失败:" + json.msg !== undefined ? json.msg : "");
        }
    });
}

function dealLingLiao(index) {
    optFlag = 3;
    if (lingLiaos[index] === undefined) {
        optFlag = 1;
        return alert("请选择领料单");
    }
    $("#lingLiaoModel_title").html("办理领料单");
    $("#btnOk").html("办理");
    $("#divXzmx").hide();
    $("#divSpr").hide();
    var lingLiao = lingLiaos[index];
    editIndex = index;
    selectLingLiaoDetail(lingLiao.id);
}

function saveLingLiao() {
    if (optFlag === 4) {
        $("#lingLiaoModal").modal("hide");
        return;
    }
    if (rkmx.length < 1) {
        return alert("请增加领料明细！");
    }
    var lingLiao = {};
    var url = "";
    if (optFlag === 3) {
        if (lingLiaos[editIndex] === undefined) {
            return;
        }
        if (!confirm("确定办理领料单?")) {
            return;
        }
        lingLiao = lingLiaos[editIndex];
        url = "/LBStore/lingLiao/dealLingLiao.do";
    } else if (optFlag === 2) {
        if (lingLiaos[editIndex] === undefined) {
            return;
        }
        lingLiao = lingLiaos[editIndex];
        url = "/LBStore/lingLiao/updateLingLiao.do";
    } else if (optFlag === 1) {
        url = "/LBStore/lingLiao/saveLingLiao.do";
    }
    if ($("#inpCk").val() === "") {
        return alert("请输入仓库信息");
    } else {
        if ($("#inpCk").val() !== editCangKu.mc) {
            return alert("请输入仓库信息");
        } else {
            lingLiao.ck_id = editCangKu.id;
        }
    }
    lingLiao.ly = $("#inpLy").val();
    if ("供应商" === $("#inpLy").val()) {
        if ($("#inpGys").val() === "") {
            return alert("请输入供应商信息");
        } else {
            if ($("#inpGys").val() !== editGongYingShang.mc) {
                return alert("请输入供应商信息");
            } else {
                lingLiao.gys_id = editGongYingShang.id;
            }
        }
    } else if ("客户" === $("#inpLy").val()) {
        if ($("#inpKh").val() === "") {
            return alert("请输入客户信息");
        } else {
            if ($("#inpKh").val() !== editKeHu.mc) {
                return alert("请输入客户信息");
            } else {
                lingLiao.kh_id = editKeHu.id;
            }
        }
    }
    if ($("#inpRkr").val() === "") {
        return alert("请输入领料人信息");
    } else {
        if ($("#inpRkr").val() !== editA01.mc) {
            return alert("请输入领料人信息");
        } else {
            lingLiao.rkr_id = editA01.id;
        }
    }
    var wz = "";
    var wzs = [];
    for (var i = 0; i < rkmx.length; i++) {
        var e = rkmx[i];
        if (optFlag === 3) {
            if (e.kw === undefined || e.kw === null || e.kw === "") {
                return alert("领料单明细需要设置库位！");
            }
            if (e.dj === undefined || e.dj === null || e.dj === "") {
                return alert("领料单明细需要设置单价！");
            }
        }
        if(typeof e.dymx !== "string"){
            e.dymx = JSON.stringify(e.dymx);
        }
        if(typeof e.tysx !== "string"){
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
    lingLiao.details = rkmx;
    lingLiao.wz = wz;
    lingLiao.dh = $("#inpDh").val();
    lingLiao.bz = $("#inpBz").val();
    lingLiao.sl = $("#inpSl").val();
    lingLiao.je = $("#inpJe").val();
    lingLiao.sj = $("#inpSj").val();
    lingLiao.state = 0;
    var tsStr = optFlag === 3 ? "办理" : "保存";
    $.ajax({
        url: url,
        data: JSON.stringify(lingLiao),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert(tsStr + "失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#lingLiaoModal").modal("hide");
                selectLingLiao();
            } else {
                alert(tsStr + "失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteLingLiao(index) {
    if (lingLiaos[index] === undefined) {
        return alert("请选择领料单");
    }
    var lingLiao = lingLiaos[index];
    if (confirm("确定删除领料单：" + lingLiao.mc + "?")) {
        $.ajax({
            url: "/LBStore/lingLiao/deleteLingLiao.do?id=" + lingLiao.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectLingLiao();
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

function jxLingLiaoMingXi() {
    $("#tblWuZiMingXi_body tr").remove();
    $.each(rkmx, function (index, item) { //遍历返回的json
        if (item.tysx && item.tysx !== null && item.tysx !== "" && typeof item.tysx === 'string') {
            item.tysx = JSON.parse(item.tysx);
        } else if (item.tysx && typeof item.tysx === 'object') {

        } else {
            item.tysx = [];
        }
        var je = parseFloat(item.sl) * parseFloat(item.dj);
        var bj = optFlag === 4 ? '' : '<button class="btn btn-info btn-xs icon-edit" onclick="editLingLiaoMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var cz = optFlag === 3 || optFlag === 4 ? '' : '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteLingLiaoMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var trStr = '<tr><td>' + item.wzmc + '</td><td>' + item.pp + '</td><td>' + item.xhgg + '</td><td>' + item.sl + '</td><td>' + je + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-file-alt" onclick="readLingLiaoMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + bj
                + cz + '</td></tr>';
        $("#tblWuZiMingXi_body").append(trStr);
    });
}

function addLingLiaoMingXi() {
    optMxFlag = 1;
    dymx_opt = {data: [], yxData: [], func: calcDymx};
    editLeiBie = null;
    $("#lingLiaoMingXiModal_title").html("增加明细");
    $("#btnMxOk").html("保存");
    $("#inpMxWz").val("");
    $("#inpMxLb").val("");
    $("#inpMxPp").val("");
    $("#inpMxXhgg").val("");
    $("#inpMxScc").val("");
    $("#inpMxTxm").val("");
    $("#inpMxScrq").val("");
    $("#inpMxBzq").val("");
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
    $("#dvMxZl").hide();
    $("#lingLiaoMingXiModal").modal("show");
}

function editLingLiaoMingXi(index) {
    if (rkmx[index]) {
        optMxFlag = 2;
        editMxIndex = index;
        $("#lingLiaoMingXiModal_title").html("修改明细");
        $("#btnMxOk").html("保存");
        setLingLiaoMingXiData(index);
    }
}

function readLingLiaoMingXi(index) {
    if (rkmx[index]) {
        optMxFlag = 4;
        editMxIndex = index;
        $("#lingLiaoMingXiModal_title").html("查看明细");
        $("#btnMxOk").html("关闭");
        setLingLiaoMingXiData(index);
    }
}

function setLingLiaoMingXiData(index) {
    var m = rkmx[index];
    if (typeof m.dymx === "string") {
        m.dymx = JSON.parse(m.dymx);
    }
    dymx_opt = {data: [], yxData: m.dymx, func: calcDymx};
    editWzzd = {"id": m.wzzd_id, "mc": m.wzmc};
    $("#inpMxWz").val(m.wzmc);
    editLeiBie = {"id": m.wzlb_id, "mc": m.wzlb};
    $("#inpMxLb").val(m.wzlb);
    $("#inpMxPp").val(m.pp);
    editXhgg = {"id": m.xhgg_id, "mc": m.xhgg};
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
    if (rkmx[index].jlfs === "mx") {
        $("#divMxDymx").show();
    } else {
        $("#divMxDymx").hide();
    }
    $("#lingLiaoMingXiModal").modal("show");
}

function deleteLingLiaoMingXi(index) {
    if (rkmx[index]) {
        if (confirm("确定删除明细：" + rkmx[index].wzmc + "?")) {
            rkmx.splice(index, 1);
            jxLingLiaoMingXi();
        }
    }
}

function saveLingLiaoMingXi() {
    if(optMxFlag === 4){
        $("#lingLiaoMingXiModal").modal("hide");
        return;
    }
    if (!editLeiBie || editLeiBie === null) {
        return alert("物资类别不能为空");
    }
    if ($("#inpMxSl").val() === "") {
        return alert("请输入物资名称");
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
    mx.scrq = $("#inpMxScrq").val();
    mx.bzq = $("#inpMxBzq").val();
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
    if (optMxFlag === 1) {
        rkmx.push(mx);
    } else if (optMxFlag === 2) {
        rkmx[editMxIndex] = mx;
    }
    jxLingLiaoMingXi();
    var zsl = 0;
    var zje = 0;
    for (var i = 0; i < rkmx.length; i++) {
        var e = rkmx[i];
        zsl = e.sl + zsl;
        zje = e.sl * e.dj + zje;
    }
    $("#inpSl").val(zsl);
    $("#inpJe").val(zje.toFixed(3));
    $("#lingLiaoMingXiModal").modal("hide");
}
