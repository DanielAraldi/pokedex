// Busca os pokemons
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

// Array de pokemons
const generatePokemonPromises = () => Array(150).fill().map((_, index) => fetch(getPokemonUrl(index + 1)).then(response => response.json()))

// Pegando os dados do pokémon e gerando HTML com eles
const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    // Pegando dados do tipo do pokémon com o map
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    accumulator += `
            <li class="card ${elementTypes[0]}">
                <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"/>
                <h2 class="card-title">${id}. ${name}</h2>
                <p class="card-subtitle">${elementTypes.join(' | ')}</p>
            </li>
        `
    return accumulator
}, '')


// Inserindo pokemons da ul
const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

// Armazena os dados dos pokemons
const pokemonPromises = generatePokemonPromises()

// Quando todos os pokemons estiverem sido pegos ai será exibido na tela
Promise.all(pokemonPromises).then(generateHTML).then(insertPokemonsIntoPage)