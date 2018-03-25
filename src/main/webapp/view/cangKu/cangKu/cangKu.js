var cangKus;
var optFlag = 1;
var editIndex = -1;
var opt = {"data":[],"yxData":[],"unrepeat":true};

$(document).ready(function () {
    getAllA01s(setA01Data);
});

function setA01Data(){
    opt = {"data":lb_allA01s,"yxData":[],"unrepeat":true};
}

function jxCangKu(json) {
    $("#data_table_body tr").remove();
    cangKus = [];
    cangKus = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if(item.state === -1){
            classStr = ' class="danger"';
        }
        var trStr = '<tr'+classStr+'><td>' + item.mc + '</td><td>' + item.dm + '</td><td>'
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
    $("#inpBz").val("");
    $("#cangKuModal").modal("show");
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
    $("#inpBz").val(cangKu.bz);
    $("#cangKuModal").modal("show");
}

function setCangKu(index){
    if (cangKus[index] === undefined) {
        return alert("请选择仓库");
    }
    var cangKu = cangKus[index];
    editIndex = index;
    $("#tblYg").inputTable(opt);
    $("#cangKuSetModal").modal("show");
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
    cangKu.mc = $("#inpMc").val();
    cangKu.dm = $("#inpDm").val();
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
            url: "/LBStore/cangKu/deleteCangKu.do?id="+cangKu.id,
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
