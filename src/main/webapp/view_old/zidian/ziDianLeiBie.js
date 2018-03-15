var ziDianLeiBie = {"sz": [], "seq": -1, "yx": 1, "zys": 0};
var zdlbBianHao;
var isEditZdlb;

$(document).ready(function () {
    $("#tblZidianleibie").setListBottom(ziDianLeiBie, cxZiDianLeiBie);
    $("#tblZidianleibie").built();
    $("#divCx4Zdlb").popTopBar("查询字典类别信息");
    $("#divFrmZdlb").popTopBar("字典类别信息");
    $("#divFrmZdlb").find("input,select").r2t();
    $("#divCx4Zdlb").find("input,select").r2t();
    $("#logo").click(function () {
        $("#divCx4Zdlb").show();
        $("#board").css("z-index", $("#divCx4Zdlb").css("z-index") - 1).show();
    });
    $("#tblFrmZdlb_dm").focus(function () {
        if ($("#tblFrmZdlb_dm").val().length === 0) {
            $("#tblFrmZdlb_dm").val(makePy($("#tblFrmZdlb_mc").val().substring(0,5)));
        }
    });
    cd4ZiDianLeiBie();
});

function cd4ZiDianLeiBie() {
    $("#tblZidianleibie").contextMenu("cd4Zdlb", {
        bindings: {
            "zjZdlb": function (t) {
                zjZiDianLeiBie();
            },
            "xgZdlb": function (t) {
                xgZiDianLeiBie();
            },
            "scZdlb": function (t) {
                scZiDianLeiBie();
            }
        }
    });
}

function cxZiDianLeiBie() {
    var json = {"yx": ziDianLeiBie.yx};
    json.mc = $("#tblCx4Zdlb_mc").val();
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/getZdlbs.action",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            failureResp(msg.responseText);
        },
        success: function (json) {
            if (checkResult(json)) {
                jxZiDianLeiBie(json);
                $("#divCx4Zdlb").hide();
                $("#board").hide();
            }
        }
    });
}

function jxZiDianLeiBie(json) {
    ziDianLeiBie.sz = json.sz;
    ziDianLeiBie.yx = json.yx;
    ziDianLeiBie.zys = json.zys;
    ziDianLeiBie.jls = json.jls;
    if (ziDianLeiBie.yx === 0)
        ziDianLeiBie.yx = 1;
    var data = [];
    for (var i = 0; i < json.sz.length; i++) {
        var e = json.sz[i];
        var tr = {"td": [e.mc]};
        data.push(tr);
    }
    $("#tblZidianleibie").built({"data": data, "obj": ziDianLeiBie, "dbclick": xgZiDianLeiBie}).setPage(json.yx, json.zys, json.jls);

}

function zjZiDianLeiBie() {
    isEditZdlb = false;
    zdlbBianHao = "";
    $("#tblFrmZdlb input[type=text]").val("").removeAttr("readonly");
    $("#divFrmZdlb").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmZdlb").css("z-index") - 1).show();
    $("#tblFrmZdlb_mc").focus();

}

function xgZiDianLeiBie() {
    isEditZdlb = true;
    if (ziDianLeiBie.sz[ziDianLeiBie.seq] === undefined || ziDianLeiBie.sz[ziDianLeiBie.seq] === null) {
        return alert("请选择字典类别");
    }
    var zdlb = ziDianLeiBie.sz[ziDianLeiBie.seq];
    zdlbBianHao = zdlb.id;
    $("#tblFrmZdlb input[type=text]").val("").removeAttr("readonly");
    $("#tblFrmZdlb_mc").val(zdlb.mc);
    $("#divFrmZdlb").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmZdlb").css("z-index") - 1).show();
    $("#tblFrmZdlb_mc").focus();
}

function check4Sjhm() {
    if ($("#tblFrmZdlb_mc").val() === "") {
        alert("请输入姓名");
        return false;
    }
    return true;
}

function scZiDianLeiBie() {
    if (ziDianLeiBie.sz[ziDianLeiBie.seq] === undefined || ziDianLeiBie.sz[ziDianLeiBie.seq] === null) {
        return alert("请选择字典类别");
    }
    if (!confirm("是否删除字典类别" + ziDianLeiBie.sz[ziDianLeiBie.seq].mc + "?"))
        return false;
    var json = {"id": ziDianLeiBie.sz[ziDianLeiBie.seq].id};
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/delZdlb.do",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        //error:function(msg, textStatus){failureResp(msg.responseText);},
        success: function (json) {
            if (checkResult(json)) {
                cxZiDianLeiBie();
            }
        }
    });
}

function bcZiDianLeiBie() {
    if (check4Sjhm()) {
        var j = {};
        j.mc = $("#tblFrmZdlb_mc").val();
        if (isEditZdlb) {
            j.id = ziDianLeiBie.sz[ziDianLeiBie.seq].id;
        }
        j = {"jsonObj": JSON.stringify(j)};
        var url = isEditZdlb ? "/whwr/updateZdlb.action" : "/whwr/addZdlb.action";
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
                    cxZiDianLeiBie();
                    $("#divFrmZdlb").hide();
                    $("#board").hide();
                }
            }
        });
    }

}
