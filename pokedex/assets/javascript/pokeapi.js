const pokeapi = {};

function converterPokeApiParaPokemon (pokeDetalhes) {
  const pokemon = new Pokemon()
  pokemon.nome = pokeDetalhes.name;
  pokemon.numero = pokeDetalhes.order;
  
  const tipos = pokeDetalhes.types.map((typeSlot) => typeSlot.type.name);
  const [tipo] = tipos;

  pokemon.tipos = tipos;
  pokemon.tipo = tipo;
  pokemon.foto = pokeDetalhes.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeapi.getPokemonDetalhes = (pokemon) => {
  return fetch(pokemon.url)
  .then((response) => response.json())
  .then(converterPokeApiParaPokemon)
}

pokeapi.getPokemons = (offset = 0) => {
  const url =
    "https://pokeapi.co/api/v2/pokemon?offset=" +
    offset +
    "&limit=10";

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeapi.getPokemonDetalhes))
    .then((detalhesRequest) => Promise.all(detalhesRequest));
};

