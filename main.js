const pokemonEl = document.getElementById("pokemon-list")
const navbarEl = document.getElementById("nav-bar") 

const pokemonPage = {default: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=3", next: "", previous: ""}

function navbar() {
  const buttonPreview = document.createElement("button")
  buttonPreview.textContent = "↩️"
  const buttonHome = document.createElement("button")
  buttonHome.textContent = "Pokedex"
  const buttonNext = document.createElement("button")
  buttonNext.textContent = "↪️" 

  buttonPreview.addEventListener("click", () => {
    loadPage(pokemonPage.previous)
  })

  buttonHome.addEventListener("click", () => {
  loadPage(pokemonPage.default)
  })
  
  buttonNext.addEventListener("click", () => {
    loadPage(pokemonPage.next)
  })
  

  navbarEl.append(buttonPreview, buttonHome, buttonNext) 
} 

navbar()

async function getAPI(url) {
  const request = await fetch(url)
  const data = request.json()
  return data
}

async function loadPage(url) {
  pokemonEl.innerHTML = ""
  const newData = await getAPI(url)
  console.log(newData)
  pokemonPage.next = newData.next
  console.log(pokemonPage)
  pokemonPage.previous = newData.previous
  const results = newData.results
  console.log(newData)
  for (const data of results) {
    const pokeCard = await pokemonCard(data) 
    pokemonEl.append(pokeCard)
  } 
}
loadPage("https://pokeapi.co/api/v2/pokemon?offset=0&limit=3")

async function pokemonCard(obj) {
  const {name, url} = obj
  const pokemonName = name
  const pokemonTitle = document.createElement("h1") 
  pokemonTitle.textContent = pokemonName
  pokemonEl.append(pokemonTitle)

  const imgContainer = document.createElement("img")
  const currentData = await getAPI(url)
  const pokemonImg = currentData.sprites.front_default
  imgContainer.src = pokemonImg
  
  const cardDiv = document.createElement("div")
  cardDiv.append(pokemonTitle, imgContainer)
  
  return cardDiv
}


