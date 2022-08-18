let canvas;
let SPRITE_PATH_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
let bulbasaur = [];
let Xcor = 50;
let Ycor = 50;
let array = [];
let array2 = [];
let pokedex = [[0, 1, 2],[3, 4, 5], [6, 7, 8]];
let poke = 0;
let Xpoke = [];
let Ypoke = [];
let abilities = [];
let ability = [];
let validate = [];

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
}

function draw() {
    //background(0, 50);
    background(80, 97, 117);
    fill(236, 243, 241);

    //ubicación de los cuadros
    array = [Xcor, Xcor*6, Xcor*11];
    array2 = [Ycor, Ycor*6, Ycor*11];
    for (let index2 = 0; index2 < array2.length; index2++) {
        for (let index = 0; index < array.length; index++) {
            rect(array[index], array2[index2], 220, 220, 28);
        }
        
    }
    
    //ubicación de las imágenes y la información de los pokemon
    if(validate != ""){
        for (let index = 0; index < bulbasaur.length; index++) {
            
            fill(104, 167, 151);
        textSize(24);
        text(bulbasaur[index].name, Xpoke[index], Ypoke[index]);
        image(bulbasaur[index].pImage, Xpoke[index], Ypoke[index], 130, 130);
        }
        
    }

    fill(236, 243, 241);

    if (ability != "") {
        for (let index = 0; index < ability.length; index++) {
            text(ability[index], 950, (300 + (index*50)));
        }
    }
    
    newCursor();
}

function mouseClicked(){
    getPokemonList(mouseX, mouseY);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor() {
    noStroke();
    fill(0);
    ellipse(pmouseX, pmouseY, 10, 10);
}

async function getPokemonList(mx, my){
    
    //validación para que el mouse tocara los cuadros
    let contador = 0;
    for (let index = 0; index < array.length; index++) {
        for (let index2 = 0; index2 < array2.length; index2++) {
            
            if (dist(mx, my, (array2[index2]+110), (array[index]+110)) <= 110) {
                poke = pokedex[index][index2];
                
            }
            Xpoke[contador] = array2[index2]+50;
            Ypoke[contador] = array[index]+50;
            contador++;
        }
        
    }

    const POKEAPI_LIST_URL = 'https://pokeapi.co/api/v2/pokemon?limit=9&offset=0'
    const query = await fetch(POKEAPI_LIST_URL);
    const data = await query.json();
    const { results } = data;

    let pokemon = results[poke];
    let pokemons = results;

    //evitar que se impriman datos sin completar la función
    if (validate != "") { 
        getAbilities(pokemon.name);
    }

    for (let index = 0; index < pokemons.length; index++) {
        
        let temporaryArray = pokemons[index].url.split('/');
    
        pokemons[index].sprite =  SPRITE_PATH_URL + temporaryArray[6] + '.png';
   
        loadImage(pokemons[index].sprite, image => {
        pokemons[index].pImage = image;
        console.log(index);
        bulbasaur[index] = pokemons[index];
    });

    validate = bulbasaur
        
    }

    
}

function getAbilities(name){
    fetch("https://pokeapi.co/api/v2/pokemon/"+name)
    .then(response => response.json())
    .then(result => {abilities = result.abilities
    })

    for (let index = 0; index < abilities.length; index++) {
        //ingresamos a la información de la habilidad
        abilities[index] = abilities[index].ability
        //ingresamos al nombre de la habilidad
        abilities[index] = abilities[index].name
    }

    ability = abilities

    console.log(abilities)
}