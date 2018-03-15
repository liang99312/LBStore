var ruKuDan = {"sz": [], "seq": -1, "yx": 1, "zys": 0};
var rkdBianHao;
var isEditKc = false;
var cxCangKu;
var cxGongYingShang;
var ztList = {"sz":[{"id":1,"mc": "未办理"},{"id":1,"mc": "已办理"}],"xh":-1};


$(document).ready(function () {
    lp_cxYuanGong();
    lp_cxKeGuanCangKu();
    lp_cxGongYingShang();
    $("#tblCx4Kc_ck").inputKit({"src":lp_KeGuanCangKuList,"obj":"cxCangKu"});
    $("#tblCx4Kc_gys").inputKit({"src":lp_GongYingShangList,"obj":"cxGongYingShang"});
    $("#tblCx4Kc_zt").inputKit({"src":ztList});
    $("#tblCx4Kc_qssj,#tblCx4Kc_jssj").setCalendar();
    $("#tblKuCun").setListBottom(ruKuDan, cxKuCun);
    $("#tblKuCun").built();
    $("#divCx4Kc").popTopBar("查询库存");
    $("#divCx4Kc").find("input,select").r2t();
    
    $("#logo").click(function () {
        $("#divCx4Kc").show();
        $("#board").css("z-index", $("#divCx4Kc").css("z-index") - 1).show();
    });
    
    cd4KuCun();
});

function cd4KuCun() {
    $("#tblKuCun").contextMenu("cd4Kc", {
        bindings: {
            "ckKc": function (t) {
                zjKuCun();
            },
            "xgKc": function (t) {
                xgKuCun();
            }
        }
    });
}

function cxKuCun() {
    var json = {"yx": ruKuDan.yx};
    if(cxCangKu !== undefined && cxCangKu !== null){
        if(cxCangKu.mc === $("#tblCx4Kc_ck").val()){
            json.ck = cxCangKu.id;
        }
    }
    if(cxGongYingShang !== undefined && cxGongYingShang !== null){
        if(cxGongYingShang.mc === $("#tblCx4Kc_gys").val()){
            json.ck = cxGongYingShang.id;
        }
    }
    json.qssj = $("#tblCx4Kc_qssj").val();
    json.jssj = $("#tblCx4Kc_jssj").val();
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/getKcs.action",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            failureResp(msg.responseText);
        },
        success: function (json) {
            if (checkResult(json)) {
                jxKuCun(json);
                $("#divCx4Kc").hide();
                $("#board").hide();
            }
        }
    });
}

function jxKuCun(json) {
    if(json.sz === null){
        json.sz = [];
    }
    ruKuDan.sz = json.sz;
    ruKuDan.yx = json.yx;
    ruKuDan.zys = json.zys;
    ruKuDan.jls = json.jls;
    if (ruKuDan.yx === 0)
        ruKuDan.yx = 1;
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
    $("#tblKuCun").built({"data": data, "obj": ruKuDan, "dbclick": xgKuCun}).setPage(json.yx, json.zys, json.jls);

}

function xgKuCun() {
    $("#divFrm4Kc").show();
    $("#board").css("z-index", $("#divFrm4Kc").css("z-index") - 1).show();
}

function scKuCun() {
    if(ruKuDan.seq < 0){
        return alert("请选择库存");
    }
    rkdBianHao = ruKuDan.sz[ruKuDan.seq].id;
    if(!confirm("确定删除该库存？")){
        return;
    }
    var json = {"id": rkdBianHao};
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/delKc.action",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            failureResp(msg.responseText);
        },
        success: function (json) {
            if (checkResult(json)) {
                cxKuCun();
            }
        }
    });
}