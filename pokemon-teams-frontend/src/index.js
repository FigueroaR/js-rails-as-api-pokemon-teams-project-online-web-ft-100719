document.addEventListener("DOMContentLoaded", () => {
    showTeams();
    showPokemon();
    deletePokemon();
    //addPokemon();
})
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function showTeams(){
    fetch(TRAINERS_URL)
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        let main = document.querySelector("main")
        myJson.forEach(element => {
            main.innerHTML += `
            <div class="card" data-id="${element.id}"> 
            
            <p>${element.name}</p>
            <button type="button">Add Pokemon</button> 
            <ul></ul>
            </div>`
        }); 
        
    })

    
    
}

function showPokemon(){
    fetch(POKEMONS_URL)
    .then((data) => {
        return data.json();
    })
    .then((secondJson) => {
        let teams = document.querySelectorAll(".card")
        
        teams.forEach( card => {
            
            
            const pokemon = secondJson.filter( poke => {
                let pokeVal = poke.trainer_id.toString()
                return pokeVal.match(card.dataset.id) 
        
            })

            pokemon.forEach( thepoke => {
                let ul = document.createElement("ul")
                
                //let newNode = card.appendChild(ul)
                card.querySelector("ul").innerHTML += `<li> ${thepoke.nickname} (${thepoke.species})  <button type="button" class="release"> Release </button></li>`
            })
            
        });
    });
};



function deletePokemon() {

     fetch(POKEMONS_URL)
     .then((data) => {
         return data.json();
     })
    .then((secondJson) => {
        let deletes = document.querySelectorAll("button.release")
        deletes.forEach( press => {
                press.addEventListener("click", function(e){
                    e.currentTarget.parentElement.remove()
                })
        });
    })
}


// function addPokemon(){

//     // pokemon = {
//     //     "id":147,
//     //     "nickname":"Gunnar",
//     //     "species":"Weepinbell",
//     //     "trainer_id":1
//     // 

//     buttons.addEventListener( "click", () => {
//         fetch(POKEMONS_URL , {
//             method: "POST",
//             body: JSON.stringify(pokemon),
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//         }})
// }