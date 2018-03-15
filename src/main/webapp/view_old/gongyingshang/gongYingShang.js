var gongYingShang = {"sz": [], "seq": -1, "yx": 1, "zys": 0};
var gysBianHao;
var isEditGys;

$(document).ready(function () {
    $("#tblGongyingshang").setListBottom(gongYingShang, cxGongYingShang);
    $("#tblGongyingshang").built();
    $("#divCx4Gys").popTopBar("查询供应商信息");
    $("#divFrmGys").popTopBar("供应商信息");
    $("#divFrmGys").find("input,select").r2t();
    $("#divCx4Gys").find("input,select").r2t();
    $("#logo").click(function () {
        $("#divCx4Gys").show();
        $("#board").css("z-index", $("#divCx4Gys").css("z-index") - 1).show();
    });
    $("#tblFrmGys_dm").focus(function () {
        if ($("#tblFrmGys_dm").val().length === 0) {
            $("#tblFrmGys_dm").val(makePy($("#tblFrmGys_mc").val().substring(0,5)));
        }
    });
    cd4GongYingShang();
});

function cd4GongYingShang() {
    $("#tblGongyingshang").contextMenu("cd4Gys", {
        bindings: {
            "zjGys": function (t) {
                zjGongYingShang();
            },
            "xgGys": function (t) {
                xgGongYingShang();
            },
            "scGys": function (t) {
                scGongYingShang();
            }
        }
    });
}

function cxGongYingShang() {
    var json = {"yx": gongYingShang.yx};
    json.mc = $("#tblCx4Gys_mc").val();
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/getGongYingShangs.action",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            failureResp(msg.responseText);
        },
        success: function (json) {
            if (checkResult(json)) {
                jxGongYingShang(json);
                $("#divCx4Gys").hide();
                $("#board").hide();
            }
        }
    });
}

function jxGongYingShang(json) {
    gongYingShang.sz = json.sz;
    gongYingShang.yx = json.yx;
    gongYingShang.zys = json.zys;
    gongYingShang.jls = json.jls;
    if (gongYingShang.yx === 0)
        gongYingShang.yx = 1;
    var data = [];
    for (var i = 0; i < json.sz.length; i++) {
        var e = json.sz[i];
        var tr = {"td": [e.mc, e.dm, e.dz, e.lxr, e.lxdh, e.bz]};
        data.push(tr);
    }
    $("#tblGongyingshang").built({"data": data, "obj": gongYingShang, "dbclick": xgGongYingShang}).setPage(json.yx, json.zys, json.jls);

}

function zjGongYingShang() {
    isEditGys = false;
    gysBianHao = "";
    $("#tblFrmGys input[type=text]").val("").removeAttr("readonly");
    $("#divFrmGys").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmGys").css("z-index") - 1).show();
    $("#tblFrmGys_mc").focus();

}

function xgGongYingShang() {
    isEditGys = true;
    if (gongYingShang.sz[gongYingShang.seq] === undefined || gongYingShang.sz[gongYingShang.seq] === null) {
        return alert("请选择供应商");
    }
    var gys = gongYingShang.sz[gongYingShang.seq];
    gysBianHao = gys.id;
    $("#tblFrmGys input[type=text]").val("").removeAttr("readonly");
    $("#tblFrmGys_mc").val(gys.mc);
    $("#tblFrmGys_dm").val(gys.dm);
    $("#tblFrmGys_dz").val(gys.dz);
    $("#tblFrmGys_lxr").val(gys.lxr);
    $("#tblFrmGys_lxdh").val(gys.lxdh);
    $("#tblFrmGys_bz").val(gys.bz);
    $("#divFrmGys").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmGys").css("z-index") - 1).show();
    $("#tblFrmGys_mc").focus();
}

function check4Sjhm() {
    if ($("#tblFrmGys_mc").val() === "") {
        alert("请输入姓名");
        return false;
    }
    return true;
}

function scGongYingShang() {
    if (gongYingShang.sz[gongYingShang.seq] === undefined || gongYingShang.sz[gongYingShang.seq] === null) {
        return alert("请选择供应商");
    }
    if (!confirm("是否删除供应商" + gongYingShang.sz[gongYingShang.seq].mc + "?"))
        return false;
    var json = {"id": gongYingShang.sz[gongYingShang.seq].id};
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/delGongYingShang.do",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        //error:function(msg, textStatus){failureResp(msg.responseText);},
        success: function (json) {
            if (checkResult(json)) {
                cxGongYingShang();
            }
        }
    });
}

function bcGongYingShang() {
    if (check4Sjhm()) {
        var j = {};
        j.mc = $("#tblFrmGys_mc").val();
        j.dm = $("#tblFrmGys_dm").val();
        j.dz = $("#tblFrmGys_dz").val();
        j.lxr = $("#tblFrmGys_lxr").val();
        j.lxdh = $("#tblFrmGys_lxdh").val();
        j.bz = $("#tblFrmGys_bz").val();
        if (isEditGys) {
            j.id = gongYingShang.sz[gongYingShang.seq].id;
        }
        j = {"jsonObj": JSON.stringify(j)};
        var url = isEditGys ? "/whwr/updateGongYingShang.action" : "/whwr/addGongYingShang.action";
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
                    cxGongYingShang();
                    $("#divFrmGys").hide();
                    $("#board").hide();
                }
            }
        });
    }

}
