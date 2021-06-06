// API_KEY: HZOkJvglLARzHsXWm755Q

function navCLicked(event) {
    // Handles user clicks on a nav bar button
  event.preventDefault();
  var targetId = event.target.getAttribute("id");
  switch (targetId){
    case "travel-estimates":
    displayNoneAll();
    $("#travel-estimates-page").removeClass("d-none");
    break;
    case "shipping":
    displayNoneAll();

    break;
    case "global-carbon-emitions":
    displayNoneAll();

    break;
    case "climate-change":
    displayNoneAll();

    break;
    case "about-us":
    displayNoneAll();

    break;
  }
}

function displayNoneAll() {
  $("#landing-page").addClass("d-none");
  $("#travel-estimates-page").addClass("d-none");
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

  $("#nav").on("click", navCLicked);

  

