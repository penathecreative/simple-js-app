const description = (pokemon) => {
  if (pokemon.height > 1.5) {
    return " - Wow! That's big!";
  } else if (pokemon.height >= 0.5 && pokemon.height <= 1.5) {
    return " - Average size Pokemon ";
  } else {
    return " - Small Pokemon ";
  }
};

// IIFE including the functions getAll and add
let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Charmander", type: ["fire"], height: "1.6" },
    { name: "Squirtle", type: ["Water"], height: "0.5" },
    { name: "Bulbasaur", type: ["Grass"], height: "0.2" },
  ];

  function add(pokemon) {
    // Check if the parameter is an object
    if (typeof pokemon === "object" && pokemon !== null) {
      pokemonList.push(pokemon);
    } else {
      console.error("Invalid data type. Please provide an object.");
    }
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
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
