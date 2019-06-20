var buMens;
var optFlag = 1;
var editIndex = -1;

$(document).ready(function () {
});

function jxBuMen(json) {
    $("#data_table_body tr").remove();
    buMens = [];
    buMens = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if(item.state === -1){
            classStr = ' class="danger"';
        }
        var trStr = '<tr'+classStr+'><td>' + item.mc + '</td><td>' + item.dm + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editBuMen(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteBuMen(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectBuMen() {
    var buMen = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        buMen.mc = $("#selName").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        buMen.state = parseInt($("#selState").val());
    }
    tj.paramters = buMen;
    var options = {};
    options.url = "/LBStore/buMen/listBuMensByPage.do";
    options.tj = tj;
    options.func = jxBuMen;
    options.ul = "#example";
    queryPaginator(options);
}

function addBuMen() {
    optFlag = 1;
    $("#buMenModel_title").html("新增部门");
    $("#inpMc").val("");
    $("#inpDm").val("");
    $("#inpBz").val("");
    $("#buMenModal").modal({backdrop:'static'});
}

function editBuMen(index) {
    optFlag = 2;
    if (buMens[index] === undefined) {
        optFlag = 1;
        return alert("请选择部门");
    }
    var buMen = buMens[index];
    editIndex = index;
    $("#buMenModel_title").html("修改部门");
    $("#inpMc").val(buMen.mc);
    $("#inpDm").val(buMen.dm);
    $("#inpBz").val(buMen.bz);
    $("#buMenModal").modal({backdrop:'static'});
}

function saveBuMen() {
    var buMen = {};
    var url = "";
    if (optFlag === 2) {
        if (buMens[editIndex] === undefined) {
            return;
        }
        buMen = buMens[editIndex];
        url = "/LBStore/buMen/updateBuMen.do";
    } else if (optFlag === 1) {
        url = "/LBStore/buMen/saveBuMen.do";
    }
    if($("#inpMc").val() === ""){
        return alert("请输入部门名称");
    }
    buMen.mc = $("#inpMc").val();
    buMen.dm = $("#inpDm").val();
    buMen.bz = $("#inpBz").val();
    $.ajax({
        url: url,
        data: JSON.stringify(buMen),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#buMenModal").modal("hide");
                selectBuMen();
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteBuMen(index) {
    if (buMens[index] === undefined) {
        return alert("请选择部门");
    }
    var buMen = buMens[index];
    if (confirm("确定删除部门：" + buMen.mc + "?")) {
        $.ajax({
            url: "/LBStore/buMen/deleteBuMen.do?id="+buMen.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectBuMen();
                else
                    alert("删除失败:" + json.msg ? json.msg : "");
            }
        });
    }
}
