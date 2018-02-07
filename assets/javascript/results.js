$(function () {
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    var searchResult;
    function getFoodData(dish) {
        searchResult = getParameterByName("searchResult");
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
                for (var i = 0; i < res.length; i++) {
                    dishButton = $("<button>");
                    dishButton.addClass("btn dishLinks");
                    dishButton.attr("data-dishID", res[i].id);
                    dishButton.text("Go to Recipe.");
                    $("#result" + (i + 1)).append(res[i].title). append(dishButton);
                }
            },
            error: function(error) {
                console.error(error);
            }
        });
    }

    function searchDishInstructions (dishName) {

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
    getFoodData(searchResult);
});