var wuZiLeiBies;
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

function jxWuZiLeiBie(json) {
    $("#data_table_body tr").remove();
    wuZiLeiBies = [];
    wuZiLeiBies = json.list;
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
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editWuZiLeiBie(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteWuZiLeiBie(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectWuZiLeiBie() {
    var wuZiLeiBie = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        wuZiLeiBie.mc = $("#selName").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        wuZiLeiBie.state = $("#selState").val();
    }
    tj.paramters = wuZiLeiBie;
    var options = {};
    options.url = "/LBStore/wuZiLeiBie/listWuZiLeiBiesByPage.do";
    options.tj = tj;
    options.func = jxWuZiLeiBie;
    options.ul = "#example";
    queryPaginator(options);
}

function addWuZiLeiBie() {
    tysx = [];
    optFlag = 1;
    $("#wuZiLeiBieModel_title").html("新增物资类别");
    $("#inpMc").val("");
    $("#inpDm").val("");
    $("#inpBz").val("");
    buildTysx(tysx);
    $("#wuZiLeiBieModal").modal("show");
}

function editWuZiLeiBie(index) {
    optFlag = 2;
    if (wuZiLeiBies[index] === undefined) {
        optFlag = 1;
        return alert("请选择物资类别");
    }
    var wuZiLeiBie = wuZiLeiBies[index];
    editIndex = index;
    $("#wuZiLeiBieModel_title").html("修改物资类别");
    $("#inpMc").val(wuZiLeiBie.mc);
    $("#inpDm").val(wuZiLeiBie.dm);
    $("#inpBz").val(wuZiLeiBie.bz);
    setTysx(wuZiLeiBie);
    $("#wuZiLeiBieModal").modal("show");
}

function setTysx(json) {
    tysx = json.tysx;
    buildTysx(tysx);
}

function saveWuZiLeiBie() {
    var wuZiLeiBie = {};
    var url = "";
    if (optFlag === 2) {
        if (wuZiLeiBies[editIndex] === undefined) {
            return;
        }
        wuZiLeiBie = wuZiLeiBies[editIndex];
        url = "/LBStore/wuZiLeiBie/updateWuZiLeiBie.do";
    } else if (optFlag === 1) {
        url = "/LBStore/wuZiLeiBie/saveWuZiLeiBie.do";
    }
    wuZiLeiBie.tysx = JSON.stringify(tysx);
    wuZiLeiBie.mc = $("#inpMc").val();
    wuZiLeiBie.dm = $("#inpDm").val();
    wuZiLeiBie.bz = $("#inpBz").val();
    $.ajax({
        url: url,
        data: JSON.stringify(wuZiLeiBie),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#wuZiLeiBieModal").modal("hide");
                selectWuZiLeiBie();
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteWuZiLeiBie(index) {
    if (wuZiLeiBies[index] === undefined) {
        return alert("请选择物资类别");
    }
    var wuZiLeiBie = wuZiLeiBies[index];
    if (confirm("确定删除物资类别：" + wuZiLeiBie.mc + "?")) {
        $.ajax({
            url: "/LBStore/wuZiLeiBie/deleteWuZiLeiBie.do?id=" + wuZiLeiBie.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectWuZiLeiBie();
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
    $("#wuZiLeiBieModel_title").html("增加特有属性");
    $("#inpTsMc").val("");
    $("#teYouShuXingModal").modal("show");
}

function editTeYouShuXing(index) {
    if (tysx[index]) {
        optTsFlag = 2;
        editTsIndex = index;
        var t = tysx[index];
        $("#wuZiLeiBieModel_title").html("修改特有属性");
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
