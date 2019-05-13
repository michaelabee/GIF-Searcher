$(document).ready(function(){
var topics = ["Brooklyn Nine Nine", "Parks and Rec", "The Office", "It's Always Sunny in Philadelpia", "Arrested Development"];

    var populateButtons = function(obj){
    $.each(topics,function(index,value){
        console.log(value);
        var button = $('<button class="btn btn-secondary">').text(value);
        $('.gif-buttons').append(button);
        
    })

     };


$("button").on("click", function(searchshows) {
    var show = $(this).attr("data-show");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      show + "&api_key=i6eYfzx0lih0tWQIGEusbgNYSTlbuuLY&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var showImage = $("<img>");
          showImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(showImage);

          $("#gifs-here").prepend(gifDiv);

          console.log(response);
        }
      });
  });
 

  populateButtons();
})

//need to figure out how to replace the gifs, not add to the list. 

//need to capture the input from my search bar

