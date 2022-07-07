$(document).ready(function () {

$("#date-my").text(moment().format("dddd, MMMM Do YYYY"));

var url1 = "http://api.openweathermap.org/geo/1.0/direct?q="
var url2 = "&limit=1&appid=2853ae23cf85a1dddd10df701049c242"




function cityName(){
    localStorage.setItem("city", searchText);
}
//get latitude and longitude ----------
    function getLatLon() {
    var searchText = $("#city-search").val();
    var urlRequest = url1 + searchText + url2;
    fetch(urlRequest).then(function(response){
        return response.json();
    }).then(function (data){
        console.log(data);
        var lat = data.lat;
        var lon = data.lon;
        getWeatherInfo(lat, lon);
        getUV(lat, lon);
    })    
};
//-------------------------------------

$("#submit-button").on("click", getLatLon);
// api key 2853ae23cf85a1dddd10df701049c242 

function getWeatherInfo(lat, lon){
    
}
});
