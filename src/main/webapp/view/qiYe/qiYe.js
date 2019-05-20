var qiYes;
var optFlag = 1;
var editIndex = -1;

$(document).ready(function () {
});

function jxQiYe(json) {
    $("#data_table_body tr").remove();
    qiYes = [];
    qiYes = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if(item.state === -1){
            classStr = ' class="danger"';
        }
        var trStr = '<tr'+classStr+'><td>' + item.mc + '</td><td>' + item.dm + '</td><td>' + item.lxr + '</td><td>' + item.lxdh + '</td><td>' + item.gly + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editQiYe(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteQiYe(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-magnet" onclick="recoverQiYe(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectQiYe() {
    var qiYe = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        qiYe.mc = $("#selName").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        qiYe.state = $("#selState").val();
    }
    tj.paramters = qiYe;
    var options = {};
    options.url = "/LBStore/qiYe/listQiYesByPage.do";
    options.tj = tj;
    options.func = jxQiYe;
    options.ul = "#example";
    queryPaginator(options);
}

function addQiYe() {
    optFlag = 1;
    $("#qiYeModel_title").html("新增企业");
    $("#inpMc").val("");
    $("#inpDm").val("");
    $("#inpDz").val("");
    $("#inpLxr").val("");
    $("#inpLxdh").val("");
    $("#inpGly").val("").removeAttr("disabled");
    $("#inpBz").val("");
    $("#qiYeModal").modal({backdrop:'static'});
}

function editQiYe(index) {
    optFlag = 2;
    if (qiYes[index] === undefined) {
        optFlag = 1;
        return alert("请选择企业");
    }
    var qiYe = qiYes[index];
    editIndex = index;
    $("#qiYeModel_title").html("修改企业");
    $("#inpMc").val(qiYe.mc);
    $("#inpDm").val(qiYe.dm);
    $("#inpDz").val(qiYe.dz);
    $("#inpLxr").val(qiYe.lxr);
    $("#inpLxdh").val(qiYe.lxdh);
    $("#inpGly").val(qiYe.gly).attr("disabled","disabled");
    $("#inpBz").val(qiYe.bz);
    $("#qiYeModal").modal({backdrop:'static'});
}

function saveQiYe() {
    var qiYe = {};
    var url = "";
    if (optFlag === 2) {
        if (qiYes[editIndex] === undefined) {
            return;
        }
        qiYe = qiYes[editIndex];
        url = "/LBStore/qiYe/updateQiYe.do";
    } else if (optFlag === 1) {
        url = "/LBStore/qiYe/saveQiYe.do";
    }
    if($("#inpMc").val() === ""){
        return alert("请输入企业名称");
    }
    qiYe.gly = $("#inpGly").val();
    qiYe.mc = $("#inpMc").val();
    qiYe.dm = $("#inpDm").val();
    qiYe.dz = $("#inpDz").val();
    qiYe.lxr = $("#inpLxr").val();
    qiYe.lxdh = $("#inpLxdh").val();
    qiYe.bz = $("#inpBz").val();
    $.ajax({
        url: url,
        data: JSON.stringify(qiYe),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#qiYeModal").modal("hide");
                selectQiYe();
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteQiYe(index) {
    if (qiYes[index] === undefined) {
        return alert("请选择企业");
    }
    var qiYe = qiYes[index];
    if (confirm("删除企业后，该企业的用户将停用，确定删除企业：" + qiYe.mc + "?")) {
        $.ajax({
            url: "/LBStore/qiYe/deleteQiYe.do?id="+qiYe.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectQiYe();
                else
                    alert("删除失败:" + json.msg ? json.msg : "");
            }
        });
    }
}

function recoverQiYe(index) {
    if (qiYes[index] === undefined) {
        return alert("请选择企业");
    }
    var qiYe = qiYes[index];
    if(qiYe.state !== 0){
        if (confirm("确定恢复企业：" + qiYe.mc + "?")) {
            $.ajax({
                url: "/LBStore/qiYe/recoverQiYe.do?id="+qiYe.id,
                contentType: "application/json",
                type: "get",
                dataType: "json",
                cache: false,
                error: function (msg, textStatus) {
                    alert("恢复失败");
                },
                success: function (json) {
                    if (json.result === 0)
                        selectQiYe();
                    else
                        alert("恢复失败:" + json.msg ? json.msg : "");
                }
            });
        }
    }else{
        alert("企业不需要恢复");
    }
}
