var Results = function() {
    var _searchResult;
    var _data;

    function init() {
        initEventHandlers();
        _searchResult = getParameterByName("searchResult");
        var _currentSearchResult = _searchResult;
        $("#searchButton").on("click", function(event) {
            event.preventDefault();
            _currentSearchResult = $("#mySearch").val().trim();
            getFoodData(_currentSearchResult);
        });
        getFoodData(_currentSearchResult);
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
                // todo: show search parameters.
                _data = res;
                renderList();
            },
            error: function(error) {
                console.error(error);
            }
        });
    }
    function searchDishInstructions() {

        var instructionSearchURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + $(this).attr("data-dishID") + "/information"
        $.ajax({
            url: instructionSearchURL,
            method: "GET",
            headers: {
                "X-Mashape-Key": "oD0quCJPwGmsh9p2ugkl92457MaKp1SDTMujsn6p1JeIntcBRt"
            },

            success: function(res, status) {

                $("#selectionDisplay").html(`
                    <div>
                        <h2>${res.title}</h2>
                        <img src="${res.image}">
                        <h3>Ingredients</h3>  
                        <div id="extendedIngredients"></div>
                        <h3>Instructions</h3>  
                        <div id="analyzedInstructions"></div>                      
                    </div>
                `);
                for (var i = 0; i < res.extendedIngredients.length; i++) {
                    $("#extendedIngredients").append(`
                        <p>${res.extendedIngredients[i].amount} ${res.extendedIngredients[i].unit} ${res.extendedIngredients[i].name}</p>
                    `);
                }
                for (var j = 0; j < res.analyzedInstructions[0].steps.length; j++) {
                    $("#analyzedInstructions").append(`
                        <p>${res.analyzedInstructions[0].steps[j].number}. ${res.analyzedInstructions[0].steps[j].step}</p>
                    `);
                }
            },
            error: function(error) {
                console.error(error);
            }
        });
    }
    //endregion

    function renderList() {
        $("#dishDisplay").html("");
        for (var i = 0; i < _data.length; i++) {
            // var dishButton = $("<button>")
            // .addClass("btn dishLinks")
            // .attr("data-dishID", _data[i].id)
            // .text(_data[i].title);
            // $("#result" + (i + 1)). append(dishButton);

            $("#dishDisplay").append(`
                <h5 class="btn dishLinks" data-dishID="${_data[i].id}">${_data[i].title}</h5><br> 
            `);
        }
        $(".dishLinks").on("click", searchDishInstructions);
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
        init: init,
    };
}();

$(function () {
    Results.init();
});