var ruKuDanMx = {"sz": [], "seq": -1, "yx": 1, "zys": 0};
var rkdBianHao;
var isEditRkd;
var cxCangKu;
var cxGongYingShang;
var ruKuDan;

$(document).ready(function () {
    lp_cxYuanGong();
    lp_cxKeGuanCangKu();
    $("#divFrmRkd").popTopBar("入库单信息");
    $("#divFrmRkdMx").popTopBar("入库单明细信息");
    $("#tblFrmRkd").find("input,select").r2t();
    $("#tblFrmRkdMx").find("input,select").r2t();
    cd4RuKuDanMx();
    if(parent.isEditRkd){
        rkdBianHao = parent.rkdBianHao;
        cxRuKuDan();
    }else{
        showRkdForm();
    }
});

function cd4RuKuDanMx() {
    $("#tablRkdMx").contextMenu("cd4Rkdmx", {
        bindings: {
            "zjMx": function (t) {
                zjRuKuDanMx();
            },
            "xgMx": function (t) {
                xgRuKuDanMx();
            },
            "scMx": function (t) {
                scRuKuDanMx();
            }
        }
    });
}

function cxRuKuDan() {
    var json = {"id": rkdBianHao};
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/getRkdByHh.action",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            failureResp(msg.responseText);
        },
        success: function (json) {
            if (checkResult(json)) {
                jxRuKuDan(json);
            }
        }
    });
}

function jxRuKuDan(json) {
    ruKuDan = json;
    ruKuDanMx = json.mx;
    var data = [];
    for (var i = 0; i < ruKuDanMx.length; i++) {
        var e = ruKuDanMx[i];
        var tr = {"td": [e.m_wzmc, e.m_pp, e.m_xhgg, e.m_rksl, e.m_rksl * e.m_dj]};
        data.push(tr);
    }
    $("#tblMx").built({"data": data, "obj": ruKuDanMx, "dbclick": xgRuKuDan});

}

function showRkdForm() {
    $("#divFrmRkd").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmRkd").css("z-index") - 1).show();

}

function xgRuKuDan() {
    isEditRkd = true;
    if (ruKuDan.sz[ruKuDan.seq] === undefined || ruKuDan.sz[ruKuDan.seq] === null) {
        return alert("请选择仓库");
    }
    var ck = ruKuDan.sz[ruKuDan.seq];
    ckBianHao = ck.id;
    $("#tblFrmRkd input[type=text]").val("").removeAttr("readonly");
    $("#tblFrmRkd_mc").val(ck.mc);
    $("#tblFrmRkd_dm").val(ck.dm);
    $("#tblFrmRkd_bz").val(ck.bz);
    selRkdGly = ck.gly;
    if(selRkdGly === undefined || selRkdGly === null){
        selRkdGly = [];
    }
    selRkdKw = ck.kw;
    if(selRkdKw === undefined || selRkdKw === null){
        selRkdKw = [];
    }
    setGlyTable(ck.gly);
    setKwTable(ck.kw);
    $("#divFrmRkd").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmRkd").css("z-index") - 1).show();
    $("#tblFrmRkd_mc").focus();
}

function check4Sjhm() {
    if ($("#tblFrmRkd_mc").val() === "") {
        alert("请输入姓名");
        return false;
    }
    return true;
}


function bcRuKuDan() {
    if (check4Sjhm()) {
        var j = {};
        j.mc = $("#tblFrmRkd_mc").val();
        j.dm = $("#tblFrmRkd_dm").val();
        j.bz = $("#tblFrmRkd_bz").val();
        if (isEditRkd) {
            j.id = ruKuDan.sz[ruKuDan.seq].id;
        }
        j.gly = selRkdGly;
        j.kw = selRkdKw;
        j = {"jsonObj": JSON.stringify(j)};
        var url = isEditRkd ? "/whwr/updateRkd.action" : "/whwr/addRkd.action";
        $.ajax({
            url: url,
            data: j,
            dataType: "json",
            type: "post",
            cache: false,
            error: function (msg, textStatus) {
                failureResp(msg.responseText);
            },
            success: function (json) {
                if (checkResult(json)) {
                    cxRuKuDan();
                    $("#divFrmRkd").hide();
                    $("#board").hide();
                }
            }
        });
    }
}

