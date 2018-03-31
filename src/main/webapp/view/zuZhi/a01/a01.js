var a01s;
var optFlag = 1;
var editIndex = -1;
var opt = {"data": lb_allMoKuais, "yxData": []};

$(document).ready(function () {
});

function jxA01(json) {
    $("#data_table_body tr").remove();
    a01s = [];
    a01s = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if (item.state === -1) {
            classStr = ' class="danger"';
        }
        var trStr = '<tr' + classStr + '><td>' + item.bh + '</td><td>' + item.mc + '</td><td>' + item.a0111 + '</td><td>' + item.a0105 + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editA01(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-info btn-xs icon-cog" onclick="setA01(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteA01(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectA01() {
    var a01 = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        a01.mc = $("#selName").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        a01.state = $("#selState").val();
    }
    tj.paramters = a01;
    var options = {};
    options.url = "/LBStore/a01/listA01sByPage.do";
    options.tj = tj;
    options.func = jxA01;
    options.ul = "#example";
    queryPaginator(options);
}

function addA01() {
    optFlag = 1;
    $("#a01Model_title").html("新增员工");
    $("#inpBh").val("");
    $("#inpMc").val("");
    $("#inpDm").val("");
    $("#inpA0111").val("男");
    $("#inpA0105").val("");
    $("#inpPassword").val("");
    $("#a01Modal").modal("show");
}

function editA01(index) {
    optFlag = 2;
    if (a01s[index] === undefined) {
        optFlag = 1;
        return alert("请选择员工");
    }
    var a01 = a01s[index];
    editIndex = index;
    $("#a01Model_title").html("修改员工");
    $("#inpBh").val(a01.bh);
    $("#inpMc").val(a01.mc);
    $("#inpDm").val(a01.dm);
    $("#inpA0111").val(a01.a0111);
    $("#inpA0105").val(a01.a0105);
    $("#inpPassword").val(a01.password);
    $("#a01Modal").modal("show");
}

function setA01(index) {
    optFlag = 2;
    if (a01s[index] === undefined) {
        optFlag = 1;
        return alert("请选择员工");
    }
    var a01 = a01s[index];
    editIndex = index;
    opt.yxData = [];
    if (a01.a01qx && "" !== a01.a01qx) {
        var qxs = a01.a01qx.split(";");
        for (var i = 0; i < lb_allMoKuais.length; i++) {
            var mk = lb_allMoKuais[i];
            if (qxs.indexOf(mk.id) > -1) {
                opt.yxData.push(mk);
            }
        }
    }
    $("#tblQx").selectTable(opt);
    $("#a01QxModal").modal("show");
}

function saveA01() {
    var a01 = {};
    var url = "";
    if (optFlag === 2) {
        if (a01s[editIndex] === undefined) {
            return;
        }
        a01 = a01s[editIndex];
        url = "/LBStore/a01/updateA01.do";
    } else if (optFlag === 1) {
        url = "/LBStore/a01/saveA01.do";
        a01.a01qx = "901;";
    }
    a01.bh = $("#inpBh").val();
    a01.mc = $("#inpMc").val();
    a01.dm = $("#inpDm").val();
    a01.a0111 = $("#inpA0111").val();
    a01.a0105 = $("#inpA0105").val();
    a01.password = $("#inpPassword").val();
    $.ajax({
        url: url,
        data: JSON.stringify(a01),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#a01Modal").modal("hide");
                selectA01();
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteA01(index) {
    if (a01s[index] === undefined) {
        return alert("请选择员工");
    }
    var a01 = a01s[index];
    if (confirm("确定删除员工：" + a01.mc + "?")) {
        $.ajax({
            url: "/LBStore/a01/deleteA01.do?id=" + a01.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectA01();
                else
                    alert("删除失败:" + json.msg ? json.msg : "");
            }
        });
    }
}

function saveA01Qx() {
    var qx = "";
    for (var i = 0; i < opt.yxData.length; i++) {
        qx += opt.yxData[i].id + ";";
    }
    if (a01s[editIndex] === undefined) {
        return alert("请选择员工");
    }
    var a01 = a01s[editIndex];
    a01.a01qx = qx;
    $.ajax({
        url: "/LBStore/a01/updateA01Qx.do",
        data: JSON.stringify(a01),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#a01QxModal").modal("hide");
                selectA01();
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}
