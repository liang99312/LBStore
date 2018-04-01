var wuZiZiDians;
var optFlag = 1;
var editIndex = -1;
var selLeiBie;
var editLeiBie;

$(document).ready(function () {
    getWuZiLeiBies(setTrager_leiBie);
});

function setTrager_leiBie(){
    $('#selLeiBie').AutoComplete({'data': lb_wuZiLeiBies,'paramName':'selLeiBie'});
    $('#inpLeiBie').AutoComplete({'data': lb_wuZiLeiBies,'paramName':'editLeiBie'});
}

function jxWuZiZiDian(json) {
    $("#data_table_body tr").remove();
    wuZiZiDians = [];
    wuZiZiDians = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if(item.state === -1){
            classStr = ' class="danger"';
        }
        var trStr = '<tr'+classStr+'><td>' + item.mc + '</td><td>' + item.dm + '</td><td>' + item.bm + '</td><td>' + item.dw + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editWuZiZiDian(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteWuZiZiDian(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectWuZiZiDian() {
    var wuZiZiDian = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        wuZiZiDian.mc = $("#selName").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        wuZiZiDian.state = $("#selState").val();
    }
    tj.paramters = wuZiZiDian;
    var options = {};
    options.url = "/LBStore/wuZiZiDian/listWuZiZiDiansByPage.do";
    options.tj = tj;
    options.func = jxWuZiZiDian;
    options.ul = "#example";
    queryPaginator(options);
}

function addWuZiZiDian() {
    optFlag = 1;
    $("#wuZiZiDianModel_title").html("新增物资字典");
    $("#inpMc").val("");
    $("#inpDm").val("");
    $("#inpBm").val("");
    $("#inpDw").val("");
    $("#inpBz").val("");
    $("#wuZiZiDianModal").modal("show");
}

function editWuZiZiDian(index) {
    optFlag = 2;
    if (wuZiZiDians[index] === undefined) {
        optFlag = 1;
        return alert("请选择物资字典");
    }
    var wuZiZiDian = wuZiZiDians[index];
    editIndex = index;
    $("#wuZiZiDianModel_title").html("修改物资字典");
    $("#inpMc").val(wuZiZiDian.mc);
    $("#inpDm").val(wuZiZiDian.dm);
    $("#inpBm").val(wuZiZiDian.bm);
    $("#inpDw").val(wuZiZiDian.dw);
    $("#inpBz").val(wuZiZiDian.bz);
    for(var i =0;i<lb_wuZiLeiBies.length;i++){
        var e = lb_wuZiLeiBies[i];
        if(e.id === wuZiZiDian.wzlb_id){
            editLeiBie = e;
            break;
        }
    }
    if(editLeiBie && editLeiBie !== null){
        $("#inpLeiBie").val(editLeiBie.mc);
    }
    $("#wuZiZiDianModal").modal("show");
}

function saveWuZiZiDian() {
    var wuZiZiDian = {};
    var url = "";
    if (optFlag === 2) {
        if (wuZiZiDians[editIndex] === undefined) {
            return;
        }
        wuZiZiDian = wuZiZiDians[editIndex];
        url = "/LBStore/wuZiZiDian/updateWuZiZiDian.do";
    } else if (optFlag === 1) {
        url = "/LBStore/wuZiZiDian/saveWuZiZiDian.do";
    }
    if ($("#inpLeiBie").val() !== '' && $("#inpLeiBie").val() === editLeiBie.mc) {
        wuZiZiDian.wzlb_id = editLeiBie.id;
    }else{
        return alert("请选择物资类别");
    }
    wuZiZiDian.mc = $("#inpMc").val();
    wuZiZiDian.dm = $("#inpDm").val();
    wuZiZiDian.bm = $("#inpBm").val();
    wuZiZiDian.dw = $("#inpDw").val();
    wuZiZiDian.bz = $("#inpBz").val();
    $.ajax({
        url: url,
        data: JSON.stringify(wuZiZiDian),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#wuZiZiDianModal").modal("hide");
                selectWuZiZiDian();
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteWuZiZiDian(index) {
    if (wuZiZiDians[index] === undefined) {
        return alert("请选择物资字典");
    }
    var wuZiZiDian = wuZiZiDians[index];
    if (confirm("确定删除物资字典：" + wuZiZiDian.mc + "?")) {
        $.ajax({
            url: "/LBStore/wuZiZiDian/deleteWuZiZiDian.do?id="+wuZiZiDian.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectWuZiZiDian();
                else
                    alert("删除失败:" + json.msg ? json.msg : "");
            }
        });
    }
}
