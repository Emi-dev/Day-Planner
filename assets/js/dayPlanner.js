var today = $("#dateTime");

today.text(moment().format('llll'));

for(var i = 9; i < 19; i++) {
    var timeEl = $("<div>");
    timeEl.addClass("col-2 text-right my-auto").text(i + ":00");


    var inputEl = $("<input>");
    inputEl.addClass("col-8").attr("type", "text");

    var saveImg = $("<img>");
    saveImg.addClass("img-fluid text-left p-2").attr("src","./assets/images/save_small.png");

    var row = $("<div>");
    row.addClass("row").append(timeEl, inputEl, saveImg);

    $("#scheduler").append(row);
}
