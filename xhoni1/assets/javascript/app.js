$(document).ready(function () {
  
    var trivia = [
      {
        question: "Kush eshte mjeshtri i tharseve?",
        ans: "Marjo",
        option1: "Teknologjia te Shatervani",
        option2: "Teknologjia Gostime",
        option3: "Marjo",
        option4: "Ai te Parku",
        imgTag: "marjo.jpg"
      },
      {
        question: "Kush harxhon me shume energji?",
        ans: "Core i7",
        option1: "Frigoriferi",
        option2: "Furra",
        option3: "Furra",
        option4: "Core i7",
        imgTag: "i7.jpg"
      },
      {
        question: "Sipas Benit Peqini ka internet me shpejtesi?",
        ans: "7 Mb/s",
          option1: "2 Mb/s",
        option2: "4 Mb/s",
        option3: "3276372676 Mb/s",
        option4: "7 Mb/s",
        imgTag: "beni.jpg"
      },
      {
        question: "Sipas Mariglenit menyra me e mire per te ik ne angli eshte?",
        ans: "Me ba sikur eshte gay",
        option1: "Me kamjon te rrota rezerv",
        option2: "Me 12000£",
        option3: "Nga Irlanda",
        option4: "Me ba sikur eshte  gay",
        imgTag: "marigleni.jpg"
      },
      {
        question: "Kush eshte mjeshtri i fibres optike dhe fibres optike?",
        ans: "Roxheni",
        option1: "Komshiu im",
        option2: "Komshiu Roxhenit",
        option3: "Niku internetit",
        option4: "Roxheni",
        imgTag: "roxhi.jpg"
      }
    ];

    //Declare global variables
    var time;
    var clockRunning;
    var count;
    var correct;
    var incorrect;
    var unanswered;
    var intervalId;
    var showText;
    var timeOutId;
    var ansInfo;
    const timeGiven = 15;

    initVars();
    displayStartScreen();

    $("#start").on("click", function () {
      // $(this).hide();
      $("#startScreen").hide();
      $("#ansScreen").hide();
      $("#resultScreen").hide();
      displayTriviaScreen();
    });

    $(".options").on("click", function () {
      if (clockRunning) {
        //stop timer
        stopTimer();
        //check ans
        if ($(this).text().trim() === trivia[count].ans) {
          correct++;
          showText = "Bravo!";
          ansInfo = "Je Talent!"
        }
        else {
          incorrect++
          showText = "Moss!";
          ansInfo = "Pergjigja sakt eshte : <h3>" + trivia[count].ans + "</h3>";
        }
        // displayAnswerScreen for 5 seconds and then move to next question
        displayAnsScreen();
      }
    });

    $("#reset").on("click", function () {
      initVars();
      $("#ansScreen").hide();
      $("#resultsScreen").hide();
      $("#startScreen").hide();
      displayTriviaScreen();
    });

    function displayTriviaScreen() {
      clearTimeout(timeOutId);
      $("#ansScreen").hide();
      $("#question").text(trivia[count].question);
      $("#opt1").text(trivia[count].option1);
      $("#opt2").text(trivia[count].option2);
      $("#opt3").text(trivia[count].option3);
      $("#opt4").text(trivia[count].option4);
      $("#circle").text(timeGiven);
      $("#triviaScreen").show();
      startTimer();
    }

    function displayStartScreen() {
      $("#triviaScreen").hide();
      $("#ansScreen").hide();
      $("#resultsScreen").hide();
      $("#startScreen").show();
    }

    function startTimer() {
      if (!clockRunning) {
        time = timeGiven;
        intervalId = setInterval(showTimeLeft, 1000);
        clockRunning = true;
      }
    }

    function stopTimer() {
      // clear the timer
      clearInterval(intervalId);
      clockRunning = false;
    }

    function showTimeLeft() {
      time--;
      $("#circle").text(time);
      $("#rectangle").text(time);
      if (time <= 0) {
        stopTimer();
        unanswered++;
        showText = "Me shpejt o daj"
        ansInfo = "Kjo eshte pergjigja: <h3>" + trivia[count].ans + "</h3>";
        displayAnsScreen();
      }
    }

    function displayAnsScreen() {
      $("#triviaScreen").hide();
      $("#timeLeft").text(time + " seconds");
      $("#showText").text(showText);
      $("#ansInfo").html(ansInfo);
      $("#ansImg").attr("src", "assets/images/" + trivia[count].imgTag);
      $("#ansScreen").show();


      //Incr ques counter and show next ques or results after 5 sec as valid
      count++;
      if (count < trivia.length) {
        timeOutId = setTimeout(displayTriviaScreen, 5000);
      }
      else {
      //show results screen with stats and reset button
      timeOutId = setTimeout(displayResultsScreen, 5000);
      }
    }

    function displayResultsScreen() {
      clearTimeout(timeOutId);
      $("#triviaScreen").hide();
      $("#ansScreen").hide();
      $("#showStats").text("Rezultati");
      $("#correct").text("   " + correct);
      $("#incorrect").text("   " + incorrect);
      $("#unanswered").text("  " + unanswered);
      $("#resultsScreen").show();
    }

    function initVars(){
    time = 0;
    clockRunning = false;
    count = 0;
    ansIndex = "";
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    intervalId = 0;
    showText = "";
    timeOutId = 0;
    ansInfo = "";
  }

}); //end of document ready
