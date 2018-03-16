var a01s;
var optFlag = 1;
var editIndex = -1;

$(document).ready(function () {
});

function jxA01(json) {
    $("#data_table_body tr").remove();
    a01s = [];
    a01s = json.list;
    $.each(json.list, function (index, item) { //遍历返回的json
        var trStr = '<tr><td>' + item.bh + '</td><td>' + item.mc + '</td><td>' + item.a0111 + '</td><td>' + item.a0105 + '</td><td>'
            + '<button class="btn btn-info btn-xs icon-edit" onclick="editA01(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button>&nbsp;'
            + '<button class="btn btn-danger btn-xs icon-remove" onclick="delA01(' + index + ' );" style="padding-top: 4px;padding-bottom: 3px;"></button></td></tr>';
        $("#data_table_body").append(trStr);
    });
}

function selectA01() {
    var a01 = {};
    var tj = {"pageSize": 20, "currentPage": 1};
    if ($("#selName").val() !== "") {
        a01.mc = $("#selName").val();
    }
    if ($("#selState").val() !== '') {
        a01.state = $("#selName").val();
    }
    tj.paramters = a01;
    var options = {};
    options.url = "/LBStore/a01/listA01sByPage.do";
    options.tj = tj;
    options.func = jxA01;
    options.ul = "#example";
    queryPaginator(options);
}

function addA01() {
    optFlag = 1;
    $("#a01Model_title").html("新增员工");
    $("#inpName").val("");
    $("#inpDesc").val("");
    $("#inpKey").val("");
    $("#a01Modal").modal("show");
}

function editA01(index) {
    optFlag = 2;
    if (a01s[index] === undefined) {
        optFlag = 1;
        return alert("请选择员工");
    }
    var a01 = a01s[index];
    editIndex = index;
    $("#a01Model_title").html("修改员工");
    $("#inpName").val(a01.a01Name);
    $("#inpDesc").val(a01.a01Desc);
    $("#inpKey").val(a01.a01Key);
    $("#a01Modal").modal("show");
}

function saveA01() {
    var a01 = {};
    var url = "";
    var type = "";
    if (optFlag === 2) {
        if (a01s[editIndex] === undefined) {
            return;
        }
        a01 = a01s[editIndex];
        url = "/LBStore/a01/updateA01.do";
        type = "put";
    } else if (optFlag === 1) {
        url = "/LBStore/a01/saveA01.do";
        type = "post";
        if ($("#inpParent").val()==="" || $("#inpParent").val() !== selectParent.a01Name) {
            return alert("请选择父类");
        }
        a01.parentId = selectParent.id;
        a01.a01Level = selectParent.a01Level + 1;
        a01.businessA01 = selectParent.businessA01;
    }
    a01.a01Name = $("#inpName").val();
    a01.a01Desc = $("#inpDesc").val();
    a01.a01Key = $("#inpKey").val();
    $.ajax({
        url: url,
        data: JSON.stringify(a01),
        contentType: "application/json",
        type: type,
        cache: false,
        error: function (msg, textStatus) {
            alert("保存失败");
        },
        success: function (json) {
            if(json.a01 === 200){
                var user = json.data;
                user.name = user.a01Name;
                rk_parentA01s.push(user);
                $('#inpParent').AutoComplete({'data': rk_parentA01s,'paramName':'selectParent'});
                $("#a01Modal").modal("hide");
                queryBase = selectBase;
                $('#selBaseA01').val(queryBase.a01Name);
                selectA01();
            }else{
                alert("保存失败:" + json.message? json.message:"");
            }
        }
    });
}

function delA01(index) {
    if (a01s[index] === undefined) {
        return alert("请选择员工");
    }
    var a01 = a01s[index];
    if (confirm("确定删除员工：" + a01.a01Name + "?")) {
        $.ajax({
            url: "/LBStore/a01/deleteA01.do?id="+a01.id,
            contentType: "application/json",
            type: "delete",
            dataType: "json",
            cache: false,
            error: function (msg, textStatus) {
                alert("删除失败");
            },
            success: function (json) {
                if (json.a01 === 200)
                    selectA01();
                else
                    alert("删除失败:" + json.message? json.message:"");
            }
        });
    }
}
