$(document).ready(function () {

// date at top of page
$("#date-my").text(moment().format("dddd, MMMM Do YYYY"));

// 1st and 2nd half of url for latitude/longitude api call
var geoURL1 = "https://api.openweathermap.org/geo/1.0/direct?q=";
var geoURL2 = "&limit=1&appid=2853ae23cf85a1dddd10df701049c242";

// 1st and 2nd half of url for weather api call
var weatherURL1 = "https://api.openweathermap.org/data/2.5/onecall?";
var weatherURL2 = "&exclude=minutely,hourly,alerts&appid=2853ae23cf85a1dddd10df701049c242";
var latLon = "";

//add user search into request url -> get latitude and longitude ----------
    function getLatLon() {
    var searchText = $("#city-search").val();
    var urlRequest = geoURL1 + searchText + geoURL2;
    fetch(urlRequest).then(function(response){
        return response.json();
    }).then(function (data){
        console.log(data);
        var La = data[0].lat;
        var Lo = data[0].lon;
        var lat = La.toString();
        var lon = Lo.toString();
        latLon = "lat=" + lat + "&lon=" + lon;
        //console.log(latLon);
        getWeatherInfo(latLon);
        //getUV(lat, lon);
    })    
    
};
//-------------------------------------

// This function takes in the latitude and longitude and calls the weather api
function getWeatherInfo(latLon){
    var weatherRequest = weatherURL1 + latLon + weatherURL2;
    fetch(weatherRequest).then(function(response){
        return response.json();
    }).then(function (data){
        console.log(data);
        var todayTemp = data.current;
        var todayHum = data.current.humidity;
        var todayWind = data.current.wind_speed;
        var todayUV = data.current.uvi;
        var todayOutlook = data.current.weather[0].main;
        console.log(todayOutlook);
    })
}
$("#submit-button").on("click", getLatLon);
// api key 2853ae23cf85a1dddd10df701049c242 


});
