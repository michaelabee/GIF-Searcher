$(document).ready(function(){
var topic = ["Brooklyn Nine Nine", "Parks and Rec", "The Office", "It's Always Sunny in Philadelpia", "Arrested Development"];

    var submitButton= function(e){   
        e.preventDefault();
        var output = $('#show-input').val().trim();
        topic.push(output);
        console.log(output);
        $('.gif-buttons').empty();
        populateButtons();
    };
//I have a bug when a user enters a new show into the form it searchs for gifs of "null"(or something),
//the created button still works, so I'm not sure why this is happening. I think it has something to do with the 
//submitButton function, but I couldn't fix it 

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
//the bug could also be here because I'm selecting all buttons on the body and the submit button 
//is within the body. Maybe it's searching the API for what is attached to the submit button 

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
              var title = results[i].title;
    
              var p = $("<p>").text("Rating: " + rating);
              var q =$('<p>').text("Title: " + title);
    
              var showImage = $("<img>");
              showImage.addClass('gif-holder')
              showImage.attr("src", results[i].images.fixed_height_still.url);
              showImage.attr('data-still', results[i].images.fixed_height_still.url);
              showImage.attr('data-moving', results[i].images.fixed_height.url);
              showImage.attr('still', "isStill");
              gifDiv.prepend(p);
              gifDiv.prepend(q);
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

            if (show === 'isStill'){
                $(this).attr('src', movingUrl)
                $(this).attr('still', 'i hate js');
            }
            else if (show === 'i hate js' ){
                $(this).attr('src', stillUrl);
                $(this).attr('still', 'isStill');
            }
        })
})



