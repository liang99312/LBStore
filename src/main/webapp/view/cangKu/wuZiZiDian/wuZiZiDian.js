var wuZiZiDians;
var optFlag = 1;
var editIndex = -1;
var xhggOptFlag = 1;
var xhggEditIndex = -1;
var selLeiBie;
var editLeiBie;
var wuZiXhggs;

$(document).ready(function () {
    getWuZiLeiBies(setTrager_leiBie);
});

function setTrager_leiBie() {
    $('#selLeiBie').AutoComplete({'data': lb_wuZiLeiBies, 'paramName': 'selLeiBie'});
    $('#inpLeiBie').AutoComplete({'data': lb_wuZiLeiBies, 'paramName': 'editLeiBie'});
}

function jxWuZiZiDian(json) {
    $("#data_table_body tr").remove();
    wuZiZiDians = [];
    wuZiZiDians = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if (item.state === -1) {
            classStr = ' class="danger"';
        }
        var trStr = '<tr' + classStr + '><td>' + item.mc + '</td><td>' + item.dm + '</td><td>' + item.bm + '</td><td>' + item.dw + '</td><td>'
                + '<button class="btn btn-info btn-xs  icon-info-sign" onclick="chkXhgg(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editWuZiZiDian(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteWuZiZiDian(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectWuZiZiDian() {
    var wuZiZiDian = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        wuZiZiDian.mc = $("#selName").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        wuZiZiDian.state = $("#selState").val();
    }
    tj.paramters = wuZiZiDian;
    var options = {};
    options.url = "/LBStore/wuZiZiDian/listWuZiZiDiansByPage.do";
    options.tj = tj;
    options.func = jxWuZiZiDian;
    options.ul = "#example";
    queryPaginator(options);
}

function addWuZiZiDian() {
    optFlag = 1;
    $("#wuZiZiDianModel_title").html("新增物资字典");
    $("#inpMc").val("");
    $("#inpDm").val("");
    $("#inpBm").val("");
    $("#inpDw").val("");
    $("#inpBz").val("");
    $("#wuZiZiDianModal").modal({backdrop:'static'});
}

function editWuZiZiDian(index) {
    optFlag = 2;
    if (wuZiZiDians[index] === undefined) {
        optFlag = 1;
        return alert("请选择物资字典");
    }
    var wuZiZiDian = wuZiZiDians[index];
    editIndex = index;
    $("#wuZiZiDianModel_title").html("修改物资字典");
    $("#inpMc").val(wuZiZiDian.mc);
    $("#inpDm").val(wuZiZiDian.dm);
    $("#inpBm").val(wuZiZiDian.bm);
    $("#inpDw").val(wuZiZiDian.dw);
    $("#inpBz").val(wuZiZiDian.bz);
    for (var i = 0; i < lb_wuZiLeiBies.length; i++) {
        var e = lb_wuZiLeiBies[i];
        if (e.id === wuZiZiDian.wzlb_id) {
            editLeiBie = e;
            break;
        }
    }
    if (editLeiBie && editLeiBie !== null) {
        $("#inpLeiBie").val(editLeiBie.mc);
    }
    $("#wuZiZiDianModal").modal({backdrop:'static'});
}

function saveWuZiZiDian() {
    var wuZiZiDian = {};
    var url = "";
    if (optFlag === 2) {
        if (wuZiZiDians[editIndex] === undefined) {
            return;
        }
        wuZiZiDian = wuZiZiDians[editIndex];
        url = "/LBStore/wuZiZiDian/updateWuZiZiDian.do";
    } else if (optFlag === 1) {
        url = "/LBStore/wuZiZiDian/saveWuZiZiDian.do";
    }
    if ($("#inpLeiBie").val() !== '' && $("#inpLeiBie").val() === editLeiBie.mc) {
        wuZiZiDian.wzlb_id = editLeiBie.id;
    } else {
        return alert("请选择物资类别");
    }
    if($("#inpMc").val() === ""){
        return alert("请输入物资名称");
    }
    if($("#inpBm").val() === ""){
        return alert("请输入物资编码");
    }
    wuZiZiDian.mc = $("#inpMc").val();
    wuZiZiDian.dm = $("#inpDm").val();
    wuZiZiDian.bm = $("#inpBm").val();
    wuZiZiDian.dw = $("#inpDw").val();
    wuZiZiDian.bz = $("#inpBz").val();
    $.ajax({
        url: url,
        data: JSON.stringify(wuZiZiDian),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#wuZiZiDianModal").modal("hide");
                selectWuZiZiDian();
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteWuZiZiDian(index) {
    if (wuZiZiDians[index] === undefined) {
        return alert("请选择物资字典");
    }
    var wuZiZiDian = wuZiZiDians[index];
    if (confirm("确定删除物资字典：" + wuZiZiDian.mc + "?")) {
        $.ajax({
            url: "/LBStore/wuZiZiDian/deleteWuZiZiDian.do?id=" + wuZiZiDian.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectWuZiZiDian();
                else
                    alert("删除失败:" + json.msg ? json.msg : "");
            }
        });
    }
}

function chkXhgg(index){
    $("#tblWuZiXhgg_body tr").remove();
    if (wuZiZiDians[index] === undefined) {
        return alert("请选择物资字典");
    }
    editIndex = index;
    var wuZiZiDian = wuZiZiDians[index];
    selectWuZiXhgg(wuZiZiDian);
}

function jxWuZiXhgg(json) {
    $("#tblWuZiXhgg_body tr").remove();
    wuZiXhggs = [];
    wuZiXhggs = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if (item.sl < item.jb) {
            classStr = ' class="danger"';
        }
        var trStr = '<tr' + classStr + '><td>' + item.mc + '</td><td>' + item.dm + '</td><td>' + item.sl + '</td><td>' + item.jb + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editWuZiXhgg(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="delWuZiXhgg(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#tblWuZiXhgg_body").append(trStr);
    });
}

