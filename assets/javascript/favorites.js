var Favorites = function() {
    var _db = Common.getDatabase();
    var _currentUser = Cookies.get("UserID");
    var _dishIdArray = [];
    var _dishNameArray = [];
    var _dishData;
    var _cookieString;
    var _currentUser = Cookies.get("UserID");

    function init() {
        initEventHandlers();
    }
    function initEventHandlers() {
        _db.ref("/Users/" + _currentUser).once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
               _dishIdArray.push(childSnapshot.val().dishid)
               _dishNameArray.push(childSnapshot.val().dishname)
                showFavoriteDishes();
            });
        });
    }

    function showFavoriteDishes() {
        if (_dishIdArray.length > 0) {
            $("#favorites-results").html("");
            for (var i = 0; i < _dishIdArray.length; i++) {
                $("#favorites-results").append(`
                    <div id="${_dishIdArray[i]}">
                        <h5 class="btn dishLinks btn btn-default" data-dishID="${_dishIdArray[i]}">${_dishNameArray[i]}</h5><br>
                    </div>
                `);
            }
            $(".dishLinks").on("click", function () {
                var dishId = $(this).attr("data-dishID");
                Common.searchDishInstructions(dishId, function (res, status) {
                    _dishData = res;
                    showDishInstructions();
                });
            });
        }
    }
    function showDishInstructions() {
        var favoriteDishCookie = _dishData.id;
        _cookieString = favoriteDishCookie.toString();
        var favoriteDishId = Cookies.get(_cookieString);
        if (favoriteDishId == _dishData.id) {
            $("#selectionDisplay").html(`
                        <div id="favoriteButton">
                            <button class="btn btn-danger" id="unfavDishButton" data-dishid="${_dishData.id}" data-dishtitle="${_dishData.title}"><i class="fas fa-heart"></i>Favorite</button>
                        </div>
            `);
        } else {
            $("#selectionDisplay").html(`                   
                        <div id="favoriteButton">
                            <button class="btn btn-danger" id="favDishButton" data-dishid="${_dishData.id}" data-dishtitle="${_dishData.title}"><i class="fas fa-heart"></i>Add to Favorites</button>
                        </div>
            `);
        }
        $("#selectionDisplay").append(`
                    <div>
                        <h2>${_dishData.title}</h2>
                        <img src="${_dishData.image}">
                        <h3>Ingredients</h3>  
                        <div id="extendedIngredients"></div>
                        <h3>Instructions</h3>  
                        <div id="analyzedInstructions"></div>                      
                   </div>
        `);
        for (var i = 0; i < _dishData.extendedIngredients.length; i++) {
            $("#extendedIngredients").append(`
                        <p>${Number.isInteger(_dishData.extendedIngredients[i].amount) ? _dishData.extendedIngredients[i].amount : _dishData.extendedIngredients[i].amount.toFixed(2)} ${_dishData.extendedIngredients[i].unit} ${_dishData.extendedIngredients[i].name}</p>
                    `);
        }
        if (_dishData.analyzedInstructions.length > 0) {
            for (var j = 0; j < _dishData.analyzedInstructions[0].steps.length; j++) {
                $("#analyzedInstructions").append(`
                            <p>${_dishData.analyzedInstructions[0].steps[j].number}. ${_dishData.analyzedInstructions[0].steps[j].step}</p>
                        `);
            }
        } else {
            $("#analyzedInstructions").append(`
                <p>Sorry, we couldn't find any instructions.</p>
                <p>Try the following link: <a href="${_dishData.sourceUrl}" target="_blank">${_dishData.sourceUrl}</a></p>
            `)
        }
        $("#favDishButton").on("click", addToFavorites);
        $("#unfavDishButton").on("click", removeFromFavorites);
    }

    function addToFavorites() {
        var favoriteDishId = _dishData.id;
        var userID = Cookies.get("UserID");

        Cookies.set(_dishData.id, _dishData.id);

        $("#favoriteButton button").remove();
        $("#favoriteButton").append(`
            <button class="btn btn-danger" id="unfavDishButton" data-dishid="${_dishData.id}" data-dishtitle="${_dishData.title}"><i class="fas fa-heart"></i>Favorite</button>
        `);
        _db.ref("/Users/" + userID).child(favoriteDishId).set({
            "dishid"  : _dishData.id,
            "dishname": _dishData.title
        });
        $("#unfavDishButton").on("click", removeFromFavorites);
        showFavoriteDishes();

    }

    function removeFromFavorites() {
        _db.ref("/Users/" + _currentUser + "/" + _dishData.id).remove();
        Cookies.remove(_cookieString);
        $("#favoriteButton button").remove();
        $("#favoriteButton").append(`
            <button class="btn btn-danger" id="favDishButton" data-dishid="${_dishData.id}" data-dishtitle="${_dishData.title}"><i class="fas fa-heart"></i>Add to Favorites</button>
        `);
        $("#favDishButton").on("click", addToFavorites);
        $("#" + _dishData.id).remove();
    }

    return {
        init: init
    };
}();

$(function () {
    Favorites.init();
});