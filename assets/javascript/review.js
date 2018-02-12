var Review = function() {
    var _db = Common.getDatabase();
    function init() {
        initEventHandlers();
    }
    function initEventHandlers() {
        $("#addReview").on("click", function (event) {
            event.preventDefault();

            var newestReview = $("#reviewsInput").val().trim();

            var newReview = {
                review: newestReview
            };

            _db.ref("/Reviews").push(newReview);

            console.log(newReview.review);
            $("#reviewsInput").val("");
        });

        _db.ref("/Reviews").on("child_added", function (childSnapshot, prevChildKey) {

            console.log(childSnapshot.val());

            var newestReview = childSnapshot.val().review;

            console.log(newestReview);
            $("#mainContainer").append(`
                <p>${newestReview}</p>
            `);
        });
    }

    return {
        init: init
    };
}();

$(function () {
    Review.init();
});