function loadData() {
  var participant = JSON.parse(sessionStorage.getItem("participant"));
  var simulationNumber = JSON.parse(sessionStorage.getItem("simulationNumber"));
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
    var simulationNumber = JSON.parse(sessionStorage.getItem("simulationNumber"));
    
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

        alert(data.resultDescription);

        if(simulationNumber == 11){
          window.location.href = "thanks.html";
        }else{
          let text = "Do you want to play again?";
          if (confirm(text) == true) {
            simulationNumber = simulationNumber + 1;
            sessionStorage.setItem("simulationNumber", simulationNumber)
            $("#game-number").html("Simulation: " + simulationNumber);
            $('#socialAssets').val("");
            $('#technicalAssets').val("");
          } else {
            window.location.href = "thanks.html";
          }
        }
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