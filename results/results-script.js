// getting values from localStorage
var nameValue = localStorage.getItem('nameValue');
var t1Total = parseFloat(localStorage.getItem('t1Total'));
var t2Total = parseFloat(localStorage.getItem('t2Total'));
var t3Total = parseFloat(localStorage.getItem('t3Total'));
var t4Total = parseFloat(localStorage.getItem('t4Total'));
var t5Total = parseFloat(localStorage.getItem('t5Total'));

var quizTotal = t1Total + t2Total + t3Total + t4Total + t5Total;    
var rankingPercent = quizTotal/25 * 100;

// DOM Manipulation part
var score = document.getElementById('score');
var individualScoring = document.getElementById('individualScoring');
score.innerHTML += "<span>" + quizTotal + "</span>/25";
individualScoring.innerHTML = 
" 💻 Computer Science: " + t1Total + " || " +
" 🧪 Chemistry: " + t2Total + " || " +
" ➰ Physics: " + t3Total + " || " +
" ➗ Math: " + t4Total + " || " +
" 🧬📕〽 Random Subjects: " + t5Total;

var rankingContent = document.getElementById('rankingContent');

rankingContent.innerHTML = nameValue + ", you scored higher than <b><span>" + rankingPercent + "%</span></b> of students who answered this quiz!"; 

if(rankingPercent > 80){
rankingContent.innerHTML += "<br><br> You have scored <span><b>ABOVE AVERAGE</b></span>!<br>You must have studied well this school year. I absolutely adore you, and keep it up!"
}
else if(rankingPercent > 60){
rankingContent.innerHTML += "<br><br> You have scored <span><b>AVERAGE</b></span>!<br>Clearly exerted some effort this school year, but there's some room for improvement."
}
else if(rankingPercent > 40){
rankingContent.innerHTML += "<br><br> You have scored <span><b>BELOW AVERAGE</b></span>!<br>Try to clarify some concepts that are still vague for you."   
}
else if(rankingPercent > 20){
rankingContent.innerHTML += "<br><br> You have scored a <span><b>FAIL</b></span>!<br>Don't worry, this isn't the end for you yet. Try to restudy the things you have forgotten and you will definitely improve."  
}
else{
rankingContent.innerHTML += "<br><br> You have scored a <span><b>MAJOR FAIL</b></span>!<br>Please, please study your learning guides again and re-read your notes so you can follow the lessons next school year."     
}

// this function clears the data of the previous user to give the next user a smoother experience
function clearLocalStorage(){
    localStorage.clear();
}