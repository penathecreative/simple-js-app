const description = (e) =>
  e.height > 9
    ? " - Wow! That's big!"
    : e.height >= 0.5 && e.height <= 9
    ? " - Average size Pokemon "
    : " - Small Pokemon ";
let pokemonRepository = (function () {
    let e = [],
      t = $("#exampleModal");
    function n(t) {
      "object" == typeof t && null !== t
        ? Object.keys(t).includes("name")
          ? e.push(t)
          : console.error(
              "Invalid Pokemon object. Please provide an object with at least a 'name' property."
            )
        : console.error("Invalid data type. Please provide an object.");
    }
    function o() {
      return e;
    }
    function i(t) {
      if (!(t.length > 0)) return e;
      {
        let n = e.filter((e) => e.name.toLowerCase().includes(t.toLowerCase()));
        return n;
      }
    }
    function l(e) {
      a(e).then(function () {
        r(e);
      });
    }
    function a(e) {
      return fetch(e.detailsUrl)
        .then(function (e) {
          return e.json();
        })
        .then(function (t) {
          (e.imageUrl = t.sprites.front_default),
            (e.height = t.height),
            (e.types = t.types);
        })
        .catch(function (e) {
          console.error(e);
        });
    }
    function r(e) {
      let n = t.find(".modal-title"),
        o = t.find(".modal-body");
      n.text(e.name);
      let i = e.types.map((e) => e.type.name);
      o.html(`
      <p>${description(e)}</p>
      <p>Height: ${e.height}</p>
      <img src="${e.imageUrl}" alt="${e.name} image" class="img-fluid">
    <p>Types: ${i.join(", ")}</p>
    `),
        t.modal("show");
    }
    function s() {
      t.modal("hide");
    }
    return (
      window.addEventListener("keydown", (e) => {
        "Escape" === e.key && t.hasClass("show") && s();
      }),
      t.on("click", (e) => {
        e.target === t[0] && s();
      }),
      document
        .getElementById("searchInput")
        .addEventListener("input", function () {
          let e = document.getElementById("searchInput").value,
            t = i(e);
          t.length > 0
            ? ((document.querySelector(".pokemon-list").innerHTML = ""),
              t.forEach(function (e) {
                pokemonRepository.addListItem(e);
              }))
            : console.log("No Pokemon found matching the search query.");
        }),
      {
        add: n,
        getAll: o,
        findByName: i,
        addListItem: function e(t) {
          let n = document.querySelector(".pokemon-list"),
            o = document.createElement("div");
          o.classList.add(
            "col-12",
            "col-sm-8",
            "col-md-4",
            "col-lg-3",
            "col-xl-2"
          );
          let i = document.createElement("button");
          (i.innerText = t.name),
            i.classList.add(
              "btn",
              "btn-outline-dark",
              "btn-pokemon",
              "btn-lg",
              "m-2",
              "p-3"
            ),
            (function e(t, n) {
              t.addEventListener("click", function () {
                l(n);
              });
            })(i, t),
            o.appendChild(i),
            n.appendChild(o);
        },
        loadList: function e() {
          return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
            .then(function (e) {
              return e.json();
            })
            .then(function (e) {
              e.results.forEach(function (e) {
                let t = { name: e.name, height: e.height, detailsUrl: e.url };
                n(t), console.log(t);
              });
            })
            .catch(function (e) {
              console.error(e);
            });
        },
        loadDetails: a,
        showModal: r,
        hideModal: s,
        showDetails: l,
      }
    );
  })(),
  pokemonList = pokemonRepository.getAll();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
});
