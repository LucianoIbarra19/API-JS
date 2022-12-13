const formList = document.getElementById('formList')
const input = document.getElementById('input')
const card = document.getElementById('card')

const baseURL = 'https://pokeapi.co/api/v2/pokemon/'

const fecthingPokemon = async () => {
    const searchPokemon = baseURL + input.value
    const response = await fetch(`${searchPokemon}`)
    const dates = await response.json()
    
    return dates
}

const getPokemonHtml = (pokemon) => {
    const {name, id, sprites, types, height, weight} = pokemon
    return `
        <div class="poke">
            <img src="${sprites.other.home.front_default}" />
            <h2>${name.toUpperCase()}</h2>
            <span class="exp">EXP: ${pokemon.base_experience}</span>
            <div class="tipo-poke">
                ${types.map((tipo) => {
                    return `<span class="${tipo.type.name} poke__types">${tipo.type.name}</span>`
                }).join('')
            }
            </div>
            <p class="id-poke">#${id}</p>
            <p class="height">height: ${height / 10}m</p>
            <p class="weight">weight: ${weight / 10}kg</p>
        </div>
    `
}

const renderPokemonList = (pokemonList) => {
    card.innerHTML = getPokemonHtml(pokemonList)
}

const errorMessage = () => {
    card.innerHTML = `
    <h1>No existe el Pokemón solicitado</h1>
    `
}

const errorNumberMessage = () => {
    card.innerHTML = `
    <h1>No existe el ID solicitado</h1>
    `
}





function init () {
    formList.addEventListener('submit', async (e) => {
        e.preventDefault()
        const searchValue = input.value
        if (!searchValue) {
            errorMessage()
        } let result = await fecthingPokemon().catch(() => {
            errorNumberMessage(searchValue)
        })

        renderPokemonList(result)
    })
}

init()