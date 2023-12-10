let pokemonList = [
  { name: "Charmander", type: ["fire"], height: "0.6" },
  { name: "Squirtle", type: ["Water"], height: "0.5" },
  { name: "Bulbasaur", type: ["Grass"], height: "0.7" },
];

for (let i = 0; i < pokemonList.length; i++) {
  //Condition that establishes the heigth from pokemons, using the array pokemonList = i
  document.write(
    pokemonList[i].name +
      " " +
      "(height: " +
      pokemonList[i].height +
      ")" +
      "<br>"
  );
  if (pokemonList[i].height > 1.5) {
    document.write(" - Wow! That's big!");
  } else if (pokemonList[i].height > 0.5 && pokemonList[i].height < 1.5) {
    document.write(
      pokemonList[i].name +
        "  " +
        "(height:" +
        "  " +
        pokemonList[i].height +
        " ) " +
        "Average size Pokemon" +
        "<br>"
    );
  } else {
    document.write(
      pokemonList[i].name +
        "  " +
        "(height:" +
        "  " +
        pokemonList[i].height +
        " ) " +
        "Small Pokemon" +
        "<br>"
    );
  }
}

//Pokemons with the height>0.5, and <1.5 will be considered average size. Height > 1.5 are consider big pokemn.
//The rest will be considered as small
