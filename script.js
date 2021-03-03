// Declared Variables 
var apiKey = "b17fa481b192995d7aaa4c07ddf34c35";
var sunButton = $(".sunButton");


// Forloop for persisting the data onto HMTL page
for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    // console.log(localStorage.getItem("City"));
    var citySearch = $(".list-group").addClass("list-group-item");

    citySearch.append("<li>" + city + "</li>");
}
// City count for local storage 
var cityCount = 0;
