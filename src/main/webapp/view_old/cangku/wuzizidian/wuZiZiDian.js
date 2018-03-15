var wuZiZiDian = {"sz": [], "seq": -1, "yx": 1, "zys": 0};
var wzzdBianHao;
var isEditWzzd;
var isEditXhgg;
var gxys = [];
var xhgg = {"sz": [], "seq": -1};
var cxWzlbObj = {};
var zjWzlbObj = {};
var zjZdlbObj = {};
var gxys_yh = -1;

$(document).ready(function () {
    lp_cxWuZiLeiBie();
    lp_cxZiDianLeiBie();
    $("#tblFrmGxys_zdlb").inputKit({"src": lp_ZiDianLeiBieList, "obj": "zjZdlbObj"});
    $("#tblCx4Wzzd_zdlb").inputKit({"src": lp_WuZiLeiBieList, "obj": "cxWzlbObj"});
    $("#tblFrmWzzd_zdlb").inputKit({"src": lp_WuZiLeiBieList, "obj": "zjWzlbObj"});
    $("#tblQiyezidian").setListBottom(wuZiZiDian, cxWuZiZiDian);
    $("#tblQiyezidian").built();
    $("#divCx4Wzzd").popTopBar("查询物资字典信息");
    $("#divFrmWzzd").popTopBar("物资字典信息");
    $("#divFrmGxys").popTopBar("物资个性要素");
    $("#divFrmXhgg").popTopBar("物资型号规格");
    $("#divFrmXhggMx").popTopBar("型号规格");
    $("#divFrmWzzd").find("input,select").r2t();
    $("#divCx4Wzzd").find("input,select").r2t();

    cd4WuZiZiDian();
    setEvents();
});

function setEvents() {
    $("#logo").click(function () {
        $("#divCx4Wzzd").show();
        $("#board").css("z-index", $("#divCx4Wzzd").css("z-index") - 1).show();
    });
    $("#tblFrmWzzd_dm").focus(function () {
        if ($("#tblFrmWzzd_dm").val().length === 0) {
            $("#tblFrmWzzd_dm").val(makePy($("#tblFrmWzzd_mc").val().substring(0, 5)));
        }
    });
    $("#tblFrmGxys_dm").focus(function () {
        if ($("#tblFrmGxys_dm").val().length === 0) {
            $("#tblFrmGxys_dm").val(makePy($("#tblFrmGxys_mc").val().substring(0, 5)));
        }
    });
    $("#tblFrmXhggMx_dm").focus(function () {
        if ($("#tblFrmXhggMx_dm").val().length === 0) {
            $("#tblFrmXhggMx_dm").val(makePy($("#tblFrmXhggMx_ggmc").val().substring(0, 5)));
        }
    });
    $("#tblFrmGxys_sjly").change(function () {
        if ($(this).val() === "qyzd") {
            $("#tblFrmGxys_zdlb_tr").show();
        } else {
            $("#tblFrmGxys_zdlb_tr").hide();
        }
    });
}

function cd4WuZiZiDian() {
    $("#tblQiyezidian").contextMenu("cd4Wzzd", {
        bindings: {
            "zjWzzd": function (t) {
                zjWuZiZiDian();
            },
            "xgWzzd": function (t) {
                xgWuZiZiDian();
            },
            "xhggWzzd": function (t) {
                xhggWzzd();
            },
            "scWzzd": function (t) {
                scWuZiZiDian();
            }
        }
    });
    
    $("#tblGxys").contextMenu("cd4WzzdGxys", {
        bindings: {
            "zjGxys": function (t) {
                zjGxys();
            },
            "xgGxys": function (t) {
                xgGxys();
            },
            "scGxys": function (t) {
                scGxys();
            }
        }
    });
    
    $("#tblXhgg").contextMenu("cd4Xhgg", {
        bindings: {
            "zjXhgg": function (t) {
                zjXhgg();
            },
            "xgXhgg": function (t) {
                xgXhgg();
            },
            "scXhgg": function (t) {
                scXhgg();
            }
        }
    });
}

function cxWuZiZiDian() {
    var json = {"yx": wuZiZiDian.yx};
    json.wzlb = cxWzlbObj.id;
    json.mc = $("#tblCx4Wzzd_mc").val();
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/getWzzds.action",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            failureResp(msg.responseText);
        },
        success: function (json) {
            if (checkResult(json)) {
                jxWuZiZiDian(json);
                $("#divCx4Wzzd").hide();
                $("#board").hide();
            }
        }
    });
}

