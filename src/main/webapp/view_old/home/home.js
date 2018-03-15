var goYuanGong = "/whwr/goYuanGong.action";
var goBuMen = "/whwr/goBuMen.action";
var goKeHu = "/whwr/goKeHu.action";
var goGongYingShang = "/whwr/goGongYingShang.action";
var goCangKu = "/whwr/goCangKu.action";
var goWuZiLeiBie = "/whwr/goWuZiLeiBie.action";
var goWuZiZiDian = "/whwr/goWuZiZiDian.action";
var goQingGou = "/whwr/goQingGou.action";
var goCaiGou = "/whwr/goCaiGou.action";
var goRuKuDan = "/whwr/goRuKuDan.action";
var goLingLiaoDan = "/whwr/goLingLiaoDan.action";
var goFaHuo = "/whwr/goFaHuo.action";
var goSunHao = "/whwr/goSunHao.action";
var goHuanKu = "/whwr/goHuanKu.action";
var goKunCun = "/whwr/goKunCun.action";
var goTongJi = "/whwr/goTongJi.action";
var goBaoBiao = "/whwr/goBaoBiao.action";
var goZiDianLeiBie = "/whwr/goZiDianLeiBie.action";
var goQiYeZiDian = "/whwr/goQiYeZiDian.action";
var goPassword = "/whwr/goPassword.action";

var allMenu = {data: [
        {id: '1', text: '组织机构', icon: 'icon-leaf', url: '', menus: [
                {id: '101', text: '部门管理', icon: 'icon-glass', url: goBuMen},
                {id: '102', text: '人员管理', icon: 'icon-glass', url: goYuanGong}]},
        {id: '2', text: '客户管理', icon: 'icon-leaf', url: '', menus: [
                {id: '201', text: '客户管理', icon: 'icon-glass', url: goKeHu}]},
        {id: '3', text: '供应商管理', icon: 'icon-leaf', url: '', menus: [
                {id: '301', text: '供应商管理', icon: 'icon-glass', url: goGongYingShang}]},
        {id: '3', text: '仓库设置', icon: 'icon-leaf', url: '', menus: [
                {id: '301', text: '仓库管理', icon: 'icon-glass', url: goCangKu}, 
                {id: '301', text: '物资类别', icon: 'icon-glass', url: goWuZiLeiBie}, 
                {id: '301', text: '物资字典', icon: 'icon-glass', url: goWuZiZiDian}]},
        {id: '4', text: '仓库管理', icon: 'icon-leaf', url: '', menus: [
                {id: '401', text: '申购管理', icon: 'icon-glass', url: goQingGou},
                {id: '402', text: '采购管理', icon: 'icon-glass', url: goCaiGou},
                {id: '403', text: '入库管理', icon: 'icon-glass', url: goRuKuDan},
                {id: '404', text: '领料管理', icon: 'icon-glass', url: goLingLiaoDan},
                {id: '405', text: '发货管理', icon: 'icon-glass', url: goFaHuo},
                {id: '406', text: '损耗管理', icon: 'icon-glass', url: goSunHao},
                {id: '407', text: '还库管理', icon: 'icon-glass', url: goHuanKu},
                {id: '408', text: '统计分析', icon: 'icon-glass', url: goTongJi}]},
        {id: '7', text: '企业字典', icon: 'icon-leaf', url: '', menus: [
                {id: '701', text: '字典类别', icon: 'icon-glass', url: goZiDianLeiBie},
                {id: '702', text: '企业字典', icon: 'icon-glass', url: goQiYeZiDian}]},
        {id: '8', text: '报表管理', icon: 'icon-leaf', url: '', menus: [
                {id: '801', text: '报表管理', icon: 'icon-glass', url: goBaoBiao}]},
        {id: '9', text: '系统管理', icon: 'icon-cog', url: '', menus: [
                {id: '901', text: '修改密码', icon: 'icon-glass', url: goPassword}]}]};
var loadUser = null;

$(document).ready(function () {
    $.ajax({
        url: "/whwr/getLoginA01.action",
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
        },
        success: function (json) {
            loadUser = json;
            $("#span_user_name").html(json.mc);
        }
    });
    setMenu("");//测试
});

function setMenu(quanxian) {
    var qxArray = quanxian.split(";");
    var menu = jQuery.extend(true, {}, allMenu);
    ;
    // for (var i = allMenu.data.length-1; i > -1; i--) {
    //     var m = allMenu.data[i];
    //     for (var j = m.menus.length-1; j > -1; j--) {
    //         var e = m.menus[j];
    //         if(qxArray.indexOf(e.id) < 0){
    //             menu.data[i].menus.splice(j,1);
    //         }
    //     }
    //     if(menu.data[i].menus.length === 0){
    //         menu.data.splice(i,1);
    //     }
    // }
    $('#menu').sidebarMenu(menu);

}

function SetWinHeight(obj) {
    var win = obj;
    if (document.getElementById) {
        if (win && !window.opera) {
            if (win.contentDocument && win.contentDocument.body.offsetHeight) {
                win.height = win.contentDocument.body.offsetHeight + 20;
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