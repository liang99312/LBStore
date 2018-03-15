var lingLiaoDanMx = {"sz": [], "seq": -1, "yx": 1, "zys": 0};
var lldBianHao;
var isEditLld;
var cxCangKu;
var cxGongYingShang;
var lingLiaoDan;

$(document).ready(function () {
    lp_cxYuanGong();
    lp_cxKeGuanCangKu();
    $("#divFrmLld").popTopBar("入库单信息");
    $("#divFrmLldMx").popTopBar("入库单明细信息");
    $("#tblFrmLld").find("input,select").r2t();
    $("#tblFrmLldMx").find("input,select").r2t();
    cd4RuKuDanMx();
    if(parent.isEditLld){
        lldBianHao = parent.lldBianHao;
        cxRuKuDan();
    }else{
        showLldForm();
    }
});

function cd4RuKuDanMx() {
    $("#tablLldMx").contextMenu("cd4Lldmx", {
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
    var json = {"id": lldBianHao};
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/getLldByHh.action",
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
    lingLiaoDan = json;
    lingLiaoDanMx = json.mx;
    var data = [];
    for (var i = 0; i < lingLiaoDanMx.length; i++) {
        var e = lingLiaoDanMx[i];
        var tr = {"td": [e.m_wzmc, e.m_pp, e.m_xhgg, e.m_rksl, e.m_rksl * e.m_dj]};
        data.push(tr);
    }
    $("#tblMx").built({"data": data, "obj": lingLiaoDanMx, "dbclick": xgRuKuDan});

}

function showLldForm() {
    $("#divFrmLld").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmLld").css("z-index") - 1).show();

}

function xgRuKuDan() {
    isEditLld = true;
    if (lingLiaoDan.sz[lingLiaoDan.seq] === undefined || lingLiaoDan.sz[lingLiaoDan.seq] === null) {
        return alert("请选择仓库");
    }
    var ck = lingLiaoDan.sz[lingLiaoDan.seq];
    ckBianHao = ck.id;
    $("#tblFrmLld input[type=text]").val("").removeAttr("readonly");
    $("#tblFrmLld_mc").val(ck.mc);
    $("#tblFrmLld_dm").val(ck.dm);
    $("#tblFrmLld_bz").val(ck.bz);
    selLldGly = ck.gly;
    if(selLldGly === undefined || selLldGly === null){
        selLldGly = [];
    }
    selLldKw = ck.kw;
    if(selLldKw === undefined || selLldKw === null){
        selLldKw = [];
    }
    setGlyTable(ck.gly);
    setKwTable(ck.kw);
    $("#divFrmLld").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmLld").css("z-index") - 1).show();
    $("#tblFrmLld_mc").focus();
}

function check4Sjhm() {
    if ($("#tblFrmLld_mc").val() === "") {
        alert("请输入姓名");
        return false;
    }
    return true;
}


function bcRuKuDan() {
    if (check4Sjhm()) {
        var j = {};
        j.mc = $("#tblFrmLld_mc").val();
        j.dm = $("#tblFrmLld_dm").val();
        j.bz = $("#tblFrmLld_bz").val();
        if (isEditLld) {
            j.id = lingLiaoDan.sz[lingLiaoDan.seq].id;
        }
        j.gly = selLldGly;
        j.kw = selLldKw;
        j = {"jsonObj": JSON.stringify(j)};
        var url = isEditLld ? "/whwr/updateLld.action" : "/whwr/addLld.action";
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
                    $("#divFrmLld").hide();
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
    $("#tblFrmLld_gly_sel option").remove();
    for(var i=0;i<glys.length;i++){
        var optionStr = "<option>"+glys[i].mc+"</option>";
        $("#tblFrmLld_gly_sel").append(optionStr);
    }
}

function addLldGly(gly){
    $("#divTiShi").hide();
    for(var i=0;i < selLldGly.length;i++){
        var e = selLldGly[i];
        if(e.id === gly.id){
            return alert("该人员已被设置，请重新选择");
        }
    }
    selLldGly.push(gly);
    setGlyTable(selLldGly);
    $("#tblGly input").inputKit({"src": lp_YuanGongList, "fun": addLldGly});
}

function setLldGly() {
    $("#tblGly input").inputKit({"src": lp_YuanGongList,"fun": addLldGly});
    $("#divFrmGly").show();
    $("#board").css("z-index", $("#divFrmGly").css("z-index") - 1).show();
}

function saveGly(){
    $("#divFrmGly").hide();
    $("#board").css("z-index", $("#divFrmLld").css("z-index") - 1).show();
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
    $("#tblFrmLld_kw_sel option").remove();
    for(var i=0;i<kws.length;i++){
        var optionStr = "<option>"+kws[i].mc+"</option>";
        $("#tblFrmLld_kw_sel").append(optionStr);
    }
}

function addLldKw(){
    var kw = {};
    kw.mc = $("#kwMc").val();
    kw.qi = $("#kwKaishi").val();
    kw.zhi = $("#kwJieshu").val();
    if(kw.mc === null || "" === kw.mc){
        return alert("请输入库区名称");
    }
    for(var i=0;i < selLldKw.length;i++){
        var e = selLldKw[i];
        if(e.mc === kw.mc){
            return alert("该库区已存在，请重新设置");
        }
    }
    selLldKw.push(kw);
    setKwTable(selLldKw);
}


function setLldKw() {
    $("#divFrmKw").show();
    $("#board").css("z-index", $("#divFrmKw").css("z-index") - 1).show();
}

function saveKw(){
    $("#divFrmKw").hide();
    $("#board").css("z-index", $("#divFrmLld").css("z-index") - 1).show();
}