// API_KEY: HZOkJvglLARzHsXWm755Q
var airports = {};
function navCLicked(event) {
    // Handles user clicks on a nav bar button
  event.preventDefault();
  var targetId = event.target.getAttribute("id");
  console.log(targetId)
  switch (targetId){
    case "title":
      displayNoneAll();
      footerClassChange();
      $("#landing-page").removeClass("d-none");
      $("#footer").addClass("");
      break;
    case "travel-estimates":
      displayNoneAll();
      footerClassChange();
      $("#travel-estimates-page").removeClass("d-none");
      $("#footer").addClass("");
      break;
    case "shipping":
      displayNoneAll();
      footerClassChange();
      $("#shipping-page").removeClass("d-none");
      $("#footer").addClass("");
      break;
    case "global-carbon-emitions":
      displayNoneAll();
      footerClassChange();
      $("#global-carbon-emissions-page").removeClass("d-none");
      $("#footer").addClass("");
      break;
    case "climate-change":
      displayNoneAll();
      footerClassChange();
      $("#climate-change-page").removeClass("d-none");
      $("#footer").addClass("");
      break;
    case "about-us":
      displayNoneAll();
      footerClassChange();
      $("#about-us-page").removeClass("d-none");
      $("#footer").addClass("");
      break;
  }
}

function displayNoneAll() {
  $("#landing-page").addClass("d-none");
  $("#travel-estimates-page").addClass("d-none");
  $("#shipping-page").addClass("d-none");
  $("#global-carbon-emissions-page").addClass("d-none");
  $("#climate-change-page").addClass("d-none");
  $("#about-us-page").addClass("d-none");
}

function footerClassChange() {
  $("#footer").removeClass("");
}

function travelElectricCar() {
    // When Electric car is selected get 
}

function getVehicleMake() {
  // gets user data from car form and finds the make, then if it can find it calls the getVehicleModel function.
  var userMake = "tesla"; //$("#make").val();
  userMake = userMake.trim().toLowerCase().split(" ");
    for (var i = 0; i < userMake.length; i++) {
        userMake[i] = userMake[i].charAt(0).toUpperCase() + userMake[i].substring(1);
    }
    userMake = userMake.join(" ");

  $.ajax({
    url: 'https://www.carboninterface.com/api/v1/vehicle_makes',
    method: "GET",
    contentType: "application/json",
    beforeSend: function(xhr) {
         xhr.setRequestHeader("Authorization", "Bearer HZOkJvglLARzHsXWm755Q")
    }, success: function(data){
        console.log(data);
        var check = false;
        for (var i = 0; i < data.length; i++) {
          if (userMake === data[i].data.attributes.name) {
            var make = data[i].data.id;
            check = true;
            break;
          }
        }
        if (!check) {
          alert("Error Vehicle make not found! Please Try again")
        }
        else {
          getVehicleModel(userMake, make);
        }
    }, error: function(data) {
      console.log(data);
    }
  })
}

function getVehicleModel(make, makeID) {
//Gets the remaining info from the car form to find the model id to get the CO2 emeition information.
  var userModel = "Model s"   //$("#model").val();
  userModel = userModel.trim().toLowerCase().split(" ");
    for (var i = 0; i < userModel.length; i++) {
        userModel[i] = userModel[i].charAt(0).toUpperCase() + userModel[i].substring(1);
    }
    userModel = userModel.join(" ");

    var userYear = "2012"//$("#year").val();
    userYear = userYear.trim();
    userYear = parseInt(userYear);

  $.ajax({
    url: 'https://www.carboninterface.com/api/v1/vehicle_makes/' + makeID + "/vehicle_models",
    method: "GET",
    contentType: "application/json",
    beforeSend: function(xhr) {
         xhr.setRequestHeader("Authorization", "Bearer HZOkJvglLARzHsXWm755Q")
    }, success: function(data){
        console.log(data);
        var check = false;
        for (var i = 0; i < data.length; i++) {
          if (userModel === data[i].data.attributes.name && userYear === data[i].data.attributes.year) {
            var car = data[i].data.id;
            check = true;
            break;
          }
        }
        if (!check) {
          alert("Error Vehicle model or year not found! Please Try again")
        }
        else {
          vehicleEstimateRequest(car);
        }
    }, error: function(data) {
      console.log(data);
    }
  })
}

function vehicleEstimateRequest(modelId) {
  //Posts the request to the API and gets the carbon emitions
  var distanceUnit = "mi" //$("#distance-unit").val();
  var distanceValue = "100" //$("#distance-value").val();
  distanceValue = parseInt(distanceValue.trim());

  fetch("https://www.carboninterface.com/api/v1/estimates", {
    method: "post",
    headers: {
      'Authorization': 'Bearer HZOkJvglLARzHsXWm755Q',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "type": "vehicle",
      "distance_unit": distanceUnit,
      "distance_value": distanceValue,
      "vehicle_model_id": modelId
    }),
  }).then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
}

function electricityEstimateRequest() {
    //fetches electricity estimates from the api based on user data.
  fetch("https://www.carboninterface.com/api/v1/estimates", {
    method: "POST",
    headers: {
      'Authorization': 'Bearer HZOkJvglLARzHsXWm755Q',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "type": "electricity",
      "electricity_unit": "kwh",
      "electricity_value": 100,
      "country": "us",
      "state": "ut",
    }),
  }).then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
}

function flightEstimateRequest() {
  // average flights each day: 285,0000
  fetch("https://www.carboninterface.com/api/v1/estimates", {
    method: "POST",
    headers: {
      'Authorization': 'Bearer HZOkJvglLARzHsXWm755Q',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "type": "flight",
        "passengers": 2,
        "legs": [
          {"departure_airport": "sfo", "destination_airport": "yyz"},
          {"departure_airport": "yyz", "destination_airport": "sfo"}
        ]
    }),
  }).then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
}

function shippingEstimateRequest() {

  fetch("https://www.carboninterface.com/api/v1/estimates", {
    method: "POST",
    headers: {
      'Authorization': 'Bearer HZOkJvglLARzHsXWm755Q',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "type": "shipping",
      "weight_value": 200,
      "weight_unit": "g",
      "distance_value": 2000,
      "distance_unit": "km",
      "transport_method": "truck"
    }),
  }).then((response) => response.json())
  .then((data) => {
    console.log(data);
  });  
}

  $("#header").on("click", navCLicked);

  

