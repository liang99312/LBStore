var wuZiLeiBies;
var optFlag = 1;
var editIndex = -1;

$(document).ready(function () {
});

function jxWuZiLeiBie(json) {
    $("#data_table_body tr").remove();
    wuZiLeiBies = [];
    wuZiLeiBies = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if(item.state === -1){
            classStr = ' class="danger"';
        }
        var trStr = '<tr'+classStr+'><td>' + item.mc + '</td><td>' + item.dm + '</td><td>'
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
    optFlag = 1;
    $("#wuZiLeiBieModel_title").html("新增物资类别");
    $("#inpMc").val("");
    $("#inpDm").val("");
    $("#inpBz").val("");
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
    $("#wuZiLeiBieModal").modal("show");
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
            url: "/LBStore/wuZiLeiBie/deleteWuZiLeiBie.do?id="+wuZiLeiBie.id,
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
