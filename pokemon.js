const baseURL = "https://pokeapi.co/api/v2/pokemon/";
const pokemon = document.getElementById("pokemon-input");
const buttonSearch = document.getElementById("search-btn");
const appNode = document.getElementById("pokemon-container");

buttonSearch.addEventListener("click", insertPokemon);
buttonSearch.addEventListener("touchstar", insertPokemon);

function insertPokemon() {
  window
    .fetch(`${baseURL}${pokemon.value.toLowerCase()}`)
    .then((Response) => {
      if (Response.status === 404) {
        alert("This Pokemon is not available");
      } else {
        return Response.json();
      }
    })
    .then((ResponseJSON) => {
      const allItems = [];

      console.log(ResponseJSON.name);
      //*Crear imagen del pokemon*//

      const pokemonName = document.createElement("h3");
      pokemonName.innerText = "Name: " + ResponseJSON.name;

      const pokemonWeight = document.createElement("h3");
      pokemonWeight.innerText = "Weight: " + ResponseJSON.weight + "lb";

      const pokemonID = document.createElement("h3");
      pokemonID.innerText = "ID: " + ResponseJSON.id;

      const pokemonImage = document.createElement("img");
      pokemonImage.className = "pokemon-img";
      pokemonImage.src = ResponseJSON.sprites.front_default;

      const tipos = document.createElement("div");
      tipos.className = "pokemons-tipos";
      ResponseJSON.types.forEach(e => {
        const pokemonType = document.createElement("h3");
        pokemonType.innerText = "Type: " + e.type.name;
        tipos.append(pokemonType);
      });

      const container = document.createElement("div");
      container.className = "pokemon-characters";
      container.append(pokemonImage, pokemonName, pokemonWeight, tipos, pokemonID);

      allItems.push(container);

      appNode.append(...allItems);
    });
}
