var kuCun = {"sz": [], "seq": -1, "yx": 1, "zys": 0};
var rkdBianHao;
var isEditKc = false;
var cxCangKu;

$(document).ready(function () {
    lp_cxKeGuanCangKu();
    $("#tblCx4Kc_ck").inputKit({"src": lp_KeGuanCangKuList, "obj": "cxCangKu"});
    $("#tblCx4Kc_qssj,#tblCx4Kc_jssj").setCalendar();
    $("#tblKuCun").built();
    $("#divCx4Kc").find("input,select").r2t();

    $("#logo").click(function () {
        $("#divCx4Kc").show();
        $("#board").css("z-index", $("#divCx4Kc").css("z-index") - 1).show();
    });

    cd4KuCun();
});

function cxKuCun() {
    var json = {"yx": kuCun.yx};
    if (cxCangKu !== undefined && cxCangKu !== null) {
        if (cxCangKu.mc === $("#tblCx4Kc_ck").val()) {
            json.ck = cxCangKu.id;
        }
    }
    if (cxGongYingShang !== undefined && cxGongYingShang !== null) {
        if (cxGongYingShang.mc === $("#tblCx4Kc_gys").val()) {
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
    if (json.sz === null) {
        json.sz = [];
    }
    kuCun.sz = json.sz;
    kuCun.yx = json.yx;
    kuCun.zys = json.zys;
    kuCun.jls = json.jls;
    if (kuCun.yx === 0)
        kuCun.yx = 1;
    var data = [];
    for (var i = 0; i < json.sz.length; i++) {
        var e = json.sz[i];
        var gly = "";
        if (e.gly !== undefined && e.gly !== null) {
            for (var j = 0; j < e.gly.length; j++) {
                gly = gly + e.gly[j].mc + ",";
            }
        }
        var tr = {"td": [e.mc, e.dm, e.bz, gly]};
        data.push(tr);
    }
    $("#tblKuCun").built({"data": data, "obj": kuCun, "dbclick": xgKuCun}).setPage(json.yx, json.zys, json.jls);

}