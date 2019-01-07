 
var xmlhttp; //sets variable for the XMLHttpRequest
var weather; //sets variable for storing JSON data
var city; //sets variable for city name from the dropdown

//when user clicks on button "Get data" this function fires
document.getElementById("button").addEventListener('click', function (){
    getData();
    setData();
    document.getElementById("button").style.display = "none";//after app gets data button "Get data" dissapires, there is no need in it anymore
});
//when user chooses the city from the dropdown function fires
document.getElementById("city").addEventListener('change', function (){   
    getData();
    setData();
    document.getElementById("button").style.display = "none";//button "Get data" dissapires, there is no need in it anymore
});
 //when user clicks on button "Search" this function fires   
document.getElementById("searchButton").addEventListener('click', function (){
    getQuerysetQuery();
    document.getElementById("button").style.display = "none";//button "Get data" dissapires, there is no need in it anymore
    
});

function getData() {
    city = document.getElementById("city").value;//sets value for the city variable
    xmlhttp = new XMLHttpRequest();//sets value for the xmlhttp variable
    xmlhttp.open("GET","https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&mode=JSON&APPID=b5840fb02191b2f29af7bcb95b9a7eb8",true);//request with the city name in the string
    xmlhttp.send();//sends the request
    console.log(xmlhttp);//logs respond to the console
}
function setData(){
    xmlhttp.onreadystatechange = function() {//if ready state is 4 and status is 200 
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
        var weatherData = xmlhttp.responseText;//sets variable for the data from the respond and dives it a value of: responseText:
        weather =JSON.parse(weatherData);   // parses to JSON data from the responseText:
        console.log(weather); //logs JSON data
        
        var icon= weather.weather[0].icon;//sets variable for the icon and gets data for it
        
        document.getElementById("temp").innerHTML=Math.round(weather.main.temp);//sets new  temperature and makes the number round
        document.getElementById("icon").src="http://openweathermap.org/img/w/"+icon+".png"; //sets new icon
        document.getElementById("clouds").innerHTML=weather.weather[0].description; //sets new  clouds condition  
        document.getElementById("humidity").innerHTML="humidity "+ weather.main.humidity+" %";//sets new humidity
        document.getElementsByTagName("h2")[0].innerHTML="Weather in " +city; //sets new text for which weather is presented  
      }
   }         
}
function getQuerysetQuery (){//when user presses the button Search this function fires
    var query = document.getElementById("site-search").value;//sets variable for the search word and gest value for it from the search field
    xmlhttp = new XMLHttpRequest();//sets value for the xmlhttp variable
    xmlhttp.open("GET","https://api.openweathermap.org/data/2.5/find?q="+query+"&units=metric&type=like&mode=JSON&APPID=b5840fb02191b2f29af7bcb95b9a7eb8",true);//request with the city name in the string
    xmlhttp.send();//sends the request
    console.log(xmlhttp);//logs respond to the console
    
   xmlhttp.onreadystatechange = function() {//if ready state is 4 and status is 200 
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
        var weatherData = xmlhttp.responseText;//sets variable for the data from the respond and dives it a value of: responseText:
        weather =JSON.parse(weatherData);  // parses to JSON data from the responseText:  
        console.log(weather); //logs JSON data
        var cityQuery= weather.list[0].name;//gets the name of the city and assigns it to the variable created
        var icon= weather.list[0].weather[0].icon;//sets variable for the icon and gets data for it
        document.getElementById("temp").innerHTML=Math.round(weather.list[0].main.temp);//sets new  temperature and makes the number round
        document.getElementById("icon").src="http://openweathermap.org/img/w/"+icon+".png"; //sets new icon
        document.getElementById("clouds").innerHTML=weather.list[0].weather[0].description;   //sets new  clouds condition 
        document.getElementById("humidity").innerHTML="humidity "+ weather.list[0].main.humidity+" %"; //sets new humidity
        document.getElementsByTagName("h2")[0].innerHTML="Weather in " +cityQuery;//sets new text for which weather is presented  
        }
       else {
           document.getElementsByTagName("h2")[0].innerHTML="City not found, try again"; //if city is not found sets new text" City not found, try again"
       }        
    }
}


    