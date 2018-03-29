var goQiYe = "/LBStore/qiYe/goQiYe.do";
var goLoginUser = "/LBStore/loginUser/goLoginUser.do";
var goBaoBiao = "/LBStore/baoBiao/goBaoBiao.do";
var goPassword = "/LBStore/goPassword.do";
var goTongJi = "/LBStore/tongJi/goTongJi.do";

var allMenu = {data: [
        {id: '6', text: '企业管理', icon: 'icon-leaf', url: '', menus: [
                {id: '601', text: '企业管理', icon: 'icon-glass', url: goQiYe}]},
        {id: '8', text: '报表管理', icon: 'icon-leaf', url: '', menus: [
                {id: '801', text: '报表管理', icon: 'icon-glass', url: goBaoBiao}]},
        {id: '5', text: '仓库管理', icon: 'icon-leaf', url: '', menus: [
                {id: '509', text: '统计分析', icon: 'icon-glass', url: goTongJi}]},
        {id: '9', text: '系统管理', icon: 'icon-cog', url: '', menus: [
                {id: '901', text: '修改密码', icon: 'icon-glass', url: goPassword},
                {id: '902', text: '在线用户', icon: 'icon-glass', url: goLoginUser}]}]};
var loadUser = null;

$(document).ready(function () {
    $.ajax({
        url: "/LBStore/getLoginA01.do",
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
        },
        success: function (json) {
            if(json.result === 0){
                loadUser = json.a01;
                if(loadUser.state !== 9){
                    window.top.location.href="/LBStore/logout_admin.do";
                }
                $("#span_user_name").html(loadUser.mc);
            }else{
                window.top.location.href="/LBStore/logout_admin.do";
            }
        }
    });
    setMenu("");
});

function setMenu(quanxian) {
    var menu = jQuery.extend(true, {}, allMenu);
    $('#menu').sidebarMenu(menu);

}

function SetWinHeight(obj) {
    var win = obj;
    if (document.getElementById) {
        if (win && !window.opera) {
            if (win.contentDocument && win.contentDocument.body.offsetHeight) {
                win.height = win.contentDocument.body.offsetHeight + 25;
            } else if (win.Document && win.Document.body.scrollHeight) {
                win.height = win.Document.body.scrollHeight;
            }
        }
    }
}

function SetFrameHeight(id, height, force) {
    if (force) {
        $("#" + id).css("height", height);
    } else if (parseInt($("#" + id).css("height")) < height) {
        $("#" + id).css("height", height);
    }
}