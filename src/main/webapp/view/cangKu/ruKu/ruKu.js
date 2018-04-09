var ruKus;
var optFlag = 1;
var editIndex = -1;
var editFenLei;
var editType;
var rkmx = [];
var optMxFlag = 1;
var editMxIndex = -1;
var tgIndex = 0;

$(document).ready(function () {
    getWuZiZiDians(setTrager_ziDian);
    $("#inpMxJlfs").click(function(){
        selectMxJlfs();
    });
});

function setTrager_ziDian(){
    $('#selLeiBie').AutoComplete({'data': lb_wuZiZiDians, 'afterSelectedHandler': selectWuZiZiDian});
}

function selectWuZiZiDian(json){
    
}

function selectMxJlfs(){
    var val = $("#inpMxJlfs").val();
    $("#dvMxBzgg").hide();
    $("#dvMxZl").hide();
    $("#divMxDymx").hide();
    if(val === "zl"){
        $("#dvMxBzgg").show();
        $("#dvMxZl").show();
    }else if(val === "mx"){
        $("#dvMxZl").show();
        $("#divMxDymx").show();
        buildDymx([]);
    }
}

function setTrager_fenLei() {
    $('#inpMxZiDian').AutoComplete({'data': lb_ziDianFenLeis, 'paramName': 'editFenLei'});
}

function jxRuKu(json) {
    $("#data_table_body tr").remove();
    ruKus = [];
    ruKus = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if (item.state === -1) {
            classStr = ' class="danger"';
        }
        if (item.tysx && item.tysx !== null && item.tysx !== "") {
            item.tysx = JSON.parse(item.tysx);
        } else {
            item.tysx = [];
        }
        var trStr = '<tr' + classStr + '><td>' + item.mc + '</td><td>' + item.dm + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-edit" onclick="editRuKu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="deleteRuKu(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectRuKu() {
    var ruKu = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        ruKu.mc = $("#selName").val();
    }
    if ($("#selState").val() !== '' && $("#selState").val() !== "-9") {
        ruKu.state = $("#selState").val();
    }
    tj.paramters = ruKu;
    var options = {};
    options.url = "/LBStore/ruKu/listRuKusByPage.do";
    options.tj = tj;
    options.func = jxRuKu;
    options.ul = "#example";
    queryPaginator(options);
}

function addRuKu() {
    optFlag = 1;
    $("#ruKuModel_title").html("新增入库单");
    $("#inpMc").val("");
    $("#inpDm").val("");
    $("#inpBz").val("");
    $("#ruKuModal").modal("show");
}

function editRuKu(index) {
    optFlag = 2;
    if (ruKus[index] === undefined) {
        optFlag = 1;
        return alert("请选择入库单");
    }
    var ruKu = ruKus[index];
    editIndex = index;
    $("#ruKuModel_title").html("修改入库单");
    $("#inpMc").val(ruKu.mc);
    $("#inpDm").val(ruKu.dm);
    $("#inpBz").val(ruKu.bz);
    $("#ruKuModal").modal("show");
}

function saveRuKu() {
    var ruKu = {};
    var url = "";
    if (optFlag === 2) {
        if (ruKus[editIndex] === undefined) {
            return;
        }
        ruKu = ruKus[editIndex];
        url = "/LBStore/ruKu/updateRuKu.do";
    } else if (optFlag === 1) {
        url = "/LBStore/ruKu/saveRuKu.do";
    }
    ruKu.mc = $("#inpMc").val();
    ruKu.dm = $("#inpDm").val();
    ruKu.bz = $("#inpBz").val();
    $.ajax({
        url: url,
        data: JSON.stringify(ruKu),
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if (json.result === 0) {
                $("#ruKuModal").modal("hide");
                selectRuKu();
            } else {
                alert("保存失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

function deleteRuKu(index) {
    if (ruKus[index] === undefined) {
        return alert("请选择入库单");
    }
    var ruKu = ruKus[index];
    if (confirm("确定删除入库单：" + ruKu.mc + "?")) {
        $.ajax({
            url: "/LBStore/ruKu/deleteRuKu.do?id=" + ruKu.id,
            contentType: "application/json",
            type: "get",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectRuKu();
                else
                    alert("删除失败:" + json.msg ? json.msg : "");
            }
        });
    }
}

function buildTysx(data) {
    if(data.length === 0){
        $("#divMxTysx").hide();
        return;
    }
    $("#divMxTysx").empty();
    var opt = {data:data};
    $("#divMxTysx").setTysxDiv(opt);
}

function buildDymx(data){
    var opt = {data:data,yxData:[]};
    $("#tblMxDymx").setDetailTable(opt);
    $("#tblMxDymx input:last").focus();
}

function addRuKuMingXi() {
    optMxFlag = 1;
    $("#ruKuMingXiModal_title").html("增加明细");
    
    $("#ruKuMingXiModal").modal("show");
}

function editRuKuMingXi(index) {
    if (rkmx[index]) {
        optMxFlag = 2;
        editMxIndex = index;
        $("#ruKuMingXiModal_title").html("修改明细");
        
        $("#ruKuMingXiModal").modal("show");
    }
}

function delRuKuMingXi(index) {
    if (rkmx[index]) {
        if (confirm("确定删除特有属性：" + rkmx[index].mc + "?")) {
            rkmx.splice(index, 1);
            for (var i = 0; i < rkmx.length; i++) {
                rkmx[i].id = i;
            }
            buildTysx(rkmx);
        }
    }
}

function saveRuKuMingXi() {
    if (optMxFlag === 1) {
        var ts = {};
        ts.id = rkmx.length;
        ts.mc = $("#inpMxMc").val();
        ts.type = $("#inpMxType").val();
        if (editFenLei && editFenLei !== null) {
            ts.zdfl = editFenLei.id;
            ts.zdfl_mc = editFenLei.mc;
        }
        rkmx.push(ts);
    } else if (optMxFlag === 2) {
        var ts = {};
        ts.mc = $("#inpMxMc").val();
        ts.type = $("#inpMxType").val();
        if (editFenLei && editFenLei !== null) {
            ts.zdfl = editFenLei.id;
            ts.zdfl_mc = editFenLei.mc;
        }
        rkmx.splice(editMxIndex, 1, ts);
    }
    for (var i = 0; i < rkmx.length; i++) {
        rkmx[i].id = i;
    }
    buildTysx(rkmx);
    $("#ruKuMingXiModal").modal("hide");
}
