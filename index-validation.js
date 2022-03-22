function createParticipant() {
  var form = document.getElementById("form-index");
  
  if (!form.checkValidity()) {
    $('#form-index :input:visible[required="required"]').each(function() {
      if (!this.validity.valid) {
        $(this).css("border-color", "#800000");
      }
    });
  }else{
    var jsonData = {
      "fullName": $('#fullName').val(),
      "workCode": $('#workCode').val()
    };

     $.ajax({
       type: "POST",
       url: "https://dv9jhm3bud.execute-api.us-east-1.amazonaws.com/dev/coproduced-resilience/participant",
      // url: "http://localhost:5000/coproduced-resilience/participant",
       dataType: "json",
       contentType: 'application/json',
       data: JSON.stringify(jsonData),
       success: function (data) {
         console.log("Post successfully created!")
         var json = JSON.stringify(data);
         console.log(json);
         sessionStorage.setItem("participant", json);
         sessionStorage.setItem("simulationNumber", "1");
         window.location.href = "game.html";
       },
       error: function (request, status, error) {
         console.log("Errrrrrrrror " + error);
         console.log("Requeeeessss " + request.message);
         console.log("Statuuusssss " + status);
         alert("There is no work with code " + $('#workCode').val());
       },
       complete: function () {
         console.log("Stop ");
       }
     });
  } 
}