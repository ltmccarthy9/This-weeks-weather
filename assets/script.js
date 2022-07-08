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
var todayTemp = 0;
var todayHum = 0;
var todayWind = 0;
var todayUV = 0;
var todayOutlook = "";
        
var day1Temp = 0;
var day1Humid = 0;
var day1Outlook = "";
var day2Temp = 0;
var day2Humid = 0;
var day2Outlook = "";
var day3Temp = 0;
var day3Humid = 0;
var day3Outlook = "";
var day4Temp = 0;
var day4Humid = 0;
var day4Outlook = "";
var day5Temp = 0;
var day5Humid = 0;
var day5Outlook = "";

var searchText = "";
var cityName = $("#city-name-display");
var current_temp = $("#current-temp");
var current_humidity = $("#current-humidity");
var current_wind_speed = $("#current-wind-speed");
var current_UV_index = $("#current-UV-index");

var day1_date = $("#day1-date");
var day2_date = $("#day2-date");
var day3_date = $("#day3-date");
var day4_date = $("#day4-date");
var day5_date = $("#day5-date");

var day1_temp = $("#day1-temp");
var day2_temp = $("#day2-temp");
var day3_temp = $("#day3-temp");
var day4_temp = $("#day4-temp");
var day5_temp = $("#day5-temp");

var day1_hum = $("#day1-hum");
var day2_hum = $("#day2-hum");
var day3_hum = $("#day3-hum");
var day4_hum = $("#day4-hum");
var day5_hum = $("#day5-hum");

var searchTextID = "";

var urlRequest = "";

var La = 0;
var Lo = 0;
var lat = "";
var lon = "";
//add user search into request url -> get latitude and longitude ----------
    function getLatLon() {
    searchText = $("#city-search").val();
    createCityRow(searchText);
    urlRequest = geoURL1 + searchText + geoURL2;
    fetch(urlRequest).then(function(response){
        return response.json();
    }).then(function (data){
        console.log(data);
        La = data[0].lat;
        Lo = data[0].lon;
        lat = La.toString();
        lon = Lo.toString();
        latLon = "lat=" + lat + "&lon=" + lon;
        //console.log(latLon);
        getWeatherInfo(latLon);
    })    
    
};
//-------------------------------------
// create a previously searched city row
function createCityRow(search){
    searchTextID = search;
    $("<p></p>", {
        id: searchTextID.replace(" ","-"),
        class: "cities"
    }).text(search).appendTo('#search-section');
}
// This function takes in the latitude and longitude and calls the weather api
function getWeatherInfo(latLon){
    var weatherRequest = weatherURL1 + latLon + weatherURL2;
    fetch(weatherRequest).then(function(response){
        return response.json();
    }).then(function (data){
        console.log(data);
        todayTemp = Math.round(1.8*(data.current.temp-273) + 32);
        todayHum = data.current.humidity;
        todayWind = data.current.wind_speed;
        todayUV = data.current.uvi;
        todayOutlook = data.current.weather[0].main;
        //day1
        day1Temp = Math.round(1.8*(data.daily[0].temp.day-273) + 32);
        day1Humid = data.daily[0].humidity;
        day1Outlook = data.daily[0].weather[0].main;
        //day2 
        day2Temp = Math.round(1.8*(data.daily[1].temp.day-273) + 32);
        day2Humid = data.daily[1].humidity;
        day2Outlook = data.daily[1].weather[0].main;
        //day3
        day3Temp = Math.round(1.8*(data.daily[2].temp.day-273) + 32);
        day3Humid = data.daily[2].humidity;
        day3Outlook = data.daily[2].weather[0].main;
        //day4
        day4Temp = Math.round(1.8*(data.daily[3].temp.day-273) + 32);
        day4Humid = data.daily[3].humidity;
        day4Outlook = data.daily[3].weather[0].main;
        //day5
        day5Temp = Math.round(1.8*(data.daily[4].temp.day-273) + 32);
        day5Humid = data.daily[4].humidity;
        day5Outlook = data.daily[4].weather[0].main;
        console.log(todayOutlook);
        displayWeather();
    })
}
$("#submit-button").on("click", getLatLon);
// api key 2853ae23cf85a1dddd10df701049c242 

