var Results = function() {
    var _searchResult;
    var _data;

    function init() {
        initEventListeners();
        _searchResult = getParameterByName("searchResult");

        getFoodData(_searchResult);
    }

    function initEventHandlers() {

    }

    //region API
    function getFoodData(dish) {
        var dishNameSearchURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete";

        $.ajax({
            url: dishNameSearchURL,
            method: "GET",
            headers: {
                "X-Mashape-Key": "oD0quCJPwGmsh9p2ugkl92457MaKp1SDTMujsn6p1JeIntcBRt"
            },
            data: {
                query: dish
            },
            success: function(res, status) {
                // todo: show
                _data = res;
                renderList();
            },
            error: function(error) {
                console.error(error);
            }
        });
    }

    function searchDishInstructions() {

        var instructionSearchURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + dishID + "/information"
        $.ajax({
            url: instructionSearchURL,
            method: "GET",
            headers: {
                "X-Mashape-Key": "oD0quCJPwGmsh9p2ugkl92457MaKp1SDTMujsn6p1JeIntcBRt"
            },
            success: function(res, status) {
                // res.title
                // res.preparationMinutes
                // res.image
                // res.instructions
            },
            error: function(error) {
                console.error(error);
            }
        });
    }
    //endregion

    function renderList() {
        for (var i = 0; i < _data.length; i++) {
            var dishButton = $("<button>")
            .addClass("btn dishLinks")
            .attr("data-dishID", _data[i].id)
            .text("Go to Recipe.");
            $("#result" + (i + 1)).append(_data[i].title). append(dishButton);
        }
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