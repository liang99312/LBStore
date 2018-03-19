var goYuanGong = "/LBStore/a01/goA01.do";
var goBuMen = "/LBStore/buMen/goBuMen.do";
var goKeHu = "/LBStore/keHu/goKeHu.do";
var goGongYingShang = "/LBStore/gongYingShang/goGongYingShang.do";
var goCangKu = "/LBStore/goCangKu.do";
var goWuZiLeiBie = "/LBStore/wuZiLeiBie/goWuZiLeiBie.do";
var goWuZiZiDian = "/LBStore/goWuZiZiDian.do";
var goQingGou = "/LBStore/goQingGou.do";
var goCaiGou = "/LBStore/goCaiGou.do";
var goRuKuDan = "/LBStore/goRuKuDan.do";
var goLingLiaoDan = "/LBStore/goLingLiaoDan.do";
var goFaHuo = "/LBStore/goFaHuo.do";
var goSunHao = "/LBStore/goSunHao.do";
var goHuanKu = "/LBStore/goHuanKu.do";
var goKunCun = "/LBStore/goKunCun.do";
var goTongJi = "/LBStore/goTongJi.do";
var goBaoBiao = "/LBStore/goBaoBiao.do";
var goZiDianLeiBie = "/LBStore/goZiDianLeiBie.do";
var goQiYeZiDian = "/LBStore/goQiYeZiDian.do";
var goPassword = "/LBStore/goPassword.do";

var allMenu = {data: [
        {id: '1', text: '组织机构', icon: 'icon-leaf', url: '', menus: [
                {id: '101', text: '部门管理', icon: 'icon-glass', url: goBuMen},
                {id: '102', text: '人员管理', icon: 'icon-glass', url: goYuanGong}]},
        {id: '2', text: '客户管理', icon: 'icon-leaf', url: '', menus: [
                {id: '201', text: '客户管理', icon: 'icon-glass', url: goKeHu}]},
        {id: '3', text: '供应商管理', icon: 'icon-leaf', url: '', menus: [
                {id: '301', text: '供应商管理', icon: 'icon-glass', url: goGongYingShang}]},
        {id: '4', text: '仓库设置', icon: 'icon-leaf', url: '', menus: [
                {id: '401', text: '仓库管理', icon: 'icon-glass', url: goCangKu}, 
                {id: '402', text: '物资类别', icon: 'icon-glass', url: goWuZiLeiBie}, 
                {id: '403', text: '物资字典', icon: 'icon-glass', url: goWuZiZiDian}]},
        {id: '5', text: '仓库管理', icon: 'icon-leaf', url: '', menus: [
                {id: '501', text: '申购管理', icon: 'icon-glass', url: goQingGou},
                {id: '502', text: '采购管理', icon: 'icon-glass', url: goCaiGou},
                {id: '503', text: '入库管理', icon: 'icon-glass', url: goRuKuDan},
                {id: '504', text: '领料管理', icon: 'icon-glass', url: goLingLiaoDan},
                {id: '505', text: '发货管理', icon: 'icon-glass', url: goFaHuo},
                {id: '506', text: '损耗管理', icon: 'icon-glass', url: goSunHao},
                {id: '507', text: '还库管理', icon: 'icon-glass', url: goHuanKu},
                {id: '508', text: '统计分析', icon: 'icon-glass', url: goTongJi}]},
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
        url: "/LBStore/getLoginA01.do",
        contentType: "application/json",
        type: "post",
        cache: false,
        error: function (msg, textStatus) {
        },
        success: function (json) {
            if(json.result === 0){
                loadUser = json.a01;
                $("#span_user_name").html(loadUser.mc);
            }else{
                window.top.location.href="/LBStore/logout.do";
            }
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