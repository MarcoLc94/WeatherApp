import {  useRef, useState } from "react"
import "../components/WeatherCard.css"


const WeatherCard = ({weather, temp, setCity, cityNotFound, city}) => {
  const [isCelsius, setIsCelsius] = useState(true)


  const handleClick = () => {
     setIsCelsius(!isCelsius)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setCity(inputSearch.current.value)
  }

  const inputSearch = useRef()

    console.log(weather)
  return (
    <div className="card-container">
      <div className="title-container">
        <h1>Weather app</h1>
        <h2>{weather?.name}, {weather?.sys.country}</h2>
        <form onSubmit={handleSubmit}>
           <input type="search" placeholder="Search by city" ref={inputSearch} />
           <button>Search</button>
        </form>
      </div>
      { cityNotFound ? (<div className="text-invalid"><span>❌</span><p>`{city} not found. Please use a valid city.`</p></div>) : <span></span> }
      <div className="data-container">
        <div id="img">
        <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt={weather?.weather[0].main} width={200} height={200}/>
        </div>
        <div className="details-container">
            <h1 id="h1">{weather?.weather[0].description}</h1>
            <div className="inside-container">
                <div className="inner">
                <h2 id="h2">Wind speed</h2><h3 id="h3">{weather?.wind.speed} m/s</h3>
                </div>
                <div className="inner">
                <h2 id="h2">Clouds</h2><h3 id="h3">{weather?.clouds.all} %</h3>
                </div>
                <div className="inner">
                <h2 id="h2">Pressure</h2><h3 id="h3">{weather?.main.pressure} hPa</h3>
                </div>
            </div>
        </div>
      </div>
      <h2 id="temp">{isCelsius? `${temp?.celsius} °C` : `${temp?.fahrenheit} °F`}</h2>
      <button onClick={handleClick}>Change to {isCelsius? "°F" : "°C"}</button>
    </div>
  )
}

export default WeatherCard
