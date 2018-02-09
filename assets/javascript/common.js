var Common = function() {
    var _data;

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
    Common.init();
});