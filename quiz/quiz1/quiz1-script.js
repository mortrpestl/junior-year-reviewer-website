// in order to tell the user that a page has missing data output, I put up banners in each page that changes depending when the user has submitted his data at least once, or at least once after he performed a reset on that particular part of the quiz
function submittedCheckerFunction(){
    var t1Submitted = localStorage.getItem('t1Submitted');
    if(t1Submitted == "true"){
        document.getElementById("submittedChecker").innerHTML = 'STATUS: Part 1 Submitted -- you can still change your answers by changing them and resubmitting';
        document.getElementById("submittedChecker").style.color = 'green';
    }
    else{
        document.getElementById("submittedChecker").innerHTML = 'STATUS: Part 1 NOT SUBMITTED -- please submit with the "Submit" button below';
        document.getElementById("submittedChecker").style.color = 'red';
    }
}

// getting items from localStorage
var nameValue = localStorage.getItem('nameValue');

// this function saves your progress upon disconnection
function progressSaverOnunload() {
    var q4List = document.getElementsByName("t1q4_answer");
    var q4Value = "";
        for (i = 0; i < q4List.length; i++) {
            if (q4List[i].checked == true) {
                q4Value += q4List[i].value + ",";
            }
        }
    q4Value = q4Value.slice(0, q4Value.length - 1);

    localStorage.setItem('t1q1Value', document.getElementById("t1q1_answer").value) ;
    localStorage.setItem('t1q2Value', document.querySelector('input[name="t1q2_answer"]:checked').value);
    localStorage.setItem('t1q3Value', document.getElementById("t1q3_answer").value);
    localStorage.setItem('t1q4Value', q4Value);
    localStorage.setItem('t1q5Value', document.querySelector('input[name="t1q5_answer"]:checked').value);
}

// this function loads your progress upon connection
function progressSaverOnload() {
    var LSq1Value = localStorage.getItem('t1q1Value');
    var LSq2Value = localStorage.getItem('t1q2Value');
    var LSq3Value = localStorage.getItem('t1q3Value');
    var LSq4Value = localStorage.getItem('t1q4Value');
    var LSq5Value = localStorage.getItem('t1q5Value');

    var q2List = document.querySelectorAll('input[name="t1q2_answer"]');
    var q4List = document.querySelectorAll('input[name="t1q4_answer"]');

    var q4Checker1 = LSq4Value.indexOf("document.write()");
    var q4Checker2 = LSq4Value.indexOf("alert()");
    var q4Checker3 = LSq4Value.indexOf("console.logs()");
    var q4Checker4 = LSq4Value.indexOf("document.getElementById().InnerHTML");
    var q4CheckerArray = [];
    q4CheckerArray.push(q4Checker1, q4Checker2, q4Checker3, q4Checker4);

    var q5List = document.querySelectorAll('input[name="t1q5_answer"]');

    // something something TK
    document.getElementById("t1q1_answer").value = LSq1Value;
    for (i = 0; i < q2List.length; i++) {
        if (q2List[i].value == LSq2Value) {
            q2List[i].checked = true;
        }
    }
    document.getElementById("t1q3_answer").value = LSq3Value;
    for (i = 0; i < q4CheckerArray.length; i++) {
        if (q4CheckerArray[i] != -1) {
            q4List[i].checked = true;
        }
    }
    for (i = 0; i < q5List.length; i++) {
        if (q5List[i].value == LSq5Value) {
            q5List[i].checked = true;
        }
    }
}

