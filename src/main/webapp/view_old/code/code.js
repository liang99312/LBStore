var codes;
var optFlag = 1;
var editIndex = -1;
var selectBase;
var queryBase;
var selectParent;

$(document).ready(function () {
    getBaseCodes(setTrager_baseCode);
});

function setTrager_baseCode(){
    for(var i=0;i<rk_baseCodes.length;i++){
        var e = rk_baseCodes[i];
        e.name = e.codeName;
    }
    $('#inpBase').AutoComplete({'data': rk_baseCodes,'paramName':'selectBase','afterSelectedHandler':setParent});
    $('#selBaseCode').AutoComplete({'data': rk_baseCodes,'paramName':'queryBase'});
}

function setParent(c){
    getParentCodes(c.codeKey,setTrager_parentCode);
}

function setTrager_parentCode(){
    selectBase.label = selectBase.codeName;
    selectBase.businessCode = selectBase.codeKey;
    rk_parentCodes.unshift(selectBase);
    for(var i=0;i<rk_parentCodes.length;i++){
        var e = rk_parentCodes[i];
        e.name = e.codeName;
    }
    $('#inpParent').AutoComplete({'data': rk_parentCodes,'paramName':'selectParent'});
}

function jxCode(json) {
    $("#data_table_body tr").remove();
    codes = [];
    codes = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var trStr = '<tr><td>' + item.codeName + '</td><td>' + item.codeDesc + '</td><td>' + item.codeLevel + '</td><td>'
            + '<button class="btn btn-info btn-xs icon-edit" onclick="editCode(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
            + '<button class="btn btn-danger btn-xs icon-remove" onclick="delCode(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectCode() {
    var code = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        code.codeName = $("#selName").val();
    }
    if ($("#selBaseCode").val() === '' || $("#selBaseCode").val() !== queryBase.name) {
        return alert("请选择分类查询");
    }
    code.businessCode = queryBase.codeKey;
    tj.paramters = code;
    var options = {};
    options.url = "/whwr/codeManage/listCodesByPage.do";
    options.tj = tj;
    options.func = jxCode;
    options.ul = "#example";
    queryPaginator(options);
}

function addCode() {
    optFlag = 1;
    $("#divBase,#divParent").show();
    $("#codeModel_title").html("新增字典");
    $("#inpName").val("");
    $("#inpDesc").val("");
    $("#inpKey").val("");
    $("#codeModal").modal("show");
}

function editCode(index) {
    $("#divBase,#divParent").hide();
    optFlag = 2;
    if (codes[index] === undefined) {
        optFlag = 1;
        return alert("请选择字典");
    }
    var code = codes[index];
    editIndex = index;
    $("#codeModel_title").html("修改字典");
    $("#inpName").val(code.codeName);
    $("#inpDesc").val(code.codeDesc);
    $("#inpKey").val(code.codeKey);
    $("#codeModal").modal("show");
}

function saveCode() {
    var code = {};
    var url = "";
    var type = "";
    if (optFlag === 2) {
        if (codes[editIndex] === undefined) {
            return;
        }
        code = codes[editIndex];
        url = "/whwr/codeManage/updateCode.do";
        type = "put";
    } else if (optFlag === 1) {
        url = "/whwr/codeManage/saveCode.do";
        type = "post";
        if ($("#inpParent").val()==="" || $("#inpParent").val() !== selectParent.codeName) {
            return alert("请选择父类");
        }
        code.parentId = selectParent.id;
        code.codeLevel = selectParent.codeLevel + 1;
        code.businessCode = selectParent.businessCode;
    }
    code.codeName = $("#inpName").val();
    code.codeDesc = $("#inpDesc").val();
    code.codeKey = $("#inpKey").val();
    $.ajax({
        url: url,
        data: JSON.stringify(code),
        contentType: "application/json",
        type: type,
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if(json.code === 200){
                var user = json.data;
                user.name = user.codeName;
                rk_parentCodes.push(user);
                $('#inpParent').AutoComplete({'data': rk_parentCodes,'paramName':'selectParent'});
                $("#codeModal").modal("hide");
                queryBase = selectBase;
                $('#selBaseCode').val(queryBase.codeName);
                selectCode();
            }else{
                alert("保存失败:" + json.message? json.message:"");
            }
        }
    });
}

function delCode(index) {
    if (codes[index] === undefined) {
        return alert("请选择字典");
    }
    var code = codes[index];
    if (confirm("确定删除字典：" + code.codeName + "?")) {
        $.ajax({
            url: "/whwr/codeManage/deleteCode.do?id="+code.id,
            contentType: "application/json",
            type: "delete",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.code === 200)
                    selectCode();
                else
                    alert("删除失败:" + json.message? json.message:"");
            }
        });
    }
}
