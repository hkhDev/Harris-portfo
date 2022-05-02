var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  ships: [
    {
      locations: ["00", "00", "00"],
      hits: ["", "", ""],
    },
    { locations: ["00", "00", "00"], hits: ["", "", ""] },
    { locations: ["00", "00", "00"], hits: ["", "", ""] },
  ],
  generateShipLocation: function () {
    var locations;
    for (var i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateship();
        // run the code first
      } while (this.collision(locations));
      // Then determine the condition, if true the loop will continue
      // if the location generated collide with the existing location, generate a new location
      this.ships[i].locations = locations;
      // If false, break the loop and run the above code.
      // if the location generated didn't collide with the existing location, store the location
    }
    console.log(this.ships);
  },
  generateship: function () {
    var direction = Math.floor(Math.random() * 2);
    var row, col;

    if (direction === 1) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
      //Generate in col
    } else {
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
      col = Math.floor(Math.random() * this.boardSize);
      //Generate in row
    }

    var newShipLocations = [];
    for (var i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i));
        // Add "" to conbine them as s string.
      } else {
        newShipLocations.push(row + i + "" + col);
      }
    }
    return newShipLocations;
  },
  collision: function (locations) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      for (var j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  },
  fire: function (guess) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess);
      if (ship.hits[index] === "hit") {
        view.displayMessage("You have already hit the location!");
        return true;
      } else if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");
        if (this.isSunk(ship)) {
          view.displayMessage("You defeated an Ultron!");
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed!");
    return false;
  },
  isSunk: function (ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        //if not all location is hit
        return false;
      }
    }
    return true;
  },
};

var view = {
  displayMessage: function (msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
    // innerHTML = update HTML
  },
  displayHit: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  },
};

var controller = {
  guesses: 0,
  processGuess: function (guess) {
    var location = parseGuess(guess);
    if (location) {
      // null is a falsey value, wont run function
      if (model.numShips <= model.shipsSunk) {
        view.displayMessage("All Ultron are defeated!!!");
      } else {
        this.guesses++;
        var hit = model.fire(location);
        if (hit && model.shipsSunk === model.numShips) {
          view.displayMessage(
            "You defeated all Ultron <br> in " + this.guesses + " guesses."
          );
        }
      }
    }
  },
};

function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

  if (guess === null || guess.length !== 2) {
    alert("Please enter a letter and a number on the board.");
  } else {
    var firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar); // typeof row: string;
    var column = guess.charAt(1); // typeof column: string;
    // console.log(typeof row);
    // console.log(typeof column);

    if (isNaN(row) || isNaN(column)) {
      // check NaN, e.g. "aa"
      alert("That isn't on the board");
    } else if (row < 0 || column < 0 || column >= model.boardSize) {
      alert("That's off the board");
    } else {
      return row + column; // Number + String = String
    }
  }
  return null;
}

function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;

  model.generateShipLocation();
}

function handleFireButton() {
  var guessInput = document.getElementById("guessInput"); // typeof: Object
  var guess = guessInput.value.toUpperCase(); // .value: change the type to String
  controller.processGuess(guess);

  guessInput.value = "";
}

function handleKeyPress(e) {
  var fireButton = document.getElementById("fireButton");
  if (e.keyCode === 13) {
    //13 = Return/ Enter button
    handleFireButton();
    return false; // stop the function from doing any action
  }
}

window.onload = init;

var exitButton = document.querySelector(".exit");
exitButton.onclick = function () {
  window.close();
};