function setGlyTable(glys) {
    if(glys === undefined || glys === null){
        glys = [];
    }
    $("#tblGly tr").remove();
    var html = "<tr>";
    var rows = 0;
    for(var i=0;i<glys.length;i++){
        var e = glys[i];
        if(i%6 === 0){
            if(rows !== 0){
                html = html + "</tr><tr>";
            }
            rows ++;
        }
        html = html + "<td style='width:16.6%'>"+e.mc+"</td>";
    }
    for(var i=0;i<6-glys.length%6;i++){
        if(i === 0){
            html = html + "<td style='width:16.6%'><input style='width:120px;' type='text' /></td>";
        }else{
            html = html + "<td style='width:16.6%'></td>";
        }
    }
    html = html + "</tr>";
    $("#tblGly").html(html);
    $("#tblFrmRkd_gly_sel option").remove();
    for(var i=0;i<glys.length;i++){
        var optionStr = "<option>"+glys[i].mc+"</option>";
        $("#tblFrmRkd_gly_sel").append(optionStr);
    }
}

function addRkdGly(gly){
    $("#divTiShi").hide();
    for(var i=0;i < selRkdGly.length;i++){
        var e = selRkdGly[i];
        if(e.id === gly.id){
            return alert("该人员已被设置，请重新选择");
        }
    }
    selRkdGly.push(gly);
    setGlyTable(selRkdGly);
    $("#tblGly input").inputKit({"src": lp_YuanGongList, "fun": addRkdGly});
}

function setRkdGly() {
    $("#tblGly input").inputKit({"src": lp_YuanGongList,"fun": addRkdGly});
    $("#divFrmGly").show();
    $("#board").css("z-index", $("#divFrmGly").css("z-index") - 1).show();
}

function saveGly(){
    $("#divFrmGly").hide();
    $("#board").css("z-index", $("#divFrmRkd").css("z-index") - 1).show();
}

function setKwTable(kws) {
    if(kws === undefined || kws === null){
        kws = [];
    }
    $("#tblKw  tr:not(:first)").remove();
    for(var i=0;i<kws.length;i++){
        var e = kws[i];
        var html = "<tr><td style='width:40%'>"+e.mc+"</td><td style='width:30%'>"+e.qi+"</td><td style='width:30%'>"+e.zhi+"</td></tr>";
        $("#tblKw").append(html);
    } 
    $("#tblFrmRkd_kw_sel option").remove();
    for(var i=0;i<kws.length;i++){
        var optionStr = "<option>"+kws[i].mc+"</option>";
        $("#tblFrmRkd_kw_sel").append(optionStr);
    }
}

function addRkdKw(){
    var kw = {};
    kw.mc = $("#kwMc").val();
    kw.qi = $("#kwKaishi").val();
    kw.zhi = $("#kwJieshu").val();
    if(kw.mc === null || "" === kw.mc){
        return alert("请输入库区名称");
    }
    for(var i=0;i < selRkdKw.length;i++){
        var e = selRkdKw[i];
        if(e.mc === kw.mc){
            return alert("该库区已存在，请重新设置");
        }
    }
    selRkdKw.push(kw);
    setKwTable(selRkdKw);
}


function setRkdKw() {
    $("#divFrmKw").show();
    $("#board").css("z-index", $("#divFrmKw").css("z-index") - 1).show();
}

function saveKw(){
    $("#divFrmKw").hide();
    $("#board").css("z-index", $("#divFrmRkd").css("z-index") - 1).show();
}

function zjRuKuDanMx(){
    $("#divFrmRkdMx").show();
    $("#board").css("z-index", $("#divFrmRkdMx").css("z-index") - 1).show();
}