var keHu = {"sz": [], "seq": -1, "yx": 1, "zys": 0};
var khBianHao;
var isEditKh;

$(document).ready(function () {
    $("#tblKehu").setListBottom(keHu, cxKeHu);
    $("#tblKehu").built();
    $("#divCx4Kh").popTopBar("查询客户信息");
    $("#divFrmKh").popTopBar("客户信息");
    $("#divFrmKh").find("input,select").r2t();
    $("#divCx4Kh").find("input,select").r2t();
    $("#logo").click(function () {
        $("#divCx4Kh").show();
        $("#board").css("z-index", $("#divCx4Kh").css("z-index") - 1).show();
    });
    $("#tblFrmKh_dm").focus(function () {
        if ($("#tblFrmKh_dm").val().length === 0) {
            $("#tblFrmKh_dm").val(makePy($("#tblFrmKh_mc").val().substring(0,5)));
        }
    });
    cd4KeHu();
});

function cd4KeHu() {
    $("#tblKehu").contextMenu("cd4Kh", {
        bindings: {
            "zjKh": function (t) {
                zjKeHu();
            },
            "xgKh": function (t) {
                xgKeHu();
            },
            "scKh": function (t) {
                scKeHu();
            }
        }
    });
}

function cxKeHu() {
    var json = {"yx": keHu.yx};
    json.mc = $("#tblCx4Kh_mc").val();
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/getKeHus.action",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            failureResp(msg.responseText);
        },
        success: function (json) {
            if (checkResult(json)) {
                jxKeHu(json);
                $("#divCx4Kh").hide();
                $("#board").hide();
            }
        }
    });
}

function jxKeHu(json) {
    keHu.sz = json.sz;
    keHu.yx = json.yx;
    keHu.zys = json.zys;
    keHu.jls = json.jls;
    if (keHu.yx === 0)
        keHu.yx = 1;
    var data = [];
    for (var i = 0; i < json.sz.length; i++) {
        var e = json.sz[i];
        var tr = {"td": [e.mc, e.dm, e.dz, e.lxr, e.lxdh, e.bz]};
        data.push(tr);
    }
    $("#tblKehu").built({"data": data, "obj": keHu, "dbclick": xgKeHu}).setPage(json.yx, json.zys, json.jls);

}

function zjKeHu() {
    isEditKh = false;
    khBianHao = "";
    $("#tblFrmKh input[type=text]").val("").removeAttr("readonly");
    $("#divFrmKh").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmKh").css("z-index") - 1).show();
    $("#tblFrmKh_mc").focus();

}

function xgKeHu() {
    isEditKh = true;
    if (keHu.sz[keHu.seq] === undefined || keHu.sz[keHu.seq] === null) {
        return alert("请选择客户");
    }
    var kh = keHu.sz[keHu.seq];
    khBianHao = kh.id;
    $("#tblFrmKh input[type=text]").val("").removeAttr("readonly");
    $("#tblFrmKh_mc").val(kh.mc);
    $("#tblFrmKh_dm").val(kh.dm);
    $("#tblFrmKh_dz").val(kh.dz);
    $("#tblFrmKh_lxr").val(kh.lxr);
    $("#tblFrmKh_lxdh").val(kh.lxdh);
    $("#tblFrmKh_bz").val(kh.bz);
    $("#divFrmKh").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmKh").css("z-index") - 1).show();
    $("#tblFrmKh_mc").focus();
}

function check4Sjhm() {
    if ($("#tblFrmKh_mc").val() === "") {
        alert("请输入姓名");
        return false;
    }
    return true;
}

function scKeHu() {
    if (keHu.sz[keHu.seq] === undefined || keHu.sz[keHu.seq] === null) {
        return alert("请选择客户");
    }
    if (!confirm("是否删除客户" + keHu.sz[keHu.seq].mc + "?"))
        return false;
    var json = {"id": keHu.sz[keHu.seq].id};
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/delKeHu.do",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        //error:function(msg, textStatus){failureResp(msg.responseText);},
        success: function (json) {
            if (checkResult(json)) {
                cxKeHu();
            }
        }
    });
}

function bcKeHu() {
    if (check4Sjhm()) {
        var j = {};
        j.mc = $("#tblFrmKh_mc").val();
        j.dm = $("#tblFrmKh_dm").val();
        j.dz = $("#tblFrmKh_dz").val();
        j.lxr = $("#tblFrmKh_lxr").val();
        j.lxdh = $("#tblFrmKh_lxdh").val();
        j.bz = $("#tblFrmKh_bz").val();
        if (isEditKh) {
            j.id = keHu.sz[keHu.seq].id;
        }
        j = {"jsonObj": JSON.stringify(j)};
        var url = isEditKh ? "/whwr/updateKeHu.action" : "/whwr/addKeHu.action";
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
                    cxKeHu();
                    $("#divFrmKh").hide();
                    $("#board").hide();
                }
            }
        });
    }

}
