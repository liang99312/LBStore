(function ($) {
    $.fn.extend({
        setTysxDiv: function (opt) {
            var data = opt.data;
            var tysxIndex = 0;
            var resetDiv = function () {
                $(this).empty();
                for (var i = 0; i < data.length; i++) {
                    var e = data[i];
                    if (!e.value || e.value === null) {
                        e.value = "";
                    }
                    var s = "<div class='form-group'><label for='tysx_inp_" + e.id + "'>" + e.mc + "：</label><input type='text' id='tysx_inp_" + e.id + "' value='" + e.value + "' /></div>";
                    $(this).append(s);
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