$(function () {

    function getFoodData(dish) {
        var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete";

        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {
                "X-Mashape-Key": "oD0quCJPwGmsh9p2ugkl92457MaKp1SDTMujsn6p1JeIntcBRt"
            },
            data: {
                query: dish
            },
            success: function(res, status) {
                console.log(res);
                console.log(status);
            },
            error: function(error) {
                console.error(error);
            }
        });
    }
    getFoodData("chicken");
});