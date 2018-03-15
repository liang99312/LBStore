var lingLiaoDan = {"sz": [], "seq": -1, "yx": 1, "zys": 0};
var lldBianHao;
var isEditLld = false;
var cxCangKu;
var cxGongYingShang;
var ztList = {"sz":[{"id":1,"mc": "未办理"},{"id":1,"mc": "已办理"}],"xh":-1};


$(document).ready(function () {
    lp_cxYuanGong();
    lp_cxKeGuanCangKu();
    lp_cxGongYingShang();
    $("#tblCx4Lld_ck").inputKit({"src":lp_KeGuanCangKuList,"obj":"cxCangKu"});
    $("#tblCx4Lld_gys").inputKit({"src":lp_GongYingShangList,"obj":"cxGongYingShang"});
    $("#tblCx4Lld_zt").inputKit({"src":ztList});
    $("#tblCx4Lld_qssj,#tblCx4Lld_jssj").setCalendar();
    $("#tblRuKuDan").setListBottom(lingLiaoDan, cxRuKuDan);
    $("#tblRuKuDan").built();
    $("#divCx4Lld").popTopBar("查询入库单");
    $("#divCx4Lld").find("input,select").r2t();
    
    $("#logo").click(function () {
        $("#divCx4Lld").show();
        $("#board").css("z-index", $("#divCx4Lld").css("z-index") - 1).show();
    });
    
    cd4RuKuDan();
});

function cd4RuKuDan() {
    $("#tblRuKuDan").contextMenu("cd4Lld", {
        bindings: {
            "zjLld": function (t) {
                zjRuKuDan();
            },
            "xgLld": function (t) {
                xgRuKuDan();
            },
            "scLld": function (t) {
                scRuKuDan();
            }
        }
    });
}

function cxRuKuDan() {
    var json = {"yx": lingLiaoDan.yx};
    if(cxCangKu !== undefined && cxCangKu !== null){
        if(cxCangKu.mc === $("#tblCx4Lld_ck").val()){
            json.ck = cxCangKu.id;
        }
    }
    if(cxGongYingShang !== undefined && cxGongYingShang !== null){
        if(cxGongYingShang.mc === $("#tblCx4Lld_gys").val()){
            json.ck = cxGongYingShang.id;
        }
    }
    json.qssj = $("#tblCx4Lld_qssj").val();
    json.jssj = $("#tblCx4Lld_jssj").val();
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/getLlds.action",
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
                $("#divCx4Lld").hide();
                $("#board").hide();
            }
        }
    });
}

function jxRuKuDan(json) {
    if(json.sz === null){
        json.sz = [];
    }
    lingLiaoDan.sz = json.sz;
    lingLiaoDan.yx = json.yx;
    lingLiaoDan.zys = json.zys;
    lingLiaoDan.jls = json.jls;
    if (lingLiaoDan.yx === 0)
        lingLiaoDan.yx = 1;
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
    $("#tblRuKuDan").built({"data": data, "obj": lingLiaoDan, "dbclick": xgRuKuDan}).setPage(json.yx, json.zys, json.jls);

}

function zjRuKuDan() {
    isEditLld = false;
    $("#ifrm").attr("src", "/whwr/cangKu/lingLiao/lingLiaoDan_bj.html");
    $("#dvIfm").show();

}

function xgRuKuDan() {
    if(lingLiaoDan.seq < 0){
        return alert("请选择入库单");
    }
    isEditLld = true;
    lldBianHao = lingLiaoDan.sz[lingLiaoDan.seq].id;
    $("#ifrm").attr("src", "/whwr/cangKu/lingLiao/lingLiaoDan_bj.html");
    $("#dvIfm").show();
}

function scRuKuDan() {
    if(lingLiaoDan.seq < 0){
        return alert("请选择入库单");
    }
    lldBianHao = lingLiaoDan.sz[lingLiaoDan.seq].id;
    if(!confirm("确定删除该入库单？")){
        return;
    }
    var json = {"id": lldBianHao};
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/delLld.action",
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