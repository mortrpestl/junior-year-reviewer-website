// this part inputs your previous responses to the form
// i made this incase someone accidentally closes the page / disconnects
document.getElementById("nameId").value = localStorage.getItem('nameValue');
document.getElementById("dateId").value = localStorage.getItem('dateValue');

// this part gets the date today for the user
const dateTodayRaw = new Date();
var month = dateTodayRaw.getMonth() + 1;
var day = dateTodayRaw.getDate();
var year = dateTodayRaw.getFullYear();
if (month < 10) {
    month = "0" + month;
}
if (day < 10) {
    day = "0" + day;
}
var dateToday = year + "-" + month + "-" + day;
document.getElementById("dateId").value = dateToday;

// this part of code validates your code, asks if you're sure you're going to submit, and adds values required to localStorage
function submitFunction() {
    // form validation part
    var inputTags = document.getElementsByTagName("input");
    var dataValidated = true;

    for (i = 0; i < inputTags.length; i++) {
        if (inputTags[i].value == "" || inputTags[i].value == null) {
            inputTags[i].style.border = "2px red solid";
            inputTags[i].style['border-radius'] = "2px";
            inputTags[i].placeholder = "Please answer this section";
            dataValidated = false;
        }

        if (dataValidated) {
            // submit confirmer part
            var confirmVariable = confirm("Are you sure you want to submit and proceed to the quiz?");

            if (confirmVariable) {
                // localStorage adder part
                localStorage.setItem('nameValue', nameId.value);
                localStorage.setItem('dateValue', dateId.value);
                return true;
            }
            else {
                return false;
            }
        }

        else {
            alert("Please answer all of the inputs in the registration part.");
            return false;
        }
    }
}

// this function confirms your "reset" and removes date and name from localStorage
// to be honest, i could've just reloaded the page, but I still did this because I feel that that would be cheating :))
function resetFunction() {
    var inputTags = document.getElementsByTagName("input");
    var resetVariable = confirm("Are you sure you want to reset your input?");

    if (resetVariable) {
        for (i = 0; i < inputTags.length; i++) {
            if(inputTags[i].type == "text"){
                inputTags[i].value = "";
                inputTags[i].style.border = "1px rgb(79, 79, 79) solid";
                inputTags[i].style['border-radius'] = "2px";
                inputTags[i].placeholder = "Your name here";
            }
        }
        localStorage.setItem('nameValue', "");
        localStorage.setItem('dateValue', "");

        return false;
    }
    else {
        return false;
    }
}

// this function triggers when an input has been detected in the text box.
// it's to remove the red lines and the placeholder when the user already has input
function textFormatRestoreFunction(input) {
    input.style.border = "1px rgb(79, 79, 79) solid";
    input.style['border-radius'] = "2px";
    input.placeholder = "";
}

// this function triggers when the user leaves a form without putting anything in it.
// this form does not trigger onload for the looks of the website (red looks horrible).
function textValidationFunction(input) {
    var word = input.value;

    if (word.trim() == "") {
        input.style.border = "2px red solid";
        input.style['border-radius'] = "2px";
        input.value = "";
        input.placeholder = "Please answer this section";
    }
}