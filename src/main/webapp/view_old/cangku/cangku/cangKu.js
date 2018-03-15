var cangKu = {"sz": [], "seq": -1, "yx": 1, "zys": 0};
var ckBianHao;
var isEditCk;
var selCkGly = [];
var selCkKw = [];

$(document).ready(function () {
    lp_cxYuanGong();
    $("#tblCangKu").setListBottom(cangKu, cxCangKu);
    $("#tblCangKu").built();
    $("#divCx4Ck").popTopBar("查询仓库信息");
    $("#divFrmCk").popTopBar("仓库信息");
    $("#divFrmGly").popTopBar("设置仓库管理员");
    $("#divFrmKw").popTopBar("设置仓库库位");
    $("#divFrmCk").find("input,select").r2t();
    $("#divCx4Ck").find("input,select").r2t();
    $("#logo").click(function () {
        $("#divCx4Ck").show();
        $("#board").css("z-index", $("#divCx4Ck").css("z-index") - 1).show();
    });
    $("#tblFrmCk_dm").focus(function () {
        if ($("#tblFrmCk_dm").val().length === 0) {
            $("#tblFrmCk_dm").val(makePy($("#tblFrmCk_mc").val().substring(0, 5)));
        }
    });
    cd4CangKu();
});

function cd4CangKu() {
    $("#tblCangKu").contextMenu("cd4Ck", {
        bindings: {
            "zjCk": function (t) {
                zjCangKu();
            },
            "xgCk": function (t) {
                xgCangKu();
            },
            "scCk": function (t) {
                scCangKu();
            }
        }
    });
}

function cxCangKu() {
    var json = {"yx": cangKu.yx};
    json.mc = $("#tblCx4Ck_mc").val();
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/getCks.action",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            failureResp(msg.responseText);
        },
        success: function (json) {
            if (checkResult(json)) {
                jxCangKu(json);
                $("#divCx4Ck").hide();
                $("#board").hide();
            }
        }
    });
}

function jxCangKu(json) {
    if(json.sz === null){
        json.sz = [];
    }
    cangKu.sz = json.sz;
    cangKu.yx = json.yx;
    cangKu.zys = json.zys;
    cangKu.jls = json.jls;
    if (cangKu.yx === 0)
        cangKu.yx = 1;
    var data = [];
    for (var i = 0; i < json.sz.length; i++) {
        var e = json.sz[i];
        var gly = "";
        if(e.gly !== undefined && e.gly !== null){
            for(var j=0;j<e.gly.length;j++){
                gly = gly+e.gly[j].mc + ",";
            }
        }
        var tr = {"td": [e.mc, e.dm, e.bz, gly]};
        data.push(tr);
    }
    $("#tblCangKu").built({"data": data, "obj": cangKu, "dbclick": xgCangKu}).setPage(json.yx, json.zys, json.jls);

}

function zjCangKu() {
    isEditCk = false;
    ckBianHao = "";
    setGlyTable([]);
    setKwTable([]);
    $("#tblFrmCk input[type=text]").val("").removeAttr("readonly");
    $("#divFrmCk").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmCk").css("z-index") - 1).show();
    $("#tblFrmCk_mc").focus();

}

function xgCangKu() {
    isEditCk = true;
    if (cangKu.sz[cangKu.seq] === undefined || cangKu.sz[cangKu.seq] === null) {
        return alert("请选择仓库");
    }
    var ck = cangKu.sz[cangKu.seq];
    ckBianHao = ck.id;
    $("#tblFrmCk input[type=text]").val("").removeAttr("readonly");
    $("#tblFrmCk_mc").val(ck.mc);
    $("#tblFrmCk_dm").val(ck.dm);
    $("#tblFrmCk_bz").val(ck.bz);
    selCkGly = ck.gly;
    if(selCkGly === undefined || selCkGly === null){
        selCkGly = [];
    }
    selCkKw = ck.kw;
    if(selCkKw === undefined || selCkKw === null){
        selCkKw = [];
    }
    setGlyTable(ck.gly);
    setKwTable(ck.kw);
    $("#divFrmCk").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmCk").css("z-index") - 1).show();
    $("#tblFrmCk_mc").focus();
}

function check4Sjhm() {
    if ($("#tblFrmCk_mc").val() === "") {
        alert("请输入姓名");
        return false;
    }
    return true;
}

function scCangKu() {
    if (cangKu.sz[cangKu.seq] === undefined || cangKu.sz[cangKu.seq] === null) {
        return alert("请选择仓库");
    }
    if (!confirm("是否删除仓库" + cangKu.sz[cangKu.seq].mc + "?"))
        return false;
    var json = {"id": cangKu.sz[cangKu.seq].id};
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/delCk.do",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        //error:function(msg, textStatus){failureResp(msg.responseText);},
        success: function (json) {
            if (checkResult(json)) {
                cxCangKu();
            }
        }
    });
}

function bcCangKu() {
    if (check4Sjhm()) {
        var j = {};
        j.mc = $("#tblFrmCk_mc").val();
        j.dm = $("#tblFrmCk_dm").val();
        j.bz = $("#tblFrmCk_bz").val();
        if (isEditCk) {
            j.id = cangKu.sz[cangKu.seq].id;
        }
        j.gly = selCkGly;
        j.kw = selCkKw;
        j = {"jsonObj": JSON.stringify(j)};
        var url = isEditCk ? "/whwr/updateCk.action" : "/whwr/addCk.action";
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
                    cxCangKu();
                    $("#divFrmCk").hide();
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
    $("#tblFrmCk_gly_sel option").remove();
    for(var i=0;i<glys.length;i++){
        var optionStr = "<option>"+glys[i].mc+"</option>";
        $("#tblFrmCk_gly_sel").append(optionStr);
    }
}

function addCkGly(gly){
    $("#divTiShi").hide();
    for(var i=0;i < selCkGly.length;i++){
        var e = selCkGly[i];
        if(e.id === gly.id){
            return alert("该人员已被设置，请重新选择");
        }
    }
    selCkGly.push(gly);
    setGlyTable(selCkGly);
    $("#tblGly input").inputKit({"src": lp_YuanGongList, "fun": addCkGly});
}

function setCkGly() {
    $("#tblGly input").inputKit({"src": lp_YuanGongList,"fun": addCkGly});
    $("#divFrmGly").show();
    $("#board").css("z-index", $("#divFrmGly").css("z-index") - 1).show();
}

function saveGly(){
    $("#divFrmGly").hide();
    $("#board").css("z-index", $("#divFrmCk").css("z-index") - 1).show();
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
    $("#tblFrmCk_kw_sel option").remove();
    for(var i=0;i<kws.length;i++){
        var optionStr = "<option>"+kws[i].mc+"</option>";
        $("#tblFrmCk_kw_sel").append(optionStr);
    }
}

function addCkKw(){
    var kw = {};
    kw.mc = $("#kwMc").val();
    kw.qi = $("#kwKaishi").val();
    kw.zhi = $("#kwJieshu").val();
    if(kw.mc === null || "" === kw.mc){
        return alert("请输入库区名称");
    }
    for(var i=0;i < selCkKw.length;i++){
        var e = selCkKw[i];
        if(e.mc === kw.mc){
            return alert("该库区已存在，请重新设置");
        }
    }
    selCkKw.push(kw);
    setKwTable(selCkKw);
}


function setCkKw() {
    $("#divFrmKw").show();
    $("#board").css("z-index", $("#divFrmKw").css("z-index") - 1).show();
}

function saveKw(){
    $("#divFrmKw").hide();
    $("#board").css("z-index", $("#divFrmCk").css("z-index") - 1).show();
}