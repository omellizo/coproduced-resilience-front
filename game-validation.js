var simulationNumber = 0;

function loadData() {
  var participant = JSON.parse(sessionStorage.getItem("participant"));
  simulationNumber = JSON.parse(sessionStorage.getItem("simulationNumber"));
  console.log(participant);
  console.log(simulationNumber);

  $("#participant-name").html(participant.work.workCode + " - " + participant.fullName);
  $("#game-number").html("Simulation: " + simulationNumber);
}

loadData();

function createSimulation() {
  var form = document.getElementById("form-game");
  console.log("createSimulation");
  $('#form-game :input').each(function() {
    $(this).css("border-color", "#ccc");
  });
  if (!form.checkValidity()) {
    console.log("checkValidity");
    $('#form-game :input:visible[required="required"]').each(function() {
      console.log(this);
      if (!this.validity.valid) {
        $(this).css("border-color", "#800000");
      }
    });
  }else{

    var participant = JSON.parse(sessionStorage.getItem("participant"));
    simulationNumber = JSON.parse(sessionStorage.getItem("simulationNumber"));
    
    var socialAssets = $('#socialAssets').val();
    var technicalAssets = $('#technicalAssets').val();
    var summa = parseFloat(socialAssets) + parseFloat(technicalAssets);
    console.log("summa " + summa);
    if(summa != 6){
      $('#form-game :input:visible[required="required"]').each(function() {
        console.log(this);
        $(this).css("border-color", "#800000");
      });
      return;
    }

    var jsonData = {
      "idParticipant": participant.id,
      "idWork": participant.work.id,
      "simulationNumber": simulationNumber,
      "socialResilience": $('#socialAssets').val(),
      "infraestructureResilience": $('#technicalAssets').val()
    };
    console.log(jsonData)

    $.ajax({
      type: "POST",
      url: "https://dv9jhm3bud.execute-api.us-east-1.amazonaws.com/dev/coproduced-resilience/simulation",
      //url: "http://localhost:5000/coproduced-resilience/simulation",
      dataType: "json",
      contentType: 'application/json',
      data: JSON.stringify(jsonData),
      success: function (data) {
        console.log("Post successfully created!")
        var respon = JSON.stringify(data);
        console.log("Response " + respon);
        console.log("Result " + data.resultDescription);
        console.log("simulationNumber " + simulationNumber);

        var imagesPath = '../assets/brand/Slide1.PNG'
        if(simulationNumber == 1 || simulationNumber == 5 || simulationNumber == 9){
          imagesPath = '../assets/brand/Slide1.PNG'
        } else if(simulationNumber == 2 || simulationNumber == 6 || simulationNumber == 10){
          imagesPath = '../assets/brand/Slide2.PNG'
        } else if(simulationNumber == 3 || simulationNumber == 7 || simulationNumber == 11){
          imagesPath = '../assets/brand/Slide3.PNG'
        } else if(simulationNumber == 4 || simulationNumber == 8){
          imagesPath = '../assets/brand/Slide4.PNG'
        }

        $("#image-result").attr("src",imagesPath);
        $("#modal-result-title").html(data.resultDescription);
        $('#modal-result').modal('show');
        
      },
      error: function (request, status, error) {
        console.log("Errrrrrrrror " + error);
        console.log("Requeeeessss " + request.status);
        console.log("Statuuusssss " + status);
      },
      complete: function () {
        console.log("Stop ");
      }
    });
  } 
}

function closeModal(){
  //alert(data.resultDescription);

  if(simulationNumber == 11){
    window.location.href = "thanks.html";
  }

  $('#modal-result').modal('hide');
  $('#modal-play-again').modal('show');

  
}

function playAgain(){
  
  $('#modal-play-again').modal('hide');

  simulationNumber = simulationNumber + 1;
  sessionStorage.setItem("simulationNumber", simulationNumber)
  $("#game-number").html("Simulation: " + simulationNumber);
  $('#socialAssets').val("");
  $('#technicalAssets').val("");
  
}

function finishGame(){
  $('#modal-play-again').modal('hide');
  window.location.href = "thanks.html";
}