var airports = {};
var dataTotal = {};
var dataPerPerson = {};
var flightCount = 0;

function navCLicked(event) {
    // Handles user clicks on a nav bar button
  event.preventDefault();
  var targetId = event.target.getAttribute("id");
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

function getVehicleMake(event) {
  // gets user data from car form and finds the make, then if it can find it calls the getVehicleModel function.
  event.preventDefault();
  $("#results").html("<p class='px-2 mt-2 text-center' fw-bold>Loading your Results <div class='loader pb-2 my-auto mx-auto'</div></p>");
  var userMake = $("#make").val();
  userMake = userMake.trim().toLowerCase().split(" ");
    for (var i = 0; i < userMake.length; i++) {
        userMake[i] = userMake[i].charAt(0).toUpperCase() + userMake[i].substring(1);
    }
    userMake = userMake.join(" ");
    var testUnit = $("#distance-unit").val()
    if (!testUnit) {
      $("#results").html("<p class='text-center px-2 py-3'>You must select a distance unit!</p>");
      return;
    }

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
          $("#results").html("<p class='text-center px-2 py-3'>Vehicle make not found. Please enter a valid vehicle make!</p>");
        }
        else {
          getVehicleModel(userMake, make);
        }
    }, error: function() {
      alert("Their was a network error while trying to get your request. Please try again.");
      $("#results").html(" ");
    }
  })
}

function getVehicleModel(make, makeID) {
//Gets the remaining info from the car form to find the model id to get the CO2 emeition information.
  var userModel = $("#model").val();
  userModel = userModel.trim().toLowerCase().split(" ");
    for (var i = 0; i < userModel.length; i++) {
        userModel[i] = userModel[i].charAt(0).toUpperCase() + userModel[i].substring(1);
    }
    userModel = userModel.join(" ");

    var userYear = $("#year").val();
    userYear = userYear.trim();
    userYear = parseInt(userYear);

  $.ajax({
    url: 'https://www.carboninterface.com/api/v1/vehicle_makes/' + makeID + "/vehicle_models",
    method: "GET",
    contentType: "application/json",
    beforeSend: function(xhr) {
         xhr.setRequestHeader("Authorization", "Bearer HZOkJvglLARzHsXWm755Q")
    }, success: function(data){
        var check = false;
        for (var i = 0; i < data.length; i++) {
          if (userModel === data[i].data.attributes.name && userYear === data[i].data.attributes.year) {
            var car = data[i].data.id;
            check = true;
            break;
          }
        }
        if (!check) {
          $("#results").html("<p class='text-center px-2 py-3'>Vehicle model and/or year not found. Please enter a valid vehicle model and year!</p>");
        }
        else {
          vehicleEstimateRequest(car, make, userModel, userYear);
        }
    }, error: function() {
      alert("Their was a network error while trying to get your request. Please try again.");
      $("#results").html(" ");
    }
  })
}

function vehicleEstimateRequest(modelId, make, model, year) {
  //Posts the request to the API and gets the carbon emitions
  var distanceUnit = $("#distance-unit").val();
  var distanceValue = $("#distance-value").val();
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
    if (distanceUnit === "mi") {
      var unit = "Miles";
    }
    else if(distanceUnit === "km") {
      var unit = "Kilometers";
    }
    var carbonEmitions = data.data.attributes.carbon_lb;
    $("#results")
    .html("<p class='py-2 px-2 text-center'>Your total cabon emitions for your <span class='main-color fw-bold'>" + make + " " + model + " " + year + "</span> after driving <span class='main-color fw-bold'>" + distanceValue + " " + unit + "</span> would be: <span class='main-color fw-bold'>" + carbonEmitions + " Pounds</span> of CO2 released in to the atmosphere. </p>" );
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

function flightFormSubmit(event) {
  event.preventDefault();
  flightCount = 0;
  $("#results").html("<p class='px-2 mt-2 text-center'>Loading your Results <div class='loader pb-2 my-auto mx-auto'</div></p>");

  if ($("#return-trip").is(':checked')) {
    $("#return-trip").attr('value', true);
  }
  else {
    $("#return-trip").attr('value', false);
  }
  var passengers = $("#passengers").val();
  var departureAirport = $("#d-airport-code").val();
  var arivingAirport = $("#a-airport-code").val();
  var returnTrip = $("#return-trip").val();
  var legs = [];

  arivingAirport = arivingAirport.toLowerCase();
  departureAirport = departureAirport.toLowerCase();
  var tempAirport = {
    "departure_airport": departureAirport,
    "destination_airport": arivingAirport
  }
  legs.push(tempAirport);

  if (returnTrip === 'true') {
    tempAirport = {
      "departure_airport": arivingAirport,
      "destination_airport": departureAirport
    };
    legs.push(tempAirport);
  }

  flightEstimateRequest(passengers, legs);
}

function postFlightData() {
  var pounds = dataTotal.data.attributes.carbon_lb;
  var mt = dataTotal.data.attributes.carbon_mt;
  var distance = dataTotal.data.attributes.distance_value;
  var carbonPerPerson = dataPerPerson.data.attributes.carbon_lb;

  $("#results").html("<p class='py-2 px-2 text-center'>Your total cabon emitions for your flight are <span class='main-color fw-bold'>" + pounds + " Pounds or " + mt + " Megatons " + "</span>of CO2 put in to the atmosphere with a total distance traveled of: <span class='main-color fw-bold'>" + distance + " Miles" +"</span>. The carbon emissions per person are:  <span class='main-color fw-bold'>" + carbonPerPerson + " Pounds</span> of CO2 released per person in to the atmosphere durring the flight. </p>" );
}  


function flightEstimateRequest(passengers, legs) {
  // average flights each day: 285,0000
  fetch("https://www.carboninterface.com/api/v1/estimates", {
    method: "POST",
    headers: {
      'Authorization': 'Bearer HZOkJvglLARzHsXWm755Q',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "type": "flight",
        "passengers": passengers,
        "distance_unit": "mi",
        "legs": legs
    }),
  }).then((response) => response.json())
  .then((data) => {
    if (data.message) {
      $("#results").html("<p class='text-center px-2 py-3'>Airport ID not found. Please use the airports 3 letter IATA code.</p>");
      return;
    }
    flightCount++;
    if (flightCount === 1) {
      dataTotal = data;
      flightEstimateRequest(1, legs);
    }
    else if (flightCount === 2) {
      dataPerPerson = data;    
      postFlightData();
      flightCount = 0;
    }
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

//Event Handlers
  $("#header").on("click", navCLicked);
  //Travel Estimates events
  $("#vehicle-btn").on("click", function(event) {
    event.preventDefault();
    $("#vehicle-form").removeClass("d-none");
    $("#flight-form").addClass("d-none");
    $("#img-vehicles").removeClass("d-none");
    $("#img-flight").addClass("d-none");

  });
  $("#flight-btn").on("click", function(event) {
    event.preventDefault();
    $("#vehicle-form").addClass("d-none");
    $("#flight-form").removeClass("d-none");
    $("#img-vehicles").addClass("d-none");
    $("#img-flight").removeClass("d-none");
  });
  $("#vehicle-form").on("submit", getVehicleMake);
  $("#flight-form").on("submit", flightFormSubmit);

  

