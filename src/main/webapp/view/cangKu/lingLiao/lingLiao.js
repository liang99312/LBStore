var lingLiaos;
var optFlag = 1;
var editIndex = -1;
var editType;
var llmx = [];
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
var editKeHu;
var selGongYingShang;
var selKuWei;
var editCangKu;
var editA01;
var selA01;
var curKuCun;
var dymx_opt = {data: [], yxData: [], func: calcDymx};
var tysx_opt = {data: [], ls: 3, lw: 70,upeditable: 1};

$(document).ready(function () {
    $('#inpSj').val(dateFormat(new Date()));
    $('#inpSj').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd hh:ii', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, startView: 2, forceParse: 0, showMeridian: 1});
    $('#inpSelQrq,#inpSelZrq,#inpMxScrq,#inpKcSelQrq,#inpKcSelZrq').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, minView: 2, startView: 2, forceParse: 0, showMeridian: 1});
    getAllA01s(setTrager_a01);
    getCangKus(setTrager_cangKu);
    getKeHus(setTrager_keHu);
    getWuZiZiDians(setTrager_ziDian);
    getWuZiLeiBies(setTrager_leiBie);
    getGongYingShangs(setTrager_gongYingShang);
    $("#inpMxScrq").datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, minView: 2, startView: 2, forceParse: 0, showMeridian: 1});
    $(".ll_kh").hide();
    $("#inpLy").change(function () {
        if ($("#inpLy").val() === "供应商") {
            $(".ll_gys").removeAttr("disabled").show();
            $(".ll_kh").hide();
        } else if ($("#inpLy").val() === "客户") {
            $(".ll_gys").hide();
            $(".ll_kh").show();
        } else {
            $(".ll_gys").val("").attr("disabled", "disabled").show();
            $(".ll_kh").hide();
        }
    });
    $("#inpMxSll").keyup(function(){
        if(curKuCun && curKuCun.jlfs === "zl"){
            var temp_sll = parseFloat($("#inpMxSll").val());
            var temp_slzl = temp_sll*curKuCun.bzgg;
            $("#inpMxSlzl").val(temp_slzl.toFixed(3));
        }
    });
    $("#inpMxSlzl").keyup(function(){
        if(curKuCun && curKuCun.jlfs === "zl"){
            var temp_slzl = parseFloat($("#inpMxSlzl").val());
            var temp_sll = temp_slzl/curKuCun.bzgg;
            $("#inpMxSll").val(temp_sll.toFixed(3));
        }
    });
});

function setTrager_a01() {
    $('#inpLlr').AutoComplete({'data': lb_allA01s, 'paramName': 'editA01'});
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
}

function setTrager_leiBie() {
    $('#inpKcSelWzlb').AutoComplete({'data': lb_wuZiLeiBies, 'afterSelectedHandler': selectWuZiLeiBie});
}

function setTrager_gongYingShang(){
    $('#inpKcSelGys').AutoComplete({'data': lb_gongYingShangs, 'paramName': 'selGongYingShang'});
}

