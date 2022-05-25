// var firstHour = $("#9am").children().eq(1).attr("id");
//     console.log(firstHour); 
// var hourBlocks = []
//display today's date at top of scheduler
var todaysDate = moment().format("MMMM Do, YYYY");
$("#currentDay").text("Today is " + todaysDate);

//colorSchedule will color each row - grey in past, green in future, red current hour
function colorSchedule() {
    var currentHour = moment().format("Ha");
    console.log(currentHour);
    // for loop, compare current hour to hours on schedule, color accoridngly
    for (i = 0; i < 9; i++) {
        // create var to store the current iteration
        var currentCheck = $("#container").children().eq(i).attr("id");
        console.log(currentCheck);

        //make it an integer
        var currentCheckInt = parseInt(currentCheck);
            console.log(currentCheckInt);
        var currentHourInt = parseInt(currentHour);
            console.log(currentHourInt);

        // added this so that we can do comparisons in H or military time format
        // alternatively, we could just re-id the blocks in military time in index.html, ie 09-16
        if (currentCheckInt < 6) {
            currentCheckInt = currentCheckInt + 12;
        };

        if (currentHourInt === currentCheckInt) {
            console.log("currentHour: " + currentHour);
            console.log("currentCheck: " + currentCheck);
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
    //iterate loop - for each row, check if there is a matching key value pair in storage, if so load it to textarea. If not, move to next
    for (i=0; i < 9; i++) {
        //variable creation
        var timeBlock = $("#container").children().eq(i).attr("id");
            console.log("Current timeBlock: " + timeBlock);
        //querying from local storage
        var storedText = localStorage.getItem(timeBlock)
        $("#container").children(i).children().eq(1).text(storedText);
            console.log(timeBlock);
            console.log(localStorage.getItem(timeBlock));
    };
};

// function to save text area text to local storage, when the save button is clicked
//get value of text input from textarea - use event key somewhere
//store the parent id of the save button clicked to a var, then use that as a key for localStorage

$(".saveBtn").click(function (event) {
    var hourClicked = $(event.currentTarget).parent().attr("id");
    console.log(event.currentTarget);
    console.log(hourClicked);
    //now save the content of the textarea with a parent whose ID matches the hourClicked var
    var textValue = $(event.currentTarget).siblings("textarea").val();
    localStorage.setItem(hourClicked, textValue);
        console.log(textValue);
    //display save succes message - will have to create an html placeholder for the pop up bootstrap window to come in
    $(".alert").css("display","flex");
    $(".alert").css("justify-content","center");
    $(".alert").css("position","absolute");
    $(".alert").css("z-index","999");
    $(".alert").fadeOut(3500);
});




//load saved events upon page loading
$(document).ready(loadSavedEvents());
//initiate the colorSchedule function upon loading of page
$(document).ready(colorSchedule());
// check eery 60 seconds and update colors using colorSchedule function
var colorInterval = setInterval(colorSchedule, 60000);

