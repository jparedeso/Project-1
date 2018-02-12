var Favorites = function() {
    var _db = Common.getDatabase();
    var _currentUser = Cookies.get("UserID");
    var dishIdArray = [];
    var dishNameArray = [];
    function init() {
        initEventHandlers();

    }
    function initEventHandlers() {
        _db.ref("/Users/" + _currentUser).once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
               console.log(childSnapshot.val());
               dishIdArray.push(childSnapshot.val().dishid)
               dishNameArray.push(childSnapshot.val().dishname)
            });
        });
    }

    function showFavoriteDishes() {
        $("#favorites-results").html("");
        for (var i = 0; i < _data.length; i++) {
            $("#favorites-results").append(`
                    <h5 class="btn dishLinks btn btn-default" data-dishID=""></h5><br> 
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

    return {
        init: init
    };
}();

$(function () {
    Favorites.init();
});