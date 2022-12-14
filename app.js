const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
    

})

app.post("/",function (req, res) {

    const query = req.body.cityName;
    const apiKey = "92d24bf9e69c282d9573fb0e4009ee25";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=57&q="+ query +"&appid="+ apiKey +"&units="+units;
    https.get(url,function (response) {
        console.log(response.statusCode);
        response.on("data",function (data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            console.log(temp);
            const description = weatherData.weather[0].description;
            console.log(description);
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
           
            // response to server
            
            res.write("<p>weather description is " + description + " </p>");
            res.write("<h1>The temperature in "+query+" is " +temp+ " degree celcius</h1>");
            res.write("<img src="+imageURL+">");
            res.send();
        })
    });
})

    


app.listen(3000, function () {
    console.log("Sever is runing on port 3000");
})