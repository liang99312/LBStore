var ruKus;
var optFlag = 1;
var editIndex = -1;
var editFenLei;
var editType;
var tsType = [{id: 1, mc: "文本"}, {id: 2, mc: "数字"}];
var tysx = [];
var optTsFlag = 1;
var editTsIndex = -1;
var tgIndex = 0;

$(document).ready(function () {
    $('#inpTsType').AutoComplete({'data': tsType, 'paramName': 'editType'});
    getZiDianFenLeis(setTrager_fenLei);
});

function setTrager_fenLei() {
    $('#inpTsZiDian').AutoComplete({'data': lb_ziDianFenLeis, 'paramName': 'editFenLei'});
}

function jxRuKu(json) {
    $("#data_table_body tr").remove();
    ruKus = [];
    ruKus = json.list;
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
        var trStr = '<tr' + classStr + '><td>' + item.mc + '</td><td>' + item.dm + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editRuKu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteRuKu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectRuKu() {
    var ruKu = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        ruKu.mc = $("#selName").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        ruKu.state = $("#selState").val();
    }
    tj.paramters = ruKu;
    var options = {};
    options.url = "/LBStore/ruKu/listRuKusByPage.do";
    options.tj = tj;
    options.func = jxRuKu;
    options.ul = "#example";
    queryPaginator(options);
}

function addRuKu() {
    tysx = [];
    optFlag = 1;
    $("#ruKuModel_title").html("新增入库单");
    $("#inpMc").val("");
    $("#inpDm").val("");
    $("#inpBz").val("");
    $("#ruKuModal").modal("show");
}

function editRuKu(index) {
    optFlag = 2;
    if (ruKus[index] === undefined) {
        optFlag = 1;
        return alert("请选择入库单");
    }
    var ruKu = ruKus[index];
    editIndex = index;
    $("#ruKuModel_title").html("修改入库单");
    $("#inpMc").val(ruKu.mc);
    $("#inpDm").val(ruKu.dm);
    $("#inpBz").val(ruKu.bz);
    setTysx(ruKu);
    $("#ruKuModal").modal("show");
}

function setTysx(json) {
    tysx = json.tysx;
    buildTysx(tysx);
}

function saveRuKu() {
    var ruKu = {};
    var url = "";
    if (optFlag === 2) {
        if (ruKus[editIndex] === undefined) {
            return;
        }
        ruKu = ruKus[editIndex];
        url = "/LBStore/ruKu/updateRuKu.do";
    } else if (optFlag === 1) {
        url = "/LBStore/ruKu/saveRuKu.do";
    }
    ruKu.tysx = JSON.stringify(tysx);
    ruKu.mc = $("#inpMc").val();
    ruKu.dm = $("#inpDm").val();
    ruKu.bz = $("#inpBz").val();
    $.ajax({
        url: url,
        data: JSON.stringify(ruKu),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#ruKuModal").modal("hide");
                selectRuKu();
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteRuKu(index) {
    if (ruKus[index] === undefined) {
        return alert("请选择入库单");
    }
    var ruKu = ruKus[index];
    if (confirm("确定删除入库单：" + ruKu.mc + "?")) {
        $.ajax({
            url: "/LBStore/ruKu/deleteRuKu.do?id=" + ruKu.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectRuKu();
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
    $("#ruKuModel_title").html("增加特有属性");
    $("#inpTsMc").val("");
    $("#teYouShuXingModal").modal("show");
}

function editTeYouShuXing(index) {
    if (tysx[index]) {
        optTsFlag = 2;
        editTsIndex = index;
        var t = tysx[index];
        $("#ruKuModel_title").html("修改特有属性");
        $("#inpTsMc").val(t.mc);
        $("#inpTsType").val(t.type);
        if (t.zdfl && t.zdfl > 0) {
            editFenLei = {id: t.zdfl, mc: t.zdfl_mc};
            $("#inpTsZiDian").val(editFenLei.mc);
        }
        $("#teYouShuXingModal").modal("show");
    }
}

function delTeYouShuXing(index) {
    if (tysx[index]) {
        if (confirm("确定删除特有属性：" + tysx[index].mc + "?")) {
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