function selectWuZiXhgg(json) {
    var wuZiXhgg = {};
    var tj = {"pageSize": 10, "currentPage": 1};
    wuZiXhgg.wzzd_id = json.id;
    tj.paramters = wuZiXhgg;
    var options = {};
    options.url = "/LBStore/wuZiXhgg/listWuZiXhggsByPage.do";
    options.tj = tj;
    options.func = jxWuZiXhgg;
    options.ul = "#example2";
    queryPaginator(options);
    $("#wuZiXhggModal").modal({backdrop:'static'});
}

function addWuZiXhgg() {
    xhggOptFlag = 1;
    var wuZiZiDian = wuZiZiDians[editIndex];
    if(!wuZiZiDian){
        return;
    }
    $("#wuZiXhggEditModel_title").html("新增物资规格");
    $("#inpWzmc").val(wuZiZiDian.mc);
    $("#inpGgmc").val("");
    $("#inpGgdm").val("");
    $("#inpGgjb").val("0");
    $("#inpGgbzq").val("0");
    $("#wuZiXhggEditModal").modal({backdrop:'static'});
}

function editWuZiXhgg(index) {
    var wuZiZiDian = wuZiZiDians[editIndex];
    if(!wuZiZiDian){
        return;
    }
    xhggOptFlag = 2;
    if (wuZiXhggs[index] === undefined) {
        xhggOptFlag = 1;
        return alert("请选择物资规格");
    }
    var wuZiXhgg = wuZiXhggs[index];
    xhggEditIndex = index;
    $("#wuZiXhggEditModel_title").html("修改物资规格");
    $("#inpWzmc").val(wuZiZiDian.mc);
    $("#inpGgmc").val(wuZiXhgg.mc);
    $("#inpGgdm").val(wuZiXhgg.dm);
    $("#inpGgjb").val(wuZiXhgg.jb);
    $("#inpGgbzq").val(wuZiXhgg.bzq);
    $("#wuZiXhggEditModal").modal({backdrop:'static'});
}

function saveWuZiXhgg() {
    var wuZiZiDian = wuZiZiDians[editIndex];
    if(!wuZiZiDian){
        return;
    }
    var wuZiXhgg = {};
    var url = "";
    if (xhggOptFlag === 2) {
        if (wuZiXhggs[xhggEditIndex] === undefined) {
            return;
        }
        wuZiXhgg = wuZiXhggs[xhggEditIndex];
        url = "/LBStore/wuZiXhgg/updateWuZiXhgg.do";
    } else if (xhggOptFlag === 1) {
        url = "/LBStore/wuZiXhgg/saveWuZiXhgg.do";
        wuZiXhgg.wzzd_id = wuZiZiDian.id;
        wuZiXhgg.sl = 0;
    }
    wuZiXhgg.mc = $("#inpGgmc").val();
    wuZiXhgg.dm = $("#inpGgdm").val();
    wuZiXhgg.jb = parseFloat($("#inpGgjb").val());
    wuZiXhgg.bzq = parseFloat($("#inpGgbzq").val());
    $.ajax({
        url: url,
        data: JSON.stringify(wuZiXhgg),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#wuZiXhggEditModal").modal("hide");
                var wuZiZiDian = wuZiZiDians[editIndex];
                selectWuZiXhgg(wuZiZiDian);
            } else {
                alert("保存失败：" + json.msg ? json.msg : "");
            }
        }
    });
}

function delWuZiXhgg(index) {
    if (wuZiXhggs[index] === undefined) {
        return alert("请选择物资规格");
    }
    var wuZiXhgg = wuZiXhggs[index];
    if (confirm("确定删除物资规格：" + wuZiXhgg.mc + "?")) {
        $.ajax({
            url: "/LBStore/wuZiXhgg/deleteWuZiXhgg.do?id=" + wuZiXhgg.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0) {
                    var wuZiZiDian = wuZiZiDians[editIndex];
                    selectWuZiXhgg(wuZiZiDian);
                } else {
                    alert("删除失败：" + json.msg ? json.msg : "");
                }
            }
        });
    }
}
