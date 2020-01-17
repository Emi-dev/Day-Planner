var today = $("#dateTime");
today.text(moment().format('llll'));

// array of schedule objects
var dayPlanner = [];
// assign localStorage data (dayPlanner arrayo of objects) to storedPlanner variable
var storedPlanner = JSON.parse(localStorage.getItem("dayPlanner"));
if(storedPlanner) {
    dayPlanner = storedPlanner;
}

for(var i = 9; i < 19; i++) {
    // create division to show time for each slot
    var timeDiv = $("<div>");
    timeDiv.addClass("col-2 text-center py-2 time-div").attr("data-time", i).text(i + ":00");

    // create input element for each time slot
    var inputEl = $("<input>");
    inputEl.addClass("col-9 rounded input-el").attr({type: "text", "data-time": i});

    // create save button for each time slot
    var saveImg = $("<img>");
    saveImg.addClass("img-fluid text-left").attr("src","./assets/images/save.png");
    var saveBtn = $("<button>");
    saveBtn.addClass("col-1 btn btn-outline-secondary btn-sm rounded p-0").attr({type: "submit", "data-time": i}).append(saveImg);

    // create row to append the columns (time, input, button)
    var row = $("<div>");
    row.addClass("row").attr("data-time", i).append(timeDiv, inputEl, saveBtn);

    // append the rows to the division
    $("#scheduler").append(row);
    
    if(storedPlanner) {    // if localStorage data exists
        inputEl.val(dayPlanner[i - 9].plan);
    } else {    // if localStorage data doesn't exist
        var scheduleObj = {time: i, plan: inputEl.text()};
        dayPlanner.push(scheduleObj);
    }
}

// save button event handler
$("button").on("click", function() {
    // get which slot's save button is clicked
    var dataTime = $(this).attr("data-time");
    // get the value of the input which has the same data-time value as the button clicked
    var inputToSave = $(".input-el[data-time="+dataTime+"]").val();
    // assign/re-assign the input value to the corresponding data in dayPlanner array
    dayPlanner[dataTime - 9].plan = inputToSave;
    // store the updated data into localStorage
    localStorage.setItem("dayPlanner", JSON.stringify(dayPlanner));
});
