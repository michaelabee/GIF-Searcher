$(document).ready(function(){
var topic = ["Brooklyn Nine Nine", "Parks and Rec", "The Office", "It's Always Sunny in Philadelpia", "Arrested Development"];

    var submitButton= function(e){   ///make a separate function createNewButton that runs similar code as "populateButtons" but only after user hits enter
        e.preventDefault();
        var output = $('#show-input').val().trim();
        topic.push(output);
        console.log(output);
        $('.gif-buttons').empty();
        populateButtons();
    };

    $('#search-button').click(submitButton);

    var populateButtons = function(obj){ 
    $.each(topic,function(index,value){
        console.log(value);
        var button = $('<button class="btn btn-secondary">').text(value);
        button.attr("data-show", topic[index]);
        $('.gif-buttons').append(button);
    })

     };

     populateButtons();

     $('body').on("click", '.btn', function(searchshows) {
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
              showImage.addClass('gif-holder')
              showImage.attr("src", results[i].images.fixed_height_still.url);
              showImage.attr('data-still', results[i].images.fixed_height_still.url);
              showImage.attr('data-moving', results[i].images.fixed_height.url);
              showImage.attr('still', "4");
              gifDiv.prepend(p);
              gifDiv.prepend(showImage);
    
              $("#gifs-here").prepend(gifDiv);
    
              console.log(response);

            }
          });
        });

        $('body').on("click", '.gif-holder', function(){
            var show = $(this).attr("still");
            var stillUrl = $(this).attr('data-still');
            var movingUrl = $(this).attr('data-moving');

            if (show === '4'){
                $(this).attr('src', movingUrl)
                $(this).attr('still', 'i hate js');
            }
            else if (show === 'i hate js' ){
                $(this).attr('src', stillUrl);
                $(this).attr('still', '4');
            }
        })
})

//make the gifs play upon click. maybe add "clickgif"function that replaces the <img> with either the gif.still or the gif.animated 
//(store them into an data-attribute)

//need to capture the input from my search bar and add it to the "topics" string

//.val() will get whatever is typed into the search bar (after its selected with Jquery)