// this function is triggered when the "Submit" button is pressed
// the code validates the input, evaluates the score of the user, and confirms if the user wants to finish his attempt
function submitFunction() {
    // form validation part
    var inputTags = document.getElementsByTagName("input");
    var dataValidated = true;

    for (i = 0; i < inputTags.length - 2; i++) {
        var hiddenRadio = inputTags[i].classList.contains("novisible");

        if (inputTags[i].value == "" || inputTags[i].value == null) {
            inputTags[i].style.border = "2px red solid";
            inputTags[i].style['border-radius'] = "1px";
            inputTags[i].placeholder = "Please answer this section";
            dataValidated = false;
        }

        if ((hiddenRadio == true) && (inputTags[i].checked == true)) {
            dataValidated = false;
        }
    }

    if (dataValidated) {
        // evaluation part
        // triggered only when all of the data is valid

        // evaluation part: part 1 -- variable collector
        var t1Total = 0;

        var q1Value = document.getElementById("t1q1_answer").value;
        var q1Value = q1Value.trim();

        var q2Value = document.querySelector('input[name="t1q2_answer"]:checked').value;

        var q3Value = document.getElementById("t1q3_answer").value;
        var q3Value = q3Value.trim();
        // you're gonna come back to this a LOT, future me (getting the checkbox values)
        var q4List = document.getElementsByName("t1q4_answer");
        var q4Value = "";
        for (i = 0; i < q4List.length; i++) {
            if (q4List[i].checked == true) {
                q4Value += q4List[i].value + ",";
            }
        }
        q4Value = q4Value.slice(0, q4Value.length - 1);
        // end of checkbox value getter
        var q5Value = document.querySelector('input[name="t1q5_answer"]:checked').value;

        // evaluation part: part 2 -- answer checker
        // this works using if statements, and seeing if the user input matches the correct answer
        if (q1Value == "Cascading Style Sheet" || q1Value == "Cascading Style Sheets") {
            t1Total += 1;
        }
        if (q2Value == "Do While Loop") {
            t1Total += 1;
        }

        if (q3Value == "Math()") {
            t1Total += 1;
        }

        // checkbox checker validator -- i spent an hour at this
        var q4Checker1 = q4Value.indexOf("document.write()");
        var q4Checker2 = q4Value.indexOf("alert()");
        var q4Checker3 = q4Value.indexOf("console.logs()");
        var q4Checker4 = q4Value.indexOf("document.getElementById().InnerHTML");
        var q4CheckerArray = [];
        q4CheckerArray.push(q4Checker1, q4Checker2, q4Checker3, q4Checker4)
        var q4ValueNew = 0;
        if (q4CheckerArray[0] != -1) {
            q4ValueNew += 0.5;
        }
        if (q4CheckerArray[1] != -1) {
            q4ValueNew += 0.5;
        }
        if (q4CheckerArray[2] != -1) {
            q4ValueNew -= 0.5;
        }
        if (q4CheckerArray[3] != -1) {
            q4ValueNew -= 0.5;
        }
        t1Total += q4ValueNew;

        if (q5Value == "true") {
            t1Total += 1;
        }

        // confirming if the user wants to submit
        var confirmVariable = confirm(nameValue + ", are you sure you want to finish your attempt for this part of the quiz?")

        if (confirmVariable) {
            localStorage.setItem('t1Total', t1Total);
            localStorage.setItem('t1Submitted', "true");

            return true;
        }
        else {
            return false;
        }
    }

    else {
        // this code is executed when at least 1 of the data is INVALID
        alert(nameValue + ", please answer all of the questions in this part of the quiz.");
        return false;
    }


}


// this function is triggered when "reset" is pressed and resets all of the values in the form
// i reset the values manually because a form cannot detect the values of the inputs inside another form

function resetFunction() {
    // this function has a confirm feature as well
    var confirmVariable = confirm(nameValue + ", are you sure you want to reset your answers for this part of the quiz?");
    if (confirmVariable) {
        var inputTags = document.getElementsByTagName("input");

        for (var i = 0; i < inputTags.length; i++) {
            // due to different form input types, i had to use if statements (i couldve used switch statements but i was too inexperienced at that) to only perform a reset for a specific value to avoid JS anomalies
            var hiddenRadio = inputTags[i].classList.contains("novisible");

            if ((inputTags[i].type == "radio")) {
                inputTags[i].checked = false;
            }
            if (hiddenRadio) {
                inputTags[i].checked = true;
            }
            if (inputTags[i].type == "checkbox") {
                inputTags[i].checked = false;
            }
            if (inputTags[i].type == "text") {
                inputTags[i].value = "";
                inputTags[i].style.border = "1px rgb(79, 79, 79) solid";
                inputTags[i].style['border-radius'] = "2px";
                inputTags[i].placeholder = "";
            }
        }

        localStorage.setItem('t1Total', "");
        localStorage.setItem('t1Submitted', "");

        submittedCheckerFunction();
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


