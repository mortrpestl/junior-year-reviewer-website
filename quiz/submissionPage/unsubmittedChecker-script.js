var nameValue = localStorage.getItem('nameValue');

var t1Submitted = localStorage.getItem('t1Submitted');
var t2Submitted = localStorage.getItem('t2Submitted');
var t3Submitted = localStorage.getItem('t3Submitted');
var t4Submitted = localStorage.getItem('t4Submitted');
var t5Submitted = localStorage.getItem('t5Submitted');
var allowSubmit = true;

if (t1Submitted == "true") {
    document.getElementById("q1content").innerHTML = "STATUS: Submitted";
    document.getElementById("q1content").style.color = "rgb(26, 184, 73)";

}
else {
    document.getElementById("q1content").innerHTML = "STATUS: NOT SUBMITTED, Please submit";
    document.getElementById("q1content").style.color = "rgb(255, 0, 0)";
    allowSubmit = false;
}
if (t2Submitted == "true") {
    document.getElementById("q2content").innerHTML = "STATUS: Submitted";
    document.getElementById("q2content").style.color = "rgb(26, 184, 73)";
}

else {
    document.getElementById("q2content").innerHTML = "STATUS: NOT SUBMITTED, Please submit";
    document.getElementById("q2content").style.color = "rgb(255, 0, 0)";
    allowSubmit = false;
}
if (t3Submitted == "true") {
    document.getElementById("q3content").innerHTML = "STATUS: Submitted";
    document.getElementById("q3content").style.color = "rgb(26, 184, 73)";
}
else {
    document.getElementById("q3content").innerHTML = "STATUS: NOT SUBMITTED, Please submit";
    document.getElementById("q3content").style.color = "rgb(255, 0, 0)";
    allowSubmit = false;
}
if (t4Submitted == "true") {
    document.getElementById("q4content").innerHTML = "STATUS: Submitted";
    document.getElementById("q4content").style.color = "rgb(26, 184, 73)";
}
else {
    document.getElementById("q4content").innerHTML = "STATUS: NOT SUBMITTED, Please submit";
    document.getElementById("q4content").style.color = "rgb(255, 0, 0)";
    allowSubmit = false;
}
if (t5Submitted == "true") {
    document.getElementById("q5content").innerHTML = "STATUS: Submitted";
    document.getElementById("q5content").style.color = "rgb(26, 184, 73)";
}
else {
    document.getElementById("q5content").innerHTML = "STATUS: NOT SUBMITTED, Please submit";
    document.getElementById("q5content").style.color = "rgb(255, 0, 0)";
    allowSubmit = false;
}

function backToQuiz(){
    window.location.href = '../quiz1/quiz1-index.html';
}

function submitFunction(){
    if(allowSubmit == true){
        var confirmVariable = confirm(nameValue + ", are you sure you want to submit the ENTIRE quiz?");

        if(confirmVariable){
            return true;
        }
        else{
            return false;
        }
        
    }
    else{
        alert(nameValue + ", please make sure that you have submitted every quiz. Displayed in the webpage is the status of each quiz, and if there is an 'unsubmitted quiz', please go back to that part and submit it manually.")
        return false;
    }
}