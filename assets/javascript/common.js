var Common = function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCnJS1L0TamagTgoxxJ2TRTWxAwfIUK4Hg",
        authDomain: "project1-a695b.firebaseapp.com",
        databaseURL: "https://project1-a695b.firebaseio.com",
        projectId: "project1-a695b",
        storageBucket: "project1-a695b.appspot.com",
        messagingSenderId: "1059137466888"
    };
    firebase.initializeApp(config);
    var _database = firebase.database();
    // FirebaseUI config.
    var uiConfig = {
        signInSuccessUrl: 'index.html',
        signInOptions: [
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
            },
            {
                provider: firebase.auth.GithubAuthProvider.PROVIDER_ID
            },
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: true
            }
        ]
    };
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);

    function init() {
        initEventHandlers();
        myUserLogin();
    }

    function getDatabase() {
        return _database;
    }

    function initEventHandlers() {
        $("#searchButton").on("click", function(event) {
            event.preventDefault();
            var searchResult = $("#mySearch").val().trim();
            window.location.href = "P1-SearchResultsPage.html?searchResult=" + searchResult;
        });
    }

    function myUserLogin() {

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                Cookies.set("UserID", user.uid);
                // $("#loginButton").text("Log Out")
                //                 .removeAttr("data-toggle", "data-target");
                $("<button type='button' class='btn primary' id='loginButton'>Log Out</button>").insertBefore(".navbar-form.navbar-right");
                // User is signed in.
                _database.ref("/Users").once("value", function(snapshot) {
                    var fbUsers = snapshot.val();
                    var userKeys = fbUsers ? Object.keys(fbUsers) : null;

                    if (!userKeys || userKeys.indexOf(user.uid) === -1) {
                        _database.ref("/Users").child(user.uid).set({
                            //This is where user's favorite dishes will go to be stored in db.
                            // user: user.uid
                        });
                    }
                });
                var url = Cookies.get("redirectUrl");

                var newFbDishName = Cookies.get("randomdishtitle");
                var newFbDishId = Cookies.get("randomdishid");
                var currentUserId = Cookies.get("UserID");
                if (newFbDishId) {
                    _database.ref("/Users/" + currentUserId).child(newFbDishId).set({
                        "dishid": newFbDishId,
                        "dishname": newFbDishName
                    });
                    Cookies.remove("randomdishtitle");
                    Cookies.remove("randomdishid");

                    if (url) {
                        Cookies.remove("redirectUrl");
                        window.location = url;
                    } else {
                        window.location = "P1-FavoritesPage.html";
                    }

                }

                $("#loginButton").click(function () {
                    firebase.auth().signOut();
                    Cookies.remove("UserID");
                    window.location = "index.html";
                });
            } else {
                $("<button type='button' class='btn primary' data-toggle='modal' data-target='#myModal' id='loginButton'>Log In</button>").insertBefore(".navbar-form.navbar-right");
            }
        }, function(error) {
            console.log(error);
        });
    }
    function searchDishInstructions(id, cb) {
        var instructionSearchURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + id + "/information";
        $.ajax({
            url: instructionSearchURL,
            method: "GET",
            headers: {
                "X-Mashape-Key": "oD0quCJPwGmsh9p2ugkl92457MaKp1SDTMujsn6p1JeIntcBRt"
            },

            success: cb,
            error: function(error) {
                console.error(error);
            }
        });
    }

    return {
        init: init,
        getDatabase: getDatabase,
        searchDishInstructions: searchDishInstructions
    };
}();

$(function () {
    Common.init();
});