function selectCangKu(json){
    if(json.id !== editCangKu.id){
        if(llmx.length > 0){
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

function selectLingLiao_m() {
    $("#lingLiaoSelectModal").modal("show");
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
                    if($('#inpKcSelWzlb').val() !== json.wuZiZiDian.wzlb.mc){
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
        var readStr = '<button class="btn btn-info btn-xs icon-file-alt" onclick="readLingLiao(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var editStr = '<button class="btn btn-info btn-xs icon-edit" onclick="editLingLiao(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var dealStr = '<button class="btn btn-info btn-xs icon-legal" onclick="dealLingLiao(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var delStr = '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteLingLiao(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var trStr = '<tr' + classStr + '><td>' + item.ckmc + '</td><td>' + item.lsh + '</td><td>' + item.dh + '</td><td>' + item.wz + '</td><td>' + item.sj + '</td><td>' + item.sl + '</td><td>'
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
    llmx = [];
    editCangKu = {};
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
                llmx = lingLiao.details;
                $("#inpKh").val(lingLiao.khmc);
                $("#inpCk").val(lingLiao.ckmc);
                editCangKu = {"id": lingLiao.ck_id, "mc": lingLiao.ckmc};
                editKeHu = {"id": lingLiao.kh_id, "mc": lingLiao.khmc};
                $("#inpLlr").val(lingLiao.llrmc);
                editA01 = {"id": lingLiao.llr_id, "mc": lingLiao.llrmc};
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
    if (llmx.length < 1) {
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
    if ($("#inpKh").val() === "") {
        return alert("请输入客户信息");
    } else {
        if ($("#inpKh").val() !== editKeHu.mc) {
            return alert("请输入客户信息");
        } else {
            lingLiao.kh_id = editKeHu.id;
        }
    }
    if ($("#inpLlr").val() === "") {
        return alert("请输入领料人信息");
    } else {
        if ($("#inpLlr").val() !== editA01.mc) {
            return alert("请输入领料人信息");
        } else {
            lingLiao.llr_id = editA01.id;
        }
    }
    var wz = "";
    var wzs = [];
    for (var i = 0; i < llmx.length; i++) {
        var e = llmx[i];
        if (optFlag === 3) {
            if (e.kw === undefined || e.kw === null || e.kw === "") {
                return alert("领料单明细需要设置库位！");
            }
            if (e.dj === undefined || e.dj === null || e.dj === "") {
                return alert("领料单明细需要设置单价！");
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
    lingLiao.details = llmx;
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
    if (confirm("确定删除领料单：" + lingLiao.dh + "?")) {
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
    $("#tblMxDymx").selectDetailTable(dymx_opt);
    $("#tblMxDymx input:last").focus();
}

function calcDymx() {
    if (dymx_opt.yxData) {
        var zl = 0;
        for (var i = 0; i < dymx_opt.yxData.length; i++) {
            zl += parseFloat(dymx_opt.yxData[i].val);
        }
        $("#inpMxSll").val(dymx_opt.yxData.length);
        $("#inpMxSlzl").val(zl.toFixed(3));
    }
}

function jxLingLiaoMingXi() {
    $("#tblWuZiMingXi_body tr").remove();
    $.each(llmx, function (index, item) { //遍历返回的json
        if (item.tysx && item.tysx !== null && item.tysx !== "" && typeof item.tysx === 'string') {
            item.tysx = JSON.parse(item.tysx);
        } else if (item.tysx && typeof item.tysx === 'object') {

        } else {
            item.tysx = [];
        }
        var je = parseFloat(item.sll) * parseFloat(item.dj);
        var bj = optFlag === 3 || optFlag === 4 ? '' : '<button class="btn btn-info btn-xs icon-edit" onclick="editLingLiaoMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var cz = optFlag === 3 || optFlag === 4 ? '' : '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteLingLiaoMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var trStr = '<tr><td>' + item.wzmc + '</td><td>' + item.pp + '</td><td>' + item.xhgg + '</td><td>' + item.sll + '</td><td>' + je + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-file-alt" onclick="readLingLiaoMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + bj
                + cz + '</td></tr>';
        $("#tblWuZiMingXi_body").append(trStr);
    });
}

function addLingLiaoMingXi() {
    if($("#inpCk").val() === "" || $("#inpCk").val() !== editCangKu.mc){
        return alert("请选择领料仓库");
    }
    optMxFlag = 1;
    dymx_opt = {data: [], yxData: [], func: calcDymx};
    editLeiBie = null;
    $("#lingLiaoMingXiModal_title").html("增加明细");
    $("#selKuCunModal").modal("show");
}

function editLingLiaoMingXi(index) {
    if (llmx[index]) {
        optMxFlag = 2;
        editMxIndex = index;
        $("#lingLiaoMingXiModal_title").html("修改明细");
        $("#btnMxOk").html("保存");
        var temp = llmx[index];
        cxKuCunById(temp.kc_id,index);
    }
}

function readLingLiaoMingXi(index) {
    if (llmx[index]) {
        optMxFlag = 4;
        editMxIndex = index;
        $("#lingLiaoMingXiModal_title").html("查看明细");
        $("#btnMxOk").html("关闭");
        var temp = llmx[index];
        cxKuCunById(temp.kc_id,index);
    }
}

function deleteLingLiaoMingXi(index) {
    if (llmx[index]) {
        if (confirm("确定删除明细：" + llmx[index].wzmc + "?")) {
            llmx.splice(index, 1);
            jxLingLiaoMingXi();
        }
    }
}

function saveLingLiaoMingXi() {
    if (optMxFlag === 4) {
        $("#lingLiaoMingXiModal").modal("hide");
        return;
    }
    if (!editLeiBie || editLeiBie === null) {
        return alert("物资类别不能为空");
    }
    if ($("#inpMxSll").val() === "") {
        return alert("请输入申领数量");
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
    mx.jlfs = $("#inpMxJlfs").val();
    mx.bzgg = $("#inpMxBzgg").val();
    mx.zldw = $("#inpMxZldw").val();
    mx.kw = $("#inpMxKwh").val();
    mx.dymx = JSON.stringify(dymx_opt.yxData);
    mx.tysx = JSON.stringify(tysx_opt.data);
    mx.sll = parseFloat($("#inpMxSll").val());
    mx.slzl = parseFloat($("#inpMxSlzl").val());
    if(mx.slzl === undefined || mx.slzl === "" || mx.slzl < 0.001){
        mx.slzl = mx.sll;
    }
    mx.kc_id = curKuCun.id;
    if (optMxFlag === 1) {
        llmx.push(mx);
    } else if (optMxFlag === 2) {
        llmx[editMxIndex] = mx;
    }
    jxLingLiaoMingXi();
    var zsl = 0;
    var zje = 0;
    for (var i = 0; i < llmx.length; i++) {
        var e = llmx[i];
        zsl = e.sll + zsl;
        zje = e.sll * e.dj + zje;
    }
    $("#inpSl").val(zsl);
    $("#inpJe").val(zje.toFixed(3));
    $("#lingLiaoMingXiModal").modal("hide");
    curKuCun = null;
}

function cxKuCun(){
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

function jxKuCun(sz){
    $("#tblKuCun_body tr").remove();
    kuCuns = [];
    kuCuns = sz;
    $.each(sz, function (index, item) { //遍历返回的json
        var trStr = '<tr><td>' + item.wzmc + '</td><td>' + item.pp + '</td><td>' + item.xhgg + '</td><td>' + item.zl + '</td><td>' + item.syzl + '</td><td>' + item.kw + '</td><td>' + item.rksj + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-plus" onclick="selKuCun(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#tblKuCun_body").append(trStr);
    });
}

function selKuCun(index){
    curKuCun = null;
    if(kuCuns.length <= index){
        return;
    }
    var kc = kuCuns[index];
    setKcCunData(kc);
}

function setKcCunData(kc,index) {
    curKuCun = kc;
    var m = llmx[index];
    m = m? m:{};
    if (m.dymx && typeof m.dymx === "string") {
        m.dymx = JSON.parse(m.dymx);
    }else{
        m.dymx = [];
    }
    m.sll = m.sll? m.sll:0;
    m.slzl = m.slzl? m.slzl:0;
    if (kc.dymx && typeof kc.dymx === "string") {
        kc.dymx = JSON.parse(kc.dymx);
    }
    dymx_opt = {data: kc.dymx, yxData: m.dymx, func: calcDymx};
    editWzzd = {"id": kc.wzzd_id, "mc": kc.wzmc};
    $("#inpMxWz").val(kc.wzmc);
    editLeiBie = {"id": kc.wzlb_id, "mc": kc.wzlb};
    $("#inpMxLb").val(kc.wzlb);
    $("#inpMxPp").val(kc.pp);
    editXhgg = {"id": kc.xhgg_id, "mc": kc.xhgg};
    $("#inpMxXhgg").val(kc.xhgg);
    $("#inpMxScc").val(kc.scc);
    $("#inpMxTxm").val(kc.txm);
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
    $("#inpMxSll").val(m.sll);
    $("#inpMxSlzl").val(m.slzl);
    buildDymx();
    if (kc.jlfs === "mx") {
        $("#divMxDymx").show();
    } else {
        $("#divMxDymx").hide();
    }
    selectMxJlfs();
    $("#selKuCunModal").modal("hide");
    $("#lingLiaoMingXiModal").modal("show");
}

function cxKuCunById(id,index){
    $.ajax({
        url: "/LBStore/kuCun/getKuCunById.do?id="+id,
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("查询库存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                var kc = json.kuCun;
                setKcCunData(kc,index);
            } else {
                alert("查询库存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}
