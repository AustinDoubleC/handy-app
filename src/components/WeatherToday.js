import React from "react"

const WeatherToday =({weather})=>{
  
    
    
    return (
        <div className="weather">
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
    </div>

    )
}

export default WeatherToday