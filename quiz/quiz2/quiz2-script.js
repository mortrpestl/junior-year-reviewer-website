// in order to tell the user that a page has missing data output, I put up banners in each page that changes depending when the user has submitted his data at least once, or at least once after he performed a reset on that particular part of the quiz
function submittedCheckerFunction(){
    var t2Submitted = localStorage.getItem('t2Submitted');
    if(t2Submitted == "true"){
        document.getElementById("submittedChecker").innerHTML = 'STATUS: Part 2 Submitted -- you can still change your answers by changing them and resubmitting';
        document.getElementById("submittedChecker").style.color = 'green';
    }
    else{
        document.getElementById("submittedChecker").innerHTML = 'STATUS: Part 2 NOT SUBMITTED -- please submit with the "Submit" button below';
        document.getElementById("submittedChecker").style.color = 'red';
    }
}

// getting items from localStorage
var nameValue = localStorage.getItem('nameValue');

// this function saves your progress upon disconnection
function progressSaverOnunload() {
    var q3List = document.getElementsByName("t2q3_answer");
    var q3Value = "";
        for (i = 0; i < q3List.length; i++){
            if (q3List[i].selected == true){
                q3Value += q3List[i].value + ",";
            }
        }
    q3Value = q3Value.slice(0, q3Value.length - 1);
    
    localStorage.setItem('t2q1Value', document.getElementById("t2q1_answer").value);
    localStorage.setItem('t2q2Value', document.querySelector('input[name="t2q2_answer"]:checked').value);
    localStorage.setItem('t2q3Value', q3Value);
    localStorage.setItem('t2q4Value', document.querySelector('input[name="t2q4_answer"]:checked').value);
    localStorage.setItem('t2q5Value', document.getElementById("t2q5_answer").value);
}

// this function loads your progress upon connection
function progressSaverOnload() {
    var LSq1Value = localStorage.getItem('t2q1Value');
    var LSq2Value = localStorage.getItem('t2q2Value');
    var LSq3Value = localStorage.getItem('t2q3Value');
    var LSq4Value = localStorage.getItem('t2q4Value');
    var LSq5Value = localStorage.getItem('t2q5Value');

    var q2List = document.querySelectorAll('input[name="t2q2_answer"]');
    var q3List = document.getElementsByName('t2q3_answer');
    var q4List = document.querySelectorAll('input[name="t2q4_answer"]');

    var LSq3Value = LSq3Value.split(",");
    var t2q3ValuesArray = [];
    for(i = 0; i < q3List.length; i++){
        t2q3ValuesArray.push(q3List[i].value);
    }
    
    console.log(t2q3ValuesArray);

    // setting the defaults for the user using his past data
    document.getElementById("t2q1_answer").value = LSq1Value;
    for (i = 0; i < q2List.length; i++) {
        if (q2List[i].value == LSq2Value) {
            q2List[i].checked = true;
        }
    }
    
    for (i = 0; i < q3List.length; i++) {
        var j = i.toString();
        var q3Checker = LSq3Value.indexOf(t2q3ValuesArray[i]);

        if (q3Checker != "-1") {
            q3List[i].selected = true;
        }
    }

    for (i = 0; i < q4List.length; i++) {
        if (q4List[i].value == LSq4Value) {
            q4List[i].checked = true;
        }
    }

    document.getElementById("t2q5_answer").value = LSq5Value;
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

    for (i = 0; i < selectTags.length; i++) {
        if(selectTags[i].selected){
            dataValidated = false;
        }
    }

    if (dataValidated) {
        // evaluation part
        // triggered only when all of the data is valid

        // evaluation part: part 1 -- variable collector
        var t2Total = 0;

        var q1Value = document.getElementById("t2q1_answer").value;
        var q1Value = q1Value.trim();

        var q2Value = document.querySelector('input[name="t2q2_answer"]:checked').value;

        var q3List = document.getElementsByName("t2q3_answer");

        var q4Value = document.querySelector('input[name="t2q4_answer"]:checked').value;

        var q5Value = document.getElementById("t2q5_answer").value;
        var q5Value = q5Value.trim();

        // evaluation part: part 2 -- answer checker
        // this works using if statements, and seeing if the user input matches the correct answer
        if (q1Value == "Lead (IV) Chlorite" || q1Value == "Lead(IV)Chlorite" || q1Value == "Lead (4) Chlorite" || q1Value == "Lead(4)Chlorite") {
            t2Total += 1;
        }
        if (q2Value == "951.2 L") {
            t2Total += 1;
        }

        var q3Value = [];
        var t2q3Total = 0;

        for (i = 0; i < q3List.length; i++){
            if (q3List[i].selected == true){
                q3Value.push(q3List[i].value);
            }
        }

        for (i = 0; i < q3Value.length; i++){
            if(q3Value[i] == "MG: Linear" || q3Value[i] == "EMG: Linear" || q3Value[i] == "H: sp")
            {
            t2q3Total += 0.33;
            }
        }
        if(t2q3Total == "0.99"){
            t2q3Total = 1;
        }
        t2Total += t2q3Total;

        if (q4Value == "Triple Point") {
            t2Total += 1;
        }

        if (q5Value == "Polarity" || q5Value == "polarity" || q5Value == "polar" || q5Value == "Polar") {
            t2Total += 1;
        }

        // confirming if the user wants to submit
        var confirmVariable = confirm(nameValue + ", are you sure you want to finish your attempt for this part of the quiz?")

        if (confirmVariable) {
            localStorage.setItem('t2Total', t2Total);
            localStorage.setItem('t2Submitted', "true");
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
            if (inputTags[i].type == "text") {
                inputTags[i].value = "";
                inputTags[i].style.border = "1px rgb(79, 79, 79) solid";
                inputTags[i].style['border-radius'] = "2px";
                inputTags[i].placeholder = "";
            }
        }

        for (i = 0; i < selectTags.length; i++) {
            selectTags[i].selected = true;
        }

        localStorage.setItem('t2Total', "");
        localStorage.setItem('t2Submitted', "");

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

// this function triggers when the checkbox beside the Periodic Table of Elements is checked
// it is to give easy access to the Periodic Table of Elements in case the person taking the quiz will need it
function poteToggle(){
    var poteContent = document.getElementById("poteContent");
    var poteHeader = document.getElementById("poteHeader");

    poteContent.classList.toggle("novisible");
    poteHeader.classList.toggle("poteCustomize");
}
