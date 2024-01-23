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
const carregarMais = document.getElementById("botaoCarregarMais");

let offset = 0;
const limit = 12;
const maximoRegistros = 151;

function carregarPokemons (offset, limit) {
  pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
    novoHtml = pokemons.map(converterPokemonParaHtml).join("")

    pokemonLista.innerHTML += novoHtml;
  });
}

carregarPokemons(offset, limit);

carregarMais.addEventListener('click', () => {
  offset += limit;

  const qtdRegistrosProxPagina = offset + limit;

  if (qtdRegistrosProxPagina >= maximoRegistros) {
    const novoLimite = maximoRegistros - offset;
    carregarPokemons(offset, novoLimite);

    carregarMais.parentElement.removeChild(carregarMais);
  } else {
    carregarPokemons(offset, limit);
  }

  
})