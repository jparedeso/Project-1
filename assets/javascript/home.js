$(function () {

    $("#searchButton").on("click", function(event) {
        event.preventDefault();
        var searchResult = $("#mySearch").val().trim();
        window.location.href = "P1-SearchResultsPage.html?SearchResult=" + searchResult;
    });

});



