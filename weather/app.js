const express = require('express');
const bodyParser=require('body-parser');
const app = express();

const https = require('https');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function (req, res) {
      res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
const usercity=req.body.city ;
const url = "https://api.openweathermap.org/data/2.5/weather?q="+usercity+"&appid=b023e9852793e9f1749062e34627d172&units=metric";

    https.get(url, function (response) {
        console.log(response.statusCode);


        response.on("data", function (data) {
            console.log(data);

            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            console.log(temp);
            const desc=weatherData.weather[0].description;
            const img=weatherData.weather[0].icon;
            console.log(img);
            const imgurl="https://openweathermap.org/img/wn/"+ img+"@2x.png";
            //const imgurl= "https://openweathermap.org/img/wn/10d@2x.png";
            // res.send("tempature in hyderabad is"+temp+" degrees");
            res.send("<center> <h1 style=padding-top:200px>Temparature in "+usercity+" is "+temp +" </h1><br> <img src="+imgurl + "> </center>");
           
        })

    })
   


});
app.listen(5000);