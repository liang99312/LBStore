var kuCuns;
var optFlag = 1;
var editIndex = -1;
var selA01;
var selCangKu;
var selKeHu;
var selGongYingShang;
var selWzlb;

$(document).ready(function () {
    $('#inpSelQrq,#inpSelZrq').datetimepicker({language: 'zh-CN', format: 'yyyy-mm-dd', weekStart: 7, todayBtn: 1, autoclose: 1, todayHighlight: 1, minView: 2, startView: 2, forceParse: 0, showMeridian: 1});
    getAllA01s(setTrager_a01);
    getCangKus(setTrager_cangKu);
    getKeHus(setTrager_keHu);
    getGongYingShangs(setTrager_gongYingShang);
    getWuZiZiDians(setTrager_ziDian);
    getWuZiLeiBies(setTrager_leiBie);
});

function setTrager_a01() {
    $('#inpSelRkr').AutoComplete({'data': lb_allA01s, 'paramName': 'selA01'});
}

function setTrager_cangKu() {
    $('#inpSelCk').AutoComplete({'data': lb_cangKus, 'paramName': 'selCangKu'});
}

function setTrager_keHu() {
    $('#inpSelKh').AutoComplete({'data': lb_keHus, 'paramName': 'selKeHu'});
}

function setTrager_gongYingShang() {
    $('#inpSelGys').AutoComplete({'data': lb_gongYingShangs, 'paramName': 'selGongYingShang'});
}

function setTrager_ziDian() {
    $('#inpSelWz,#selName').AutoComplete({'data': lb_wuZiZiDians});
}

function setTrager_leiBie() {
    $('#inpSelWzlb').AutoComplete({'data': lb_wuZiLeiBies, 'paramName': 'selWzlb'});
}

function jxKuCun(json) {
    $("#data_table_body tr").remove();
    kuCuns = [];
    kuCuns = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var trStr = '<tr><td>' + item.ckmc + '</td><td>' + item.wzmc + '</td><td>' + item.pp + '</td><td>' + item.xhgg + '</td><td>' + item.zl + '</td><td>' + item.syzl + '</td><td>' + item.kw + '</td><td>' + item.rksj + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-file-alt" onclick="readKuCun(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editKuCun(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function showSelectKuCun() {
    $("#kuCunSelectModal").modal("show");
}

function selectKuCun() {
    var kuCun = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        kuCun.mc = $("#selName").val();
    }
    if ($("#selTxm").val() !== '') {
        kuCun.txm = $("#selTxm").val();
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
    if ($("#inpSelXhgg").val() !== "") {
        ruKu.xhgg = $("#inpSelXhgg").val();
    }
    if ($("#inpSelWzlb").val() !== "" && $("#inpSelWzlb").val() === selWzlb.mc) {
        ruKu.wzlb_id = selWzlb.id;
    }
    if ($("#inpSelRkr").val() !== "" && $("#inpSelRkr").val() === selA01.mc) {
        ruKu.rkr_id = selA01.id;
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
    $("#kuCunSelectModal").modal("hide");
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
