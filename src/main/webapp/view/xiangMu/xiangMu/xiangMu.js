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
var selKeHu;
var editKeHu;
var selKuWei;
var editA01;
var editFeiA01;
var selBaoBiao;
var tysx_opt = {data: [], ls: 2, lw: 70};

$(document).ready(function () {
    $('#inpSj').val(dateFormat(new Date()));
    $('#inpSj,#inpFeiRq').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd hh:ii', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, startView: 2, forceParse: 0, showMeridian: 1});
    $('#inpSelQrq,#inpSelZrq,#inpMxScrq').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, minView: 2, startView: 2, forceParse: 0, showMeridian: 1});
    getAllA01s(setTrager_a01);
    getKeHus(setTrager_keHu);
    getWuZiZiDians(setTrager_ziDian);
    getWuZiLeiBies(setTrager_leiBie);
    getBaoBiaosByMk("503", setTrager_baoBiao);
    $("#inpMxScrq").datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, minView: 2, startView: 2, forceParse: 0, showMeridian: 1});   
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
    $('#inpMxLb').AutoComplete({'data': lb_wuZiLeiBies, 'afterSelectedHandler': selectWuZiLeiBie});
}

function setTrager_baoBiao() {
    $('#inpSelBb').AutoComplete({'data': lb_baoBiaos, 'paramName': 'selBaoBiao'});
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
    $("#inpMxBzgg").val(m.bzgg);
    $("#inpMxZldw").val(m.zldw);
    $("#inpMxZl").val(m.zl);
    buildTysx(m.tysx);
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
        var trStr = '<tr' + classStr + '><td>' + item.ckmc + '</td><td>' + item.lsh + '</td><td>' + item.khmc + '</td><td>' + item.wz + '</td><td>' + item.sj + '</td><td>' + item.sl + '</td><td>'
                + readStr
                + (item.state === 0 ? editStr : "")
                + (item.state === 0 ? dealStr : "")
                + (item.state === 0 || item.state === -1 ? delStr : "")
                + (item.state > 0 ? feiStr : "")
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
    $("#inpKh").val("");
    $("#inpDh").val("");
    $("#inpBz").val("");
    $("#inpSl").val(0);
    $("#inpJe").val(0);
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
    var xiangMu = xiangMus[index];
    editIndex = index;
    $("#dvMxCanKao").hide();
    selectXiangMuDetail(xiangMu.id, jxReadXiangMu);
}

function jxReadXiangMu(xiangMu) {
    bbXiangMu = xiangMu;
    xmmx = xiangMu.details;
    $("#inpKh").val(xiangMu.khmc);
    editKeHu = {"id": xiangMu.kh_id, "mc": xiangMu.khmc};
    $("#inpKdr").val(xiangMu.xmrmc);
    editA01 = {"id": xiangMu.xmr_id, "mc": xiangMu.xmrmc};
    $("#inpDh").val(xiangMu.dh);
    $("#inpBz").val(xiangMu.bz);
    $("#inpSl").val(xiangMu.sl);
    $("#inpJe").val(xiangMu.je);
    $("#inpSj").val(xiangMu.sj);
    $("#inpSpr").val(xiangMu.sprmc);
    $("#inpSpsj").val(xiangMu.spsj);
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
            xiangMu.xmr_id = editA01.id;
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
    xiangMu.details = xmmx;
    xiangMu.wz = wz;
    xiangMu.dh = $("#inpDh").val();
    xiangMu.bz = $("#inpBz").val();
    xiangMu.sl = parseFloat($("#inpSl").val());
    xiangMu.je = parseFloat($("#inpJe").val());
    xiangMu.sj = $("#inpSj").val();
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

function jxXiangMuMingXi() {
    $("#tblWuZiMingXi_body tr").remove();
    $.each(xmmx, function (index, item) { //遍历返回的json
        if (item.tysx && item.tysx !== null && item.tysx !== "" && typeof item.tysx === 'string') {
            item.tysx = JSON.parse(item.tysx);
        } else if (item.tysx && typeof item.tysx === 'object') {

        } else {
            item.tysx = [];
        }
        var je = parseFloat(item.sl) * parseFloat(item.dj);
        var bj = optFlag === 4 ? '' : '<button class="btn btn-info btn-xs icon-edit" onclick="editXiangMuMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var cz = optFlag === 3 || optFlag === 4 ? '' : '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteXiangMuMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var trStr = '<tr><td>' + item.wzmc + '</td><td>' + item.pp + '</td><td>' + item.xhgg + '</td><td>' + item.sl + '</td><td>' + je + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-file-alt" onclick="readXiangMuMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + bj
                + cz + '</td></tr>';
        $("#tblWuZiMingXi_body").append(trStr);
    });
}

function addXiangMuMingXi() {
    optMxFlag = 1;
    editLeiBie = null;
    $("#xiangMuMingXiModal_title").html("增加明细");
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
    $("#inpMxBzgg").val("1");
    $("#inpMxZldw").val("");
    $("#inpMxZl").val("");
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
    var m = xmmx[index];
    editWzzd = {"id": m.wzzd_id, "mc": m.wzmc, "bm": m.wzbm};
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
    $("#inpMxBzgg").val(m.bzgg);
    $("#inpMxZldw").val(m.zldw);
    $("#inpMxZl").val(m.zl);
    buildTysx(m.tysx);
    $("#xiangMuMingXiModal").modal({backdrop: 'static'});
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
    if ($("#inpMxSl").val() === "") {
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
    mx.pp = $("#inpMxPp").val();
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
    mx.bzgg = parseFloat($("#inpMxBzgg").val());
    mx.zldw = $("#inpMxZldw").val();
    mx.zl = $("#inpMxZl").val();
    mx.tysx = JSON.stringify(tysx_opt.data);
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
        zsl = e.sl + zsl;
        zje = e.sl * e.dj + zje;
    }
    $("#inpSl").val(zsl);
    $("#inpJe").val(zje.toFixed(3));
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
