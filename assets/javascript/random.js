var Random = function() {
    var _data;

    function init() {
        initEventHandlers();
        showRandomDishData();
    }

    function initEventHandlers() {
    }

    function showRandomDishData() {
        var randomDishesURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random";
        var numberOfDishes = 1;
        $.ajax({
            url: randomDishesURL,
            method: "GET",
            headers: {
                "X-Mashape-Key": "oD0quCJPwGmsh9p2ugkl92457MaKp1SDTMujsn6p1JeIntcBRt"
            },
            data: {
                number: numberOfDishes
            },
            success: function(res, status) {
                _data = res.recipes;
                renderList();
            },
            error: function(error) {
                console.error(error);
            }
        });
    }

    function renderList() {
        $("#randomResult").html(`
            <div>
            
                <h1 div id= "randomDescription">Be Inspired With a Random Recipe Below to Put Your Cooking Skills to The Test</h1>
                <hr>
                <h2><button class="btn btn-danger" id="favDishButton"><i class="fas fa-heart"></i></button>  ${_data[0].title}</h2>
                <h3>Ingredients</h3>  
                <div id="extendedIngredients"></div>
                <h3>Instructions</h3>  
                <div id="analyzedInstructions"></div>                      
            </div>
        `);
        for (var i = 0; i < _data[0].extendedIngredients.length; i++) {
            $("#extendedIngredients").append(`
                        <p>${Number.isInteger(_dishData.extendedIngredients[i].amount) ? _dishData.extendedIngredients[i].amount : _dishData.extendedIngredients[i].amount.toFixed(2)} ${_data[0].extendedIngredients[i].unit} ${_data[0].extendedIngredients[i].name}</p>
                    `);
        }
        if (_data[0].analyzedInstructions.length > 0) {
            for (var j = 0; j < _data[0].analyzedInstructions[0].steps.length; j++) {
                $("#analyzedInstructions").append(`
                            <p>${_data[0].analyzedInstructions[0].steps[j].number}. ${_data[0].analyzedInstructions[0].steps[j].step}</p>
                        `);
            }
        } else {
            $("#analyzedInstructions").append(`
                <p>Sorry, we couldn't find any instructions.</p>
                <p>Try the following link: <a href="${_data[0].sourceUrl}" target="_blank">${_data[0].sourceUrl}</a></p>
            `)
        }

        $("#randomDisplay").append(`
            <div>
                <img src="${_data[0].image}">
            </div>
        `);
    }

    return {
        init: init,
    };
}();

$(function () {
    Random.init();
});