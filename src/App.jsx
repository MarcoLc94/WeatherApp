import { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import "./App.css";
import Spinner from "./components/Spinner";
import locationpng from "../public/location.png";

const App = () => {
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [temp, setTemp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [city, setCity] = useState("");
  const [cityNotFound, setCityNotFound] = useState(false);
  const [background, setBackground] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowMessage(true);
    }, 3000);

    const success = (position) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      setHasError(false);
    };

    const error = () => {
      setHasError(true);
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    if (coords) {
      const API_KEY = "8805841147849887ab28cb4f960d147c";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`;

      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const fahrenheit = ((celsius * 9) / 5 + 32).toFixed(1);
          setTemp({ celsius, fahrenheit });
          setCityNotFound(false);
          setBackground(res.data.weather[0].main)
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 404) {
            setCityNotFound(true);
          } else {
            setHasError(error);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [coords, city]);

  const objStyles = {
    backgroundImage: `url(/img/${background}.gif)`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center", // Agrega esto si deseas centrar la imagen
  };
  

  return (
    <div className="app" style={objStyles}>
      {isLoading ? (
        <div>
          <Spinner /> {showMessage && <p>Please active location</p>}
        </div>
      ) : hasError ? (
        <div className="png-container">
          <h2>Please turn on the permissions</h2>
          <img className="iconpng bouncing" src={locationpng} alt="" />
        </div>
      ) : (
        <WeatherCard weather={weather} temp={temp} setCity={setCity} cityNotFound={cityNotFound} city={city} objStyles={objStyles}/>
      )}
    </div>
  );
};

export default App;
