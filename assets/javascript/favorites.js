var Favorites = function() {
    var _db = Common.getDatabase();
    var _currentUser = Cookies.get("UserID");
    var dishIdArray = [];
    var dishNameArray = [];
    var _dishData;
    function init() {
        initEventHandlers();
    }
    function initEventHandlers() {
        _db.ref("/Users/" + _currentUser).once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
               // console.log(childSnapshot.val());
               dishIdArray.push(childSnapshot.val().dishid)
               dishNameArray.push(childSnapshot.val().dishname)
                showFavoriteDishes();
            });
        });
    }

    function showFavoriteDishes() {
        if (dishIdArray.length > 0) {
            $("#favorites-results").html("");
            for (var i = 0; i < dishIdArray.length; i++) {
                console.log(dishNameArray);
                $("#favorites-results").append(`
                    <h5 class="btn dishLinks btn btn-default" data-dishID="${dishIdArray[i]}">${dishNameArray[i]}</h5><br> 
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
        $("#selectionDisplay").html(`
                    <div>                        
                        <h2><button class="btn btn-danger" id="favDishButton" data-dishid="${_dishData.id}"><i class="fas fa-heart"></i></button>  ${_dishData.title}</h2>
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
        $("#favDishButton").on("click", removeFromFavorites);
    }

    function removeFromFavorites() {

    }

    return {
        init: init
    };
}();

$(function () {
    Favorites.init();
});