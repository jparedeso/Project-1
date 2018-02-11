var Home = function() {
    var _data;

    function init() {
        initEventHandlers();
        showRandomDish();
    }

    function initEventHandlers() {
        $(".galleryImage").on("click", function() {
            console.log($(this).data("dishid"));
        })
    }
    // function getRandomDishData() {
    //     var randomDishesURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random";
    //     var numberOfDishes = 6;
    //     $.ajax({
    //         url: randomDishesURL,
    //         method: "GET",
    //         headers: {
    //             "X-Mashape-Key": "oD0quCJPwGmsh9p2ugkl92457MaKp1SDTMujsn6p1JeIntcBRt"
    //         },
    //         data: {
    //             number: numberOfDishes
    //         },
    //         success: function(res, status) {
    //             _data = res.recipes;
    //             showRandomDish();
    //         },
    //         error: function(error) {
    //             console.error(error);
    //         }
    //     });
    //
    // }

    function showRandomDish() {
        var data = [
            {
                "id": 478944,
                "title": "One Pot Herb Roasted Chicken Dinner",
                "image": "https://spoonacular.com/recipeImages/478944-556x370.jpg"
            },
            {
                "id": 601141,
                "title": "Berry Green Smoothie",
                "image": "https://spoonacular.com/recipeImages/601141-556x370.jpg"
            },
            {
                "id": 622677,
                "title": "Cranberry Sauce Skillet Scones",
                "image": "https://spoonacular.com/recipeImages/622677-556x370.jpg"
            },
            {
                "id": 736661,
                "title": "Carrot Cake Pancakes with Maple-Cream Cheese Drizzle and Toasted Pecans",
                "image": "https://spoonacular.com/recipeImages/736661-556x370.jpeg"
            },
            {
                "id": 540764,
                "title": "Braised Pork Belly Bento",
                "image": "https://spoonacular.com/recipeImages/540764-556x370.jpg"
            },
            {
                "id": 531343,
                "title": "Gluten-Free Chai Spiced Cake with Chai Spiced Frosting",
                "image": "https://spoonacular.com/recipeImages/531343-556x370.jpg"
            },
            {
                "id": 668474,
                "title": "Cranberry Almond Energy Balls (and Baby Bites)",
                "image": "https://spoonacular.com/recipeImages/668474-556x370.jpg"
            },
            {
                "id": 498096,
                "title": "Indonesian Avocado Shake (Jus Alpukat)",
                "image": "https://spoonacular.com/recipeImages/498096-556x370.jpg"
            },
            {
                "id": 613035,
                "title": "Herb & Garlic Oven Fries",
                "image": "https://spoonacular.com/recipeImages/613035-556x370.jpg"
            },
            {
                "id": 608174,
                "title": "Lemon Linzer Bars",
                "image": "https://spoonacular.com/recipeImages/608174-556x370.jpg"
            },
            {
                "id": 542565,
                "title": "Orange Creamsicle Mini Muffins",
                "image": "https://spoonacular.com/recipeImages/542565-556x370.jpg"
            },
            {
                "id": 598822,
                "title": "Rosa’s Almond Biscotti",
                "image": "https://spoonacular.com/recipeImages/598822-556x370.jpg"
            },
            {
                "id": 599036,
                "title": "Gougères with Arugula, Bacon, and Pickled Onions",
                "image": "https://spoonacular.com/recipeImages/599036-556x370.jpg"
            },
            {
                "id": 621855,
                "title": "Hot Bruschetta Dip",
                "image": "https://spoonacular.com/recipeImages/621855-556x370.jpg"
            },
            {
                "id": 492261,
                "title": "Rosemary Potato Onion Bread",
                "image": "https://spoonacular.com/recipeImages/492261-556x370.jpg"
            },
            {
                "id": 492436,
                "title": "Dill Pickle and Potato Soup",
                "image": "https://spoonacular.com/recipeImages/492436-556x370.jpg"
            },
            {
                "id": 828481,
                "title": "Easy pork sausage meatballs in tomato sauce",
                "image": "https://spoonacular.com/recipeImages/828481-556x370.jpg"
            },
            {
                "id": 574859,
                "title": "Potato Kale Vegetarian Enchiladas with Roasted Chili Sauce",
                "image": "https://spoonacular.com/recipeImages/574859-556x370.jpg"
            },
            {
                "id": 598281,
                "title": "Pot Stickers | Guotie",
                "image": "https://spoonacular.com/recipeImages/598281-556x370.jpg"
            },
            {
                "id": 776138,
                "title": "Lemonade Custard Pie",
                "image": "https://spoonacular.com/recipeImages/776138-556x370.jpg"
            },
            {
                "id": 587882,
                "title": "Grandma’s Stuffed Peppers",
                "image": "https://spoonacular.com/recipeImages/587882-556x370.jpg"
            },
            {
                "id": 491536,
                "title": "Macaroni and Cheese Soup with Roasted Tomatoes",
                "image": "https://spoonacular.com/recipeImages/491536-556x370.jpg"
            },
            {
                "id": 587301,
                "title": "Summer Fruit Crisp",
                "image": "https://spoonacular.com/recipeImages/587301-556x370.jpg"
            },
            {
                "id": 478451,
                "title": "Baby Arugula Pesto",
                "image": "https://spoonacular.com/recipeImages/478451-556x370.jpeg"
            },
            {
                "id": 207307,
                "title": "The Un-Pink Lady Cocktail",
                "image": "https://spoonacular.com/recipeImages/207307-556x370.jpg"
            },
            {
                "id": 594866,
                "title": "Olive Oil & Herb Savory Biscotti",
                "image": "https://spoonacular.com/recipeImages/594866-556x370.jpg"
            },
            {
                "id": 955832,
                "title": "Peppermint Bark Meringues",
                "image": "https://spoonacular.com/recipeImages/955832-556x370.jpg"
            },
            {
                "id": 474883,
                "title": "Harvest Salad",
                "image": "https://spoonacular.com/recipeImages/474883-556x370.jpg"
            },
            {
                "id": 487720,
                "title": "Roasted Garlic Potato Rolls",
                "image": "https://spoonacular.com/recipeImages/487720-556x370.jpg"
            },
            {
                "id": 535957,
                "title": "Cheesecake Parfaits with Blueberry Pie Filling",
                "image": "https://spoonacular.com/recipeImages/535957-556x370.jpg"
            },
            {
                "id": 803070,
                "title": "Crock Pot Balsamic Chicken",
                "image": "https://spoonacular.com/recipeImages/803070-556x370.jpg"
            },
            {
                "id": 504716,
                "title": "Asian Chicken Lettuce Wraps",
                "image": "https://spoonacular.com/recipeImages/504716-556x370.jpg"
            },
            {
                "id": 850164,
                "title": "Orecchiette with Shrimp, Fennel and Arugula",
                "image": "https://spoonacular.com/recipeImages/850164-556x370.jpg"
            },
            {
                "id": 618958,
                "title": "Gluten-Free Sweet Potato Muffins",
                "image": "https://spoonacular.com/recipeImages/618958-556x370.jpg"
            },
            {
                "id": 520699,
                "title": "Beef tripe and dumplings soup",
                "image": "https://spoonacular.com/recipeImages/520699-556x370.jpg"
            },
            {
                "id": 946289,
                "title": "Instant Pot Mashed Potatoes",
                "image": "https://spoonacular.com/recipeImages/946289-556x370.jpg"
            },
            {
                "id": 590154,
                "title": "Lamb Chops with Garlic-Rosemary Sauce",
                "image": "https://spoonacular.com/recipeImages/590154-556x370.jpg"
            },
            {
                "id": 537458,
                "title": "Spinach Stracciatelle",
                "image": "https://spoonacular.com/recipeImages/537458-556x370.jpg"
            },
            {
                "id": 579952,
                "title": "Saag Aloo - How to make Saag Aloo - North Indian Curry s",
                "image": "https://spoonacular.com/recipeImages/579952-556x370.jpg"
            },
            {
                "id": 445887,
                "title": "Eggless Chocolate Cake",
                "image": "https://spoonacular.com/recipeImages/445887-556x370.jpg"
            },
            {
                "id": 759202,
                "title": "Caramelized Onion Tart",
                "image": "https://spoonacular.com/recipeImages/759202-556x370.jpg"
            },
            {
                "id": 717560,
                "title": "Hummus Eggplant Canapes",
                "image": "https://spoonacular.com/recipeImages/717560-556x370.jpg"
            },
            {
                "id": 535687,
                "title": "Cheeseburger Soup",
                "image": "https://spoonacular.com/recipeImages/535687-556x370.jpg"
            },
            {
                "id": 497233,
                "title": "Baked Eggs with Ham, Cheddar, and Chives",
                "image": "https://spoonacular.com/recipeImages/497233-556x370.jpg"
            },
            {
                "id": 831071,
                "title": "Bananas Foster Oatmeal",
                "image": "https://spoonacular.com/recipeImages/831071-556x370.jpg"
            },
            {
                "id": 499004,
                "title": "Balsamic Roasted Sausage, Sweet Peppers and Potatoes",
                "image": "https://spoonacular.com/recipeImages/499004-556x370.jpg"
            },
            {
                "id": 205892,
                "title": "Soft Caramels",
                "image": "https://spoonacular.com/recipeImages/205892-556x370.jpg"
            },
            {
                "id": 248006,
                "title": "Pistachio and Gorgonzola Risotto",
                "image": "https://spoonacular.com/recipeImages/248006-556x370.jpg"
            },
            {
                "id": 579457,
                "title": "Mumbai Sandwich: An Exotic Trip to India with Lunch",
                "image": "https://spoonacular.com/recipeImages/579457-556x370.jpg"
            },
            {
                "id": 835870,
                "title": "Parmesan Puff Pastry Pinwheels",
                "image": "https://spoonacular.com/recipeImages/835870-556x370.jpg"
            },
            {
                "id": 489046,
                "title": "Vanilla Bean Yogurt with Orange Cranberry Sauce",
                "image": "https://spoonacular.com/recipeImages/489046-556x370.jpg"
            },
            {
                "id": 416757,
                "title": "Hearty Potluck Chili",
                "image": "https://spoonacular.com/recipeImages/416757-556x370.jpg"
            },
            {
                "id": 694428,
                "title": "Peanut Butter Chocolate Crinkle Cookies",
                "image": "https://spoonacular.com/recipeImages/694428-556x370.jpg"
            },
            {
                "id": 758839,
                "title": "Perfect Roasted Beets with Orange Slices",
                "image": "https://spoonacular.com/recipeImages/758839-556x370.jpg"
            },
            {
                "id": 605695,
                "title": "Favorite Fresh Raspberry Pie",
                "image": "https://spoonacular.com/recipeImages/605695-556x370.jpg"
            },
            {
                "id": 772626,
                "title": "Stuffed Baby Bell Peppers",
                "image": "https://spoonacular.com/recipeImages/772626-556x370.jpeg"
            },
            {
                "id": 742828,
                "title": "Fried Avocado Bites",
                "image": "https://spoonacular.com/recipeImages/742828-556x370.jpeg"
            },
            {
                "id": 612843,
                "title": "Dishpan Cookies II",
                "image": "https://spoonacular.com/recipeImages/612843-556x370.jpg"
            },
            {
                "id": 524668,
                "title": "Milk Chocolate Mousse with Coconut Whipped Cream",
                "image": "https://spoonacular.com/recipeImages/524668-556x370.jpg"
            }
        ];
        var items = shuffle(data);

        for (var i = 0; i < 6; i++) {
            $("#dishDisplay" + i).attr("data-dishid", items[i].id);
            $("#dishDisplay" + i).css({backgroundImage: `url('${items[i].image}')`});
            $("#dishDisplay" + i + " p").text(items[i].title);
        }

        setTimeout(function() {
            $(".galleryContainer").removeClass("hidden");
        }, 200);

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }
    }

    return {
        init: init
    };
}();

$(function () {
    Home.init();
});


