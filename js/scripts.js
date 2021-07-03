var rickmortyRepo = (function() {
    var repository = [];
    var apiUrl = 'https://rickandmortyapi.com/api/character/'

    function loadList() {
        return $.ajax(apiUrl)
            .then (function(response) {
                response.results.forEach(function(item) {
                    var character = {
                        name: item.name,
                        detailsUrl: item.url,
                        image: item.imageElement,
                        gender : item.gender,
                        status : item.status,
                        species : item.species
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
            '<button type="button" class="pop-button" data-toggle="modal" data-target="#pop-modal">' 
             + character.image + character.name + character.gender + character.status + character.species + '</button>'
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
                item.status = response.status;
                item.gender = response.gender;
                item.location = response.location;
                item.episode = response.episode;

            }).catch(function(e) {
                console.error(e);
            });
    } /* features of the item_________________*/

    function showDetails(item) {
        $(document).on('click', '.pop-button', function() {
            var $nameElement = $('<h4>' + item.name + '</h4>');
            var $imageElement = $('<img>');
            var $speciesElement = $('<p>' + item.status+ " - " + item.species + '</p>');
            var $gender = $('<p>' + 'Gender: ' + item.gender + '</p>');
            var $location = $('<p>'+ 'Last seen location: '  + item.location + '</p>');
            var $episode = $('<p>' + 'Number of episodes appeared: ' + (item.episode).length + '</p>');

            $imageElement.attr('src', item.imageUrl);

            $('#character-name').html($nameElement);
            $('#image-element').html($imageElement);
            $('#species-element').html($speciesElement);
            $('#gender').html($gender);
            $('#location').html($location);
            $('#episode').html($episode);
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