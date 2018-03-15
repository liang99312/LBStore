var buMen = {"sz": [], "seq": -1, "yx": 1, "zys": 0};
var bmBianHao;
var isEditBm;

$(document).ready(function () {
    $("#tblKehu").setListBottom(buMen, cxBuMen);
    $("#tblKehu").built();
    $("#divCx4Bm").popTopBar("查询部门信息");
    $("#divFrmBm").popTopBar("部门信息");
    $("#divFrmBm").find("input,select").r2t();
    $("#divCx4Bm").find("input,select").r2t();
    $("#logo").click(function () {
        $("#divCx4Bm").show();
        $("#board").css("z-index", $("#divCx4Bm").css("z-index") - 1).show();
    });
    $("#tblFrmBm_dm").focus(function () {
        if ($("#tblFrmBm_dm").val().length === 0) {
            $("#tblFrmBm_dm").val(makePy($("#tblFrmBm_mc").val().substring(0,5)));
        }
    });
    cd4BuMen();
});

function cd4BuMen() {
    $("#tblKehu").contextMenu("cd4Bm", {
        bindings: {
            "zjBm": function (t) {
                zjBuMen();
            },
            "xgBm": function (t) {
                xgBuMen();
            },
            "scBm": function (t) {
                scBuMen();
            }
        }
    });
}

function cxBuMen() {
    var json = {"yx": buMen.yx};
    json.mc = $("#tblCx4Bm_mc").val();
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/getBuMens.action",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            failureResp(msg.responseText);
        },
        success: function (json) {
            if (checkResult(json)) {
                jxBuMen(json);
                $("#divCx4Bm").hide();
                $("#board").hide();
            }
        }
    });
}

function jxBuMen(json) {
    buMen.sz = json.sz;
    buMen.yx = json.yx;
    buMen.zys = json.zys;
    buMen.jls = json.jls;
    if (buMen.yx === 0)
        buMen.yx = 1;
    var data = [];
    for (var i = 0; i < json.sz.length; i++) {
        var e = json.sz[i];
        var tr = {"td": [e.mc, e.dm, e.bz]};
        data.push(tr);
    }
    $("#tblKehu").built({"data": data, "obj": buMen, "dbclick": xgBuMen}).setPage(json.yx, json.zys, json.jls);

}

function zjBuMen() {
    isEditBm = false;
    bmBianHao = "";
    $("#tblFrmBm input[type=text]").val("").removeAttr("readonly");
    $("#divFrmBm").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmBm").css("z-index") - 1).show();
    $("#tblFrmBm_mc").focus();

}

function xgBuMen() {
    isEditBm = true;
    if (buMen.sz[buMen.seq] === undefined || buMen.sz[buMen.seq] === null) {
        return alert("请选择部门");
    }
    var bm = buMen.sz[buMen.seq];
    bmBianHao = bm.id;
    $("#tblFrmBm input[type=text]").val("").removeAttr("readonly");
    $("#tblFrmBm_mc").val(bm.mc);
    $("#tblFrmBm_dm").val(bm.dm);
    $("#tblFrmBm_bz").val(bm.bz);
    $("#divFrmBm").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmBm").css("z-index") - 1).show();
    $("#tblFrmBm_mc").focus();
}

function check4Sjhm() {
    if ($("#tblFrmBm_mc").val() === "") {
        alert("请输入姓名");
        return false;
    }
    return true;
}

function scBuMen() {
    if (buMen.sz[buMen.seq] === undefined || buMen.sz[buMen.seq] === null) {
        return alert("请选择部门");
    }
    if (!confirm("是否删除部门" + buMen.sz[buMen.seq].mc + "?"))
        return false;
    var json = {"id": buMen.sz[buMen.seq].id};
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/delBuMen.do",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        //error:function(msg, textStatus){failureResp(msg.responseText);},
        success: function (json) {
            if (checkResult(json)) {
                cxBuMen();
            }
        }
    });
}

function bcBuMen() {
    if (check4Sjhm()) {
        var j = {};
        j.mc = $("#tblFrmBm_mc").val();
        j.dm = $("#tblFrmBm_dm").val();
        j.bz = $("#tblFrmBm_bz").val();
        if (isEditBm) {
            j.id = buMen.sz[buMen.seq].id;
        }
        j = {"jsonObj": JSON.stringify(j)};
        var url = isEditBm ? "/whwr/updateBuMen.action" : "/whwr/addBuMen.action";
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
                    cxBuMen();
                    $("#divFrmBm").hide();
                    $("#board").hide();
                }
            }
        });
    }

}
