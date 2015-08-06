result = 0;

$(document).ready(function() {
    // Add card to the bottom

    var citycountry = $(".city-country");


    var displayCities = function(cities){
      console.log("yolo")
      $("#main").empty();
      for(i = 0; i < cities.RESULTS.length; i++){
        var cityCountry = cities.RESULTS[i].name
        var city_name = cityCountry.split(", ")[0];
        console.log(city_name);
        //$("#main").append(cityCountry);
        $("#main").append("<div class='city-country'>" + cityCountry + "</div>");
        $('.city-country').last().attr("id", city_name);
        //$( "#main" ).last().attr("id", city_name);

        $("#main").append("<br>")
      }
      var x = $(".city-country")

      x.click( function(){
        console.log($(this).attr("id"));
        var city_div = $(this);
        var city = $(this).html();
        var cityName = city.split(", ")[0];
        var regionName = city.split(", ")[1];
        var myURL = "http://api.wunderground.com/api/c8923016ab87436f/conditions/q/" + regionName + "/" + cityName + ".json";
        var result_promise = $.ajax({
          dataType: 'json',
          //jsonp: 'cb',
          //data: 'id=10',
          //jsonp: 'jsonp_callback',
          url: myURL

          //method: 'GET',
        });

        var test = function(data){
          var foo = data;
          var weatherDesc = foo.current_observation.weather;
          var currentTemp = foo.current_observation.temp_c;
          var relativeHumidity = foo.current_observation.relative_humidity;
          //debugger;
          city_div.after("<br><div class='yolo'> The current temperature is " + currentTemp
                         + " degress celcius. " + "It is " + weatherDesc + ". The relative humidity is "
                         + relativeHumidity + ".</div>");
          // city_div.append("<br><div class='yolo'> The current temperature is " + currentTemp
          //             + " degress celcius. " + "It is " + weatherDesc + ". The relative humidity is "
          //             + relativeHumidity + ".</div>");
        }

        result_promise.then(test);

      });
    }



  $("#search-cities").on("submit", function(event){
    event.preventDefault();
    data = { name: $("#city-name").val() }.name;
    console.log(data);
    //myURL = "http://api.wunderground.com/api/c8923016ab87436f/conditions/q/CA/San_Francisco.json"
    myURL = "http://autocomplete.wunderground.com/aq?query=" + data
    console.log(myURL)
    var result_promise = $.ajax({
      dataType: 'jsonp',
      jsonp: 'cb',
      //data: 'id=10',
      //jsonp: 'jsonp_callback',
      url: myURL

      //method: 'GET',
    });



    result_promise.then(displayCities);

    // done(function(data) {
    //   console.log(result);
    //   console.log(data);
    //   console.log("yolo");
    //   //$("#main").append(data);
    // })
    // .fail(function(){
    //   console.log("fail");
    // })

  });


  var myFunction = function(parsed_json){
    var location = parsed_json['location']['city'];
    var temp_f = parsed_json['current_observation']['temp_f'];
    alert("Current temperature in " + location + " is: " + temp_f);
  }

  var myFail = function(response){
    alert("data is not available for this location");
  }

  $("#submit-query").on("submit", function(event){
    event.preventDefault();
    var promise = $.ajax({url : "http://api.wunderground.com/api/c8923016ab87436f/geolookup/conditions/q/IA/Cedar_Rapids.json",
                          dataType : "jsonp"});

    promise.then(myFunction).fail(myFail);


    // promise.then(function(parsed_json) {
    // var location = parsed_json['location']['city'];
    // var temp_f = parsed_json['current_observation']['temp_f'];
    // alert("Current temperature in " + location + " is: " + temp_f);
    // global_obj = parsed_json;
    // });
  })


  console.log("hello");
  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
