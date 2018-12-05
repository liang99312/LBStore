var ziDians;
var optFlag = 1;
var editIndex = -1;
var selFenLei;
var editFenLei;

$(document).ready(function () {
    getZiDianFenLeis(setTrager_fenLei);
});

function setTrager_fenLei(){
    $('#selFenLei').AutoComplete({'data': lb_ziDianFenLeis,'paramName':'selFenLei'});
    $('#inpFenLei').AutoComplete({'data': lb_ziDianFenLeis,'paramName':'editFenLei'});
}

function jxZiDian(json) {
    $("#data_table_body tr").remove();
    ziDians = [];
    ziDians = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var trStr = '<tr><td>' + item.mc + '</td><td>' + item.dm + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editZiDian(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteZiDian(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectZiDian() {
    var ziDian = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        ziDian.mc = $("#selName").val();
    }
    if ($("#selFenLei").val() !== '' && $("#selFenLei").val() === selFenLei.mc) {
        ziDian.zdfl_id = selFenLei.id;
    }
    tj.paramters = ziDian;
    var options = {};
    options.url = "/LBStore/ziDian/listZiDiansByPage.do";
    options.tj = tj;
    options.func = jxZiDian;
    options.ul = "#example";
    queryPaginator(options);
}

function addZiDian() {
    optFlag = 1;
    $("#ziDianModel_title").html("新增字典");
    $("#inpMc").val("");
    $("#inpDm").val("");
    $("#inpBz").val("");
    $("#ziDianModal").modal("show");
}

function editZiDian(index) {
    optFlag = 2;
    if (ziDians[index] === undefined) {
        optFlag = 1;
        return alert("请选择字典");
    }
    var ziDian = ziDians[index];
    editIndex = index;
    editFenLei = null;
    $("#ziDianModel_title").html("修改字典");
    $("#inpMc").val(ziDian.mc);
    $("#inpDm").val(ziDian.dm);
    $("#inpBz").val(ziDian.bz);
    for(var i =0;i<lb_ziDianFenLeis.length;i++){
        var e = lb_ziDianFenLeis[i];
        if(e.id === ziDian.zdfl_id){
            editFenLei = e;
            break;
        }
    }
    if(editFenLei && editFenLei !== null){
        $("#inpFenLei").val(editFenLei.mc);
    }
    $("#ziDianModal").modal("show");
}

function saveZiDian() {
    var ziDian = {};
    var url = "";
    if (optFlag === 2) {
        if (ziDians[editIndex] === undefined) {
            return;
        }
        ziDian = ziDians[editIndex];
        url = "/LBStore/ziDian/updateZiDian.do";
    } else if (optFlag === 1) {
        url = "/LBStore/ziDian/saveZiDian.do";
    }
    if($("#inpMc").val() === ""){
        return alert("请输入字典名称");
    }
    ziDian.mc = $("#inpMc").val();
    ziDian.dm = $("#inpDm").val();
    ziDian.bz = $("#inpBz").val();
    if ($("#inpFenLei").val() !== '' && $("#inpFenLei").val() === editFenLei.mc) {
        ziDian.zdfl_id = editFenLei.id;
    }else{
        return alert("请选择字典分类");
    }
    $.ajax({
        url: url,
        data: JSON.stringify(ziDian),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#ziDianModal").modal("hide");
                selectZiDian();
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteZiDian(index) {
    if (ziDians[index] === undefined) {
        return alert("请选择字典");
    }
    var ziDian = ziDians[index];
    if (confirm("确定删除字典：" + ziDian.mc + "?")) {
        $.ajax({
            url: "/LBStore/ziDian/deleteZiDian.do?id="+ziDian.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectZiDian();
                else
                    alert("删除失败:" + json.msg ? json.msg : "");
            }
        });
    }
}
