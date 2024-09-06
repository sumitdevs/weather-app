import express from "express";
import bodyParser from 'body-parser';
import axios from "axios";

const app = express();
const port = 3000;
const key = "9e5ca1af89ac1feb53a04648bdb16297";
// const API_GEO = "http://api.openweathermap.org/geo/1.0/direct";
const API_WEATHER =  "https://api.openweathermap.org/data/2.5/weather";

let weatherData = {
    "weather": [
    {
    "id": 721,
    "main": "Haze",
    "description": "haze",
    "icon": "50d"
    }
    ],
    "base": "stations",
    "main": {
    "temp": 32.05,
    "feels_like": 39.05,
    "temp_min": 32.05,
    "temp_max": 32.05,
    "pressure": 999,
    "humidity": 66,
    "sea_level": 999,
    "grnd_level": 975
    },
    "visibility": 3500,
    "wind": {
    "speed": 1.54,
    "deg": 180
    },
    "clouds": {
    "all": 75
    },
    "dt": 1725536825,
    "sys": {
    "type": 1,
    "id": 9165,
    "country": "IN",
    "sunrise": 1725496283,
    "sunset": 1725541718
    },
    "timezone": 19800,
    "id": 1273294,
    "name": "Delhi",
    "error": "",
    "cod": 200
    };

let loc = 'delhi';
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', async (req, res) =>{
   await fetchWeather(loc).then((response) => {
        weatherData = response.data;
        res.render('index.ejs', {data:weatherData});
    }).catch((error) => {
       console.log(error)
    })
})

app.post('/', async (req,res) => {
    loc = req.body.location;
    await fetchWeather(loc).then((response) => {
        weatherData = response.data;
        res.redirect('/');
    }).catch((error) => {
        weatherData.error = "City Not Found";
        res.render('index.ejs', {data:weatherData});
    })
});

app.listen(port, () => {
    console.log(`server started on port: http://localhost:${port}`);
})

async function fetchWeather(loc) {
        const response = await axios.get(API_WEATHER, {
            params : {
                q:loc,
                appid:key,
                units:"metric"
            }
        });
     return response
}


