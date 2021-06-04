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
        //process the JSON data etc
    }, error: function(data) {
      console.log(data);
    }
  })
}

function getVehicleModel(make, makeID) {
//Gets the remaining info from the car form to find the model id to get the CO2 emeition information.

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
          console.log(car, "It worked")
        }
    }, error: function(data) {
      console.log(data);
    }
  })
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
            console.log(data);
            alert("it worked")
            //process the JSON data etc
        }, error: function(data) {
          console.log(data);
        }
      });
    });
    getVehicleMake();
}

class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = '!<>-_\\/[]{}—=+*^?#________'
      this.update = this.update.bind(this)
    }
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = []
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }
  const phrases = [
    "Earth's,",
    'atmosphere is resilient',
    'to many of the changes',
    'humans have imposed on it...',
    'our atmosphere will survie',
    'but even the most advanced societies',
    'can be more fragile',
    'than the atmosphere'
  ]
  
  const el = document.querySelector('.text')
  const fx = new TextScramble(el)
  
  let counter = 0
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 800)
    })
    counter = (counter + 1) % phrases.length
  }
  
  next()
  fetchTravel();
  
