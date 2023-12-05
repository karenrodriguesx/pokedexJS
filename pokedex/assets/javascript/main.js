function converterPokemonParaHtml(pokemon) {
  return `<li class="pokemon ${pokemon.tipo}">
    <span class="numero"># ${pokemon.numero}</span>
    <span class="nome">${pokemon.nome}</span>
    <div class="detalhes">
    <ol class="tipos">
    ${pokemon.tipos.map((tipo) => `<li class="tipo">${tipo}</li>`).join("")}
    </ol>
    <img src="${pokemon.foto}" alt="${pokemon.nome}" class="imagem-pokemon"/>
    </div>
    </li>`;
}

const pokemonLista = document.getElementById("pokemonLista");

pokeapi.getPokemons().then((pokemons = []) => {
  pokemonLista.innerHTML += pokemons.map(converterPokemonParaHtml).join("");
});
