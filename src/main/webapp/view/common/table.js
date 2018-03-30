(function ($) {
    $.fn.extend({
        inputTable: function (opt) {
            var tblId = $(this).attr("id");
            var yxData = opt.yxData;
            var ls = opt.ls ? opt.ls : 4;
            var width = 100 / ls;
            var unConfirm = opt.unConfirm ? opt.unConfirm : false;
            width = width + "%";
            var delYx = function (index) {
                if (yxData[index]) {
                    if (!unConfirm) {
                        if (confirm("确定删除：" + yxData[index].mc + "?")) {
                            yxData.splice(index, 1);
                            resetTable(opt);
                            setInput();
                        }
                    } else {
                        yxData.splice(index, 1);
                        resetTable(opt);
                        setInput();
                    }
                }
            };
            var resetTable = function () {
                var hs = parseInt((yxData.length - 1) / ls) + 1;
                var flag = false;
                $("#" + tblId + " tr").remove();
                for (var i = 0; i < hs; i++) {
                    var str = "<tr>";
                    for (var j = 0; j < ls; j++) {
                        var s = "&ensp;";
                        if (yxData[i * ls + j]) {
                            s = yxData[i * ls + j].mc + "<a href='#' id='" + tblId + "_a_" + i * ls + j + "' style='color:red; float: right; margin-right: 3px;text-decoration: none;'>X</a>";
                        } else {
                            if (!flag) {
                                flag = true;
                                s = "<input type='text'  style='width:99%' />";
                            }
                        }
                        str += "<td style='width:" + width + "'>" + s + "</td>";
                    }
                    str += "</tr>";
                    $("#" + tblId).append(str);
                }
                if (!flag) {
                    var str = "<tr>";
                    for (var j = 0; j < ls; j++) {
                        var s = "&ensp;";
                        if (!flag) {
                            flag = true;
                            s = "<input type='text' style='width:99%' />";
                        }
                        str += "<td style='width:" + width + "'>" + s + "</td>";
                    }
                    str += "</tr>";
                    $("#" + tblId).append(str);
                }
            };
            var setInput = function () {
                $('#' + tblId + ' a').each(function () {
                    $(this).click(function () {
                        var index = parseInt($(this).attr('id').substring(tblId.length + 3));
                        delYx(index);
                    });
                });
                $('#' + tblId + ' input').AutoComplete({'data': opt.data, 'afterSelectedHandler': function (json) {
                        if (opt.unrepeat) {
                            for (var i = 0; i < yxData.length; i++) {
                                var e = yxData[i];
                                if (e.id === json.id) {
                                    alert("对象已选！");
                                    return;
                                }
                            }
                        }
                        yxData.push(json);
                        resetTable(opt);
                        setInput();
                    }});
            };
            resetTable(opt);
            setInput();
        },

        selectTable: function (opt) {
            var tblId = $(this).attr("id");
            var yxData = opt.yxData;
            var data = opt.data;
            var ls = opt.ls ? opt.ls : 4;
            var width = 100 / ls;
            width = width + "%";
            var resetTable = function () {
                var hs = parseInt((data.length - 1) / ls) + 1;
                $("#" + tblId + " tr").remove();
                for (var i = 0; i < hs; i++) {
                    var str = "<tr>";
                    for (var j = 0; j < ls; j++) {
                        var s = "&ensp;";
                        var d = data[i * ls + j];
                        if (d) {
                            s = "<label><input type='checkbox' id='" + tblId + "_ck_" + d.id + "' />" + d.mc + "</label>";
                        }
                        str += "<td style='width:" + width + "'>" + s + "</td>";
                    }
                    str += "</tr>";
                    $("#" + tblId).append(str);
                }
            };

            var setCheck = function () {
                for (var m = 0; m < yxData.length; m++) {
                    var e = yxData[m];
                    var ck = $("#" + tblId + "_ck_" + e.id);
                    if (ck) {
                        ck.prop("checked", true);
                    }
                }

                $('#' + tblId + ' input').each(function (i) {
                    $(this).click(function () {
                        if ($(this).is(":checked")) {
                            addXzData(data[i]);
                        }else{
                            delXzData(data[i]);
                        }
                    });
                });
            };
            
            var addXzData = function(d){
                yxData.push(d);
            };
            var delXzData = function(d){
                var index = -1;
                for (var m = 0; m < yxData.length; m++) {
                    var e = yxData[m];
                    if (e.id === d.id) {
                        index = m;
                        break;
                    }
                }
                yxData.splice(index,1);
            };
            
            resetTable(opt);
            setCheck();
        }
    });
})(jQuery);