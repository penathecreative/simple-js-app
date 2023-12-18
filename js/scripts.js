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

  return {
    add: add,
    getAll: getAll,
    findByName: findByName,
  };
})();

// Retrieve pokemonList array from IIFE
let pokemonList = pokemonRepository.getAll();

pokemonList.forEach((pokemon) => {
  document.write(
    "<p>" +
      pokemon.name +
      " " +
      "(height: " +
      pokemon.height +
      ")" +
      description(pokemon) +
      "</p>"
  );
});
