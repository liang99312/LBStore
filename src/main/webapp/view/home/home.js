var goYuanGong = "/LBStore/a01/goA01.do";
var goBuMen = "/LBStore/buMen/goBuMen.do";
var goKeHu = "/LBStore/keHu/goKeHu.do";
var goGongYingShang = "/LBStore/gongYingShang/goGongYingShang.do";
var goCangKu = "/LBStore/cangKu/goCangKu.do";
var goWuZiLeiBie = "/LBStore/wuZiLeiBie/goWuZiLeiBie.do";
var goWuZiZiDian = "/LBStore/wuZiZiDian/goWuZiZiDian.do";
var goQingGou = "/LBStore/goQingGou.do";
var goCaiGou = "/LBStore/goCaiGou.do";
var goRuKu = "/LBStore/ruKu/goRuKu.do";
var goLingLiao = "/LBStore/lingLiao/goLingLiao.do";
var goFaHuo = "/LBStore/faHuo/goFaHuo.do";
var goSunHao = "/LBStore/sunHao/goSunHao.do";
var goHuanKu = "/LBStore/huanKu/goHuanKu.do";
var goTuiHuo = "/LBStore/tuiHuo/goTuiHuo.do";
var goTuiGong = "/LBStore/tuiGong/goTuiGong.do";
var goKuCun = "/LBStore/kuCun/goKuCun.do";
var goTongJi = "/LBStore/tongJi/goTongJi.do";
var goBaoBiao = "/LBStore/baoBiao/goBaoBiao.do";
var goZiDianLeiBie = "/LBStore/ziDianFenLei/goZiDianFenLei.do";
var goQiYeZiDian = "/LBStore/ziDian/goZiDian.do";
var goPassword = "/LBStore/a01/goPassword.do";
var goXuQiu = "/LBStore/xuQiu/goXuQiu.do";
var goXiangMu = "/LBStore/xiangMu/goXiangMu.do";
var goXiangMuDetail = "/LBStore/xiangMuDetail/goXiangMuDetail.do";
var goSetPrinter = "#";

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
//                {id: '501', text: '申购管理', icon: 'icon-glass', url: goQingGou},
//                {id: '502', text: '采购管理', icon: 'icon-glass', url: goCaiGou},
                {id: '503', text: '入库管理', icon: 'icon-glass', url: goRuKu},
                {id: '504', text: '领料管理', icon: 'icon-glass', url: goLingLiao},
                {id: '505', text: '发货管理', icon: 'icon-glass', url: goFaHuo},
                {id: '506', text: '损耗管理', icon: 'icon-glass', url: goSunHao},
                {id: '507', text: '还库管理', icon: 'icon-glass', url: goHuanKu},
                {id: '5010', text: '退货管理', icon: 'icon-glass', url: goTuiHuo},
                {id: '5011', text: '退供管理', icon: 'icon-glass', url: goTuiGong},
                {id: '508', text: '库存管理', icon: 'icon-glass', url: goKuCun},
                {id: '509', text: '统计分析', icon: 'icon-glass', url: goTongJi}]},
         {id: '6', text:'项目管理', icon: 'icon-leaf', url: '', menus: [
                {id: '601', text: '需求管理', icon: 'icon-glass', url: goXuQiu},
                {id: '602', text: '项目管理', icon: 'icon-glass', url: goXiangMu},
                {id: '603', text: '项目明细', icon: 'icon-glass', url: goXiangMuDetail}]},
        {id: '7', text: '企业字典', icon: 'icon-leaf', url: '', menus: [
                {id: '701', text: '字典类别', icon: 'icon-glass', url: goZiDianLeiBie},
                {id: '702', text: '企业字典', icon: 'icon-glass', url: goQiYeZiDian}]},
        {id: '8', text: '报表管理', icon: 'icon-leaf', url: '', menus: [
                {id: '801', text: '报表管理', icon: 'icon-glass', url: goBaoBiao}]},
        {id: '9', text: '系统管理', icon: 'icon-cog', url: '', menus: [
                {id: '901', text: '修改密码', icon: 'icon-glass', url: goPassword},
                {id: '902', text: '设置打印机', icon: 'icon-glass', url: goSetPrinter,func:'setPrinter'}]}]};
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
            if (json.result === 0) {
                loadUser = json.a01;
                $("#span_user_name").html(loadUser.mc);
                setMenu(loadUser.a01qx);
            } else {
                window.top.location.href = "/LBStore/logout.do";
            }
        }
    });
});

function setPrinter(){
    window.SetPrinter();
}

function setMenu(quanxian) {
    var qxArray = quanxian.split(";");
    var menu = jQuery.extend(true, {}, allMenu);
    if (quanxian !== '-1') {
        for (var i = allMenu.data.length - 1; i > -1; i--) {
            var m = allMenu.data[i];
            for (var j = m.menus.length - 1; j > -1; j--) {
                var e = m.menus[j];
                if (qxArray.indexOf(e.id) < 0) {
                    menu.data[i].menus.splice(j, 1);
                }
            }
            if (menu.data[i].menus.length === 0) {
                menu.data.splice(i, 1);
            }
        }
    }
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