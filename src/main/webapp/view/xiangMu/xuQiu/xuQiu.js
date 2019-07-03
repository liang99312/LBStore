var xuQius;
var optFlag = 1;
var editIndex = -1;
var editFenLei;
var editType;
var editKeHu;
var tsType = [{id: 1, mc: "文本"}, {id: 2, mc: "数字"}];
var tysx = [];
var optTsFlag = 1;
var editTsIndex = -1;
var tgIndex = 0;

$(document).ready(function () {
    $('#inpTsType').AutoComplete({'data': tsType, 'paramName': 'editType'});
    getZiDianFenLeis(setTrager_fenLei);
    getKeHus(setTrager_keHu);
});

function setTrager_fenLei() {
    $('#inpTsZiDian').AutoComplete({'data': lb_ziDianFenLeis, 'paramName': 'editFenLei'});
}

function setTrager_keHu() {
    $('#inpKh').AutoComplete({'data': lb_keHus, 'paramName': 'editKeHu'});
}

function jxXuQiu(json) {
    $("#data_table_body tr").remove();
    xuQius = [];
    xuQius = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if (item.state === -1) {
            classStr = ' class="danger"';
        }
        if (item.tysx && item.tysx !== null && item.tysx !== "") {
            item.tysx = JSON.parse(item.tysx);
        } else {
            item.tysx = [];
        }
        var tysx = "";
        for (var i = 0; i < item.tysx.length; i++) {
            tysx += item.tysx[i].mc + "; ";
        }
        var trStr = '<tr' + classStr + '><td>' + item.mc + '</td><td>' + item.dm + '</td><td>' + item.khmc + '</td><td>' + tysx + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editXuQiu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteXuQiu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectXuQiu() {
    var xuQiu = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        xuQiu.mc = $("#selName").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        xuQiu.state = parseInt($("#selState").val());
    }
    tj.paramters = xuQiu;
    var options = {};
    options.url = "/LBStore/xuQiu/listXuQiusByPage.do";
    options.tj = tj;
    options.func = jxXuQiu;
    options.ul = "#example";
    queryPaginator(options);
}

function addXuQiu() {
    editKeHu = {};
    tysx = [];
    optFlag = 1;
    $("#xuQiuModel_title").html("新增需求");
    $("#inpMc").val("");
    $("#inpDm").val("");
    $("#inpKh").val("");
    $("#inpBz").val("");
    buildTysx(tysx);
    $("#xuQiuModal").modal({backdrop: 'static'});
}

function editXuQiu(index) {
    optFlag = 2;
    if (xuQius[index] === undefined) {
        optFlag = 1;
        return alert("请选择需求");
    }
    var xuQiu = xuQius[index];
    editIndex = index;
    editKeHu = {"id": xuQiu.kh_id, "mc": xuQiu.khmc};
    $("#xuQiuModel_title").html("修改需求");
    $("#inpMc").val(xuQiu.mc);
    $("#inpDm").val(xuQiu.dm);
    $("#inpKh").val(xuQiu.khmc);
    $("#inpBz").val(xuQiu.bz);
    setTysx(xuQiu);
    $("#xuQiuModal").modal({backdrop: 'static'});
}

function setTysx(json) {
    tysx = json.tysx;
    buildTysx(tysx);
}

