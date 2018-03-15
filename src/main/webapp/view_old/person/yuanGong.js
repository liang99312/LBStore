var yuanGong = {"sz": [], "seq": -1, "yx": 1, "zys": 0};
var ygBianHao;
var isEditYg;
var xiuGai = 10;
var chongZhi = 20;
var chaKan = 30;
var zhiDing = 40;

$(document).ready(function () {
    $("#tblYuanGong").setListBottom(yuanGong, cxYuanGong);
    $("#tblYuanGong").built();
    $("#divCx4Yg").popTopBar("查询员工信息");
    $("#divFrmYg").popTopBar("员工信息");
    $("#divFrmQx").popTopBar("员工权限");
    $("#divFrmYg").find("input,select").r2t();
    $("#divCx4Yg").find("input,select").r2t();
    $("#logo").click(function () {
        $("#divCx4Yg").show();
        $("#board").css("z-index", $("#divCx4Yg").css("z-index") - 1).show();
    });
    $("#tblFrmYg_dm").focus(function(){
        if($("#tblFrmYg_dm").val().length === 0){
            $("#tblFrmYg_dm").val(makePy($("#tblFrmYg_xm").val()));
        }
    });
    cd4YuanGong();
    setTblQx();
});

function setTblQx(){
    $("#tblqx tr").remove();
    for(var i=0;i<lp_QuanXian.sz.length;i++){
        var e = lp_QuanXian.sz[i];
        $("#tblqx").append("<tr class='mkm'><td><input type='checkbox' value='"+e.mc+"' />" + e.mc + "</td></tr>");
        $("#tblqx").append("<tr class='mkmt' style='display:none;'><td style='padding-left:0px;'><table class='mkmx' id='mkmx"+i+"' style='background: #FFFFF4;'></table></td></tr>");
        
        var mxsz = e.sz;
        var length = mxsz.length;
        for (var j = 0; j < length; j += 3) {
            if (length - j > 2) {
                $("#mkmx" + i).append("<tr><td style='width:33%;'><input id='td"+mxsz[j].bh+"' type='checkbox' value='"+mxsz[j].mc+"' />" + mxsz[j].mc + "</td>\n\
                                           <td style='width:33%;'><input id='td"+mxsz[j+1].bh+"' type='checkbox' value='"+mxsz[j+1].mc+"' />" + mxsz[j+1].mc + "</td>\n\
                                           <td><input id='td"+mxsz[j+2].bh+"' type='checkbox' value='"+mxsz[j+2].mc+"' />" + mxsz[j+2].mc + "</td></tr>");
            } else if (length - j === 2) {
                $("#mkmx" + i).append("<tr><td style='width:33%;'><input id='td"+mxsz[j].bh+"' type='checkbox' value='"+mxsz[j].mc+"' />" + mxsz[j].mc + "</td>\n\
                                           <td style='width:33%;'><input id='td"+mxsz[j+1].bh+"' type='checkbox' value='"+mxsz[j+1].mc+"' />" + mxsz[j+1].mc + "</td>\n\
                                           <td></td></tr>");
            } else if (length - j === 1) {
                $("#mkmx" + i).append("<tr><td style='width:33%;'><input id='td"+mxsz[j].bh+"' type='checkbox' value='"+mxsz[j].mc+"' />" + mxsz[j].mc + "</td>\n\
                                           <td style='width:33%;'></td>\n\
                                           <td></td></tr>");
            }
        }        
    }
    $(".mkm").each(function(){
        $(this).click(function(){
            $(this).next().toggle();
        });
    });
    $(".mkm input").each(function(){
        $(this).click(function(event){
            event.stopPropagation(); 
            if ($(this).prop("checked")) {
                $(this).parent().parent().next().find("input").prop("checked","true");
            }else{
                $(this).parent().parent().next().find("input").removeAttr("checked");
            }
        });
    });
}

function cd4YuanGong() {
    $("#tblYuanGong").contextMenu("cd4Yg", {
        bindings: {
            "zjYg": function (t) {
                zjYuanGong();
            },
            "xgYg": function (t) {
                xgYuanGong();
            },
            "scYg": function (t) {
                scYuanGong();
            },
            "qxSz": function (t) {
                szQuanXian();
            }
        }
    });
}

function cxYuanGong() {
    var json = {"yx": yuanGong.yx};
    json.mc = $("#tblCx4Yg_xm").val();
    json.bh = $("#tblCx4Yg_bh").val();
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/getA01s.action",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            failureResp(msg.responseText);
        },
        success: function (json) {
            if (checkResult(json)) {
                jxYuanGong(json);
                $("#divCx4Yg").hide();
                $("#board").hide();
            }
        }
    });
}

function jxYuanGong(json) {
    yuanGong.sz = json.sz;
    yuanGong.yx = json.yx;
    yuanGong.zys = json.zys;
    yuanGong.jls = json.jls;
    if (yuanGong.yx == 0)
        yuanGong.yx = 1;
    var data = [];
    for (var i = 0; i < json.sz.length; i++) {
        var e = json.sz[i];
        var tr = {"td": [e.bh, e.mc, e.a0111, e.a0105]};
        data.push(tr);
    }
    $("#tblYuanGong").built({"data": data, "obj": yuanGong, "dbclick": xgYuanGong}).setPage(json.yx, json.zys, json.jls);

}

