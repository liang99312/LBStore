var gongYingShangs;
var optFlag = 1;
var editIndex = -1;

$(document).ready(function () {
});

function jxGongYingShang(json) {
    $("#data_table_body tr").remove();
    gongYingShangs = [];
    gongYingShangs = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if(item.state === -1){
            classStr = ' class="danger"';
        }
        var trStr = '<tr'+classStr+'><td>' + item.mc + '</td><td>' + item.dm + '</td><td>' + item.lxr + '</td><td>' + item.lxdh + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editGongYingShang(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteGongYingShang(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectGongYingShang() {
    var gongYingShang = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        gongYingShang.mc = $("#selName").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        gongYingShang.state = parseInt($("#selState").val());
    }
    tj.paramters = gongYingShang;
    var options = {};
    options.url = "/LBStore/gongYingShang/listGongYingShangsByPage.do";
    options.tj = tj;
    options.func = jxGongYingShang;
    options.ul = "#example";
    queryPaginator(options);
}

function addGongYingShang() {
    optFlag = 1;
    $("#gongYingShangModel_title").html("新增供应商");
    $("#inpMc").val("");
    $("#inpDm").val("");
    $("#inpDz").val("");
    $("#inpLxr").val("");
    $("#inpLxdh").val("");
    $("#inpBz").val("");
    $("#gongYingShangModal").modal({backdrop:'static'});
}

function editGongYingShang(index) {
    optFlag = 2;
    if (gongYingShangs[index] === undefined) {
        optFlag = 1;
        return alert("请选择供应商");
    }
    var gongYingShang = gongYingShangs[index];
    editIndex = index;
    $("#gongYingShangModel_title").html("修改供应商");
    $("#inpMc").val(gongYingShang.mc);
    $("#inpDm").val(gongYingShang.dm);
    $("#inpDz").val(gongYingShang.dz);
    $("#inpLxr").val(gongYingShang.lxr);
    $("#inpLxdh").val(gongYingShang.lxdh);
    $("#inpBz").val(gongYingShang.bz);
    $("#gongYingShangModal").modal({backdrop:'static'});
}

function saveGongYingShang() {
    var gongYingShang = {};
    var url = "";
    if (optFlag === 2) {
        if (gongYingShangs[editIndex] === undefined) {
            return;
        }
        gongYingShang = gongYingShangs[editIndex];
        url = "/LBStore/gongYingShang/updateGongYingShang.do";
    } else if (optFlag === 1) {
        url = "/LBStore/gongYingShang/saveGongYingShang.do";
    }
    if($("#inpMc").val() === ""){
        return alert("请输入供应商名称");
    }
    gongYingShang.mc = $("#inpMc").val();
    gongYingShang.dm = $("#inpDm").val();
    gongYingShang.dz = $("#inpDz").val();
    gongYingShang.lxr = $("#inpLxr").val();
    gongYingShang.lxdh = $("#inpLxdh").val();
    gongYingShang.bz = $("#inpBz").val();
    $.ajax({
        url: url,
        data: JSON.stringify(gongYingShang),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#gongYingShangModal").modal("hide");
                selectGongYingShang();
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteGongYingShang(index) {
    if (gongYingShangs[index] === undefined) {
        return alert("请选择供应商");
    }
    var gongYingShang = gongYingShangs[index];
    if (confirm("确定删除供应商：" + gongYingShang.mc + "?")) {
        $.ajax({
            url: "/LBStore/gongYingShang/deleteGongYingShang.do?id="+gongYingShang.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectGongYingShang();
                else
                    alert("删除失败:" + json.msg ? json.msg : "");
            }
        });
    }
}