function saveXuQiu() {
    var xuQiu = {};
    var url = "";
    if (optFlag === 2) {
        if (xuQius[editIndex] === undefined) {
            return;
        }
        xuQiu = xuQius[editIndex];
        url = "/LBStore/xuQiu/updateXuQiu.do";
    } else if (optFlag === 1) {
        url = "/LBStore/xuQiu/saveXuQiu.do";
    }
    xuQiu.tysx = JSON.stringify(tysx);
    if ($("#inpMc").val() === "") {
        return alert("请输入需求名称");
    }
    if ($("#inpKh").val() === "") {
        return alert("请输入客户信息");
    } else {
        if ($("#inpKh").val() !== editKeHu.mc) {
            return alert("请输入客户信息");
        } else {
            xuQiu.kh_id = editKeHu.id;
        }
    }
    xuQiu.mc = $("#inpMc").val();
    xuQiu.dm = $("#inpDm").val();
    xuQiu.bz = $("#inpBz").val();
    $.ajax({
        url: url,
        data: JSON.stringify(xuQiu),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#xuQiuModal").modal("hide");
                selectXuQiu();
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteXuQiu(index) {
    if (xuQius[index] === undefined) {
        return alert("请选择需求");
    }
    var xuQiu = xuQius[index];
    if (confirm("确定删除需求：" + xuQiu.mc + "?")) {
        $.ajax({
            url: "/LBStore/xuQiu/deleteXuQiu.do?id=" + xuQiu.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectXuQiu();
                else
                    alert("删除失败:" + json.msg ? json.msg : "");
            }
        });
    }
}

function buildTysx(data) {
    $("#divTysx").empty();
    for (var i = 0; i < data.length; i++) {
        var e = data[i];
        if (!e.value || e.value === null) {
            e.value = "";
        }
        var s = "<div class='form-group'><label for='edts_inp_" + e.id + "'>" + e.mc + "：</label><input type='text' id='edts_inp_" + e.id + "' value='" + e.value + "' />\n\
                <button class='btn btn-info btn-xs icon-edit ts_edit'></button><button class='btn btn-danger btn-xs icon-minus ts_del'></div>";
        $("#divTysx").append(s);
    }
    tgIndex = 0;
    setEvent(data);
    $("#divTysx .ts_edit").each(function (i) {
        $(this).click(function () {
            editTeYouShuXing(i);
        });
    });
    $("#divTysx .ts_del").each(function (i) {
        $(this).click(function () {
            delTeYouShuXing(i);
        });
    });
}

function setEvent(data) {
    var e = data[tgIndex];
    if (e) {
        if (e.zdfl && e.zdfl > 0) {
            getZiDian4FenLei(e.zdfl, function () {
                $("#edts_inp_" + e.id).AutoComplete({'data': lb_ziDian4fl});
                tgIndex++;
                setEvent(data);
            });
        } else {
            tgIndex++;
            setEvent(data);
        }
    }
}

function addTeYouShuXing() {
    optTsFlag = 1;
    $("#xuQiuModel_title").html("增加条目");
    $("#inpTsMc").val("");
    editFenLei = null;
    $("#inpTsType").val("");
    $("#teYouShuXingModal").modal({backdrop: 'static'});
}

function editTeYouShuXing(index) {
    if (tysx[index]) {
        optTsFlag = 2;
        editTsIndex = index;
        var t = tysx[index];
        $("#xuQiuModel_title").html("修改条目");
        $("#inpTsMc").val(t.mc);
        $("#inpTsType").val(t.type);
        if (t.zdfl && t.zdfl > 0) {
            editFenLei = {id: t.zdfl, mc: t.zdfl_mc};
            $("#inpTsZiDian").val(editFenLei.mc);
        }
        $("#teYouShuXingModal").modal({backdrop: 'static'});
    }
}

function delTeYouShuXing(index) {
    if (tysx[index]) {
        if (confirm("确定删除条目：" + tysx[index].mc + "?")) {
            tysx.splice(index, 1);
            for (var i = 0; i < tysx.length; i++) {
                tysx[i].id = i;
            }
            buildTysx(tysx);
        }
    }
}

function saveTeYouShuXing() {
    if (optTsFlag === 1) {
        var ts = {};
        ts.id = tysx.length;
        ts.mc = $("#inpTsMc").val();
        ts.type = $("#inpTsType").val();
        if (editFenLei && editFenLei !== null) {
            ts.zdfl = editFenLei.id;
            ts.zdfl_mc = editFenLei.mc;
        }
        tysx.push(ts);
    } else if (optTsFlag === 2) {
        var ts = {};
        ts.mc = $("#inpTsMc").val();
        ts.type = $("#inpTsType").val();
        if (editFenLei && editFenLei !== null) {
            ts.zdfl = editFenLei.id;
            ts.zdfl_mc = editFenLei.mc;
        }
        tysx.splice(editTsIndex, 1, ts);
    }
    for (var i = 0; i < tysx.length; i++) {
        tysx[i].id = i;
    }
    buildTysx(tysx);
    $("#teYouShuXingModal").modal("hide");
}
