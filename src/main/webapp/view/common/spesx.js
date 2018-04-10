(function ($) {
    $.fn.extend({
        setTysxDiv: function (opt) {
            var data = opt.data;
            var ls = opt.ls ? opt.ls : 1;
            var labelWidth = opt.lw? opt.lw:0;
            var labelStyle = "";
            if(labelWidth > 0){
                labelStyle = "style='width:"+labelWidth+"px;'";
            }
            var tysxIndex = 0;
            var that = $(this);
            var resetDiv = function () {
                that.empty();
                var hs = parseInt((data.length - 1) / ls) + 1;
                for (var i = 0; i < hs; i++) {
                    var str = "<div class='form-group'>\n";
                    for (var j = 0; j < ls; j++) {
                        var e = data[i * ls + j];
                        var s = "&ensp;";
                        if (e) {
                            if (!e.value || e.value === null) {
                                e.value = "";
                            }
                            s = "<label "+labelStyle+" for='tysx_inp_" + e.id + "'>" + e.mc + "：</label>\n\
                                <input type='text' id='tysx_inp_" + e.id + "' value='" + e.value + "' />\n";
                        }
                        str += s;
                    }
                    str += "</div>";
                    that.append(str);
                }
                setInputEvent(data);
            };
            var setInputEvent = function (data) {
                var e = data[tysxIndex];
                if (e) {
                    if (e.zdfl && e.zdfl > 0) {
                        getZiDian4FenLei(e.zdfl, function () {
                            $("#tysx_inp_" + e.id).AutoComplete({'data': lb_ziDian4fl, 'afterSelectedHandler': function (json) {
                                    e.value = json.mc;
                                }});
                            tysxIndex++;
                            setInputEvent(data);
                        });
                    } else {
                        tysxIndex++;
                        setInputEvent(data);
                    }
                }
            };
            resetDiv();
        }
    });
})(jQuery);