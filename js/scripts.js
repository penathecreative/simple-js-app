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
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#pokemon-modal");

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

  // Public function to find a Pokemon by name
  function findByName(name) {
    return pokemonList.filter(
      (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
    );
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
      showModal(pokemon);
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
    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    let modalTitle = document.createElement("h2");
    modalTitle.innerText = pokemon.name;

    let modalHeight = document.createElement("p");
    modalHeight.innerText = "Height: " + pokemon.height;

    let modalImage = document.createElement("img");
    modalImage.src = pokemon.imageUrl;
    modalImage.alt = pokemon.name + " image";

    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalHeight);
    modalContent.appendChild(modalImage);

    modalContainer.innerHTML = ""; // Clear existing modal content
    modalContainer.appendChild(modalContent);

    modalContainer.classList.add("is-visible");
  }

  //Funtion that will hide pokemon details,once clicked out
  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  // Event listener for keyboard (Escape key)
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  // Event listener for clicking outside the modal
  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