function jxWuZiZiDian(json) {
    wuZiZiDian.sz = json.sz;
    wuZiZiDian.yx = json.yx;
    wuZiZiDian.zys = json.zys;
    wuZiZiDian.jls = json.jls;
    if (wuZiZiDian.yx === 0)
        wuZiZiDian.yx = 1;
    var data = [];
    for (var i = 0; i < json.sz.length; i++) {
        var e = json.sz[i];
        var tr = {"td": [e.mc, e.dm,e.bz]};
        data.push(tr);
    }
    $("#tblQiyezidian").built({"data": data, "obj": wuZiZiDian, "dbclick": xgWuZiZiDian}).setPage(json.yx, json.zys, json.jls);

}

function zjWuZiZiDian() {
    gxys= [];
    isEditWzzd = false;
    wzzdBianHao = "";
    $("#tblFrmWzzd input[type=text]").val("").removeAttr("readonly");
    $("#divFrmWzzd").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmWzzd").css("z-index") - 1).show();
    $("#tblFrmWzzd_mc").focus();

}

function xhggWzzd(){
    if (wuZiZiDian.sz[wuZiZiDian.seq] === undefined || wuZiZiDian.sz[wuZiZiDian.seq] === null) {
        return alert("请选择物资字典");
    }
    var wzzd = wuZiZiDian.sz[wuZiZiDian.seq];
    $("#tblFrmXhgg_wzmc").val(wzzd.mc).attr("readonly", "readonly");
    $("#tblFrmXhgg_zdlb").val(wzzd.wzlb_mc).attr("readonly", "readonly");
    cxWzzdXhgg();
}

function cxWzzdXhgg(){
    var id = wuZiZiDian.sz[wuZiZiDian.seq].id;
    var j = {"wzzd_id":id};
    j = {"jsonObj": JSON.stringify(j)};
    $.ajax({
        url: "/whwr/cxWzzdXhgg.action",
        data: j,
        dataType: "json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            failureResp(msg.responseText);
        },
        success: function (json) {
            if (checkResult(json)) {
                setXhggList(json);
            }
        }
    });
}

function setXhggList(json){
    xhgg.sz = json.sz;
    var data = [];
    for (var i = 0; i < json.sz.length; i++) {
        var e = json.sz[i];
        var tr = {"td": [e.mc, e.dm,e.sl,e.jb,e.bz]};
        data.push(tr);
    }
    if(data.length === 0){
        data.push({"td": ["","","","",""]});
        data.push({"td": ["","","","",""]});
    }
    $("#tblXhgg").built({"data": data, "obj": xhgg, "tds":5, "dbclick": xgXhgg,"fit":true});
    $("#tblXhgg").setColWidth([150,100,150,100,0]);
    $("#divFrmXhgg").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmXhgg").css("z-index") - 1).show();
}

function xgXhgg(){
    var temp_xhgg = xhgg.sz[xhgg.seq];
   if (temp_xhgg === undefined || temp_xhgg === null) {
        return alert("请选择型号规格");
    }
    isEditXhgg = true;
    $("#tblFrmXhggMx_ggmc").val(temp_xhgg.mc);
    $("#tblFrmXhggMx_dm").val(temp_xhgg.dm);
    $("#tblFrmXhggMx_sl").val(temp_xhgg.sl);
    $("#tblFrmXhggMx [name='shifou'][value='" + temp_xhgg.jb + "']").prop("checked", true);
    $("#tblFrmXhggMx_bz").val(temp_xhgg.bz);
    $("#divFrmXhggMx").css("z-index", "20").show();
    $("#board").css("z-index", $("#divFrmXhggMx").css("z-index") - 1).show();
}

function zjXhgg(){
    isEditXhgg = false;
    $("#divFrmXhggMx").css("z-index", "20").show();
    $("#board").css("z-index", $("#divFrmXhggMx").css("z-index") - 1).show();
}

