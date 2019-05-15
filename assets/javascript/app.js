$(document).ready(function(){
var topic = ["Brooklyn Nine Nine", "Parks and Rec", "The Office", "It's Always Sunny in Philadelpia", "Arrested Development"];

    var populateButtons = function(obj){ ///put this in a for loop instead of .each maybe? isn't the best (ALSO CHECK THE CLICK HANDLERS)
    $.each(topic,function(index,value){
        console.log(value);
        var button = $('<button class="btn btn-secondary">').text(value);
        button.attr("data-show", topic[index]); //why doesn't this assign the attribute? 
        button.on("click", function(searchshows) {
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
        $('.gif-buttons').append(button);

        
    })

     };

     populateButtons();
 

  
})

//add the click handler to the object right after you create the button

//need to figure out how to replace the gifs, not add to the list. 

//need to capture the input from my search bar and add it to the "topics" string

//.val() will get whatever is typed into the search bar (after its selected with Jquery)

