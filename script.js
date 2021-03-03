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
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchWeather + "&Appid=" + apiKey + "&units=imperial";
    // Variable for 5 day forecast
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchWeather + "&Appid=" + apiKey + "&units=imperial";


    if (searchWeather == "") {
        console.log(searchWeather);
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
            // list-group append an li to it with just set text
            // console.log(response.name);
            var citySearch = $(".list-group").addClass("list-group-item");
            citySearch.append("<li>" + response.name + "</li>");
            // Local storage
            var local = localStorage.setItem(cityCount, response.name);
            cityCount = cityCount + 1;
        }}