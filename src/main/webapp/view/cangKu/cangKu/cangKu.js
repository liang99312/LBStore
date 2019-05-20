var cangKus;
var optFlag = 1;
var editIndex = -1;
var opt = {"data": [], "yxData": [], "unrepeat": true, "unConfirm":false};
var selKuWei;
var curCangKu;
var optKwFlag = 1;

$(document).ready(function () {
    getAllA01s(setA01Data);
});

function setA01Data() {
    opt = {"data": lb_allA01s, "yxData": [], "unrepeat": true, "unConfirm":false};
}

function jxCangKu(json) {
    $("#data_table_body tr").remove();
    cangKus = [];
    cangKus = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if (item.state === -1) {
            classStr = ' class="danger"';
        }
        var trStr = '<tr' + classStr + '><td>' + item.mc + '</td><td>' + item.dm + '</td><td>' + item.lx + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editCangKu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-info btn-xs icon-cog" onclick="setCangKu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteCangKu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectCangKu() {
    var cangKu = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        cangKu.mc = $("#selName").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        cangKu.state = $("#selState").val();
    }
    tj.paramters = cangKu;
    var options = {};
    options.url = "/LBStore/cangKu/listCangKusByPage.do";
    options.tj = tj;
    options.func = jxCangKu;
    options.ul = "#example";
    queryPaginator(options);
}

function addCangKu() {
    optFlag = 1;
    $("#cangKuModel_title").html("新增仓库");
    $("#inpMc").val("");
    $("#inpDm").val("");
    $("#inpLx").val("");
    $("#inpBz").val("");
    $("#cangKuModal").modal({backdrop:'static'});
}

function editCangKu(index) {
    optFlag = 2;
    if (cangKus[index] === undefined) {
        optFlag = 1;
        return alert("请选择仓库");
    }
    var cangKu = cangKus[index];
    editIndex = index;
    $("#cangKuModel_title").html("修改仓库");
    $("#inpMc").val(cangKu.mc);
    $("#inpDm").val(cangKu.dm);
    $("#inpLx").val(cangKu.lx);
    $("#inpBz").val(cangKu.bz);
    $("#cangKuModal").modal({backdrop:'static'});
}

function setCangKu(index) {
    if (cangKus[index] === undefined) {
        return alert("请选择仓库");
    }
    var cangKu = cangKus[index];
    editIndex = index;
    selectCangKuById(cangKu.id);
}

function selectCangKuById(id) {
    $.ajax({
        url: "/LBStore/cangKu/getCangKuById.do?id=" + id,
        contentType: "application/json",
        type: "get",
        cache: false,
        error: function (msg, textStatus) {
            alert("获取仓库信息失败");
        },
        success: function (json) {
            if (json.result === 0) {
                curCangKu = json.cangKu;
                opt.yxData = curCangKu.a01s;
                $("#tblYg").inputTable(opt);
                setCangKuSetting();
                $("#cangKuSetModal").modal({backdrop:'static'});
            } else
                alert("获取仓库信息失败:" + json.msg !== undefined ? json.msg : "");
        }
    });
}

function setCangKuSetting() {
    for (var i = 0; i < curCangKu.kws.length; i++) {
        var e = curCangKu.kws[i];
        e.id = i + 1;
    }
    selKuWei = null;
    $('#inpKw').AutoComplete({'data': curCangKu.kws, 'paramName': 'selKuWei', 'afterSelectedHandler': setKuWeiHao});
}

function setKuWeiHao(json) {
    var array = getKuWeiHao(json.mc, json.qsh, json.jsh);
    $('#inpXh').AutoComplete({'data': array});
}

