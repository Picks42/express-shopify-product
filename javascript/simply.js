/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
simply.queryString = function () {
    var vars = {};
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        var hash = hashes[i].split('=');
        var obj = {};
        obj.name = decodeURI(hash[0]);
        obj.value = decodeURI(hash[1]);
        vars[obj.name] = obj;
    }
    return vars;
};
simply.formSubmit = function (selector, callback) { //Ajax Submit Form 
    var form = selector;
    if (form.length > 0) {
        var url = form.attr("action");
        var params = {
            type: 'POST',
            url: url,
            data: form.serialize(),
            success: function (line_item) {
                try {
                    var data = JSON.parse(line_item);
                } catch (e) {
                    var data = line_item;
                }
                callback(data);
            },
            error: function (XMLHttpRequest, textStatus) {}
        };
        jQuery.ajax(params);
    }
};
simply.clickEvent = function () {
    $(document).click(function () {
        $(".main_settings_dropdown").hide();
    });
    $(".main_settings").click(function (e) {
        e.stopPropagation();
        $(".main_settings_dropdown").toggle();
    });
};
simply.getMilli = function (s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    if (mins < 0 || hrs < 0) {
        mins = mins * -1;
        hrs = hrs * -1;
        return "-" + hrs + ':' + mins;
    }
    return hrs + ':' + mins;
};

simply.timeDiff = function (start, end, lunch) {
    start = start.split(":");
    end = end.split(":");

    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    if (lunch) {
        startDate = new Date(0, 0, 0, parseInt(start[0]) - 1, start[1], 0);
    }

    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    if (!cn(lunch)) {
        return simply.getMilli(diff);
    }
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0) {
        hours = hours * -1;
        return "-" + (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
    }


    return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
};
simply.dashBoard = function () {
    $(".in_time,.out_time").change(function () {
        var parent = $(this).closest(".user_field");
        var goodDay = $(".goodday_time", parent);
        var start = $(".in_time", parent).val();
        var end = $(".out_time", parent).val();
        var working = simply.timeDiff(start, end); 
        $(".working_time", parent).val(working);
        if (!cn(goodDay.val())) {
            goodDay.trigger("change");
        }
    });
    $(".goodday_time").change(function () {
        var parent = $(this).closest(".user_field");
        var start = $(".working_time", parent).val();
        var end = $(".goodday_time", parent).val();
        var diff = simply.timeDiff(start, end, "lunch");
        $(".diffence_time", parent).val(diff);
    });

};
simply.hoverEvent = function () {};
simply.changeEvent = function () {
    $(".days_check").change(function () {
      var parent = $(this).closest(".checkbox_wrap");
      $(".days_check",parent).prop("checked",false);
      $(this).prop("checked",true);
      $(".real_check",parent).val($(this).val());
    });
    $(".days_input").change(function () {
        var parent = $(this).closest('.user_field');
        if ($(this).is(":checked")) {
            $(".required", parent).prop("required", true);
            $(this).next().val('yes');
        } else {
            $(".required", parent).prop("required", false);
            $(this).next().val('no');
            $(".half_days", parent).next().val("no");
        }
    });
};
simply.submitEvent = function () {
    $(".upload_form").submit(function (e) {
        e.preventDefault();
        var csvName = $("input",this).val().split('\\');
        csvName = csvName[csvName.length - 1];
        var btn = $("button", this);
        btn.text("Uploading");
        $.post("/csv", {csv:csvName}, function (data) {
            for(var i=0;i<data.length;i++){
                var obj = data[i];
                if(obj['Email']){
                    var email = obj['Email'];
                    var work_status = obj['Work Status'];
                    var target = $(".user_field[data-id='"+email+"']");
                    if(work_status == 'A'){
                        $("input[value='absent']",target).click();
                        $(".in_time",target).val("00:00").trigger("change");
                        $(".out_time ",target).val("00:00").trigger("change");
                        $(".goodday_time",target).val("00:00").trigger("change");
                    }
                    else{
                        if(work_status == "H"){
                            $("input[value='half-day']",target).click();
                        }
                        $(".in_time",target).val(obj['In Time']).trigger("change");
                        $(".out_time ",target).val(obj['Out Time']).trigger("change");
                        $(".goodday_time",target).val(obj['Goodday']).trigger("change");

                    }
                }

            }
            btn.text("Upload");
        });

    });
};
simply.init = function () {
    if ($("#dashboard").length > 0) {
        simply.dashBoard();
    }
    simply.clickEvent(); 
    simply.hoverEvent();
    simply.changeEvent();
    simply.submitEvent();
};
$(document).ready(function () {
    simply.init();
});