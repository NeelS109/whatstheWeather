// Declared Variables 
var apiKey = "b17fa481b192995d7aaa4c07ddf34c35";
var sunButton = $(".sunButton");


// Consistently adding the data onto HMTL page
for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    var citySearch = $(".list-group").addClass("list-group-item");

    citySearch.append("<li>" + city + "</li>");
}
// City count for local storage 
var cityCount = 0;

// on click Search Button
sunButton.click(function () {

var searchWeather = $(".searchWeather").val();

// Variable for current weather 
var apiCurrentForecast = "https://api.openweathermap.org/data/2.5/weather?q=" + searchWeather + "&Appid=" + apiKey + "&units=imperial";
// Variable for 5 day forecast
var apiFiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchWeather + "&Appid=" + apiKey + "&units=imperial";


    if (searchWeather == "") {
        console.log(searchWeather);
    } else {
        $.ajax({
            url: apiCurrentForecast,
            method: "GET"
        }).then(function (response) {
            var citySearch = $(".list-group").addClass("list-group-item");
            citySearch.append("<li>" + response.name + "</li>");
            // Local storage
            var local = localStorage.setItem(cityCount, response.name);
            cityCount = cityCount + 1;

             // Current Forecast append 
            var currentWeatherCard = $(".currentWeatherCard").append("<div>").addClass("card-body");
            currentWeatherCard.empty();
            var currentName = currentWeatherCard.append("<p>");
            currentWeatherCard.append(currentName);
            
            //Dates 
            var timeUniversal = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUniversal.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            //Temp 
            var currentForecast = currentName.append("<p>");
            // .addClass("card-text");
            currentName.append(currentForecast);
            currentForecast.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            //Humidity
            currentForecast.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            //Wind Speed: 
            currentForecast.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
            
            // UV Index URL
            var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b17fa481b192995d7aaa4c07ddf34c35&lat=${response.coord.lat}&lon=${response.coord.lon}`;
    
            // UV Index
            $.ajax({
                url: urlUV,
                method: "GET"
                }).then(function (response) {
                var currentUV = currentForecast.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUV.addClass("UV");
                currentForecast.append(currentUV);
            });
            
        });
            
        //5-day forecast 
        $.ajax({
            url: apiFiveDayForecast,
            method: "GET"
        }).then(function (response) {
            var day = [0, 8, 16, 24, 32];
            var nextFiveDay = $(".nextFiveDay").addClass("card-body");
            var nextDaysDiv = $(".nextDaysOne").addClass("card-text");
            nextDaysDiv.empty();
            // For each for 5 days
            day.forEach(function (i) {
                var nextDayUTC1 = new Date(response.list[i].dt * 1000);
                nextDayUTC1 = nextDayUTC1.toLocaleDateString("en-US");

                nextDaysDiv.append("<div class=fiveDayInfo>" + "<p>" + nextDayUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");


            })

        });
    }
});

