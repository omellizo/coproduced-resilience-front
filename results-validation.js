// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        console.log("dsadsadsada");
          
      }, false)
    })
})()

function loadData(){
  $.ajax({
    url: "https://dv9jhm3bud.execute-api.us-east-1.amazonaws.com/dev/coproduced-resilience/simulation/all",
    //url: "http://localhost:5000/coproduced-resilience/simulation/all",
    type: "GET",
    dataType: 'json',
    success: function (result) {
      var data = JSON.stringify(result);
      
    },
    error: function (error) {
      alert("ERROR " + error);
    }
  })
}

loadData();