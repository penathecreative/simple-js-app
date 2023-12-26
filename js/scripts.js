const description = (pokemon) => {
  if (pokemon.height > 1.5) {
    return " - Wow! That's big!";
  } else if (pokemon.height >= 0.5 && pokemon.height <= 1.5) {
    return " - Average size Pokemon ";
  } else {
    return " - Small Pokemon ";
  }
};

// IIFE including the functions getAll, add, and findByName
let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Charmander", type: ["fire"], height: "1.6" },
    { name: "Squirtle", type: ["Water"], height: "0.5" },
    { name: "Bulbasaur", type: ["Grass"], height: "0.2" },
  ];

  // Specify the expected keys for the Pokemon object
  const expectedKeys = ["name", "type", "height"];

  function add(pokemon) {
    // Check if the parameter is an object
    if (typeof pokemon === "object" && pokemon !== null) {
      // Check if all expected keys are present
      const keys = Object.keys(pokemon);
      if (expectedKeys.every((key) => keys.includes(key))) {
        pokemonList.push(pokemon);
      } else {
        console.error(
          "Invalid keys. Please provide an object with keys: " +
            expectedKeys.join(", ")
        );
      }
    } else {
      console.error("Invalid data type. Please provide an object.");
    }
  }

  function getAll() {
    return pokemonList;
  }

  // Public function to find a Pokemon by name
  function findByName(name) {
    return pokemonList.filter(
      (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
    );
  }

  // Add event listener to the button
  function addEventListenerToButton(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  // Funnction that defines the Pokemon button and class
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");

    //Event Listener linked with the show details funtion
    addEventListenerToButton(button, pokemon);
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }

  //Show Details Function that will be usedin a future task
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    findByName: findByName,
    addListItem: addListItem,
  };
})();

// Retrieve pokemonList array from IIFE
let pokemonList = pokemonRepository.getAll();

// Iterate over the Pokemon list and add each Pokemon as a list item with a button
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
