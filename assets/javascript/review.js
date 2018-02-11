$(function() {
    // var reviewsConfig = {
    //     apiKey: "AIzaSyDi-uMjUfC7VilkJyEjiC3bLqKWGfdBkzs",
    //     authDomain: "reviewspage-e6e30.firebaseapp.com",
    //     databaseURL: "https://reviewspage-e6e30.firebaseio.com",
    //     projectId: "reviewspage-e6e30",
    //     storageBucket: "reviewspage-e6e30.appspot.com",
    //     messagingSenderId: "545138867669"
    // };
    // firebase.initializeApp(reviewsConfig);
    // var db = firebase.db();
    var db = Common.getDatabase();

    $("#addReview").on("click", function (event) {
        event.preventDefault();

        var newestReview = $("#reviewsInput").val().trim();

        var newReview = {
            review: newestReview
        };

        // db.ref().push(newReview);

        db.ref("/Reviews").push(newReview);

        console.log(newReview.review);
        $("#reviewsInput").val("");
    });

    db.ref("/Reviews").on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        var newestReview = childSnapshot.val().review;

        console.log(newestReview);
        $("#mainContainer").append("<p>" + newestReview);
    });
});