function zjYuanGong() {
    isEditYg = false;
    ygBianHao = "";
    $("#tblFrmYg input[type=text]").val("").removeAttr("readonly");
    $("#tblFrmYg_mm").parents("tr").show();
    $("#divFrmYg").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmYg").css("z-index") - 1).show();
    $("#tblFrmYg_xm").focus();

}

function xgYuanGong() {
    isEditYg = true;
    if (yuanGong.sz[yuanGong.seq] == undefined || yuanGong.sz[yuanGong.seq] == null) {
        return alert("请选择人员");
    }
    var a01 = yuanGong.sz[yuanGong.seq];
    ygBianHao = a01.id;
    $("#tblFrmYg input[type=text]").val("").removeAttr("readonly");
    $("#tblFrmYg_xm").val(a01.mc);
    $("#tblFrmYg_dm").val(a01.dm);
    $("#tblFrmYg_bh").val(a01.bh);
    $("#tblFrmYg [name='xingbie'][value='" + a01.a0111 + "']").prop("checked", true);
    $("#tblFrmYg_zw").val(a01.a0105);
    $("#tblFrmYg_mm").parents("tr").hide();
    $("#divFrmYg").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmYg").css("z-index") - 1).show();
    $("#tblFrmYg_xm").focus();
}

function check4Sjhm() {
    if ($("#tblFrmYg_xm").val() == "") {
        alert("请输入姓名");
        return false;
    }
    if ($("#tblFrmYg_bh").val() == "") {
        alert("请输入编号");
        return false;
    }
    return true;
}

function scYuanGong() {
    if (yuanGong.sz[yuanGong.seq] == undefined || yuanGong.sz[yuanGong.seq] == null) {
        return alert("请选择人员");
    }
    if (!confirm("是否删除员工" + yuanGong.sz[yuanGong.seq].mc + "?"))
        return false;
    var json = {"id": yuanGong.sz[yuanGong.seq].id};
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/delA01.do",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        //error:function(msg, textStatus){failureResp(msg.responseText);},
        success: function (json) {
            if (checkResult(json)) {
                cxYuanGong();
            }
        }
    });
}

function bcYuanGong() {
    if (check4Sjhm()) {
        var j = {};
        j.mc = $("#tblFrmYg_xm").val();
        j.dm = $("#tblFrmYg_dm").val();
        j.a0111 = $("#tblFrmYg input:radio[name='xingbie']:checked").val();
        j.bh = $("#tblFrmYg_bh").val();
        j.a0105 = $("#tblFrmYg_zw").val();
        j.password = $("#tblFrmYg_mm").val();
        if (isEditYg) {
            j.id = yuanGong.sz[yuanGong.seq].id;
            j.password = yuanGong.sz[yuanGong.seq].password;
            j.a01pic = yuanGong.sz[yuanGong.seq].a01pic;
            j.a01qx = yuanGong.sz[yuanGong.seq].a01qx;
        }
        j = {"jsonObj": JSON.stringify(j)};
        var url = isEditYg ? "/whwr/updateA01.action" : "/whwr/addA01.action";
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
                    cxYuanGong();
                    $("#divFrmYg").hide();
                    $("#board").hide();
                }
            }
        });
    }

}

function szQuanXian() {
    if (yuanGong.sz[yuanGong.seq] == undefined || yuanGong.sz[yuanGong.seq] == null) {
        return alert("请选择人员");
    }
    $("#tblqx input").removeAttr("checked");
    var a01 = yuanGong.sz[yuanGong.seq];
    var qxs = a01.a01qx.split("@");
    for (var i = 0; i < qxs.length; i++) {
        var tempQx = qxs[i];
        $("#td" + tempQx).prop("checked", 'true');
    }
    $("#tblFrmQx_bh").html(a01.bh);
    $("#tblFrmQx_xm").html(a01.mc);
    $("#divFrmQx").css("z-index", "10").show();
    $("#board").css("z-index", $("#divFrmQx").css("z-index") - 1).show();
}

function bcYgQuanXian() {
    var qx = [];
    $("#tblqx input[type='checkbox']").each(function (i) {
        if ($(this).prop("checked")) {
            if($(this).attr('id') === undefined || $(this).attr('id') === ""){
                
            }else{
                qx.push($(this).attr('id').replace("td",""));
            }
        }
    });
    var qxString = "";
    for (var i = 0; i < qx.length; i++) {
        qxString += "@" + qx[i];
    }
    if (qxString.length > 1) {
        qxString = qxString.substring(1);
    }
    if (qxString == yuanGong.sz[yuanGong.seq].a01qx) {
        return alert("人员权限没变化，不需要保存");
    }
    var json = {};
    json.id = yuanGong.sz[yuanGong.seq].id;;
    json.a01qx = qxString;
    json = {"jsonObj": JSON.stringify(json)};
    $.ajax({
        url: "/whwr/changeQuanXian.action",
        data: json,
        dataType: "json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            failureResp(msg.responseText);
        },
        success: function (json) {
            if (checkResult(json)) {
                $("#divFrmQx, #board").hide();
                yuanGong.sz[yuanGong.seq].a01qx = qxString;
            }
        }
    });
}
