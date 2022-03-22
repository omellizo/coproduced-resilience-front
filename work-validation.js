function createWork(){
  $.ajax({
    url: "https://dv9jhm3bud.execute-api.us-east-1.amazonaws.com/dev/coproduced-resilience/work",
    //url: "http://localhost:5000/coproduced-resilience/work",
    type: "GET",
    dataType: 'json',
    success: function (result) {
      console.log(result.workCode);
      document.getElementById("new-work-id").innerHTML = result.workCode;
    },
    error: function (error) {
      alert("ERROR " + error);
    }
  })
}