function scXhgg(){
    if (xhgg.sz[xhgg.seq] === undefined || xhgg.sz[xhgg.seq] === null) {
        return alert("请选择型号规格");
    }
    if (!confirm("是否删除型号规格" + xhgg.sz[xhgg.seq].mc + "?"))
        return false;
    var json = {"id": xhgg.sz[xhgg.seq].id};
    json.wzzd_id = wuZiZiDian.sz[wuZiZiDian.seq].id;
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/delWzzdXhgg.do",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        error:function(msg, textStatus){failureResp(msg.responseText);},
        success: function (json) {
            if (checkResult(json)) {
                cxWzzdXhgg();
            }
        }
    });
}

function bcXhgg(){
    if (check4Xhgg()) {
        var j = {};
        j.wzzd_id = wuZiZiDian.sz[wuZiZiDian.seq].id;
        j.mc = $("#tblFrmXhggMx_ggmc").val();
        j.dm = $("#tblFrmXhggMx_dm").val();
        j.sl = $("#tblFrmXhggMx_sl").val();
        j.jb = $("#tblFrmXhggMx input:radio[name='shifou']:checked").val();
        if(j.jb===undefined || j.jb === ""){
            j.jb = "0";
        }
        j.bz = $("#tblFrmXhggMx_bz").val();
        if (isEditXhgg) {
            j.id = xhgg.sz[xhgg.seq].id;
        }
        j = {"jsonObj": JSON.stringify(j)};
        var url = isEditXhgg ? "/whwr/updateWzzdXhgg.action" : "/whwr/addWzzdXhgg.action";
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
                    cxWzzdXhgg();
                    $("#divFrmXhggMx").hide();
                    $("#board").css("z-index", $("#divFrmXhgg").css("z-index") - 1).show();
                }
            }
        });
    }
}

function GbXhgg(){
    $("#divFrmXhgg,#board").hide();
}

function check4Xhgg(){
    if($("#tblFrmXhggMx_ggmc").val()===""){
        alert("请输入型号规格名称");
        return false;
    }
    if($("#tblFrmXhggMx_dm").val()===""){
        alert("请输入型号规格代码");
        return false;
    }
    return true;
}

function xgWuZiZiDian() {
    isEditWzzd = true;
    if (wuZiZiDian.sz[wuZiZiDian.seq] === undefined || wuZiZiDian.sz[wuZiZiDian.seq] === null) {
        return alert("请选择物资字典");
    }
    var wzzd = wuZiZiDian.sz[wuZiZiDian.seq];
    wzzdBianHao = wzzd.id;
    zjWzlbObj.id = wzzd.wzlb_id;
    zjWzlbObj.mc = wzzd.wzlb_mc;
    $("#tblFrmWzzd_mc").val(wzzd.mc);
    $("#tblFrmWzzd_zdlb").val(wzzd.wzlb_mc).attr("readonly", "readonly");
    $("#tblFrmWzzd_dm").val(wzzd.dm);
    $("#tblFrmWzzd_bm").val(wzzd.bm);
    $("#tblFrmWzzd_dw").val(wzzd.dw);
    $("#tblFrmWzzd_bz").val(wzzd.bz);
    gxys= wzzd.gxys;
    $("#divFrmWzzd").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmWzzd").css("z-index") - 1).show();
    $("#tblFrmWzzd_mc").focus();
}

function check4Sjhm() {
    if($("#tblFrmWzzd_zdlb").val().length === 0 || $("#tblFrmWzzd_zdlb").val() !== zjWzlbObj.mc){
       alert("请选择物资类别");
        return false; 
    }
    if ($("#tblFrmWzzd_mc").val() === "") {
        alert("请输入姓名");
        return false;
    }
    return true;
}

function scWuZiZiDian() {
    if (wuZiZiDian.sz[wuZiZiDian.seq] === undefined || wuZiZiDian.sz[wuZiZiDian.seq] === null) {
        return alert("请选择物资字典");
    }
    if (!confirm("是否删除物资字典" + wuZiZiDian.sz[wuZiZiDian.seq].mc + "?"))
        return false;
    var json = {"id": wuZiZiDian.sz[wuZiZiDian.seq].id};
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/delWzzd.do",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        //error:function(msg, textStatus){failureResp(msg.responseText);},
        success: function (json) {
            if (checkResult(json)) {
                cxWuZiZiDian();
            }
        }
    });
}

