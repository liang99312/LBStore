var kuCuns;
var optFlag = 1;
var editIndex = -1;

$(document).ready(function () {
});

function jxKuCun(json) {
    $("#data_table_body tr").remove();
    kuCuns = [];
    kuCuns = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if(item.state === -1){
            classStr = ' class="danger"';
        }
        var trStr = '<tr'+classStr+'><td>' + item.mc + '</td><td>' + item.dm + '</td><td>' + item.lxr + '</td><td>' + item.lxdh + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-file-alt" onclick="readKuCun(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-edit" onclick="editKuCun(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectKuCun() {
    var kuCun = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        kuCun.mc = $("#selName").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        kuCun.state = $("#selState").val();
    }
    tj.paramters = kuCun;
    var options = {};
    options.url = "/LBStore/kuCun/listKuCunsByPage.do";
    options.tj = tj;
    options.func = jxKuCun;
    options.ul = "#example";
    queryPaginator(options);
}

function selectKuCun_m() {
    var ruKu = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#inpSelWz").val() !== "") {
        ruKu.wzmc = $("#inpSelWz").val();
    }
    if ($("#inpSelCk").val() !== "" && $("#inpSelCk").val() === selCangKu.mc) {
        ruKu.ck_id = selCangKu.id;
    }
    if ($("#inpSelKh").val() !== "" && $("#inpSelKh").val() === selKeHu.mc) {
        ruKu.kh_id = selKeHu.id;
    }
    if ($("#inpSelGys").val() !== "" && $("#inpSelGys").val() === selGongYingShang.mc) {
        ruKu.gys_id = selGongYingShang.id;
    }
    if ($("#inpSelQrq").val() !== "") {
        ruKu.qrq = $("#inpSelQrq").val();
    }
    if ($("#inpSelZrq").val() !== "") {
        ruKu.zrq = $("#inpSelZrq").val();
    }
    tj.paramters = ruKu;
    var options = {};
    options.url = "/LBStore/kuCun/listKuCunsByPage.do";
    options.tj = tj;
    options.func = jxKuCun;
    options.ul = "#example";
    queryPaginator(options);
}

function editKuCun(index) {
    optFlag = 2;
    if (kuCuns[index] === undefined) {
        optFlag = 1;
        return alert("请选择库存");
    }
    var kuCun = kuCuns[index];
    editIndex = index;
    $("#kuCunModel_title").html("修改库存");
    $("#inpMc").val(kuCun.mc);
    $("#inpDm").val(kuCun.dm);
    $("#inpDz").val(kuCun.dz);
    $("#inpLxr").val(kuCun.lxr);
    $("#inpLxdh").val(kuCun.lxdh);
    $("#inpBz").val(kuCun.bz);
    $("#kuCunModal").modal("show");
}

function saveKuCun() {
    var kuCun = {};
    var url = "";
    if (optFlag === 2) {
        if (kuCuns[editIndex] === undefined) {
            return;
        }
        kuCun = kuCuns[editIndex];
        url = "/LBStore/kuCun/updateKuCun.do";
    } else if (optFlag === 1) {
        url = "/LBStore/kuCun/saveKuCun.do";
    }
    kuCun.mc = $("#inpMc").val();
    kuCun.dm = $("#inpDm").val();
    kuCun.dz = $("#inpDz").val();
    kuCun.lxr = $("#inpLxr").val();
    kuCun.lxdh = $("#inpLxdh").val();
    kuCun.bz = $("#inpBz").val();
    $.ajax({
        url: url,
        data: JSON.stringify(kuCun),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#kuCunModal").modal("hide");
                selectKuCun();
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}
