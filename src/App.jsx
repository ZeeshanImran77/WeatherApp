import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSprinkle,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiSmoke,
  WiDust,
  WiSandstorm,
  WiVolcano,
  WiStrongWind,
  WiTornado,
} from "react-icons/wi";

import SearchBar from "./SearchBar";

function App() {
  const API_KEY = "59f15014461ad960baf60016a7295e5f";

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    weatherCall("karachi");
  }, []);

  async function weatherCall(param) {
    setLoading(true);
    setError("");
    setWeatherData(null);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(res.data);
    } catch (e) {
      setError("Error Occured! ", e.message);
    } finally {
      setLoading(false);
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const getWeatherClass = (weatherMain) => {
    return `weather-${weatherMain.toLowerCase()}` || "weather-clear";
  };

  const isDay = weatherData && weatherData.weather[0].icon.endsWith("d");

  const weatherIcons = {
    Clear: <WiDaySunny size={50} color="#FFD700" />, // sunny
    Clouds: <WiCloud size={50} color="#B0C4DE" />, // cloudy
    Rain: <WiRain size={50} color="#4e54c8" />, // rainy
    Drizzle: <WiSprinkle size={50} color="#4e54c8" />, // drizzle
    Thunderstorm: <WiThunderstorm size={50} color="#373b44" />, // storm
    Snow: <WiSnow size={50} color="#e0eafc" />, // snow
    Mist: <WiFog size={50} color="#606c88" />, // mist
    Smoke: <WiSmoke size={50} color="#bdc3c7" />, // smoke
    Haze: <WiFog size={50} color="#606c88" />, // haze
    Dust: <WiDust size={50} color="#b79891" />, // dust
    Fog: <WiFog size={50} color="#606c88" />, // fog
    Sand: <WiSandstorm size={50} color="#c2b280" />, // sand
    Ash: <WiVolcano size={50} color="#888888" />, // ash
    Squall: <WiStrongWind size={50} color="#434343" />, // squall
    Tornado: <WiTornado size={50} color="#0f0c29" />, // tornado
  };

  console.log(weatherData);
  return (
    <>
      <div
        className={`weather-app ${
          weatherData
            ? getWeatherClass(weatherData.weather[0].main)
            : "weather-clear"
        }`}
      >
        <div className="container">
          <h1 className="text-center display-1">Weather App</h1>
          <SearchBar weatherCall={weatherCall} />
          {loading && (
            <div
              className="d-flex justify-content-center align-items-center mt-5"
              style={{ height: "100px" }}
            >
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {error && (
            <p className="mt-5 text-danger text-center display-6 fw-bold">
              {error}
            </p>
          )}
          {weatherData && (
            <div className="weather-box">
              <div className="top">
                <h1 className="d-flex display-1 justify-content-center align-items-baseline fw-bold">
                  {Math.round(weatherData.main.temp)}
                  <p className="display-6 fw-bold">
                    °C - <span>{isDay ? "Day" : "Night"}</span>
                  </p>
                </h1>
                <div className="weather-icon">
                  {weatherData && weatherIcons[weatherData.weather[0].main]}
                  <p className="mb-0">{weatherData.weather[0].main}</p>
                </div>

                <div className="d-flex align-items-baseline justify-content-center gap-5">
                  <h4 className="d-flex align-items-baseline gap-2">
                    <FaMapMarkerAlt />
                    {weatherData.name}
                  </h4>

                  <h6>{weatherData.sys.country}</h6>
                  <h4 className="d-flex align-items-center">
                    <p className="mb-0 ">feels </p>(
                    {Math.round(weatherData.main.feels_like)}°C)
                  </h4>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-4 col-md-4 text-center col-12">
                  <p>
                    <span className="font-semibold">Min : </span>
                    {weatherData.main.temp_min}°C
                  </p>
                  <p>
                    <span className="font-semibold">Max : </span>
                    {weatherData.main.temp_max}°C
                  </p>
                </div>
                <div className="col-lg-4 col-md-4 text-center col-12">
                  <p>
                    <span className="font-semibold">Wind : </span>{" "}
                    {weatherData.wind.speed}
                    m/s
                  </p>
                  <p>
                    <span className="font-semibold">Direction : </span>{" "}
                    {weatherData.wind.deg}°
                  </p>
                  <p>
                    <span className="font-semibold">Clouds : </span>{" "}
                    {weatherData.clouds.all}%
                  </p>
                  <p>
                    <span className="font-semibold">Visibility : </span>
                    {weatherData.visibility / 1000} km
                  </p>
                </div>
                <div className="col-lg-4 col-md-4 text-center col-12">
                  <p>
                    <span className="font-semibold">Sunrise : </span>
                    {formatTime(weatherData.sys.sunrise)}
                  </p>
                  <p>
                    <span className="font-semibold">Sunset : </span>
                    {formatTime(weatherData.sys.sunset)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
