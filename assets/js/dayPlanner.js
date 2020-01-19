// global variable declarations
var today = $("#dateTime");
// array of schedule objects
var dayPlanner = [];
// assign localStorage data (dayPlanner arrayo of objects) to storedPlanner variable
var storedPlanner = JSON.parse(localStorage.getItem("dayPlanner"));

// display date and time in header (format: Sat, Jan 18, 2020 10:35 PM)
today.text(moment().format('llll'));

// if the data exists in localStorage, assign the data (array) to dayPlanner (array)
if(storedPlanner) {
    dayPlanner = storedPlanner;
}

// build day planner
buildPlanner();

function buildPlanner() {
    //get hour (format: 22 - for 10PM)
    var hour = moment().hour();

    for(var i = 9; i < 18; i++) {
        // create division to show timeblock for each slot
        var timeDiv = $("<div>");
        var dispTime;
        var isAM = i >= 9 && i < 12;

        if(isAM) {  //if it's AM
            dispTime = i + " AM";
        } else if(i === 12) {
            dispTime = i + " PM";
        } else {
            dispTime = (i - 12) + " PM";
        }
        // set the timeblock column classes, attribute, and text
        timeDiv.addClass("col-2 text-center py-2 time-div").attr("data-time", i).css({"font-family": "'Alegreya Sans', sans-serif", "color": "#663e5e"}).text(dispTime);
    
        // create input element for each timelock
        var inputEl = $("<input>");
        var bgColor;
        // set background color of input element depending on timeblock
        if(i < hour) {
            bgColor = "#aeb3b9";
        } else if(i === hour) {
            bgColor = "#e4266a";
        } else {
            bgColor = "#94d8d0";
        }
        // set the input column classes, attributes, and css properties
        inputEl.addClass("col-9 rounded input-el").attr({type: "text", "data-time": i}).css({"font-family": "'Ubuntu', sans-serif", "background-color": bgColor, "height": "inherit"});
    
        // create save button for each timeblock
        var saveImg = $("<img>");
        saveImg.addClass("img-fluid text-left").attr("src","./assets/images/save.png");
        var saveBtn = $("<button>");
        // set the save button classes and attributes, and append the image to it
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