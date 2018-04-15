var Random = function() {
    var _data;
    var _db;
    var _currentUser = Cookies.get("UserID");
    var _cookieString;

    function init() {
        _db = Common.getDatabase();
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
        var favoriteDishCookie = _data[0].id;
        _cookieString = favoriteDishCookie.toString();
        var favoriteDishId = Cookies.get(_cookieString);

        $("#randomResult").html(`
            <h1 div id= "randomDescription">Be Inspired With a Random Recipe Below to Put Your Cooking Skills to The Test</h1>
            <hr>
        `);
        if (favoriteDishId == _data[0].id) {
            $("#randomResult").append(`
            <div id="favoriteButton">
                <button class="btn btn-danger" id="unfavDishButton" data-dishid="${_data[0].id}" data-dishtitle="${_data[0].title}"><i class="fas fa-heart"></i>Favorite</button>
            </div> 
            `);
        } else {
            $("#randomResult").append(`
                <div id="favoriteButton">
                    <button class="btn btn-danger" id="favDishButton" data-dishid="${_data[0].id}" data-dishtitle="${_data[0].title}"><i class="fas fa-heart"></i>Add to Favorites</button>
                </div> 
            `);
        }
        $("#randomResult").append(`
            <div>
            <!--TODO: replace all styles with .child()
            -->
                <h2 style="margin-top: 15px;">${_data[0].title}</h2>
                <h3 style="margin-top: 15px;">Ingredients</h3>  
                <div style="margin-top: 15px;" id="extendedIngredients"></div>
                <h3 style="margin-top: 15px;">Instructions</h3>  
                <div style="margin-top: 15px;" id="analyzedInstructions"></div>                      
            </div>
        `);
        for (var i = 0; i < _data[0].extendedIngredients.length; i++) {
            $("#extendedIngredients").append(`
                        <p>${Number.isInteger(_data[0].extendedIngredients[i].amount) ? _data[0].extendedIngredients[i].amount : _data[0].extendedIngredients[i].amount.toFixed(2)} ${_data[0].extendedIngredients[i].unit} ${_data[0].extendedIngredients[i].name}</p>
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
                <img style="position: fixed;" src="${_data[0].image}">
            </div>
        `);

        $("#favDishButton").on("click", addToFavorites);
        $("#unfavDishButton").on("click", removeFromFavorites);
    }

    function addToFavorites() {
        var favoriteDishId = _data[0].id;
        var userID = Cookies.get("UserID");
        Cookies.set(_data[0].id, _data[0].id);

        if (userID) {
            $("#favoriteButton button").remove();
            $("#favoriteButton").append(`
                <button class="btn btn-danger" id="unfavDishButton" data-dishid="${_data[0].id}" data-dishtitle="${_data[0].title}"><i class="fas fa-heart"></i>Favorite</button>
            `);
            _db.ref("/Users/" + userID).child(favoriteDishId).set({
                "dishid": _data[0].id,
                "dishname": _data[0].title
            });
            $("#unfavDishButton").on("click", removeFromFavorites);
        } else {
            Cookies.set("randomdishid", $(this).attr("data-dishid"));
            Cookies.set("randomdishtitle", $(this).attr("data-dishtitle"));
            $("#myModal").modal("toggle");
            console.log("You are not logged in.");
        }
    }

    function removeFromFavorites() {
        _db.ref("/Users/" + _currentUser + "/" + _data[0].id).remove();
        Cookies.remove(_cookieString);
        $("#favoriteButton button").remove();
        $("#favoriteButton").append(`
            <button class="btn btn-danger" id="favDishButton" data-dishid="${_data[0].id}" data-dishtitle="${_data[0].title}"><i class="fas fa-heart"></i>Add to Favorites</button>
        `);
        $("#favDishButton").on("click", addToFavorites);
    }

    return {
        init: init
    };
}();

$(function () {
    Random.init();
});