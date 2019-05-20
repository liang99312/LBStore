var baoBiaos;

$(document).ready(function () {

});

function jxBaoBiao(json) {
    $("#data_table_body tr").remove();
    baoBiaos = [];
    baoBiaos = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var trStr = '<tr><td>' + item.mc + '</td><td>'
                + '<button class="btn btn-info btn-xs icon-bolt" onclick="execBaoBiao(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
                + '</td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectBaoBiao() {
    var baoBiao = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        baoBiao.mc = $("#selName").val();
    }
    tj.paramters = baoBiao;
    var options = {};
    options.url = "/LBStore/tongJi/listTjfxBaoBiaosByPage.do";
    options.tj = tj;
    options.func = jxBaoBiao;
    options.ul = "#example";
    queryPaginator(options);
}

function closeBaoBiao() {
    $("#baoBiaoModal").modal("hide");
}

function execBaoBiao(index) {
    if (baoBiaos[index] === undefined) {
        return alert("请选择报表");
    }
    var baoBiao = baoBiaos[index];
    $.ajax({
        url: "/LBStore/baoBiao/getBaoBiaoNrById.do?id=" + baoBiao.id,
        contentType: "application/json",
        type: "get",
        dataType: "html",
        cache: false,
        error: function (msg, textStatus) {
            alert("读取报表失败");
        },
        success: function (text) {
            $("#dvBbnr").html(text);
            $("#baoBiaoModal").modal({backdrop:'static'});
        }
    });
}