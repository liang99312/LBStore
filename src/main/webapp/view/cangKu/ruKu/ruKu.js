var ruKus;
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
var selGongYingShang;
var editGongYingShang;
var editCangKu;
var dymx_opt = {data: [], yxData: [], func:calcDymx};
var tysx_opt = {data: [], ls: 2, lw: 70};

$(document).ready(function () {
    $('#inpSelQrq,#inpSelZrq,#inpMxScrq').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, minView: 2, startView: 2, forceParse: 0, showMeridian: 1});
    getCangKus(setTrager_cangKu);
    getKeHus(setTrager_keHu);
    getGongYingShangs(setTrager_gongYingShang);
    getWuZiZiDians(setTrager_ziDian);
    getWuZiLeiBies(setTrager_leiBie);
    $("#inpMxScrq").datetimepicker({language:  'zh-CN',format: 'yyyy-mm-dd',weekStart: 7,todayBtn:  1,autoclose: 1,todayHighlight: 1,minView : 2,startView: 2,forceParse: 0,showMeridian: 1});
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

function setTrager_cangKu() {
    $('#selCangKu').AutoComplete({'data': lb_cangKus, 'paramName': 'selCangKu'});
    $('#inpSelCk').AutoComplete({'data': lb_cangKus, 'paramName': 'selCangKu'});
    $('#inpCk').AutoComplete({'data': lb_cangKus, 'paramName': 'editCangKu'});
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

function selectRuKu_m() {
    $("#ruKuSelectModal").modal("show");
}

function selectWuZiZiDian(json) {
    editWzzd = json;
    if(json.id > -1){
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
    }else{
        $('#inpMxXhgg').AutoComplete({'data': [], 'paramName': 'editXhgg'});
    }
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
        $("#dvMxZl").show();
        $("#divMxDymx").show();
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
        if (item.tysx && item.tysx !== null && item.tysx !== "") {
            item.tysx = JSON.parse(item.tysx);
        } else {
            item.tysx = [];
        }
        item.lsh = item.lsh === undefined || item.lsh === null? "":item.lsh;
        item.gysmc = item.gysmc === undefined || item.gysmc === null? "":item.gysmc;
        item.khmc = item.khmc === undefined || item.khmc === null? "":item.khmc;
        var trStr = '<tr' + classStr + '><td>' + item.ckmc + '</td><td>' + item.lsh + '</td><td>' + item.gysmc + '</td><td>' + item.khmc + '</td><td>' + item.wz + '</td><td>' + item.sj + '</td><td>' + item.sl + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editRuKu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteRuKu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectRuKu() {
    var ruKu = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selLsh").val() !== "") {
        ruKu.lsh = $("#selLsh").val();
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
        ruKu.wzmc = $("#inpSelWz").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        ruKu.state = $("#selState").val();
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
}

function addRuKu() {
    optFlag = 1;
    rkmx = [];
    editCangKu = {};
    editGongYingShang = {};
    editKeHu = {};
    $("#ruKuModel_title").html("新增入库单");
    $("#inpGys").val("");
    $("#inpKh").val("");
    $("#inpDh").val("");
    $("#inpBz").val("");
    $("#inpSl").val(0);
    $("#inpJe").val(0);
    jxRuKuMingXi();
    $("#ruKuModal").modal("show");
}

function editRuKu(index) {
    optFlag = 2;
    if (ruKus[index] === undefined) {
        optFlag = 1;
        return alert("请选择入库单");
    }
    var ruKu = ruKus[index];
    editIndex = index;
    rkmx = ruKu.details;
    $("#ruKuModel_title").html("修改入库单");
    if("供应商" === ruKu.ly){
        $("#inpGys").val(ruKu.gys);
        editGongYingShang = {"id":ruKu.gys_id,"mc":ruKu.gys};
    }else if("客户" === ruKu.ly){
        $("#inpKh").val(ruKu.kh);
        editKeHu = {"id":ruKu.kh_id,"mc":ruKu.kh};
    } 
    $("#inpDh").val(ruKu.dh);
    $("#inpBz").val(ruKu.bz);
    $("#inpSl").val(ruKu.sl);
    $("#inpJe").val(ruKu.je);
    jxRuKuMingXi();
    $("#ruKuModal").modal("show");
}

function saveRuKu() {
    if(rkmx.length < 1){
        return alert("请增加入库明细！");
    }
    var ruKu = {};
    var url = "";
    if (optFlag === 2) {
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
    if("供应商" === $("#inpLy").val()){
        if ($("#inpGys").val() === "") {
            return alert("请输入供应商信息");
        } else {
            if ($("#inpGys").val() !== editGongYingShang.mc) {
                return alert("请输入供应商信息");
            } else {
                ruKu.gys_id = editGongYingShang.id;
            }
        }
    }else if("客户" === $("#inpLy").val()){
        if ($("#inpKh").val() === "") {
            return alert("请输入客户信息");
        } else {
            if ($("#inpKh").val() !== editGongYingShang.mc) {
                return alert("请输入客户信息");
            } else {
                ruKu.kh_id = editKeHu.id;
            }
        }
    } 
    var wz = "";
    var wzs = [];
    for(var i=0;i<rkmx.length;i++){
        var e = rkmx[i];
        e.dymx = JSON.stringify(e.dymx);
        e.tysx = JSON.stringify(e.tysx);
        if(wzs.indexOf(e.wzmc) > -1){
            continue;
        }else{
            wzs.push(e.wzmc);
        }
    }
    for(var i=0;i<wzs.length;i++){
        var e = wzs[i];
        wz += e + ";";
    }
    ruKu.details = rkmx;
    ruKu.wz = wz;
    ruKu.dh = $("#inpDh").val();
    ruKu.bz = $("#inpBz").val();
    ruKu.state = 0;
    $.ajax({
        url: url,
        data: JSON.stringify(ruKu),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#ruKuModal").modal("hide");
                selectRuKu();
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteRuKu(index) {
    if (ruKus[index] === undefined) {
        return alert("请选择入库单");
    }
    var ruKu = ruKus[index];
    if (confirm("确定删除入库单：" + ruKu.mc + "?")) {
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
    if(data && "" !== data){
        if(typeof data === "string"){
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

function calcDymx(){
    if(dymx_opt.yxData){
        var zl = 0;
        for(var i=0;i<dymx_opt.yxData.length;i++){
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
        var trStr = '<tr><td>' + item.wzmc + '</td><td>' + item.pp + '</td><td>' + item.xhgg + '</td><td>' + item.sl + '</td><td>' + je + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editRuKuMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteRuKuMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#tblWuZiMingXi_body").append(trStr);
    });
}

function addRuKuMingXi() {
    optMxFlag = 1;
    dymx_opt = {data: [], yxData: [], func:calcDymx};
    editLeiBie = null;
    $("#ruKuMingXiModal_title").html("增加明细");
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
    $("#ruKuMingXiModal").modal("show");
}

function editRuKuMingXi(index) {
    if (rkmx[index]) {
        optMxFlag = 2;
        editMxIndex = index;
        var m = rkmx[index];
        if(typeof m.dymx === "string"){
            m.dymx = JSON.parse(m.dymx);
        }
        dymx_opt = {data: [], yxData: m.dymx, func:calcDymx};
        $("#ruKuMingXiModal_title").html("修改明细");
        editWzzd = {"id":m.wzzd_id,"mc":m.wzmc};
        $("#inpMxWz").val(m.wzmc);
        editLeiBie = {"id": m.wzlb_id, "mc": m.wzlb};
        $("#inpMxLb").val(m.wzlb);
        $("#inpMxPp").val(m.pp);
        editXhgg = {"id":m.xhgg_id,"mc":m.xhgg};
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
        buildTysx(m.tysx);
        buildDymx();
        if (rkmx[index].jlfs === "mx") {
            $("#divMxDymx").show();
        }else{
            $("#divMxDymx").hide();
        }
        $("#ruKuMingXiModal").modal("show");
    }
}

function deleteRuKuMingXi(index) {
    if (rkmx[index]) {
        if (confirm("确定删除明细：" + rkmx[index].wzmc + "?")) {
            rkmx.splice(index, 1);
            jxRuKuMingXi();
        }
    }
}

function saveRuKuMingXi() {
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
    mx.dymx = JSON.stringify(dymx_opt.yxData);
    mx.tysx = JSON.stringify(tysx_opt.data);
    if (optMxFlag === 1) {
        rkmx.push(mx);
    } else if (optMxFlag === 2) {
        rkmx[editMxIndex] = mx;
    }
    jxRuKuMingXi();
    var zsl = 0;
    var zje = 0;
    for(var i = 0;i<rkmx.length;i++){
        var e = rkmx[i];
        zsl = e.sl + zsl;
        zje = e.sl*e.dj + zje;
    }
    $("#inpSl").val(zsl);
    $("#inpJe").val(zje.toFixed(3));
    $("#ruKuMingXiModal").modal("hide");
}
