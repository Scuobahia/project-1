<<<<<<< HEAD
f
=======
// API_KEY: HZOkJvglLARzHsXWm755Q

function travelCLicked() {
    // Handles user clicks on travelEstimates, this manages the request and sets the values for the buttons

}

function shipingClicked() {
    // Handles when user clicks on Shipping estimates

}

function globalClicked() {
    // Handles when user clicks on the shipping estimates

}

function travelElectricCar() {
    // When Electric car is selected get 
}

function getVehicleMake() {
  // gets user data from car form and finds the make, then if it can find it calls the getVehicleModel function.
  var userMake = "toyota"; //$("#make").val();
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
  var userModel = "corolla"   //$("#model").val();
  userModel = userModel.trim().toLowerCase().split(" ");
    for (var i = 0; i < userModel.length; i++) {
        userModel[i] = userModel[i].charAt(0).toUpperCase() + userModel[i].substring(1);
    }
    userModel = userModel.join(" ");

    var userYear = "1999"//$("#year").val();
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
  var distanceUnit = "mi" //$("#distance-unit").val();
  var distanceValue = "100" //$("#distance-value").val();
  distanceValue = parseInt(distanceValue.trim());

  $.ajax({
    url: 'https://www.carboninterface.com/api/v1/estimates',
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: {
      type: "vehicle",
      distance_unit: distanceUnit,
      distance_value: distanceValue,
      vehicle_model_id: modelId
    },
    beforeSend: function(xhr) {
         xhr.setRequestHeader("Authorization", "Bearer HZOkJvglLARzHsXWm755Q")
    }, success: function(data){
      //need to make the post requests work first
        console.log(data);
        alert("it worked")
    }, error: function(data) {
      console.log(data);
    }
  });
}

function fetchTravel() {
    //fetches from the API information
    $(document).ready(function() {
      $.ajax({
        url: 'https://www.carboninterface.com/api/v1/estimates',
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: {
          electricity_unit: "kwh",
          electicity_value: 100.0,
          country: "US",
          state: "ut"
        },
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", "Bearer HZOkJvglLARzHsXWm755Q")
        }, success: function(data){
          //need to make the post requests work first
            console.log(data);
            alert("it worked")
        }, error: function(data) {
          console.log(data);
        }
      });
    });
    getVehicleMake();
  }

  fetchTravel();
  
>>>>>>> 860c12b009e0c23793d7ed4020b19e7ef11fd054
