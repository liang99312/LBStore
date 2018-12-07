var sunHaos;
var optFlag = 1;
var editIndex = -1;
var editType;
var shmx = [];
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
        if(shmx.length > 0){
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

function selectSunHao_m() {
    $("#sunHaoSelectModal").modal("show");
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

function jxSunHao(json) {
    $("#data_table_body tr").remove();
    sunHaos = [];
    sunHaos = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if (item.state === -1) {
            classStr = ' class="danger"';
        }
        item.lsh = item.lsh === undefined || item.lsh === null ? "" : item.lsh;
        var readStr = '<button class="btn btn-info btn-xs icon-file-alt" onclick="readSunHao(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var editStr = '<button class="btn btn-info btn-xs icon-edit" onclick="editSunHao(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var dealStr = '<button class="btn btn-info btn-xs icon-legal" onclick="dealSunHao(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var delStr = '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteSunHao(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var trStr = '<tr' + classStr + '><td>' + item.ckmc + '</td><td>' + item.lsh + '</td><td>' + item.dh + '</td><td>' + item.wz + '</td><td>' + item.sj + '</td><td>' + item.sl + '</td><td>'
                + readStr
                + (item.state === 0 ? editStr : "")
                + (item.state === 0 ? dealStr : "")
                + (item.state === 0 || item.state === -1 ? delStr : "") + '</td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function showSelectSunHao() {
    $("#sunHaoSelectModal").modal("show");
}

function selectSunHao() {
    var sunHao = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selLsh").val() !== "") {
        sunHao.lsh = $("#selLsh").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        sunHao.state = $("#selState").val();
    }
    if ($("#selCangKu").val() !== "" && $("#selCangKu").val() === selCangKu.mc) {
        sunHao.ck_id = selCangKu.id;
    }
    tj.paramters = sunHao;
    var options = {};
    options.url = "/LBStore/sunHao/listSunHaosByPage.do";
    options.tj = tj;
    options.func = jxSunHao;
    options.ul = "#example";
    queryPaginator(options);
}

function selectSunHao_m() {
    var sunHao = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#inpSelWz").val() !== "") {
        sunHao.wzmc = $("#inpSelWz").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        sunHao.state = $("#selState").val();
    }
    if ($("#inpSelCk").val() !== "" && $("#inpSelCk").val() === selCangKu.mc) {
        sunHao.ck_id = selCangKu.id;
    }
    if ($("#inpSelKh").val() !== "" && $("#inpSelKh").val() === selKeHu.mc) {
        sunHao.kh_id = selKeHu.id;
    }
    if ($("#inpSelQrq").val() !== "") {
        sunHao.qrq = $("#inpSelQrq").val();
    }
    if ($("#inpSelZrq").val() !== "") {
        sunHao.zrq = $("#inpSelZrq").val();
    }
    tj.paramters = sunHao;
    var options = {};
    options.url = "/LBStore/sunHao/listSunHaosByPage.do";
    options.tj = tj;
    options.func = jxSunHao;
    options.ul = "#example";
    queryPaginator(options);
    $("#sunHaoSelectModal").modal("hide");
}

function addSunHao() {
    optFlag = 1;
    shmx = [];
    editCangKu = {};
    editKeHu = {};
    $("#sunHaoModel_title").html("新增损耗单");
    $("#btnOk").html("保存");
    $("#divXzmx").show();
    $("#divSpr").hide();
    $("#inpGys").val("");
    $("#inpKh").val("");
    $("#inpDh").val("");
    $("#inpBz").val("");
    $("#inpSl").val(0);
    $("#inpJe").val(0);
    jxSunHaoMingXi();
    $("#sunHaoModal").modal("show");
}

function editSunHao(index) {
    optFlag = 2;
    if (sunHaos[index] === undefined) {
        optFlag = 1;
        return alert("请选择损耗单");
    }
    $("#sunHaoModel_title").html("修改损耗单");
    $("#btnOk").html("保存");
    $("#divXzmx").show();
    $("#divSpr").hide();
    var sunHao = sunHaos[index];
    editIndex = index;
    selectSunHaoDetail(sunHao.id);
}

function readSunHao(index) {
    optFlag = 4;
    if (sunHaos[index] === undefined) {
        optFlag = 1;
        return alert("请选择损耗单");
    }
    $("#sunHaoModel_title").html("查看损耗单");
    $("#btnOk").html("关闭");
    $("#divXzmx").hide();
    $("#divSpr").show();
    var sunHao = sunHaos[index];
    editIndex = index;
    selectSunHaoDetail(sunHao.id);
}

function selectSunHaoDetail(id) {
    $.ajax({
        url: "/LBStore/sunHao/getSunHaoDetailById.do?id=" + id,
        contentType: "application/json",
        type: "get",
        cache: false,
        error: function (msg, textStatus) {
            alert("获取损耗单信息失败");
        },
        success: function (json) {
            if (json.result === 0) {
                var sunHao = json.sunHao;
                shmx = sunHao.details;
                $("#inpKh").val(sunHao.khmc);
                $("#inpCk").val(sunHao.ckmc);
                editCangKu = {"id": sunHao.ck_id, "mc": sunHao.ckmc};
                editKeHu = {"id": sunHao.kh_id, "mc": sunHao.khmc};
                $("#inpLlr").val(sunHao.llrmc);
                editA01 = {"id": sunHao.llr_id, "mc": sunHao.llrmc};
                selectCangKu(editCangKu);
                $("#inpDh").val(sunHao.dh);
                $("#inpBz").val(sunHao.bz);
                $("#inpSl").val(sunHao.sl);
                $("#inpJe").val(sunHao.je);
                $("#inpSj").val(sunHao.sj);
                $("#inpSpr").val(sunHao.sprmc);
                $("#inpSpsj").val(sunHao.spsj);
                jxSunHaoMingXi();
                $("#sunHaoModal").modal("show");
            } else
                alert("获取损耗单信息失败:" + json.msg !== undefined ? json.msg : "");
        }
    });
}

function dealSunHao(index) {
    optFlag = 3;
    if (sunHaos[index] === undefined) {
        optFlag = 1;
        return alert("请选择损耗单");
    }
    $("#sunHaoModel_title").html("办理损耗单");
    $("#btnOk").html("办理");
    $("#divXzmx").hide();
    $("#divSpr").hide();
    var sunHao = sunHaos[index];
    editIndex = index;
    selectSunHaoDetail(sunHao.id);
}

function saveSunHao() {
    if (optFlag === 4) {
        $("#sunHaoModal").modal("hide");
        return;
    }
    if (shmx.length < 1) {
        return alert("请增加损耗明细！");
    }
    var sunHao = {};
    var url = "";
    if (optFlag === 3) {
        if (sunHaos[editIndex] === undefined) {
            return;
        }
        if (!confirm("确定办理损耗单?")) {
            return;
        }
        sunHao = sunHaos[editIndex];
        url = "/LBStore/sunHao/dealSunHao.do";
    } else if (optFlag === 2) {
        if (sunHaos[editIndex] === undefined) {
            return;
        }
        sunHao = sunHaos[editIndex];
        url = "/LBStore/sunHao/updateSunHao.do";
    } else if (optFlag === 1) {
        url = "/LBStore/sunHao/saveSunHao.do";
    }
    if ($("#inpCk").val() === "") {
        return alert("请输入仓库信息");
    } else {
        if ($("#inpCk").val() !== editCangKu.mc) {
            return alert("请输入仓库信息");
        } else {
            sunHao.ck_id = editCangKu.id;
        }
    }
    if ($("#inpKh").val() === "") {
        return alert("请输入客户信息");
    } else {
        if ($("#inpKh").val() !== editKeHu.mc) {
            return alert("请输入客户信息");
        } else {
            sunHao.kh_id = editKeHu.id;
        }
    }
    if ($("#inpLlr").val() === "") {
        return alert("请输入损耗人信息");
    } else {
        if ($("#inpLlr").val() !== editA01.mc) {
            return alert("请输入损耗人信息");
        } else {
            sunHao.llr_id = editA01.id;
        }
    }
    var wz = "";
    var wzs = [];
    for (var i = 0; i < shmx.length; i++) {
        var e = shmx[i];
        if(e.ck_id !== sunHao.ck_id){
            return alert("损耗明细仓库和损耗单仓库不匹配！");
        }
        if (optFlag === 3) {
            if (e.kw === undefined || e.kw === null || e.kw === "") {
                return alert("损耗单明细需要设置库位！");
            }
            if (e.dj === undefined || e.dj === null || e.dj === "") {
                return alert("损耗单明细需要设置单价！");
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
    sunHao.details = shmx;
    sunHao.wz = wz;
    sunHao.dh = $("#inpDh").val();
    sunHao.bz = $("#inpBz").val();
    sunHao.sl = $("#inpSl").val();
    sunHao.je = $("#inpJe").val();
    sunHao.sj = $("#inpSj").val();
    sunHao.state = 0;
    var tsStr = optFlag === 3 ? "办理" : "保存";
    $.ajax({
        url: url,
        data: JSON.stringify(sunHao),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert(tsStr + "失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#sunHaoModal").modal("hide");
                selectSunHao();
            } else {
                alert(tsStr + "失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteSunHao(index) {
    if (sunHaos[index] === undefined) {
        return alert("请选择损耗单");
    }
    var sunHao = sunHaos[index];
    if (confirm("确定删除损耗单：" + sunHao.dh + "?")) {
        $.ajax({
            url: "/LBStore/sunHao/deleteSunHao.do?id=" + sunHao.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectSunHao();
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

function jxSunHaoMingXi() {
    $("#tblWuZiMingXi_body tr").remove();
    $.each(shmx, function (index, item) { //遍历返回的json
        if (item.tysx && item.tysx !== null && item.tysx !== "" && typeof item.tysx === 'string') {
            item.tysx = JSON.parse(item.tysx);
        } else if (item.tysx && typeof item.tysx === 'object') {

        } else {
            item.tysx = [];
        }
        var je = parseFloat(item.sll) * parseFloat(item.dj);
        var bj = optFlag === 3 || optFlag === 4 ? '' : '<button class="btn btn-info btn-xs icon-edit" onclick="editSunHaoMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;';
        var cz = optFlag === 3 || optFlag === 4 ? '' : '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteSunHaoMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>';
        var trStr = '<tr><td>' + item.wzmc + '</td><td>' + item.pp + '</td><td>' + item.xhgg + '</td><td>' + item.sll + '</td><td>' + je + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-file-alt" onclick="readSunHaoMingXi(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + bj
                + cz + '</td></tr>';
        $("#tblWuZiMingXi_body").append(trStr);
    });
}

function addSunHaoMingXi() {
    if($("#inpCk").val() === "" || $("#inpCk").val() !== editCangKu.mc){
        return alert("请选择损耗仓库");
    }
    optMxFlag = 1;
    dymx_opt = {data: [], yxData: [], func: calcDymx};
    editLeiBie = null;
    $("#sunHaoMingXiModal_title").html("增加明细");
    $("#selKuCunModal").modal("show");
}

function editSunHaoMingXi(index) {
    if (shmx[index]) {
        optMxFlag = 2;
        editMxIndex = index;
        $("#sunHaoMingXiModal_title").html("修改明细");
        $("#btnMxOk").html("保存");
        var temp = shmx[index];
        cxKuCunById(temp.kc_id,index);
    }
}

function readSunHaoMingXi(index) {
    if (shmx[index]) {
        optMxFlag = 4;
        editMxIndex = index;
        $("#sunHaoMingXiModal_title").html("查看明细");
        $("#btnMxOk").html("关闭");
        var temp = shmx[index];
        cxKuCunById(temp.kc_id,index);
    }
}

function deleteSunHaoMingXi(index) {
    if (shmx[index]) {
        if (confirm("确定删除明细：" + shmx[index].wzmc + "?")) {
            shmx.splice(index, 1);
            jxSunHaoMingXi();
        }
    }
}

function saveSunHaoMingXi() {
    if (optMxFlag === 4) {
        $("#sunHaoMingXiModal").modal("hide");
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
    mx.ck_id = curKuCun.ck_id;
    if (optMxFlag === 1) {
        shmx.push(mx);
    } else if (optMxFlag === 2) {
        shmx[editMxIndex] = mx;
    }
    jxSunHaoMingXi();
    var zsl = 0;
    var zje = 0;
    for (var i = 0; i < shmx.length; i++) {
        var e = shmx[i];
        zsl = e.sll + zsl;
        zje = e.sll * e.dj + zje;
    }
    $("#inpSl").val(zsl);
    $("#inpJe").val(zje.toFixed(3));
    $("#sunHaoMingXiModal").modal("hide");
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
    var m = shmx[index];
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
    $("#sunHaoMingXiModal").modal("show");
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