var ruKuDan = {"sz": [], "seq": -1, "yx": 1, "zys": 0};
var rkdBianHao;
var isEditRkd = false;
var cxCangKu;
var cxGongYingShang;
var ztList = {"sz":[{"id":1,"mc": "未办理"},{"id":1,"mc": "已办理"}],"xh":-1};


$(document).ready(function () {
    lp_cxYuanGong();
    lp_cxKeGuanCangKu();
    lp_cxGongYingShang();
    $("#tblCx4Rkd_ck").inputKit({"src":lp_KeGuanCangKuList,"obj":"cxCangKu"});
    $("#tblCx4Rkd_gys").inputKit({"src":lp_GongYingShangList,"obj":"cxGongYingShang"});
    $("#tblCx4Rkd_zt").inputKit({"src":ztList});
    $("#tblCx4Rkd_qssj,#tblCx4Rkd_jssj").setCalendar();
    $("#tblRuKuDan").setListBottom(ruKuDan, cxRuKuDan);
    $("#tblRuKuDan").built();
    $("#divCx4Rkd").popTopBar("查询入库单");
    $("#divCx4Rkd").find("input,select").r2t();
    
    $("#logo").click(function () {
        $("#divCx4Rkd").show();
        $("#board").css("z-index", $("#divCx4Rkd").css("z-index") - 1).show();
    });
    
    cd4RuKuDan();
});

function cd4RuKuDan() {
    $("#tblRuKuDan").contextMenu("cd4Rkd", {
        bindings: {
            "zjRkd": function (t) {
                zjRuKuDan();
            },
            "xgRkd": function (t) {
                xgRuKuDan();
            },
            "scRkd": function (t) {
                scRuKuDan();
            }
        }
    });
}

function cxRuKuDan() {
    var json = {"yx": ruKuDan.yx};
    if(cxCangKu !== undefined && cxCangKu !== null){
        if(cxCangKu.mc === $("#tblCx4Rkd_ck").val()){
            json.ck = cxCangKu.id;
        }
    }
    if(cxGongYingShang !== undefined && cxGongYingShang !== null){
        if(cxGongYingShang.mc === $("#tblCx4Rkd_gys").val()){
            json.ck = cxGongYingShang.id;
        }
    }
    json.qssj = $("#tblCx4Rkd_qssj").val();
    json.jssj = $("#tblCx4Rkd_jssj").val();
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/getRkds.action",
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
                $("#divCx4Rkd").hide();
                $("#board").hide();
            }
        }
    });
}

function jxRuKuDan(json) {
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
    $("#tblRuKuDan").built({"data": data, "obj": ruKuDan, "dbclick": xgRuKuDan}).setPage(json.yx, json.zys, json.jls);

}

function zjRuKuDan() {
    isEditRkd = false;
    $("#ifrm").attr("src", "./whwr/cangku/ruku/ruKuDan_bj.html");
    $("#dvIfm").show();

}

function xgRuKuDan() {
    if(ruKuDan.seq < 0){
        return alert("请选择入库单");
    }
    isEditRkd = true;
    rkdBianHao = ruKuDan.sz[ruKuDan.seq].id;
    $("#ifrm").attr("src", "./whwr/cangku/ruku/ruKuDan_bj.html");
    $("#dvIfm").show();
}

function scRuKuDan() {
    if(ruKuDan.seq < 0){
        return alert("请选择入库单");
    }
    rkdBianHao = ruKuDan.sz[ruKuDan.seq].id;
    if(!confirm("确定删除该入库单？")){
        return;
    }
    var json = {"id": rkdBianHao};
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/delRkd.action",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            failureResp(msg.responseText);
        },
        success: function (json) {
            if (checkResult(json)) {
                cxRuKuDan();
            }
        }
    });
}