function displayWeather(){
    //displaying current weather on main dashboard
    cityName.text(searchText);
    current_temp.text("Temperature: " + todayTemp + " °F");
    current_humidity.text("Humidity: " + todayHum + "%");
    current_wind_speed.text("Wind Speed: " + todayWind + " MPH");
    current_UV_index.text("UV Index: " + todayUV);
    if (todayOutlook == "Clouds"){

    }else if (todayOutlook == "Rain" || "Mist"){

    }else if (todayOutlook == "Clear"){

    }else if (todayOutlook == "snow"){

    }else if (todayOutlook == "Thunderstorm"){

    }
    //display weather for next 5 days
    //day 1
    day1_date.text(moment().add(1,'days').format("M/D/YY"));
    day1_temp.text("Temp: " + day1Temp + " °F" );
    day1_hum.text("Humidity: " + day1Humid + "%");
    if (day1Outlook == "Clouds"){

    }else if (day1Outlook == "Rain" || "Mist"){

    }else if (day1Outlook == "Clear"){

    }else if (day1Outlook == "snow"){

    }else if (day1Outlook == "Thunderstorm"){
        
    }
    //day2
    day2_date.text(moment().add(2,'days').format("M/D/YY"));
    day2_temp.text("Temp: " + day2Temp + " °F" );
    day2_hum.text("Humidity: " + day2Humid + "%");
    if (day2Outlook == "Clouds"){

    }else if (day2Outlook == "Rain" || "Mist"){

    }else if (day2Outlook == "Clear"){

    }else if (day2Outlook == "snow"){

    }else if (day2Outlook == "Thunderstorm"){
        
    }
    //day3
    day3_date.text(moment().add(3,'days').format("M/D/YY"));
    day3_temp.text("Temp: " + day3Temp + " °F" );
    day3_hum.text("Humidity: " + day3Humid + "%");
    if (day3Outlook == "Clouds"){

    }else if (day3Outlook == "Rain" || "Mist"){

    }else if (day3Outlook == "Clear"){

    }else if (day3Outlook == "snow"){

    }else if (day3Outlook == "Thunderstorm"){
        
    }
    //day4
    day4_date.text(moment().add(4,'days').format("M/D/YY"));
    day4_temp.text("Temp: " + day4Temp + " °F" );
    day4_hum.text("Humidity: " + day4Humid + "%");
    if (day4Outlook == "Clouds"){

    }else if (day4Outlook == "Rain" || "Mist"){

    }else if (day4Outlook == "Clear"){

    }else if (day4Outlook == "snow"){

    }else if (day4Outlook == "Thunderstorm"){
        
    }
    //day5
    day5_date.text(moment().add(5,'days').format("M/D/YY"));
    day5_temp.text("Temp: " + day5Temp + " °F" );
    day5_hum.text("Humidity: " + day5Humid + "%");
    if (day5Outlook == "Clouds"){

    }else if (day5Outlook == "Rain" || "Mist"){

    }else if (day5Outlook == "Clear"){

    }else if (day5Outlook == "snow"){

    }else if (day5Outlook == "Thunderstorm"){
        
    }
}

$(document).on('click','.cities', function(){
    var txt = $(this).attr("id");
    getLatLonFromButton(txt);
});


function getLatLonFromButton(text) {
    searchText = text;
    var urlRequest2 = geoURL1 + searchText + geoURL2;
    fetch(urlRequest2).then(function(response){
        return response.json();
    }).then(function (data){
        console.log(data);
        La = data[0].lat;
        Lo = data[0].lon;
        lat = La.toString();
        lon = Lo.toString();
        latLon = "lat=" + lat + "&lon=" + lon;
        getWeatherInfo(latLon);
    })    
    
};
});
