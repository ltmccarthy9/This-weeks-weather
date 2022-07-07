$(document).ready(function () {

$("#date-my").text(moment().format("dddd, MMMM Do YYYY"));

var geoURL1 = "http://api.openweathermap.org/geo/1.0/direct?q=";
var geoURL2 = "&limit=1&appid=2853ae23cf85a1dddd10df701049c242";

var weatherURL1 = "http://api.openweathermap.org/data/2.5/forecast?";
var weatherURL2 = "&appid=2853ae23cf85a1dddd10df701049c242";
var latLon = "";

function cityName(){
    localStorage.setItem("city", searchText);
}
//get latitude and longitude ----------
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
        console.log(latLon);
        getWeatherInfo(latLon);
        //getUV(lat, lon);
    })    
    
};
//-------------------------------------
function getWeatherInfo(latLon){
    var weatherRequest = weatherURL1 + latLon + weatherURL2;
    fetch(weatherRequest).then(function(response){
        return response.json();
    }).then(function (data){
        console.log(data);
    })
}
$("#submit-button").on("click", getLatLon);
// api key 2853ae23cf85a1dddd10df701049c242 


});
