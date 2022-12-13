const formList = document.getElementById('formList')
const form = document.getElementById('form')
const card = document.getElementById('card')

const baseURL = 'https://pokeapi.co/api/v2/pokemon'

let isFetching = false

const fecthingPokemon = async () => {
    const response = await fetch(`${baseURL}?offset=0&limit=8`)
    const dates = await response.json()
    
    return dates
}

const getPokemonHtml = ({id, name, sprites, height, weight, types}) => {
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
    const cardsHTML = pokemonList.map(pokemon => getPokemonHtml(pokemon)).join('')
    formList.innerHTML = cardsHTML
}

const errorMessage = () => {
    formList.innerHTML = `
    <h1>No existe el Pokemón solicitado</h1>
    `
}

const errorNumberMessage = () => {
    formList.innerHTML = `
    <h1>No existe el ID solicitado</h1>
    `
}





const init = () => {
    window.addEventListener('DOMContentLoaded', async () => {
        const {next, results} = await fecthingPokemon()
        console.log(next, 'next', results, 'results')

        const URLS = results.map(pokemon => pokemon.url)

        const infoPokemones = Promise.all(
            URLS.map(async url => {
                const nextPokemon = await fetch(url)
                return await nextPokemon.json()
            })
        )


            console.log(infoPokemones)
        renderPokemonList(infoPokemones)
    })

    formList.addEventListener('submit', renderPokemonList)

}

init()