var baoBiaos;
var optFlag = 1;
var editIndex = -1;
var selectMk;

$(document).ready(function () {
    $('#inpMk').AutoComplete({'data': lb_moKuais, 'paramName': 'selectMk'});
//    查询报表内容
//    $.ajax({
//        url: "/LBStore/baoBiao/getBaoBiaoNrById.do?id=" + 1,
//        contentType: "application/json",
//        type: "get",
//        dataType: "html",
//        cache: false,
//        error: function (msg, textStatus) {
//        },
//        success: function (json) {
//        }
//    });
});

function jxBaoBiao(json) {
    $("#data_table_body tr").remove();
    baoBiaos = [];
    baoBiaos = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if (item.state === -1) {
            classStr = ' class="danger"';
        }
        var trStr = '<tr' + classStr + '><td>' + item.mc + '</td><td>' + item.mk + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editBaoBiao(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteBaoBiao(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectBaoBiao() {
    var baoBiao = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        baoBiao.mc = $("#selName").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        baoBiao.state = parseInt($("#selState").val());
    }
    tj.paramters = baoBiao;
    var options = {};
    options.url = "/LBStore/baoBiao/listBaoBiaosByPage.do";
    options.tj = tj;
    options.func = jxBaoBiao;
    options.ul = "#example";
    queryPaginator(options);
}

function addBaoBiao() {
    optFlag = 1;
    $("#baoBiaoModel_title").html("新增报表");
    $("#inpMc").val("");
    $("#inpMk").val("");
    $("#baoBiaoModal").modal({backdrop:'static'});
}

function editBaoBiao(index) {
    optFlag = 2;
    if (baoBiaos[index] === undefined) {
        optFlag = 1;
        return alert("请选择报表");
    }
    var baoBiao = baoBiaos[index];
    editIndex = index;
    $("#baoBiaoModel_title").html("修改报表");
    $("#inpMc").val(baoBiao.mc);
    for (var i = 0; i < lb_moKuais.length; i++) {
        var e = lb_moKuais[i];
        if (e.id === baoBiao.mkdm) {
            selectMk = e;
            $("#inpMk").val(selectMk.mc);
            break;
        }
    }
    $("#baoBiaoModal").modal({backdrop:'static'});
}

function saveBaoBiao() {
    var baoBiao = {};
    var url = "";
    if (optFlag === 2) {
        if (baoBiaos[editIndex] === undefined) {
            return;
        }
        baoBiao = baoBiaos[editIndex];
        url = "/LBStore/baoBiao/updateBaoBiao.do";
    } else if (optFlag === 1) {
        url = "/LBStore/baoBiao/saveBaoBiao.do";
    }
    baoBiao.mc = $("#inpMc").val();
    if (!selectMk || $("#inpMk").val() !== selectMk.mc) {
        return alert("请设置报表模块！");
    }
    baoBiao.mk = selectMk.mc;
    baoBiao.mkdm = selectMk.id;
    var dataString = {"model": JSON.stringify(baoBiao)};
    $("#bbForm").ajaxSubmit({
        url: url,
        data: dataString,
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#baoBiaoModal").modal("hide");
                selectBaoBiao();
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteBaoBiao(index) {
    if (baoBiaos[index] === undefined) {
        return alert("请选择报表");
    }
    var baoBiao = baoBiaos[index];
    if (confirm("确定删除报表：" + baoBiao.mc + "?")) {
        $.ajax({
            url: "/LBStore/baoBiao/deleteBaoBiao.do?id=" + baoBiao.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectBaoBiao();
                else
                    alert("删除失败:" + json.msg ? json.msg : "");
            }
        });
    }
}
