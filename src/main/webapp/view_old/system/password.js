
var ygBianHao;
var isEditYg;
var xiuGai=10;
var chongZhi=20;
var chaKan=30;
var zhiDing=40;

$(document).ready(function(){
	$("#divFrmYg").find("input,select").r2t();
	cxYuanGong();
});

function cxYuanGong(){
	var json = {};
	json={"jsonObj":JSON.stringify(json)};
	$.ajax({
		url:"/whwr/getLoginA01.action",
		data:json,
		dataType:"json",
		type:"post",
		cache:false,
		error:function(msg, textStatus){failureResp(msg.responseText);},
		success:function(json){
			if(checkResult(json)){
				jxYuanGong(json);
				$("#board").hide();
			}
		}
	});
}

function jxYuanGong(json){
	//var j = yuanGong.sz[yuanGong.seq];
	var j = json;
	ygBianHao = j.id;
	$("#tblFrmYg_bh").val(j.bh).attr("readonly","readonly");
	$("#tblFrmYg_xm").val(j.mc).attr("readonly","readonly");

}

function check4Sjhm(){
	if($("#tblFrmYg_xmm").val()==""||$("#tblFrmYg_ymm").val()==""){
		return false;
	}
	return true;
}

function bcYuanGong(){
	if(check4Sjhm()){
		var j = {"id":ygBianHao};
		j.mc = $("#tblFrmYg_xm").val();
		j.bh = $("#tblFrmYg_bh").val();
		j.ymm = $("#tblFrmYg_ymm").val();
		j.xmm = $("#tblFrmYg_xmm").val();
		
		j={"jsonObj":JSON.stringify(j)};
		var url = "/whwr/changePassword.action";
		$.ajax({
			url:url,
			data:j,
			dataType:"json",
			type:"post",
			cache:false,
			error:function(msg, textStatus){failureResp(msg.responseText);},
			success:function(json){
				if (checkResult(json)){
					alert("修改成功");
					$("#tblFrmYg_ymm").val("")
					$("#tblFrmYg_xmm").val("")
				}
			}
		});
	}
}