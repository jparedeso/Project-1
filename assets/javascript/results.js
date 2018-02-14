var Results = function () {
    var _searchResult;
    var _data;
    var _dishData;
    var _db;
    var _currentUser = Cookies.get("UserID");

    function init() {
        _db = Common.getDatabase();
        initEventHandlers();
        _searchResult = getParameterByName("searchResult");
        getFoodData(_searchResult);
    }

    function initEventHandlers() {
        $("#searchButton").on("click", function (event) {
            event.preventDefault();
            var searchResult = $("#mySearch").val().trim();
            getFoodData(searchResult);
        });
    }

    //region API
    function getFoodData(dish) {
        var dishNameSearchURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete";
        var numberOfDishes = 10;
        $.ajax({
            url    : dishNameSearchURL,
            method : "GET",
            headers: {
                "X-Mashape-Key": "oD0quCJPwGmsh9p2ugkl92457MaKp1SDTMujsn6p1JeIntcBRt"
            },
            data   : {
                number: numberOfDishes,
                query : dish
            },
            success: function (res, status) {
                // todo: show search parameters.
                _data = res;
                renderList();
            },
            error  : function (error) {
                console.error(error);
            }
        });
    }

    //endregion

    function renderList() {
        if (_data.length > 0) {
            $("#dishDisplay").html(`
                <h3>These are your Results. Click on any of them for Recipes:<h3>
            `);
            for (var i = 0; i < _data.length; i++) {
                $("#dishDisplay").append(`
                    <h5 class="btn dishLinks btn btn-default" data-dishID="${_data[i].id}">${_data[i].title}</h5><br> 
                `);
            }
            $(".dishLinks").on("click", function () {
                var dishId = $(this).attr("data-dishID");
                Common.searchDishInstructions(dishId, function (res, status) {
                    _dishData = res;
                    showDishInstructions();
                });
            });
            //storing cookie value in a variable that I can use to return to where the user left off after logging in.
            var selected = getParameterByName("dishid");

            if (selected) {
                $(`[data-dishid=${selected}]`).click();
            }
        } else {
            $("#dishDisplay").append(`
                <h3>There are no Results.</h3>
            `);
        }
    }

    function showDishInstructions() {
        var favoriteDishId = Cookies.get("favoritedishid");
        if (favoriteDishId == _dishData.id) {
            $("#selectionDisplay").html(`
                    <div>                        
                        <div id="favoriteButton">
                            <button class="btn btn-danger" id="unfavDishButton" data-dishid="${_dishData.id}" data-dishtitle="${_dishData.title}"><i class="fas fa-heart"></i>Favorite</button>
                        </div>
                    </div>
            `);
        } else {
            $("#selectionDisplay").html(`
                    <div>                        
                        <div id="favoriteButton">
                            <button class="btn btn-danger" id="favDishButton" data-dishid="${_dishData.id}" data-dishtitle="${_dishData.title}"><i class="fas fa-heart"></i>Add to Favorites</button>
                        </div>
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
            `);
        }
        $("#favDishButton").on("click", addToFavorites);
        $("#unfavDishButton").on("click", removeFromFavorites);
    }

    function addToFavorites() {
        var favoriteDishId = _dishData.id;
        var userID = Cookies.get("UserID");

        Cookies.set("favoritedishid", _dishData.id);

        if (userID) {
            $("#favoriteButton button").remove();
            $("#favoriteButton").append(`
                <button class="btn btn-danger" id="unfavDishButton" data-dishid="${_dishData.id}" data-dishtitle="${_dishData.title}"><i class="fas fa-heart"></i>Favorite</button>
            `);
            _db.ref("/Users/" + userID).child(favoriteDishId).set({
                "dishid"  : _dishData.id,
                "dishname": _dishData.title
            });
            $("#unfavDishButton").on("click", removeFromFavorites);
        } else {
            Cookies.set("redirectUrl", window.location.href + "&dishid=" + $(this).attr("data-dishid"));
            Cookies.set("randomdishid", $(this).attr("data-dishid"));
            Cookies.set("randomdishtitle", $(this).attr("data-dishtitle"));
            $("#myModal").modal("toggle");
            console.log("You are not logged in.");
        }
    }

    function removeFromFavorites() {
        _db.ref("/Users/" + _currentUser + "/" + _dishData.id).remove();
        Cookies.remove("favoritedishid");
        $("#favoriteButton button").remove();
        $("#favoriteButton").append(`
            <button class="btn btn-danger" id="favDishButton" data-dishid="${_dishData.id}" data-dishtitle="${_dishData.title}"><i class="fas fa-heart"></i>Add to Favorites</button>
        `);
        $("#favDishButton").on("click", addToFavorites);
    }

    //region Helpers
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    //endregion

    return {
        init: init
    };
}();

$(function () {
    Results.init();
});