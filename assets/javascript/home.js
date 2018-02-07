var Home = function() {

    function init() {
        initEventHandlers();
    }

    function initEventHandlers() {
        $("#searchButton").on("click", function(event) {
            event.preventDefault();
            var searchResult = $("#mySearch").val().trim();
            window.location.href = "P1-SearchResultsPage.html?searchResult=" + searchResult;
        });
    }

    return {
        init: init
    };
}();

$(function () {
    Home.init();
});


