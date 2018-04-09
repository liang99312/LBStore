(function ($) {
    $.fn.extend({
        setDetailTable: function (opt) {
            var tblId = $(this).attr("id");
            var yxData = opt.yxData;
            var ls = opt.ls ? opt.ls : 5;
            var width = 90 / ls;
            var unConfirm = opt.unConfirm ? opt.unConfirm : false;
            var type = opt.type ? opt.type : "num";
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
                var bt = "<tr style='background: #e9f7ff;'><td style='width:10%;border: 1px solid #000; text-align: center;'>序号</td>";
                for (var j = 0; j < ls; j++) {
                    bt = bt + "<td style='width:" + width + ";border: 1px solid #000; text-align: center;'>" + (j+1) + "</td>";
                }
                bt = bt + "</tr>";
                $("#" + tblId).append(bt);
                for (var i = 0; i < hs; i++) {
                    var str = "<tr><td style='border: 1px solid #000; text-align: center;'>"+(i+1)+"</td>";
                    for (var j = 0; j < ls; j++) {
                        var s = "&ensp;";
                        if (yxData[i * ls + j]) {
                            s = "<input type='text' style='width:85%;border-left:none;border-top:none;border-right:none;' value='" + yxData[i * ls + j].val + "' />" + "<a href='#' id='" + tblId + "_a_" + i * ls + j + "' style='color:red; float: right; margin-right: 3px;text-decoration: none;'>X</a>";
                        } else {
                            if (!flag) {
                                flag = true;
                                s = "<input type='text' style='width:85%;border-left:none;border-top:none;border-right:none;' value='' />" + "<a href='#' id='" + tblId + "_a_" + i * ls + j + "' style='color:red; float: right; margin-right: 3px;text-decoration: none;'>X</a>";
                            }
                        }
                        str += "<td style='width:" + width + ";border: 1px solid #000;'>" + s + "</td>";
                    }
                    str += "</tr>";
                    $("#" + tblId).append(str);
                }
                if (!flag) {
                    var str = "<tr><td style='border: 1px solid #000; text-align: center;'>"+(hs+1)+"</td>";
                    for (var j = 0; j < ls; j++) {
                        var s = "&ensp;";
                        if (!flag) {
                            flag = true;
                            s = "<input type='text' style='width:85%;border-left:none;border-top:none;border-right:none;' value='' />" + "<a href='#' id='" + tblId + "_a_" + (hs - 1) * ls + j + "' style='color:red; float: right; margin-right: 3px;text-decoration: none;'>X</a>";
                        }
                        str += "<td style='width:" + width + ";border: 1px solid #000;'>" + s + "</td>";
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
                $('#' + tblId + ' input').each(function (i) {
                    $(this).keyup(function (event) {
                        if (event.keyCode === 13) {
                            resetTable(opt);
                            setInput();
                            $("#"+tblId + " input:last").focus();
                        } else {
                            var obj = {id:i,val:"",state:"0"};
                            obj.val = $(this).val();
                            yxData.splice(i,1,obj);
                        }
                    });
                });
            };
            resetTable(opt);
            setInput();
        },

        selectDetailTable: function (opt) {
            var tblId = $(this).attr("id");
            var yxData = opt.yxData;
            var data = opt.data;
            var ls = opt.ls ? opt.ls : 4;
            var width = 100 / ls;
            width = width + "%";
            var resetTable = function () {
                var hs = parseInt((data.length - 1) / ls) + 1;
                $("#" + tblId + " tr").remove();
                var bt = "<tr style='background: #e9f7ff;'><td style='width:10%;border: 1px solid #000; text-align: center;'>序号</td>";
                for (var j = 0; j < ls; j++) {
                    bt = bt + "<td style='width:" + width + ";border: 1px solid #000; text-align: center;'>" + (j+1) + "</td>";
                }
                bt = bt + "</tr>";
                $("#" + tblId).append(bt);
                for (var i = 0; i < hs; i++) {
                    var str = "<tr><td style='border: 1px solid #000; text-align: center;'>"+(i+1)+"</td>";
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
                        } else {
                            delXzData(data[i]);
                        }
                    });
                });
            };

            var addXzData = function (d) {
                yxData.push(d);
            };
            var delXzData = function (d) {
                var index = -1;
                for (var m = 0; m < yxData.length; m++) {
                    var e = yxData[m];
                    if (e.id === d.id) {
                        index = m;
                        break;
                    }
                }
                yxData.splice(index, 1);
            };

            resetTable(opt);
            setCheck();
        }
    });
})(jQuery);