function saveCangKu() {
    var cangKu = {};
    var url = "";
    if (optFlag === 2) {
        if (cangKus[editIndex] === undefined) {
            return;
        }
        cangKu = cangKus[editIndex];
        url = "/LBStore/cangKu/updateCangKu.do";
    } else if (optFlag === 1) {
        url = "/LBStore/cangKu/saveCangKu.do";
    }
    if($("#inpMc").val() === ""){
        return alert("请输入仓库名称");
    }
    if($("#inpLx").val() === ""){
        return alert("请选择仓库类型");
    }
    cangKu.mc = $("#inpMc").val();
    cangKu.dm = $("#inpDm").val();
    cangKu.lx = $("#inpLx").val();
    cangKu.bz = $("#inpBz").val();
    $.ajax({
        url: url,
        data: JSON.stringify(cangKu),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#cangKuModal").modal("hide");
                selectCangKu();
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteCangKu(index) {
    if (cangKus[index] === undefined) {
        return alert("请选择仓库");
    }
    var cangKu = cangKus[index];
    if (confirm("确定删除仓库：" + cangKu.mc + "?")) {
        $.ajax({
            url: "/LBStore/cangKu/deleteCangKu.do?id=" + cangKu.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectCangKu();
                else
                    alert("删除失败:" + json.msg ? json.msg : "");
            }
        });
    }
}

function addKw() {
    optKwFlag = 1;
    $("#kuWeiModel_title").html("新增库位");
    $("#inpKwMc").val("");
    $("#inpKwQi").val("");
    $("#inpKwZhi").val("");
    $("#kuWeiSetModal").modal({backdrop:'static'});
}

function editKw() {
    if (!selKuWei || selKuWei === null) {
        return;
    }
    optKwFlag = 2;
    $("#kuWeiModel_title").html("修改库位");
    $("#inpKwMc").val(selKuWei.mc);
    $("#inpKwQi").val(selKuWei.qsh);
    $("#inpKwZhi").val(selKuWei.jsh);
    $("#kuWeiSetModal").modal({backdrop:'static'});
}

function delKw() {
    if (!selKuWei || selKuWei === null) {
        return;
    }
    var index = selKuWei.id;
    if (index > 0) {
        if (confirm("确定删除库位：" + curCangKu.kws[index - 1].mc + "?")) {
            curCangKu.kws.splice((index - 1), 1);
            selKuWei = null;
            setCangKuSetting();
            $('#inpKw').val("");
            $('#inpXh').val("");
        }
    }
}

function saveKuWei() {
    if($("#inpKwMc").val() === ""){
        return alert("请输入库位名称");
    }
    if (optKwFlag === 1) {
        var kw = {};
        kw.mc = $("#inpKwMc").val();
        kw.qsh = $("#inpKwQi").val();
        kw.jsh = $("#inpKwZhi").val();
        curCangKu.kws.push(kw);
    } else if (optKwFlag === 2) {
        for (var i = 0; i < curCangKu.kws.length; i++) {
            var e = curCangKu.kws[i];
            if (e.id === selKuWei.id) {
                e.mc = $("#inpKwMc").val();
                e.qsh = $("#inpKwQi").val();
                e.jsh = $("#inpKwZhi").val();
                selKuWei = e;
                break;
            }
        }
    }
    $("#kuWeiSetModal").modal("hide");
    setCangKuSetting();
    if (optKwFlag === 2) {
        $('#inpKw').val("");
        $('#inpXh').val("");
    }
}

function saveCangKuSetting() {
    if (!curCangKu) {
        return;
    }
    var kws = [];
    for (var i = 0; i < curCangKu.kws.length; i++) {
        var e = curCangKu.kws[i];
        var kw = {"mc": e.mc, "qsh": e.qsh, "jsh": e.jsh};
        kws.push(kw);
    }
    var a01s = [];
    for (var i = 0; i < opt.yxData.length; i++) {
        var e = opt.yxData[i];
        var a01 = {"id": e.id};
        a01s.push(a01);
    }
    curCangKu.kws = kws;
    curCangKu.a01s = a01s;
    $.ajax({
        url: "/LBStore/cangKu/saveCangKuSetting.do",
        data: JSON.stringify(curCangKu),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#cangKuSetModal").modal("hide");
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}
