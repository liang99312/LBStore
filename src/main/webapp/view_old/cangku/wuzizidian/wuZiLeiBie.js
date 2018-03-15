var wuZiLeiBie = {"sz": [], "seq": -1, "yx": 1, "zys": 0};
var wzlbBianHao;
var isEditWzlb;

$(document).ready(function () {
    $("#tblZidianleibie").setListBottom(wuZiLeiBie, cxWuZiLeiBie);
    $("#tblZidianleibie").built();
    $("#divCx4Wzlb").popTopBar("查询物资类别信息");
    $("#divFrmWzlb").popTopBar("物资类别信息");
    $("#divFrmWzlb").find("input,select").r2t();
    $("#divCx4Wzlb").find("input,select").r2t();
    $("#logo").click(function () {
        $("#divCx4Wzlb").show();
        $("#board").css("z-index", $("#divCx4Wzlb").css("z-index") - 1).show();
    });
    $("#tblFrmWzlb_dm").focus(function () {
        if ($("#tblFrmWzlb_dm").val().length === 0) {
            $("#tblFrmWzlb_dm").val(makePy($("#tblFrmWzlb_mc").val().substring(0,5)));
        }
    });
    cd4WuZiLeiBie();
});

function cd4WuZiLeiBie() {
    $("#tblZidianleibie").contextMenu("cd4Wzlb", {
        bindings: {
            "zjWzlb": function (t) {
                zjWuZiLeiBie();
            },
            "xgWzlb": function (t) {
                xgWuZiLeiBie();
            },
            "scWzlb": function (t) {
                scWuZiLeiBie();
            }
        }
    });
}

function cxWuZiLeiBie() {
    var json = {"yx": wuZiLeiBie.yx};
    json.mc = $("#tblCx4Wzlb_mc").val();
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/getWzlbs.action",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            failureResp(msg.responseText);
        },
        success: function (json) {
            if (checkResult(json)) {
                jxWuZiLeiBie(json);
                $("#divCx4Wzlb").hide();
                $("#board").hide();
            }
        }
    });
}

function jxWuZiLeiBie(json) {
    wuZiLeiBie.sz = json.sz;
    wuZiLeiBie.yx = json.yx;
    wuZiLeiBie.zys = json.zys;
    wuZiLeiBie.jls = json.jls;
    if (wuZiLeiBie.yx === 0)
        wuZiLeiBie.yx = 1;
    var data = [];
    for (var i = 0; i < json.sz.length; i++) {
        var e = json.sz[i];
        var tr = {"td": [e.mc,e.dm,e.bz]};
        data.push(tr);
    }
    $("#tblZidianleibie").built({"data": data, "obj": wuZiLeiBie, "dbclick": xgWuZiLeiBie}).setPage(json.yx, json.zys, json.jls);

}

function zjWuZiLeiBie() {
    isEditWzlb = false;
    wzlbBianHao = "";
    $("#tblFrmWzlb input[type=text]").val("").removeAttr("readonly");
    $("#divFrmWzlb").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmWzlb").css("z-index") - 1).show();
    $("#tblFrmWzlb_mc").focus();

}

function xgWuZiLeiBie() {
    isEditWzlb = true;
    if (wuZiLeiBie.sz[wuZiLeiBie.seq] === undefined || wuZiLeiBie.sz[wuZiLeiBie.seq] === null) {
        return alert("请选择物资类别");
    }
    var wzlb = wuZiLeiBie.sz[wuZiLeiBie.seq];
    wzlbBianHao = wzlb.id;
    $("#tblFrmWzlb input[type=text]").val("").removeAttr("readonly");
    $("#tblFrmWzlb_mc").val(wzlb.mc);
    $("#tblFrmWzlb_dm").val(wzlb.dm);
    $("#tblFrmWzlb_bz").val(wzlb.bz);
    $("#divFrmWzlb").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmWzlb").css("z-index") - 1).show();
    $("#tblFrmWzlb_mc").focus();
}

function check4Sjhm() {
    if ($("#tblFrmWzlb_mc").val() === "") {
        alert("请输入姓名");
        return false;
    }
    return true;
}

function scWuZiLeiBie() {
    if (wuZiLeiBie.sz[wuZiLeiBie.seq] === undefined || wuZiLeiBie.sz[wuZiLeiBie.seq] === null) {
        return alert("请选择物资类别");
    }
    if (!confirm("是否删除物资类别" + wuZiLeiBie.sz[wuZiLeiBie.seq].mc + "?"))
        return false;
    var json = {"id": wuZiLeiBie.sz[wuZiLeiBie.seq].id};
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/delWzlb.do",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        //error:function(msg, textStatus){failureResp(msg.responseText);},
        success: function (json) {
            if (checkResult(json)) {
                cxWuZiLeiBie();
            }
        }
    });
}

function bcWuZiLeiBie() {
    if (check4Sjhm()) {
        var j = {};
        j.mc = $("#tblFrmWzlb_mc").val();
        j.dm = $("#tblFrmWzlb_dm").val();
        j.bz = $("#tblFrmWzlb_bz").val();
        if (isEditWzlb) {
            j.id = wuZiLeiBie.sz[wuZiLeiBie.seq].id;
        }
        j = {"jsonObj": JSON.stringify(j)};
        var url = isEditWzlb ? "/whwr/updateWzlb.action" : "/whwr/addWzlb.action";
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
                    cxWuZiLeiBie();
                    $("#divFrmWzlb").hide();
                    $("#board").hide();
                }
            }
        });
    }

}
