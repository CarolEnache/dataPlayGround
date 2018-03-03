'use strict'


const fetchOption = {
    headers: {
        'Content-Type': 'application/json'
    },
    mode: 'cors'
}

$('form').on('submit', function(e) {
    e.preventDefault();

    let types = $('input[type=text]').val().replace(/\s/g,'');
    types = types.split(',');

    let trainerTypeCalls = types.map( elem => {
        return fetch(`http://pokeapi.salestock.net/api/v2/type/${elem}/`, fetchOption)
    })

    getPromiseData(trainerTypeCalls)
        .then(result => {
            getDoubleDamagePokemon(result)
        })
    
    function getDoubleDamagePokemon(pokemonTypes) {

        pokemonTypes = pokemonTypes
            .map(types => types.damage_relations.double_damage_from)
            

        let mergedPokemonTypes = [].concat.apply([], pokemonTypes);
        console.log(mergedPokemonTypes)
        }
    
    function getPromiseData(promisesArray) {
        return new Promise((resolve, reject) => {
            Promise
                .all(promisesArray)
                .then(res => {
                    return res.map(type => type.json())
                })
                .then(res => {
                    Promise
                        .all(res)
                        .then(resolve)
                })
                .catch(reject);
        })
    }


});








function displayPokemon(pokemon) {
    // loop through and display the pokemon !
    pokemon.forEach(poke => {
        var $container  = $('<div>').addClass('pokemon');
        var $image = $('<img>').attr('src', `http://pokeapi.co/media.img/${poke.id}.png`);
        var $title = $('<h2>').text(poke.name);
        $container.append($image, $title);
        $('.poke-container').append($container);
    });
}