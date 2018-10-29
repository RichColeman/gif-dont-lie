var players = ["LeBron James", "James Harden", "Joel Embiid", "Rasheed Wallace", "Michael Jordan", "Vince Carter", "Dunk Contest", "Iverson Stepover", "Trust the Process", "Benny the Bull"];

function displayPlayerGif() {
    console.log(this);
    var player = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        player + "&api_key=Pxu39nubCJKhg46cpM0JpGmvBtubJ1Cv&limit=10"
    console.log(queryURL)
    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        console.log(response);
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>")
            var title = results[i].title;
            var p = $("<p>").text(title);
            p.addClass("text-white")
            var playerImage = $("<img>");
            playerImage.attr("src", results[i].images.fixed_height_still.url);
            playerImage.attr("data-still", results[i].images.fixed_height_still.url);
            playerImage.attr("data-animate", results[i].images.fixed_height.url);
            playerImage.attr("data-state", "still");
            playerImage.addClass("gif col-md-8");
            gifDiv.prepend(p);
            gifDiv.prepend(playerImage);
            $(".gifs-appear-here").prepend(gifDiv);
        }
    })
}

function renderButtons() {

    $(".buttons-view").empty();
    for (var i = 0; i < players.length; i++) {
        var a = $("<button>");
        a.addClass("player");
        a.attr("data-name", players[i]);
        a.text(players[i]);
        a.addClass("btn btn-danger mr-2 mt-2 mb-2")
        $(".buttons-view").append(a);
    }
}

$("#add-player").on("click", function (event) {
    event.preventDefault();
    var newPlayer = $("#player-input").val().trim();
    players.push(newPlayer);
    renderButtons();
});

$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    console.log(state);
    if (state === "still") {
        var animateURL = $(this).attr("data-animate");
        $(this).attr("src", animateURL);
        $(this).attr("data-state", "animate");


    } else if (state === "animate") {
        var stillURL = $(this).attr("data-still");
        $(this).attr("src", stillURL);
        $(this).attr("data-state", "still");

    }
})

$(document).on("click", ".player", displayPlayerGif)

renderButtons();