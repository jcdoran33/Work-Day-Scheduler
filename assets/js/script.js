
//display today's date at top of scheduler
var todaysDate = moment().format("MMMM Do, YYYY");
$("#currentDay").text("Today is " + todaysDate);

//colorSchedule will color each row - grey in past, green in future, red current hour
function colorSchedule() {
    var currentHour = moment().format("Ha");
    // console.log(currentHour);
    // for loop, compare current hour to hours on schedule, color accoridngly
    for (i = 0; i < 9; i++) {
        // create var to store the current iteration
        var currentCheck = $("#container").children().eq(i).attr("id");
        //convert to integer
        var currentCheckInt = parseInt(currentCheck);
        var currentHourInt = parseInt(currentHour);
        // added this so that we can do comparisons in H or military time format
        if (currentCheckInt < 6) {
            currentCheckInt = currentCheckInt + 12;
        };
        //highlight the time block rows based on what time it is - grey = past, green = future, red = current
        if (currentHourInt === currentCheckInt) {
            $("#container").children().eq(i).css("background-color", "red")
        } else if (currentHourInt > currentCheckInt) {
            $("#container").children().eq(i).css("background-color", "lightgray")
        } else {
            $("#container").children().eq(i).css("background-color", "lightgreen")
        };
    }
};

//loadSavedEvents function definition - load any saved events from local storage into the appropriate rows
function loadSavedEvents() {
    console.log("Function loadSavedEvents has been launched!")
    //iterate loop - for each row, check if there is a matching key value pair in storage, if so load it to textarea
    for (i = 0; i < 9; i++) {
        //variable creation
        var timeBlock = $("#container").children().eq(i).attr("id");
        //querying from local storage, then pushing that content to the appropriate textarea
        var storedText = localStorage.getItem(timeBlock);
        // target the i'th row and the 2nd (or [1]) column (which is the textarea)
        $("#container").children().eq(i).children().eq(1).text(storedText);
    };
};

// function below to save text area text to local storage, when the save button is clicked
//gets value of text input from textarea - use event 
$(".saveBtn").click(function (event) {
    var hourClicked = $(event.currentTarget).parent().attr("id");
    //now save the content of the textarea with a parent whose ID matches the hourClicked var
    var textValue = $(event.currentTarget).siblings("textarea").val();
    localStorage.setItem(hourClicked, textValue);
    console.log(textValue);
    //display save succes message 
    $(".alert").css("display", "flex");
    $(".alert").css("justify-content", "center");
    $(".alert").css("position", "absolute");
    $(".alert").css("z-index", "999");
    $(".alert").fadeOut(4000);
});

//load saved events upon page loading
$(document).ready(loadSavedEvents());
//initiate the colorSchedule function upon loading of page
$(document).ready(colorSchedule());
// check eery 60 seconds and update colors using colorSchedule function
var colorInterval = setInterval(colorSchedule, 60000);