function bcWuZiZiDian() {
    if (check4Sjhm()) {
        var j = {};
        j.wzlb_id = zjWzlbObj.id;
        j.mc = $("#tblFrmWzzd_mc").val();
        j.dm = $("#tblFrmWzzd_dm").val();
        j.bm = $("#tblFrmWzzd_bm").val();
        j.dw = $("#tblFrmWzzd_dw").val();
        j.bz = $("#tblFrmWzzd_bz").val();
        if (isEditWzzd) {
            j.id = wuZiZiDian.sz[wuZiZiDian.seq].id;
        }
        j.gxys = gxys;
        j = {"jsonObj": JSON.stringify(j)};
        var url = isEditWzzd ? "/whwr/updateWzzd.action" : "/whwr/addWzzd.action";
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
                    cxWuZiZiDian();
                    $("#divFrmWzzd").hide();
                    $("#board").hide();
                }
            }
        });
    }

}

function zjGxys() {
    gxys_yh = -1;
    $("#divFrmGxys input[type=text]").val("").removeAttr("readonly");
    $("#divFrmGxys").css("z-index", "20").show();
    $("#board").css("z-index", $("#divFrmGxys").css("z-index") - 1).show();
}

function xgGxys() {
    if(gxys_yh < 0 || gxys_yh >= gxys.length){
        return alert("请选择个性要素项");
    }
    var temp_gxys = gxys[gxys_yh];
    $("#tblFrmGxys_mc").val(temp_gxys.mc);
    $("#tblFrmGxys_dm").val(temp_gxys.dm);
    $("#tblFrmGxys_lx").val(temp_gxys.lx);
    $("#tblFrmGxys_sjly").val(temp_gxys.sjly);
    if (temp_gxys.zdlb === "qyzd") {
        $("#tblFrmGxys_zdlb").val(temp_gxys.zdlb);
    }
    $("#divFrmGxys").css("z-index", "20").show();
    $("#board").css("z-index", $("#divFrmGxys").css("z-index") - 1).show();
}

function scGxys(){
    if(gxys_yh < 0 || gxys_yh >= gxys.length){
        return alert("请选择个性要素项");
    }
    if(!confirm("确定删除个性要素-" + gxys[gxys_yh].mc + "？")){
        return;
    }
    gxys.splice(gxys_yh,1);
    setGxys();
}

function bcGeXingYaoSu() {
    if ($("#tblFrmGxys_mc").val() === "") {
        return alert("请输入个性要素名称");
    }
    if ($("#tblFrmGxys_dm").val() === "") {
        return alert("请输入个性要素代码");
    }
    for (var i = 0; i < gxys.length; i++) {
        var e = gxys[i];
        if (gxys_yh === i) {
            continue;
        }
        if (e.mc === $("#tblFrmGxys_mc").val()) {
            return alert("该个性要素名称已存在");
        }
        if (e.dm === $("#tblFrmGxys_dm").val()) {
            return alert("该个性要素代码已存在");
        }
    }
    var temp_gxys = {};
    temp_gxys.mc = $("#tblFrmGxys_mc").val();
    temp_gxys.dm = $("#tblFrmGxys_dm").val();
    temp_gxys.lx = $("#tblFrmGxys_lx").val();
    temp_gxys.sjly = $("#tblFrmGxys_sjly").val();
    if ($("#tblFrmGxys_sjly").val() === "qyzd") {
        temp_gxys.zdlb = $("#tblFrmGxys_zdlb").val();
    } else {
        temp_gxys.zdlb = "";
    }
    if (gxys_yh !== -1) {
        gxys[gxys_yh] = temp_gxys;
    } else {
        gxys.push(temp_gxys);
    }
    setGxys();
    $("#divFrmGxys").hide();
    $("#board").css("z-index", $("#divFrmWzzd").css("z-index") - 1).show();
}

function setGxys(){
    $("#tblGxys tr").remove();
    if(gxys.length === 0){
        $("#tblFrmWzzd_gxys_tr").hide();
        return;
    }
    $("#tblFrmWzzd_gxys_tr").show();
    for (var i = 0; i < gxys.length; i++) {
        var e = gxys[i];
        var trStr = "<tr class='gxystr'><td class='title' style='width:150px;'>" + e.mc + "：</td><td><input type='text' /></td></tr>";
        $("#tblGxys").append(trStr);
    }
    $("#tblGxys tr").each(function(i){
        $(this).mousedown(function(e){
            if(e.which === 3){
                gxys_yh = i;
            }
        });
    });
}
