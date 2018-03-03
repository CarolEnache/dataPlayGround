'use strict'

$('form').on('submit', function(e) {
    e.preventDefault();

    let types = $('input[type=text]').val().replace(/\s/g,'');
    types = types.split(',');
    console.log(types);

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