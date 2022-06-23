import React from "react"
import {Link} from "react-router-dom"
const WeatherToday =({weather})=>{
  
    
    
    return (
        <div className="weather">
          <h2>Today's weather</h2>
        <div className='weather-today'>
          <img src={weather.iconUrl} alt="weather icon"/>
          <div className="weather-main">
            <div className="today-info">
              <h3>{weather.city}</h3>
              <h3>{weather.date}</h3>  
            </div>
            <h2>{weather.temp}º</h2>
            <div className="today-minmax">
              <p>Low {weather.min}º</p>
              <p>High {weather.max}º</p>
            </div>
          </div>
        </div>
        <Link to="/weather" id="link-forecast"><p >see weather forecast</p></Link>
    </div>

    )
}

export default WeatherToday