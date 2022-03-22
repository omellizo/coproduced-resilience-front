function loadData() {
  var participant = JSON.parse(sessionStorage.getItem("participant"));
  console.log(participant);

  if (participant != null) {
    $("#thanks-message").html("Thanks " + participant.fullName);
    sessionStorage.setItem("participant", null);
    sessionStorage.setItem("simulationNumber", null);
  }
}

loadData();

function playAgain() {
  window.location.href = "/";
}