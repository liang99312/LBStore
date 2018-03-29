var loginUsers;
var optFlag = 1;
var editIndex = -1;
var selQiYe;

$(document).ready(function () {
    getQiYes(setTrager_qiYe);
});

function setTrager_qiYe(){
    $('#selQy').AutoComplete({'data': lb_qiYes,'paramName':'selQiYe'});
}

function jxLoginUser(json) {
    $("#data_table_body tr").remove();
    loginUsers = [];
    loginUsers = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var classStr = '';
        if(item.state === -1){
            classStr = ' class="danger"';
        }
        var trStr = '<tr'+classStr+'><td>' + item.qy + '</td><td>' + item.mc + '</td><td>' + item.bh + '</td><td>'
                + '<button class="btn btn-danger btn-xs icon-remove" onclick="offLoginUser(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectLoginUser() {
    var loginUser = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        loginUser.mc = $("#selName").val();
    }
    if (selQiYe && $("#selQy").val() !== "" && $("#selQy").val() === selQiYe.mc) {
        loginUser.qy_id = selQiYe.id;
    }
    tj.paramters = loginUser;
    var options = {};
    options.url = "/LBStore/loginUser/listLoginUsersByPage.do";
    options.tj = tj;
    options.func = jxLoginUser;
    options.ul = "#example";
    queryPaginator(options);
}

function offLoginUser(index) {
    if (loginUsers[index] === undefined) {
        return alert("请选择在线用户");
    }
    var loginUser = loginUsers[index];
    if (confirm("确定强制下线：" + loginUser.mc + "?")) {
        $.ajax({
            url: "/LBStore/loginUser/offLoginUser.do?",
            data: JSON.stringify(loginUser),
            contentType: "application/json",
            type: "post",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.result === 0)
                    selectLoginUser();
                else
                    alert("删除失败:" + json.msg ? json.msg : "");
            }
        });
    }
}
