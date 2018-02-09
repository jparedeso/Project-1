var Home = function() {
    var _data;

    function init() {
        initEventHandlers();
        getRandomDishData();
    }

    function initEventHandlers() {
    }
    function getRandomDishData() {
        var randomDishesURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random";
        var numberOfDishes = 5;
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
                showRandomDish();
            },
            error: function(error) {
                console.error(error);
            }
        });

    }

    function showRandomDish() {
        _.each(_data, function(recipe) {
            // Adding template string for each random dish result
            $("#myScrollspy").append(`
                <div>
                    <h3>${recipe.title}</h3>
                    <img src="${recipe.image}">
                </div>
            `);
        });
    }

    return {
        init: init
    };
}();

$(function () {
    Home.init();
});


