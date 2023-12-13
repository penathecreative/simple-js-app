const description = (pokemon) => {
  if (pokemon.height > 1.5) {
    return " - Wow! That's big!";
  } else if (pokemon.height >= 0.5 && pokemon.height <= 1.5) {
    return " - Average size Pokemon ";
  } else {
    return " - Small Pokemon ";
  }
};

//Pokemons with the height>0.5, and <1.5 will be considered average size. Height > 1.5 are consider big pokemn.
//The rest will be considered as small

let pokemonList = [
  { name: "Charmander", type: ["fire"], height: "1.6" }, //pokemon objects
  { name: "Squirtle", type: ["Water"], height: "0.5" },
  { name: "Bulbasaur", type: ["Grass"], height: "0.2" },
];
for (let i = 0; i < pokemonList.length; i++) {
  document.write(
    "<p>" +
      pokemonList[i].name +
      " " +
      "(height: " +
      pokemonList[i].height +
      ")" +
      description(pokemonList[i]) +
      "" +
      "<p>"
  );
}

// Condition that establishes the height from pokemons, using the array pokemonList = i
