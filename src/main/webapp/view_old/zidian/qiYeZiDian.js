var qiYeZiDian = {"sz": [], "seq": -1, "yx": 1, "zys": 0};
var qyzdBianHao;
var isEditQyzd;
var cxZdlbObj = {};
var zjZdlbObj = {};

$(document).ready(function () {
    lp_cxZiDianLeiBie();
    $("#tblCx4Qyzd_zdlb").inputKit({"src":lp_ZiDianLeiBieList,"obj":"cxZdlbObj"});
    $("#tblFrmQyzd_zdlb").inputKit({"src":lp_ZiDianLeiBieList,"obj":"zjZdlbObj"});
    $("#tblQiyezidian").setListBottom(qiYeZiDian, cxQiYeZiDian);
    $("#tblQiyezidian").built();
    $("#divCx4Qyzd").popTopBar("查询企业字典信息");
    $("#divFrmQyzd").popTopBar("企业字典信息");
    $("#divFrmQyzd").find("input,select").r2t();
    $("#divCx4Qyzd").find("input,select").r2t();
    $("#logo").click(function () {
        $("#divCx4Qyzd").show();
        $("#board").css("z-index", $("#divCx4Qyzd").css("z-index") - 1).show();
    });
    $("#tblFrmQyzd_dm").focus(function () {
        if ($("#tblFrmQyzd_dm").val().length === 0) {
            $("#tblFrmQyzd_dm").val(makePy($("#tblFrmQyzd_mc").val().substring(0,5)));
        }
    });
    cd4QiYeZiDian();
});

function cd4QiYeZiDian() {
    $("#tblQiyezidian").contextMenu("cd4Qyzd", {
        bindings: {
            "zjQyzd": function (t) {
                zjQiYeZiDian();
            },
            "xgQyzd": function (t) {
                xgQiYeZiDian();
            },
            "scQyzd": function (t) {
                scQiYeZiDian();
            }
        }
    });
}

function cxQiYeZiDian() {
    var json = {"yx": qiYeZiDian.yx};
    json.mc = $("#tblCx4Qyzd_mc").val();
    if(cxZdlbObj !== undefined && cxZdlbObj.id !== undefined){
        json.zdlb = cxZdlbObj.id;
    }
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/getQyzds.action",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            failureResp(msg.responseText);
        },
        success: function (json) {
            if (checkResult(json)) {
                jxQiYeZiDian(json);
                $("#divCx4Qyzd").hide();
                $("#board").hide();
            }
        }
    });
}

function jxQiYeZiDian(json) {
    qiYeZiDian.sz = json.sz;
    qiYeZiDian.yx = json.yx;
    qiYeZiDian.zys = json.zys;
    qiYeZiDian.jls = json.jls;
    if (qiYeZiDian.yx === 0)
        qiYeZiDian.yx = 1;
    var data = [];
    for (var i = 0; i < json.sz.length; i++) {
        var e = json.sz[i];
        var tr = {"td": [e.mc, e.dm, e.bz]};
        data.push(tr);
    }
    $("#tblQiyezidian").built({"data": data, "obj": qiYeZiDian, "dbclick": xgQiYeZiDian}).setPage(json.yx, json.zys, json.jls);

}

function zjQiYeZiDian() {
    isEditQyzd = false;
    qyzdBianHao = "";
    $("#tblFrmQyzd input[type=text]").val("").removeAttr("readonly");
    $("#divFrmQyzd").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmQyzd").css("z-index") - 1).show();
    $("#tblFrmQyzd_mc").focus();

}

function xgQiYeZiDian() {
    isEditQyzd = true;
    if (qiYeZiDian.sz[qiYeZiDian.seq] === undefined || qiYeZiDian.sz[qiYeZiDian.seq] === null) {
        return alert("请选择企业字典");
    }
    var qyzd = qiYeZiDian.sz[qiYeZiDian.seq];
    qyzdBianHao = qyzd.id;
    $("#tblFrmQyzd_mc").val(qyzd.mc);
    $("#tblFrmQyzd_zdlb").val(qyzd.zdlb_mc).attr("readonly","readonly");
    $("#tblFrmQyzd_dm").val(qyzd.dm);
    $("#tblFrmQyzd_bz").val(qyzd.bz);
    $("#divFrmQyzd").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmQyzd").css("z-index") - 1).show();
    $("#tblFrmQyzd_mc").focus();
}

function check4Sjhm() {
    if ($("#tblFrmQyzd_mc").val() === "") {
        alert("请输入姓名");
        return false;
    }
    return true;
}

function scQiYeZiDian() {
    if (qiYeZiDian.sz[qiYeZiDian.seq] === undefined || qiYeZiDian.sz[qiYeZiDian.seq] === null) {
        return alert("请选择企业字典");
    }
    if (!confirm("是否删除企业字典" + qiYeZiDian.sz[qiYeZiDian.seq].mc + "?"))
        return false;
    var json = {"id": qiYeZiDian.sz[qiYeZiDian.seq].id};
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/delQyzd.do",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        //error:function(msg, textStatus){failureResp(msg.responseText);},
        success: function (json) {
            if (checkResult(json)) {
                cxQiYeZiDian();
            }
        }
    });
}

function bcQiYeZiDian() {
    if (check4Sjhm()) {
        var j = {};
        j.mc = $("#tblFrmQyzd_mc").val();
        j.dm = $("#tblFrmQyzd_dm").val();
        j.bz = $("#tblFrmQyzd_bz").val();
        if (isEditQyzd) {
            j.id = qiYeZiDian.sz[qiYeZiDian.seq].id;
        }else{
            j.zdlb_id = zjZdlbObj.id;
        }
        j = {"jsonObj": JSON.stringify(j)};
        var url = isEditQyzd ? "/whwr/updateQyzd.action" : "/whwr/addQyzd.action";
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
                    cxQiYeZiDian();
                    $("#divFrmQyzd").hide();
                    $("#board").hide();
                }
            }
        });
    }

}
