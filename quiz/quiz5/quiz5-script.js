// in order to tell the user that a page has missing data output, I put up banners in each page that changes depending when the user has submitted his data at least once, or at least once after he performed a reset on that particular part of the quiz
function submittedCheckerFunction(){
    var t5Submitted = localStorage.getItem('t5Submitted');
    if(t5Submitted == "true"){
        document.getElementById("submittedChecker").innerHTML = 'STATUS: Part 5 Submitted -- you can still change your answers by changing them and resubmitting';
        document.getElementById("submittedChecker").style.color = 'green';
    }
    else{
        document.getElementById("submittedChecker").innerHTML = 'STATUS: Part 5 NOT SUBMITTED -- please submit with the "Submit" button below';
        document.getElementById("submittedChecker").style.color = 'red';
    }
}

// getting items from localStorage
var nameValue = localStorage.getItem('nameValue');

// this function saves your progress upon disconnection
function progressSaverOnunload() {
    localStorage.setItem('t5q1Value', document.querySelector('input[name="t5q1_answer"]:checked').value);
    localStorage.setItem('t5q2Value', document.querySelector('input[name="t5q2_answer"]:checked').value);
    localStorage.setItem('t5q3Value', document.querySelector('input[name="t5q3_answer"]:checked').value);
    localStorage.setItem('t5q4Value', document.getElementById("t5q4_answer").value);
    localStorage.setItem('t5q5Value', document.getElementById("t5q5_answer").value);
}

// this function loads your progress upon connection
function progressSaverOnload() {
    var LSq1Value = localStorage.getItem('t5q1Value');
    var LSq2Value = localStorage.getItem('t5q2Value');
    var LSq3Value = localStorage.getItem('t5q3Value');
    var LSq4Value = localStorage.getItem('t5q4Value');
    var LSq5Value = localStorage.getItem('t5q5Value');

    var q1List = document.querySelectorAll('input[name="t5q1_answer"]');
    var q2List = document.querySelectorAll('input[name="t5q2_answer"]');
    var q3List = document.querySelectorAll('input[name="t5q3_answer"]');
    
    // setting the defaults for the user using his past data
    for (i = 0; i < q1List.length; i++) {
        if (q1List[i].value == LSq1Value) {
            q1List[i].checked = true;
        }
    }
    for (i = 0; i < q2List.length; i++) {
        if (q2List[i].value == LSq2Value) {
            q2List[i].checked = true;
        }
    }
    for (i = 0; i < q3List.length; i++) {
        if (q3List[i].value == LSq3Value) {
            q3List[i].checked = true;
        }
    }
    document.getElementById("t5q4_answer").value = LSq4Value;
    document.getElementById("t5q5_answer").value = LSq5Value;
}

// this function is triggered when the "Submit" button is pressed
// the code validates the input, evaluates the score of the user, and confirms if the user wants to finish his attempt
function submitFunction() {
    // form validation part
    var dataValidated = true;
    var inputTags = document.getElementsByTagName("input");
    var selectTags = document.getElementsByName("q3NoInputSelected");

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
        var q1Value = document.querySelector('input[name="t5q1_answer"]:checked').value;
        var q2Value = document.querySelector('input[name="t5q2_answer"]:checked').value;
        var q3Value = document.querySelector('input[name="t5q3_answer"]:checked').value;
        var q4Value = document.getElementById("t5q4_answer").value;
        var q5Value = document.getElementById("t5q5_answer").value;
        q4Value = q4Value.trim();
        q5Value = q5Value.trim();

        t5Total = 0;
        // evaluation part: part 2 -- answer checker
        // this works using if statements, and seeing if the user input matches the correct answer
        if (q1Value == "Gills of a fish and lungs of a human") {
            t5Total += 1;
        }

        if (q2Value == "romantic") {
            t5Total += 1;
        }

        if (q3Value == "Custodining") {
            t5Total += 1;
        }

        if (q4Value == "Franco-Russian Alliance") {
            t5Total += 1;
        }

        if (q5Value == "1/6") {
            t5Total += 1;
        }

        // confirming if the user wants to submit
        var confirmVariable = confirm(nameValue + ", are you sure you want to finish your attempt for this part of the quiz?")

        if (confirmVariable) {
            localStorage.setItem('t5Total', t5Total);
            localStorage.setItem('t5Submitted', "true");
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
        var selectTags = document.getElementsByName("q3NoInputSelected");
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
            if (inputTags[i].type == "text" || inputTags[i].type == "number") {
                inputTags[i].value = "";
                inputTags[i].style.border = "1px rgb(79, 79, 79) solid";
                inputTags[i].style['border-radius'] = "2px";
                inputTags[i].placeholder = "";
            }
        }

        for (i = 0; i < selectTags.length; i++) {
            selectTags[i].selected = true;
        }

        localStorage.setItem('t5Total', "");
        localStorage.setItem('t5Submitted', "");

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

