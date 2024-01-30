const description = (pokemon) => {
  if (pokemon.height > 9) {
    return " - Wow! That's big!";
  } else if (pokemon.height >= 0.5 && pokemon.height <= 9) {
    return " - Average size Pokemon ";
  } else {
    return " - Small Pokemon ";
  }
};

// IIFE including the functions getAll, add, and findByName
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = $("#exampleModal"); // Use Bootstrap modal ID

  // Specify the expected keys for the Pokemon object
  const expectedKeys = ["name", "types", "height"];

  function add(pokemon) {
    // Check if the parameter is an object
    if (typeof pokemon === "object" && pokemon !== null) {
      // Check if it has at least a name property
      if (Object.keys(pokemon).includes("name")) {
        pokemonList.push(pokemon);
      } else {
        console.error(
          "Invalid Pokemon object. Please provide an object with at least a 'name' property."
        );
      }
    } else {
      console.error("Invalid data type. Please provide an object.");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function findByName(name) {
    // Check if the search query is not empty
    if (name.length > 0) {
      // Filter the pokemonList based on the partial match
      const searchResults = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())
      );

      // Return the filtered results
      return searchResults;
    } else {
      // If the search query is empty, return the entire pokemonList
      return pokemonList;
    }
  }

  // Show Details Function
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
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
    let listpokemon = document.createElement("div");
    listpokemon.classList.add(
      "col-12",
      "col-sm-8",
      "col-md-4",
      "col-lg-3",
      "col-xl-2"
    );

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add(
      "btn",
      "btn-outline-dark",
      "btn-pokemon",
      "btn-lg",
      "m-2",
      "p-3"
    );

    // Event Listener linked with the showDetails function
    addEventListenerToButton(button, pokemon);

    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }

  //Get data from the api URL
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            height: item.height,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // GET the Pokémon details using the URL from the Pokémon object in the parameter
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Function to show modal with Pokemon details
  function showModal(pokemon) {
    let modalTitle = modalContainer.find(".modal-title");
    let modalBody = modalContainer.find(".modal-body");

    modalTitle.text(pokemon.name);
    //Map Function to get the types in a string
    const types = pokemon.types.map((type) => type.type.name);

    modalBody.html(`
      <p>${description(pokemon)}</p>
      <p>Height: ${pokemon.height}</p>
      <img src="${pokemon.imageUrl}" alt="${
      pokemon.name
    } image" class="img-fluid">
    <p>Types: ${types.join(", ")}</p>
    `);

    modalContainer.modal("show");
  }

  //Funtion that will hide pokemon details, once clicked out
  function hideModal() {
    modalContainer.modal("hide");
  }

  // Event listener for keyboard (Escape key)
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.hasClass("show")) {
      hideModal();
    }
  });

  // Event listener for clicking outside the modal
  modalContainer.on("click", (e) => {
    let target = e.target;
    if (target === modalContainer[0]) {
      hideModal();
    }
  });

  // Event listener for the search form
  document
    .getElementById("searchForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      // Get the search query from the input field
      const searchQuery = document.getElementById("searchInput").value;

      // Perform the live search with partial matching using the modified findByName function
      const searchResults = findByName(searchQuery);

      // Display the search results, than can be updated to this part based on the UI logic
      if (searchResults.length > 0) {
        // Clear existing Pokemon list
        clearPokemonList();

        // Add each Pokemon from the search results
        searchResults.forEach(function (pokemon) {
          pokemonRepository.addListItem(pokemon);
        });
      } else {
        // If no results, display a message or handle it accordingly
        console.log("No Pokemon found matching the search query.");
      }
    });

  // Function to clear existing Pokemon list
  function clearPokemonList() {
    let pokemonListElement = document.querySelector(".pokemon-list");
    pokemonListElement.innerHTML = ""; // Clear the content of the list
  }

  return {
    add: add,
    getAll: getAll,
    findByName: findByName,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal,
    showDetails: showDetails,
  };
})();

// Retrieve pokemonList array from IIFE
let pokemonList = pokemonRepository.getAll();

// Iterate over the Pokemon list and add each Pokemon as a list item with a button
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
