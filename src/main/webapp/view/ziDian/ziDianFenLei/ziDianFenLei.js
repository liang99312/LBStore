var ziDianFenLeis;
var optFlag = 1;
var editIndex = -1;

$(document).ready(function () {
});

function jxZiDianFenLei(json) {
    $("#data_table_body tr").remove();
    ziDianFenLeis = [];
    ziDianFenLeis = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var trStr = '<tr><td>' + item.mc + '</td><td>' + item.dm + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editZiDianFenLei(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteZiDianFenLei(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectZiDianFenLei() {
    var ziDianFenLei = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        ziDianFenLei.mc = $("#selName").val();
    }
    tj.paramters = ziDianFenLei;
    var options = {};
    options.url = "/LBStore/ziDianFenLei/listZiDianFenLeisByPage.do";
    options.tj = tj;
    options.func = jxZiDianFenLei;
    options.ul = "#example";
    queryPaginator(options);
}

function addZiDianFenLei() {
    optFlag = 1;
    $("#ziDianFenLeiModel_title").html("新增字典分类");
    $("#inpMc").val("");
    $("#inpDm").val("");
    $("#inpBz").val("");
    $("#ziDianFenLeiModal").modal({backdrop:'static'});
}

function editZiDianFenLei(index) {
    optFlag = 2;
    if (ziDianFenLeis[index] === undefined) {
        optFlag = 1;
        return alert("请选择字典分类");
    }
    var ziDianFenLei = ziDianFenLeis[index];
    editIndex = index;
    $("#ziDianFenLeiModel_title").html("修改字典分类");
    $("#inpMc").val(ziDianFenLei.mc);
    $("#inpDm").val(ziDianFenLei.dm);
    $("#inpBz").val(ziDianFenLei.bz);
    $("#ziDianFenLeiModal").modal({backdrop:'static'});
}

function saveZiDianFenLei() {
    var ziDianFenLei = {};
    var url = "";
    if (optFlag === 2) {
        if (ziDianFenLeis[editIndex] === undefined) {
            return;
        }
        ziDianFenLei = ziDianFenLeis[editIndex];
        url = "/LBStore/ziDianFenLei/updateZiDianFenLei.do";
    } else if (optFlag === 1) {
        url = "/LBStore/ziDianFenLei/saveZiDianFenLei.do";
    }
    if($("#inpMc").val() === ""){
        return alert("请输入字典分类名称");
    }
    ziDianFenLei.mc = $("#inpMc").val();
    ziDianFenLei.dm = $("#inpDm").val();
    ziDianFenLei.bz = $("#inpBz").val();
    $.ajax({
        url: url,
        data: JSON.stringify(ziDianFenLei),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#ziDianFenLeiModal").modal("hide");
                selectZiDianFenLei();
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteZiDianFenLei(index) {
    if (ziDianFenLeis[index] === undefined) {
        return alert("请选择字典分类");
    }
    var ziDianFenLei = ziDianFenLeis[index];
    if (confirm("确定删除字典分类：" + ziDianFenLei.mc + "?")) {
        $.ajax({
            url: "/LBStore/ziDianFenLei/deleteZiDianFenLei.do?id="+ziDianFenLei.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectZiDianFenLei();
                else
                    alert("删除失败:" + json.msg ? json.msg : "");
            }
        });
    }
}
