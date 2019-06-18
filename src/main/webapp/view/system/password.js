$(document).ready(function(){
    var user = parent.loadUser;
    if(user === undefined || user === null){
        alert("请登录系统");
    }else{
        $("#inpLoadName").val(user.bh);
    }
});
function changePassword() {
    var user = {};
    user.loadName = $("#inpLoadName").val();
    user.oldPassword = $("#inpOldPassword").val();
    user.newPassword = $("#inpNewPassword").val();
    $.ajax({
        url: "/LBStore/a01/changePassword.do?oldPassword="+user.oldPassword + "&newPassword=" + user.newPassword,
        data: JSON.stringify(user),
        contentType: "application/json",
        type: "GET",
        cache: false,
        error: function (msg, textStatus) {
            alert("修改密码失败");
        },
        success: function (json) {
            if (json.result === 0) {
                alert("修改密码成功");
            } else {
                alert("修改密码失败:" + json.msg ? json.msg : "");
            }
        }
    });
}

