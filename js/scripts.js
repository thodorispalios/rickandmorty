var rickmortyRepo = (function() {
    var repository = [];
    var apiUrl = 'https://rickandmortyapi.com/api/character/'

    function loadList() {
        return $.ajax(apiUrl)
            .then (function(response) {
                response.results.forEach(function(item) {
                    var character = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                        add(character);
                });
            })
                .catch(function(e) {
                    console.error(e);
                });
    } /* feth and data_____________________________________*/

    function addListItem(character) {
        var $rickmortyLi = $('<li class="list-group-item"></li>');
        var $rickmortyButton = $(
            '<button type="button" class="btn btn-block btn-outline-* pop-button" data-toggle="modal" data-target="#pop-modal">' + character.image
            + character.name + '</button>'
        );
        $rickmortyButton.on('click', function() {
            showDetails(character);
        });
        $('.characters-list').append($rickmortyLi);
        $rickmortyLi.append($rickmortyButton);
    } /* buttons within ul_______________________________ */

    function add(item) {
        repository.push(item);
    }

    function getAll() {
        return repository;
    }

    function loadDetails(item) {
        var url = item.detailsUrl;
        return $.ajax(url)
            .then (function(response) {
                item.imageUrl = response.image;
                item.species = response.species;
            }).catch(function(e) {
                console.error(e);
            });
    } /* features of the item_________________*/

    function showDetails(item) {
        $(document).on('click', '.pop-button', function() {
            var $nameElement = $('<h4>' + item.name + '</h4>');
            var $imageElement = $('<img>');
            var $speciesElement = $('<p>' + item.species + '</p>');

            $imageElement.attr('src', item.imageUrl);

            $('#character-name').html($nameElement);
            $('#image-element').html($imageElement);
            $('#species-element').html($speciesElement);
        });
    }  /* show modal container______________________ */

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails:loadDetails
    };
})(); /* IIFE ends here */

var getAllCharacters = rickmortyRepo.getAll();

rickmortyRepo.loadList().then(function() {
    getAllCharacters.forEach(function (character){
        rickmortyRepo.addListItem (character);
        rickmortyRepo.loadDetails (character);
    });
});